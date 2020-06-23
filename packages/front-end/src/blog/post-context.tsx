import * as React from "react";
import { useParams } from "react-router-dom";
import { useGetPostQuery } from "@cabezonidas/shop-admin-graphql";
import { useTranslation, Loading, Alert, Box } from "@cabezonidas/shop-ui";
import useIsMounted from "../hooks/use-is-mounted";
import { Post } from "./post";

interface IPostData {
  language?: string | null;
  title?: string | null;
  description?: string | null;
  body?: string | null;
  created?: number | null;
  published?: number | null;
  tags?: string[] | null;
  author?: {
    _id: string;
    email: string;
  } | null;
}

interface IPost extends IPostData {
  _id: string;
  translations?: IPostData[] | null;
}

interface ILanguage {
  localeId: string;
  name: string;
}

interface IPostContext {
  post?: IPost;
  currentLanguage?: string;
  setLanguage: (lng?: string) => void;
  untranslated: ILanguage[];
  nameByLocaleId: (localeId?: string | null) => string;
}

const PostContext = React.createContext<IPostContext>(undefined as any);

export const usePost = () => React.useContext(PostContext);

export const PostState: React.FC = () => {
  const { languages } = useTranslation();
  const { id } = useParams();
  const _id = id ?? "";
  const [currentLanguage, setCurrentLanguage] = React.useState<string>();
  const isMounted = useIsMounted();

  const { data, loading, error } = useGetPostQuery({
    variables: { _id },
    fetchPolicy: "cache-and-network",
  });

  const currentPost = data?.getPost ?? undefined;

  const nameByLocaleId = (localeId?: string | null) =>
    languages.find(l => l.localeId === localeId)?.name ?? "";

  const untranslated = React.useMemo(() => {
    if (currentPost) {
      const translated = (currentPost.translations ?? [])
        .map(tr => languages.find(la => la.localeId === tr.language)!)
        .filter(f => !!f);
      return languages.filter(
        la =>
          !translated.find(tr => tr.localeId === la.localeId) &&
          la.localeId !== currentPost.language
      );
    }
    return [];
  }, [languages, currentPost]);

  return (
    <PostContext.Provider
      value={{
        currentLanguage,
        setLanguage: (lng?: string) => isMounted() && setCurrentLanguage(lng),
        post: currentPost,
        untranslated,
        nameByLocaleId,
      }}
    >
      {loading ? (
        <Loading />
      ) : error ? (
        <Alert variant="danger">
          {error.graphQLErrors.map(e => (
            <Box key={e.message}>{e.message}</Box>
          ))}
        </Alert>
      ) : currentPost ? (
        <Post />
      ) : (
        <></>
      )}
    </PostContext.Provider>
  );
};

PostContext.displayName = "PostContext";
