import fetch from "isomorphic-fetch";
import React, { useState, useEffect, createContext, FC, useContext } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError, ErrorResponse } from "apollo-link-error";
import { ApolloLink, Observable } from "apollo-link";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";
import { polyfill } from "es6-promise";
import { createUploadLink } from "apollo-upload-client";

polyfill();

interface IGraphqlContext {
  loadingUser: boolean;
  getAccessToken: () => string;
  setAccessToken: (token: string) => void;
  client: ApolloClient<any>;
}

const GraphqlContext = createContext<IGraphqlContext>(undefined as any);

const credentials = "include";

export const GraphqlProvider: FC<{
  language?: string;
  uri: string;
  onErrorResponse?: (error: ErrorResponse) => void;
}> = ({ uri, onErrorResponse, language, children }) => {
  const { getAccessToken, setAccessToken } = useAccessToken();
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    let alive = true;
    fetch(`${uri}/refresh_token`, {
      method: "POST",
      credentials,
    }).then(async x => {
      const res = await x.json();
      const { accessToken } = res;
      if (alive) {
        setAccessToken(accessToken);
        setLoadingUser(false);
      }
    });
    return () => {
      alive = false;
    };
  }, []);

  const cache = new InMemoryCache({});
  const requestLink = new ApolloLink(
    (operation, forward) =>
      new Observable(observer => {
        let handle: any;
        Promise.resolve(operation)
          .then(op => {
            const accessToken = getAccessToken();
            if (accessToken) {
              op.setContext({
                headers: {
                  authorization: `bearer ${accessToken}`,
                },
              });
            }
          })
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            });
          })
          .catch(observer.error.bind(observer));

        return () => {
          if (handle) {
            handle.unsubscribe();
          }
        };
      })
  );
  const client = new ApolloClient({
    link: ApolloLink.from([
      new TokenRefreshLink({
        accessTokenField: "accessToken",
        isTokenValidOrUndefined: () => {
          const token = getAccessToken();

          if (!token) {
            return true;
          }

          try {
            const { exp } = jwtDecode(token);
            if (Date.now() >= exp * 1000) {
              return false;
            } else {
              return true;
            }
          } catch {
            return false;
          }
        },
        fetchAccessToken: () => {
          return fetch(`${uri}/refresh_token`, {
            method: "POST",
            credentials,
          });
        },
        handleFetch: accessToken => {
          setAccessToken(accessToken);
        },
        handleError: err => {
          console.warn("Your refresh token is invalid. Try to relogin");
          console.error(err);
        },
      }),
      onError(errResponse => {
        if (onErrorResponse) {
          onErrorResponse(errResponse);
        }
      }),
      requestLink,
      createUploadLink({
        uri: `${uri}/graphql`,
        headers: {
          "keep-alive": "true",
          "Accept-Language": language || "en-US",
        },
        credentials,
      }),
    ]),
    cache,
    defaultOptions: {
      query: {
        errorPolicy: "all",
      },
      mutate: {
        errorPolicy: "all",
      },
      watchQuery: {
        errorPolicy: "all",
      },
    },
  });
  return (
    <GraphqlContext.Provider value={{ loadingUser, setAccessToken, getAccessToken, client }}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </GraphqlContext.Provider>
  );
};

const useAccessToken = () => {
  const myToken = React.useRef("");
  return {
    getAccessToken: () => myToken.current,
    setAccessToken: (t: string) => (myToken.current = t),
  };
};

export const useGraphqlClient = () => {
  return useContext(GraphqlContext);
};
