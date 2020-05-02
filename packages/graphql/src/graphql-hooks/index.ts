import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AwsPhoto = {
   __typename?: 'AwsPhoto';
  photoKey: Scalars['String'];
  photoUrl: Scalars['String'];
  name: Scalars['String'];
};

export type LoginResponse = {
   __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type Mutation = {
   __typename?: 'Mutation';
  login: LoginResponse;
  logout: Scalars['Boolean'];
  revokeRefreshTokenForUser: Scalars['Boolean'];
  register: Scalars['Boolean'];
  createAlbum: Scalars['String'];
  addPicture: AwsPhoto;
  deleteAlbum: Scalars['Boolean'];
  deletePicture: Scalars['Boolean'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRevokeRefreshTokenForUserArgs = {
  userId: Scalars['String'];
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationCreateAlbumArgs = {
  albumName: Scalars['String'];
};


export type MutationAddPictureArgs = {
  albumName: Scalars['String'];
  picture: Scalars['Upload'];
};


export type MutationDeleteAlbumArgs = {
  albumName: Scalars['String'];
};


export type MutationDeletePictureArgs = {
  photoKey: Scalars['String'];
};

export type Query = {
   __typename?: 'Query';
  users: Array<User>;
  hello: Scalars['String'];
  me?: Maybe<User>;
  getAlbums: Array<Scalars['String']>;
  viewAlbum: Array<AwsPhoto>;
  labels: Array<Scalars['String']>;
};


export type QueryViewAlbumArgs = {
  albumName: Scalars['String'];
};


export type User = {
   __typename?: 'User';
  _id: Scalars['String'];
  email: Scalars['String'];
};

export type AddPictureMutationVariables = {
  picture: Scalars['Upload'];
  albumName: Scalars['String'];
};


export type AddPictureMutation = (
  { __typename?: 'Mutation' }
  & { addPicture: (
    { __typename?: 'AwsPhoto' }
    & Pick<AwsPhoto, 'name' | 'photoKey' | 'photoUrl'>
  ) }
);

export type AlbumsQueryVariables = {};


export type AlbumsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getAlbums'>
);

export type CreateAlbumMutationVariables = {
  albumName: Scalars['String'];
};


export type CreateAlbumMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createAlbum'>
);

export type DeleteAlbumMutationVariables = {
  albumName: Scalars['String'];
};


export type DeleteAlbumMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteAlbum'>
);

export type DeletePictureMutationVariables = {
  photoKey: Scalars['String'];
};


export type DeletePictureMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePicture'>
);

export type ViewAlbumQueryVariables = {
  albumName: Scalars['String'];
};


export type ViewAlbumQuery = (
  { __typename?: 'Query' }
  & { viewAlbum: Array<(
    { __typename?: 'AwsPhoto' }
    & Pick<AwsPhoto, 'name' | 'photoKey' | 'photoUrl'>
  )> }
);

export type LoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'email'>
    ) }
  ) }
);

export type LogoutMutationVariables = {};


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'email'>
  )> }
);

export type RegisterMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'register'>
);

export type UsersQueryVariables = {};


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'email'>
  )> }
);


export const AddPictureDocument = gql`
    mutation AddPicture($picture: Upload!, $albumName: String!) {
  addPicture(picture: $picture, albumName: $albumName) {
    name
    photoKey
    photoUrl
  }
}
    `;
export type AddPictureMutationFn = ApolloReactCommon.MutationFunction<AddPictureMutation, AddPictureMutationVariables>;

/**
 * __useAddPictureMutation__
 *
 * To run a mutation, you first call `useAddPictureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPictureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPictureMutation, { data, loading, error }] = useAddPictureMutation({
 *   variables: {
 *      picture: // value for 'picture'
 *      albumName: // value for 'albumName'
 *   },
 * });
 */
export function useAddPictureMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddPictureMutation, AddPictureMutationVariables>) {
        return ApolloReactHooks.useMutation<AddPictureMutation, AddPictureMutationVariables>(AddPictureDocument, baseOptions);
      }
export type AddPictureMutationHookResult = ReturnType<typeof useAddPictureMutation>;
export type AddPictureMutationResult = ApolloReactCommon.MutationResult<AddPictureMutation>;
export type AddPictureMutationOptions = ApolloReactCommon.BaseMutationOptions<AddPictureMutation, AddPictureMutationVariables>;
export const AlbumsDocument = gql`
    query Albums {
  getAlbums
}
    `;

/**
 * __useAlbumsQuery__
 *
 * To run a query within a React component, call `useAlbumsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAlbumsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAlbumsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAlbumsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AlbumsQuery, AlbumsQueryVariables>) {
        return ApolloReactHooks.useQuery<AlbumsQuery, AlbumsQueryVariables>(AlbumsDocument, baseOptions);
      }
export function useAlbumsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AlbumsQuery, AlbumsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AlbumsQuery, AlbumsQueryVariables>(AlbumsDocument, baseOptions);
        }
export type AlbumsQueryHookResult = ReturnType<typeof useAlbumsQuery>;
export type AlbumsLazyQueryHookResult = ReturnType<typeof useAlbumsLazyQuery>;
export type AlbumsQueryResult = ApolloReactCommon.QueryResult<AlbumsQuery, AlbumsQueryVariables>;
export const CreateAlbumDocument = gql`
    mutation CreateAlbum($albumName: String!) {
  createAlbum(albumName: $albumName)
}
    `;
export type CreateAlbumMutationFn = ApolloReactCommon.MutationFunction<CreateAlbumMutation, CreateAlbumMutationVariables>;

/**
 * __useCreateAlbumMutation__
 *
 * To run a mutation, you first call `useCreateAlbumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAlbumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAlbumMutation, { data, loading, error }] = useCreateAlbumMutation({
 *   variables: {
 *      albumName: // value for 'albumName'
 *   },
 * });
 */
export function useCreateAlbumMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateAlbumMutation, CreateAlbumMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateAlbumMutation, CreateAlbumMutationVariables>(CreateAlbumDocument, baseOptions);
      }
export type CreateAlbumMutationHookResult = ReturnType<typeof useCreateAlbumMutation>;
export type CreateAlbumMutationResult = ApolloReactCommon.MutationResult<CreateAlbumMutation>;
export type CreateAlbumMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateAlbumMutation, CreateAlbumMutationVariables>;
export const DeleteAlbumDocument = gql`
    mutation DeleteAlbum($albumName: String!) {
  deleteAlbum(albumName: $albumName)
}
    `;
export type DeleteAlbumMutationFn = ApolloReactCommon.MutationFunction<DeleteAlbumMutation, DeleteAlbumMutationVariables>;

/**
 * __useDeleteAlbumMutation__
 *
 * To run a mutation, you first call `useDeleteAlbumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAlbumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAlbumMutation, { data, loading, error }] = useDeleteAlbumMutation({
 *   variables: {
 *      albumName: // value for 'albumName'
 *   },
 * });
 */
export function useDeleteAlbumMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteAlbumMutation, DeleteAlbumMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteAlbumMutation, DeleteAlbumMutationVariables>(DeleteAlbumDocument, baseOptions);
      }
export type DeleteAlbumMutationHookResult = ReturnType<typeof useDeleteAlbumMutation>;
export type DeleteAlbumMutationResult = ApolloReactCommon.MutationResult<DeleteAlbumMutation>;
export type DeleteAlbumMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteAlbumMutation, DeleteAlbumMutationVariables>;
export const DeletePictureDocument = gql`
    mutation DeletePicture($photoKey: String!) {
  deletePicture(photoKey: $photoKey)
}
    `;
export type DeletePictureMutationFn = ApolloReactCommon.MutationFunction<DeletePictureMutation, DeletePictureMutationVariables>;

/**
 * __useDeletePictureMutation__
 *
 * To run a mutation, you first call `useDeletePictureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePictureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePictureMutation, { data, loading, error }] = useDeletePictureMutation({
 *   variables: {
 *      photoKey: // value for 'photoKey'
 *   },
 * });
 */
export function useDeletePictureMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeletePictureMutation, DeletePictureMutationVariables>) {
        return ApolloReactHooks.useMutation<DeletePictureMutation, DeletePictureMutationVariables>(DeletePictureDocument, baseOptions);
      }
export type DeletePictureMutationHookResult = ReturnType<typeof useDeletePictureMutation>;
export type DeletePictureMutationResult = ApolloReactCommon.MutationResult<DeletePictureMutation>;
export type DeletePictureMutationOptions = ApolloReactCommon.BaseMutationOptions<DeletePictureMutation, DeletePictureMutationVariables>;
export const ViewAlbumDocument = gql`
    query ViewAlbum($albumName: String!) {
  viewAlbum(albumName: $albumName) {
    name
    photoKey
    photoUrl
  }
}
    `;

/**
 * __useViewAlbumQuery__
 *
 * To run a query within a React component, call `useViewAlbumQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewAlbumQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewAlbumQuery({
 *   variables: {
 *      albumName: // value for 'albumName'
 *   },
 * });
 */
export function useViewAlbumQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ViewAlbumQuery, ViewAlbumQueryVariables>) {
        return ApolloReactHooks.useQuery<ViewAlbumQuery, ViewAlbumQueryVariables>(ViewAlbumDocument, baseOptions);
      }
export function useViewAlbumLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ViewAlbumQuery, ViewAlbumQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ViewAlbumQuery, ViewAlbumQueryVariables>(ViewAlbumDocument, baseOptions);
        }
export type ViewAlbumQueryHookResult = ReturnType<typeof useViewAlbumQuery>;
export type ViewAlbumLazyQueryHookResult = ReturnType<typeof useViewAlbumLazyQuery>;
export type ViewAlbumQueryResult = ApolloReactCommon.QueryResult<ViewAlbumQuery, ViewAlbumQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    user {
      _id
      email
    }
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    _id
    email
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!) {
  register(email: $email, password: $password)
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    _id
    email
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;