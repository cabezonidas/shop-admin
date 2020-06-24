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

export type EditProfileInput = {
  _id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['Float']>;
  imageUrl?: Maybe<Scalars['String']>;
  linkedin?: Maybe<Scalars['String']>;
  whatsapp?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  messenger?: Maybe<Scalars['String']>;
  github?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  description?: Maybe<Array<LocalizedDescription>>;
};

export type LocalizedDescription = {
  localeId: Scalars['String'];
  text: Scalars['String'];
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
  updateProfile: User;
  createDraft: Post;
  deletePost: Scalars['Boolean'];
  saveDraft: Post;
  savePost: Post;
  publishPost: Post;
  unpublishPost: Post;
  addTranslation: Post;
  deleteTranslation: Post;
  saveTranslationDraft: Post;
  saveTranslationPost: Post;
  publishTranslationPost: Post;
  unpublishTranslationPost: Post;
  starPost: Post;
  createAlbum: Scalars['String'];
  addPicture: AwsPhoto;
  deleteAlbum: Scalars['Boolean'];
  deletePicture: Scalars['Boolean'];
  addTag: Array<Tag>;
  removeTag: Array<Tag>;
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


export type MutationUpdateProfileArgs = {
  input: EditProfileInput;
};


export type MutationDeletePostArgs = {
  _id: Scalars['String'];
};


export type MutationSaveDraftArgs = {
  tags: Array<Scalars['String']>;
  body: Scalars['String'];
  description: Scalars['String'];
  title: Scalars['String'];
  language: Scalars['String'];
  _id: Scalars['String'];
};


export type MutationSavePostArgs = {
  tags: Array<Scalars['String']>;
  body: Scalars['String'];
  description: Scalars['String'];
  title: Scalars['String'];
  language: Scalars['String'];
  _id: Scalars['String'];
};


export type MutationPublishPostArgs = {
  _id: Scalars['String'];
};


export type MutationUnpublishPostArgs = {
  _id: Scalars['String'];
};


export type MutationAddTranslationArgs = {
  language: Scalars['String'];
  _id: Scalars['String'];
};


export type MutationDeleteTranslationArgs = {
  language: Scalars['String'];
  _id: Scalars['String'];
};


export type MutationSaveTranslationDraftArgs = {
  tags: Array<Scalars['String']>;
  body: Scalars['String'];
  description: Scalars['String'];
  title: Scalars['String'];
  language: Scalars['String'];
  _id: Scalars['String'];
};


export type MutationSaveTranslationPostArgs = {
  tags: Array<Scalars['String']>;
  body: Scalars['String'];
  description: Scalars['String'];
  title: Scalars['String'];
  language: Scalars['String'];
  _id: Scalars['String'];
};


export type MutationPublishTranslationPostArgs = {
  language: Scalars['String'];
  _id: Scalars['String'];
};


export type MutationUnpublishTranslationPostArgs = {
  language: Scalars['String'];
  _id: Scalars['String'];
};


export type MutationStarPostArgs = {
  _id: Scalars['String'];
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


export type MutationAddTagArgs = {
  tag: Scalars['String'];
  localeId: Scalars['String'];
};


export type MutationRemoveTagArgs = {
  tag: Scalars['String'];
  localeId: Scalars['String'];
};

export type Post = {
   __typename?: 'Post';
  author?: Maybe<User>;
  created?: Maybe<Scalars['Float']>;
  updated?: Maybe<Scalars['Float']>;
  published?: Maybe<Scalars['Float']>;
  language?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  _id: Scalars['String'];
  deleted?: Maybe<Scalars['Float']>;
  translations: Array<PostData>;
  starred?: Maybe<Scalars['Boolean']>;
};

export type PostData = {
   __typename?: 'PostData';
  author?: Maybe<User>;
  created?: Maybe<Scalars['Float']>;
  updated?: Maybe<Scalars['Float']>;
  published?: Maybe<Scalars['Float']>;
  language?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
};

export type Query = {
   __typename?: 'Query';
  users: Array<User>;
  hello: Scalars['String'];
  me?: Maybe<User>;
  roles: Array<Role>;
  allPosts: Array<Post>;
  allPostDrafts: Array<Post>;
  getDraft?: Maybe<Post>;
  getPost?: Maybe<Post>;
  getAlbums: Array<Scalars['String']>;
  viewAlbum: Array<AwsPhoto>;
  labels: Array<Scalars['String']>;
  allTags: Array<Tag>;
};


export type QueryGetDraftArgs = {
  _id: Scalars['String'];
};


export type QueryGetPostArgs = {
  _id: Scalars['String'];
};


export type QueryViewAlbumArgs = {
  albumName: Scalars['String'];
};


export type QueryAllTagsArgs = {
  localeId: Scalars['String'];
};

export type Role = {
   __typename?: 'Role';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type Tag = {
   __typename?: 'Tag';
  tag: Scalars['String'];
  localeId: Scalars['String'];
};


export type User = {
   __typename?: 'User';
  _id: Scalars['String'];
  email: Scalars['String'];
  roles?: Maybe<Array<Scalars['String']>>;
  dob?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  linkedin?: Maybe<Scalars['String']>;
  whatsapp?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  messenger?: Maybe<Scalars['String']>;
  github?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  description?: Maybe<Array<UserDescription>>;
};

export type UserDescription = {
   __typename?: 'UserDescription';
  localeId: Scalars['String'];
  text: Scalars['String'];
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

export type AddPostTranslationMutationVariables = {
  _id: Scalars['String'];
  language: Scalars['String'];
};


export type AddPostTranslationMutation = (
  { __typename?: 'Mutation' }
  & { addTranslation: (
    { __typename?: 'Post' }
    & PostFragmentFragment
  ) }
);

export type CreatePostDraftMutationVariables = {};


export type CreatePostDraftMutation = (
  { __typename?: 'Mutation' }
  & { createDraft: (
    { __typename?: 'Post' }
    & Pick<Post, '_id'>
  ) }
);

export type SaveTranslationPostMutationVariables = {
  _id: Scalars['String'];
  language: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  body: Scalars['String'];
  tags: Array<Scalars['String']>;
};


export type SaveTranslationPostMutation = (
  { __typename?: 'Mutation' }
  & { saveTranslationPost: (
    { __typename?: 'Post' }
    & PostFragmentFragment
  ) }
);

export type DeletePostMutationVariables = {
  _id: Scalars['String'];
};


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePost'>
);

export type DeleteTranslationPostMutationVariables = {
  _id: Scalars['String'];
  language: Scalars['String'];
};


export type DeleteTranslationPostMutation = (
  { __typename?: 'Mutation' }
  & { deleteTranslation: (
    { __typename?: 'Post' }
    & PostFragmentFragment
  ) }
);

export type GetDraftPostQueryVariables = {
  _id: Scalars['String'];
};


export type GetDraftPostQuery = (
  { __typename?: 'Query' }
  & { getDraft?: Maybe<(
    { __typename?: 'Post' }
    & PostFragmentFragment
  )> }
);

export type GetDraftPostsQueryVariables = {};


export type GetDraftPostsQuery = (
  { __typename?: 'Query' }
  & { allPostDrafts: Array<(
    { __typename?: 'Post' }
    & PostFragmentFragment
  )> }
);

export type GetPostQueryVariables = {
  _id: Scalars['String'];
};


export type GetPostQuery = (
  { __typename?: 'Query' }
  & { getPost?: Maybe<(
    { __typename?: 'Post' }
    & PostFragmentFragment
  )> }
);

export type GetPostsQueryVariables = {};


export type GetPostsQuery = (
  { __typename?: 'Query' }
  & { allPosts: Array<(
    { __typename?: 'Post' }
    & PostFragmentFragment
  )> }
);

export type PostFragmentFragment = (
  { __typename?: 'Post' }
  & Pick<Post, '_id' | 'starred' | 'title' | 'description' | 'body' | 'created' | 'language' | 'published' | 'updated' | 'tags'>
  & { author?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'name' | 'email'>
  )>, translations: Array<(
    { __typename?: 'PostData' }
    & Pick<PostData, 'title' | 'description' | 'body' | 'created' | 'language' | 'published' | 'updated' | 'tags'>
    & { author?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, '_id' | 'name' | 'email'>
    )> }
  )> }
);

export type PublishPostMutationVariables = {
  _id: Scalars['String'];
};


export type PublishPostMutation = (
  { __typename?: 'Mutation' }
  & { publishPost: (
    { __typename?: 'Post' }
    & PostFragmentFragment
  ) }
);

export type PublishTranslationPostMutationVariables = {
  _id: Scalars['String'];
  language: Scalars['String'];
};


export type PublishTranslationPostMutation = (
  { __typename?: 'Mutation' }
  & { publishTranslationPost: (
    { __typename?: 'Post' }
    & PostFragmentFragment
  ) }
);

export type SavePostDraftMutationVariables = {
  _id: Scalars['String'];
  language: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  body: Scalars['String'];
  tags: Array<Scalars['String']>;
};


export type SavePostDraftMutation = (
  { __typename?: 'Mutation' }
  & { saveDraft: (
    { __typename?: 'Post' }
    & PostFragmentFragment
  ) }
);

export type SavePostMutationVariables = {
  _id: Scalars['String'];
  language: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  body: Scalars['String'];
  tags: Array<Scalars['String']>;
};


export type SavePostMutation = (
  { __typename?: 'Mutation' }
  & { savePost: (
    { __typename?: 'Post' }
    & PostFragmentFragment
  ) }
);

export type SaveTranslationDraftMutationVariables = {
  _id: Scalars['String'];
  language: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  body: Scalars['String'];
  tags: Array<Scalars['String']>;
};


export type SaveTranslationDraftMutation = (
  { __typename?: 'Mutation' }
  & { saveTranslationDraft: (
    { __typename?: 'Post' }
    & PostFragmentFragment
  ) }
);

export type StarPostMutationVariables = {
  _id: Scalars['String'];
};


export type StarPostMutation = (
  { __typename?: 'Mutation' }
  & { starPost: (
    { __typename?: 'Post' }
    & PostFragmentFragment
  ) }
);

export type UnpublishPostMutationVariables = {
  _id: Scalars['String'];
};


export type UnpublishPostMutation = (
  { __typename?: 'Mutation' }
  & { unpublishPost: (
    { __typename?: 'Post' }
    & PostFragmentFragment
  ) }
);

export type UnpublishTranslationPostMutationVariables = {
  _id: Scalars['String'];
  language: Scalars['String'];
};


export type UnpublishTranslationPostMutation = (
  { __typename?: 'Mutation' }
  & { unpublishTranslationPost: (
    { __typename?: 'Post' }
    & PostFragmentFragment
  ) }
);

export type AddTagMutationVariables = {
  localeId: Scalars['String'];
  tag: Scalars['String'];
};


export type AddTagMutation = (
  { __typename?: 'Mutation' }
  & { addTag: Array<(
    { __typename?: 'Tag' }
    & TagFragmentFragment
  )> }
);

export type AllTagsQueryVariables = {
  localeId: Scalars['String'];
};


export type AllTagsQuery = (
  { __typename?: 'Query' }
  & { allTags: Array<(
    { __typename?: 'Tag' }
    & TagFragmentFragment
  )> }
);

export type RemoveTagMutationVariables = {
  localeId: Scalars['String'];
  tag: Scalars['String'];
};


export type RemoveTagMutation = (
  { __typename?: 'Mutation' }
  & { removeTag: Array<(
    { __typename?: 'Tag' }
    & TagFragmentFragment
  )> }
);

export type TagFragmentFragment = (
  { __typename?: 'Tag' }
  & Pick<Tag, 'localeId' | 'tag'>
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
      & UserFragmentFragment
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
    & UserFragmentFragment
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

export type RolesQueryVariables = {};


export type RolesQuery = (
  { __typename?: 'Query' }
  & { roles: Array<(
    { __typename?: 'Role' }
    & Pick<Role, 'id' | 'name'>
  )> }
);

export type UpdateProfileMutationVariables = {
  input: EditProfileInput;
};


export type UpdateProfileMutation = (
  { __typename?: 'Mutation' }
  & { updateProfile: (
    { __typename?: 'User' }
    & UserFragmentFragment
  ) }
);

export type UserFragmentFragment = (
  { __typename?: 'User' }
  & Pick<User, '_id' | 'email' | 'dob' | 'name' | 'imageUrl' | 'linkedin' | 'whatsapp' | 'instagram' | 'facebook' | 'messenger' | 'github' | 'twitter' | 'roles'>
  & { description?: Maybe<Array<(
    { __typename?: 'UserDescription' }
    & Pick<UserDescription, 'localeId' | 'text'>
  )>> }
);

export type UsersQueryVariables = {};


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & UserFragmentFragment
  )> }
);

export const PostFragmentFragmentDoc = gql`
    fragment PostFragment on Post {
  _id
  starred
  title
  description
  body
  created
  language
  published
  updated
  tags
  author {
    _id
    name
    email
  }
  translations {
    title
    description
    body
    created
    language
    published
    updated
    tags
    author {
      _id
      name
      email
    }
  }
}
    `;
export const TagFragmentFragmentDoc = gql`
    fragment TagFragment on Tag {
  localeId
  tag
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  _id
  email
  dob
  name
  imageUrl
  linkedin
  whatsapp
  instagram
  facebook
  messenger
  github
  twitter
  description {
    localeId
    text
  }
  roles
}
    `;
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
export const AddPostTranslationDocument = gql`
    mutation AddPostTranslation($_id: String!, $language: String!) {
  addTranslation(_id: $_id, language: $language) {
    ...PostFragment
  }
}
    ${PostFragmentFragmentDoc}`;
export type AddPostTranslationMutationFn = ApolloReactCommon.MutationFunction<AddPostTranslationMutation, AddPostTranslationMutationVariables>;

/**
 * __useAddPostTranslationMutation__
 *
 * To run a mutation, you first call `useAddPostTranslationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPostTranslationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPostTranslationMutation, { data, loading, error }] = useAddPostTranslationMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useAddPostTranslationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddPostTranslationMutation, AddPostTranslationMutationVariables>) {
        return ApolloReactHooks.useMutation<AddPostTranslationMutation, AddPostTranslationMutationVariables>(AddPostTranslationDocument, baseOptions);
      }
export type AddPostTranslationMutationHookResult = ReturnType<typeof useAddPostTranslationMutation>;
export type AddPostTranslationMutationResult = ApolloReactCommon.MutationResult<AddPostTranslationMutation>;
export type AddPostTranslationMutationOptions = ApolloReactCommon.BaseMutationOptions<AddPostTranslationMutation, AddPostTranslationMutationVariables>;
export const CreatePostDraftDocument = gql`
    mutation CreatePostDraft {
  createDraft {
    _id
  }
}
    `;
export type CreatePostDraftMutationFn = ApolloReactCommon.MutationFunction<CreatePostDraftMutation, CreatePostDraftMutationVariables>;

/**
 * __useCreatePostDraftMutation__
 *
 * To run a mutation, you first call `useCreatePostDraftMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostDraftMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostDraftMutation, { data, loading, error }] = useCreatePostDraftMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreatePostDraftMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePostDraftMutation, CreatePostDraftMutationVariables>) {
        return ApolloReactHooks.useMutation<CreatePostDraftMutation, CreatePostDraftMutationVariables>(CreatePostDraftDocument, baseOptions);
      }
export type CreatePostDraftMutationHookResult = ReturnType<typeof useCreatePostDraftMutation>;
export type CreatePostDraftMutationResult = ApolloReactCommon.MutationResult<CreatePostDraftMutation>;
export type CreatePostDraftMutationOptions = ApolloReactCommon.BaseMutationOptions<CreatePostDraftMutation, CreatePostDraftMutationVariables>;
export const SaveTranslationPostDocument = gql`
    mutation SaveTranslationPost($_id: String!, $language: String!, $title: String!, $description: String!, $body: String!, $tags: [String!]!) {
  saveTranslationPost(_id: $_id, language: $language, title: $title, description: $description, body: $body, tags: $tags) {
    ...PostFragment
  }
}
    ${PostFragmentFragmentDoc}`;
export type SaveTranslationPostMutationFn = ApolloReactCommon.MutationFunction<SaveTranslationPostMutation, SaveTranslationPostMutationVariables>;

/**
 * __useSaveTranslationPostMutation__
 *
 * To run a mutation, you first call `useSaveTranslationPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveTranslationPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveTranslationPostMutation, { data, loading, error }] = useSaveTranslationPostMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      language: // value for 'language'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      body: // value for 'body'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useSaveTranslationPostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveTranslationPostMutation, SaveTranslationPostMutationVariables>) {
        return ApolloReactHooks.useMutation<SaveTranslationPostMutation, SaveTranslationPostMutationVariables>(SaveTranslationPostDocument, baseOptions);
      }
export type SaveTranslationPostMutationHookResult = ReturnType<typeof useSaveTranslationPostMutation>;
export type SaveTranslationPostMutationResult = ApolloReactCommon.MutationResult<SaveTranslationPostMutation>;
export type SaveTranslationPostMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveTranslationPostMutation, SaveTranslationPostMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($_id: String!) {
  deletePost(_id: $_id)
}
    `;
export type DeletePostMutationFn = ApolloReactCommon.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        return ApolloReactHooks.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, baseOptions);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = ApolloReactCommon.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = ApolloReactCommon.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const DeleteTranslationPostDocument = gql`
    mutation DeleteTranslationPost($_id: String!, $language: String!) {
  deleteTranslation(_id: $_id, language: $language) {
    ...PostFragment
  }
}
    ${PostFragmentFragmentDoc}`;
export type DeleteTranslationPostMutationFn = ApolloReactCommon.MutationFunction<DeleteTranslationPostMutation, DeleteTranslationPostMutationVariables>;

/**
 * __useDeleteTranslationPostMutation__
 *
 * To run a mutation, you first call `useDeleteTranslationPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTranslationPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTranslationPostMutation, { data, loading, error }] = useDeleteTranslationPostMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useDeleteTranslationPostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteTranslationPostMutation, DeleteTranslationPostMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteTranslationPostMutation, DeleteTranslationPostMutationVariables>(DeleteTranslationPostDocument, baseOptions);
      }
export type DeleteTranslationPostMutationHookResult = ReturnType<typeof useDeleteTranslationPostMutation>;
export type DeleteTranslationPostMutationResult = ApolloReactCommon.MutationResult<DeleteTranslationPostMutation>;
export type DeleteTranslationPostMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteTranslationPostMutation, DeleteTranslationPostMutationVariables>;
export const GetDraftPostDocument = gql`
    query GetDraftPost($_id: String!) {
  getDraft(_id: $_id) {
    ...PostFragment
  }
}
    ${PostFragmentFragmentDoc}`;

/**
 * __useGetDraftPostQuery__
 *
 * To run a query within a React component, call `useGetDraftPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDraftPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDraftPostQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useGetDraftPostQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetDraftPostQuery, GetDraftPostQueryVariables>) {
        return ApolloReactHooks.useQuery<GetDraftPostQuery, GetDraftPostQueryVariables>(GetDraftPostDocument, baseOptions);
      }
export function useGetDraftPostLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetDraftPostQuery, GetDraftPostQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetDraftPostQuery, GetDraftPostQueryVariables>(GetDraftPostDocument, baseOptions);
        }
export type GetDraftPostQueryHookResult = ReturnType<typeof useGetDraftPostQuery>;
export type GetDraftPostLazyQueryHookResult = ReturnType<typeof useGetDraftPostLazyQuery>;
export type GetDraftPostQueryResult = ApolloReactCommon.QueryResult<GetDraftPostQuery, GetDraftPostQueryVariables>;
export const GetDraftPostsDocument = gql`
    query GetDraftPosts {
  allPostDrafts {
    ...PostFragment
  }
}
    ${PostFragmentFragmentDoc}`;

/**
 * __useGetDraftPostsQuery__
 *
 * To run a query within a React component, call `useGetDraftPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDraftPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDraftPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDraftPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetDraftPostsQuery, GetDraftPostsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetDraftPostsQuery, GetDraftPostsQueryVariables>(GetDraftPostsDocument, baseOptions);
      }
export function useGetDraftPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetDraftPostsQuery, GetDraftPostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetDraftPostsQuery, GetDraftPostsQueryVariables>(GetDraftPostsDocument, baseOptions);
        }
export type GetDraftPostsQueryHookResult = ReturnType<typeof useGetDraftPostsQuery>;
export type GetDraftPostsLazyQueryHookResult = ReturnType<typeof useGetDraftPostsLazyQuery>;
export type GetDraftPostsQueryResult = ApolloReactCommon.QueryResult<GetDraftPostsQuery, GetDraftPostsQueryVariables>;
export const GetPostDocument = gql`
    query GetPost($_id: String!) {
  getPost(_id: $_id) {
    ...PostFragment
  }
}
    ${PostFragmentFragmentDoc}`;

/**
 * __useGetPostQuery__
 *
 * To run a query within a React component, call `useGetPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useGetPostQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
        return ApolloReactHooks.useQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, baseOptions);
      }
export function useGetPostLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, baseOptions);
        }
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>;
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>;
export type GetPostQueryResult = ApolloReactCommon.QueryResult<GetPostQuery, GetPostQueryVariables>;
export const GetPostsDocument = gql`
    query GetPosts {
  allPosts {
    ...PostFragment
  }
}
    ${PostFragmentFragmentDoc}`;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, baseOptions);
      }
export function useGetPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, baseOptions);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsQueryResult = ApolloReactCommon.QueryResult<GetPostsQuery, GetPostsQueryVariables>;
export const PublishPostDocument = gql`
    mutation PublishPost($_id: String!) {
  publishPost(_id: $_id) {
    ...PostFragment
  }
}
    ${PostFragmentFragmentDoc}`;
export type PublishPostMutationFn = ApolloReactCommon.MutationFunction<PublishPostMutation, PublishPostMutationVariables>;

/**
 * __usePublishPostMutation__
 *
 * To run a mutation, you first call `usePublishPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishPostMutation, { data, loading, error }] = usePublishPostMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function usePublishPostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PublishPostMutation, PublishPostMutationVariables>) {
        return ApolloReactHooks.useMutation<PublishPostMutation, PublishPostMutationVariables>(PublishPostDocument, baseOptions);
      }
export type PublishPostMutationHookResult = ReturnType<typeof usePublishPostMutation>;
export type PublishPostMutationResult = ApolloReactCommon.MutationResult<PublishPostMutation>;
export type PublishPostMutationOptions = ApolloReactCommon.BaseMutationOptions<PublishPostMutation, PublishPostMutationVariables>;
export const PublishTranslationPostDocument = gql`
    mutation PublishTranslationPost($_id: String!, $language: String!) {
  publishTranslationPost(_id: $_id, language: $language) {
    ...PostFragment
  }
}
    ${PostFragmentFragmentDoc}`;
export type PublishTranslationPostMutationFn = ApolloReactCommon.MutationFunction<PublishTranslationPostMutation, PublishTranslationPostMutationVariables>;

/**
 * __usePublishTranslationPostMutation__
 *
 * To run a mutation, you first call `usePublishTranslationPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishTranslationPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishTranslationPostMutation, { data, loading, error }] = usePublishTranslationPostMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      language: // value for 'language'
 *   },
 * });
 */
export function usePublishTranslationPostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PublishTranslationPostMutation, PublishTranslationPostMutationVariables>) {
        return ApolloReactHooks.useMutation<PublishTranslationPostMutation, PublishTranslationPostMutationVariables>(PublishTranslationPostDocument, baseOptions);
      }
export type PublishTranslationPostMutationHookResult = ReturnType<typeof usePublishTranslationPostMutation>;
export type PublishTranslationPostMutationResult = ApolloReactCommon.MutationResult<PublishTranslationPostMutation>;
export type PublishTranslationPostMutationOptions = ApolloReactCommon.BaseMutationOptions<PublishTranslationPostMutation, PublishTranslationPostMutationVariables>;
export const SavePostDraftDocument = gql`
    mutation SavePostDraft($_id: String!, $language: String!, $title: String!, $description: String!, $body: String!, $tags: [String!]!) {
  saveDraft(_id: $_id, language: $language, title: $title, description: $description, body: $body, tags: $tags) {
    ...PostFragment
  }
}
    ${PostFragmentFragmentDoc}`;
export type SavePostDraftMutationFn = ApolloReactCommon.MutationFunction<SavePostDraftMutation, SavePostDraftMutationVariables>;

/**
 * __useSavePostDraftMutation__
 *
 * To run a mutation, you first call `useSavePostDraftMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSavePostDraftMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [savePostDraftMutation, { data, loading, error }] = useSavePostDraftMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      language: // value for 'language'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      body: // value for 'body'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useSavePostDraftMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SavePostDraftMutation, SavePostDraftMutationVariables>) {
        return ApolloReactHooks.useMutation<SavePostDraftMutation, SavePostDraftMutationVariables>(SavePostDraftDocument, baseOptions);
      }
export type SavePostDraftMutationHookResult = ReturnType<typeof useSavePostDraftMutation>;
export type SavePostDraftMutationResult = ApolloReactCommon.MutationResult<SavePostDraftMutation>;
export type SavePostDraftMutationOptions = ApolloReactCommon.BaseMutationOptions<SavePostDraftMutation, SavePostDraftMutationVariables>;
export const SavePostDocument = gql`
    mutation SavePost($_id: String!, $language: String!, $title: String!, $description: String!, $body: String!, $tags: [String!]!) {
  savePost(_id: $_id, language: $language, title: $title, description: $description, body: $body, tags: $tags) {
    ...PostFragment
  }
}
    ${PostFragmentFragmentDoc}`;
export type SavePostMutationFn = ApolloReactCommon.MutationFunction<SavePostMutation, SavePostMutationVariables>;

/**
 * __useSavePostMutation__
 *
 * To run a mutation, you first call `useSavePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSavePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [savePostMutation, { data, loading, error }] = useSavePostMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      language: // value for 'language'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      body: // value for 'body'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useSavePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SavePostMutation, SavePostMutationVariables>) {
        return ApolloReactHooks.useMutation<SavePostMutation, SavePostMutationVariables>(SavePostDocument, baseOptions);
      }
export type SavePostMutationHookResult = ReturnType<typeof useSavePostMutation>;
export type SavePostMutationResult = ApolloReactCommon.MutationResult<SavePostMutation>;
export type SavePostMutationOptions = ApolloReactCommon.BaseMutationOptions<SavePostMutation, SavePostMutationVariables>;
export const SaveTranslationDraftDocument = gql`
    mutation SaveTranslationDraft($_id: String!, $language: String!, $title: String!, $description: String!, $body: String!, $tags: [String!]!) {
  saveTranslationDraft(_id: $_id, language: $language, title: $title, description: $description, body: $body, tags: $tags) {
    ...PostFragment
  }
}
    ${PostFragmentFragmentDoc}`;
export type SaveTranslationDraftMutationFn = ApolloReactCommon.MutationFunction<SaveTranslationDraftMutation, SaveTranslationDraftMutationVariables>;

/**
 * __useSaveTranslationDraftMutation__
 *
 * To run a mutation, you first call `useSaveTranslationDraftMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveTranslationDraftMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveTranslationDraftMutation, { data, loading, error }] = useSaveTranslationDraftMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      language: // value for 'language'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      body: // value for 'body'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useSaveTranslationDraftMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveTranslationDraftMutation, SaveTranslationDraftMutationVariables>) {
        return ApolloReactHooks.useMutation<SaveTranslationDraftMutation, SaveTranslationDraftMutationVariables>(SaveTranslationDraftDocument, baseOptions);
      }
export type SaveTranslationDraftMutationHookResult = ReturnType<typeof useSaveTranslationDraftMutation>;
export type SaveTranslationDraftMutationResult = ApolloReactCommon.MutationResult<SaveTranslationDraftMutation>;
export type SaveTranslationDraftMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveTranslationDraftMutation, SaveTranslationDraftMutationVariables>;
export const StarPostDocument = gql`
    mutation StarPost($_id: String!) {
  starPost(_id: $_id) {
    ...PostFragment
  }
}
    ${PostFragmentFragmentDoc}`;
export type StarPostMutationFn = ApolloReactCommon.MutationFunction<StarPostMutation, StarPostMutationVariables>;

/**
 * __useStarPostMutation__
 *
 * To run a mutation, you first call `useStarPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStarPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [starPostMutation, { data, loading, error }] = useStarPostMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useStarPostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<StarPostMutation, StarPostMutationVariables>) {
        return ApolloReactHooks.useMutation<StarPostMutation, StarPostMutationVariables>(StarPostDocument, baseOptions);
      }
export type StarPostMutationHookResult = ReturnType<typeof useStarPostMutation>;
export type StarPostMutationResult = ApolloReactCommon.MutationResult<StarPostMutation>;
export type StarPostMutationOptions = ApolloReactCommon.BaseMutationOptions<StarPostMutation, StarPostMutationVariables>;
export const UnpublishPostDocument = gql`
    mutation UnpublishPost($_id: String!) {
  unpublishPost(_id: $_id) {
    ...PostFragment
  }
}
    ${PostFragmentFragmentDoc}`;
export type UnpublishPostMutationFn = ApolloReactCommon.MutationFunction<UnpublishPostMutation, UnpublishPostMutationVariables>;

/**
 * __useUnpublishPostMutation__
 *
 * To run a mutation, you first call `useUnpublishPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnpublishPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unpublishPostMutation, { data, loading, error }] = useUnpublishPostMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useUnpublishPostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UnpublishPostMutation, UnpublishPostMutationVariables>) {
        return ApolloReactHooks.useMutation<UnpublishPostMutation, UnpublishPostMutationVariables>(UnpublishPostDocument, baseOptions);
      }
export type UnpublishPostMutationHookResult = ReturnType<typeof useUnpublishPostMutation>;
export type UnpublishPostMutationResult = ApolloReactCommon.MutationResult<UnpublishPostMutation>;
export type UnpublishPostMutationOptions = ApolloReactCommon.BaseMutationOptions<UnpublishPostMutation, UnpublishPostMutationVariables>;
export const UnpublishTranslationPostDocument = gql`
    mutation UnpublishTranslationPost($_id: String!, $language: String!) {
  unpublishTranslationPost(_id: $_id, language: $language) {
    ...PostFragment
  }
}
    ${PostFragmentFragmentDoc}`;
export type UnpublishTranslationPostMutationFn = ApolloReactCommon.MutationFunction<UnpublishTranslationPostMutation, UnpublishTranslationPostMutationVariables>;

/**
 * __useUnpublishTranslationPostMutation__
 *
 * To run a mutation, you first call `useUnpublishTranslationPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnpublishTranslationPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unpublishTranslationPostMutation, { data, loading, error }] = useUnpublishTranslationPostMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useUnpublishTranslationPostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UnpublishTranslationPostMutation, UnpublishTranslationPostMutationVariables>) {
        return ApolloReactHooks.useMutation<UnpublishTranslationPostMutation, UnpublishTranslationPostMutationVariables>(UnpublishTranslationPostDocument, baseOptions);
      }
export type UnpublishTranslationPostMutationHookResult = ReturnType<typeof useUnpublishTranslationPostMutation>;
export type UnpublishTranslationPostMutationResult = ApolloReactCommon.MutationResult<UnpublishTranslationPostMutation>;
export type UnpublishTranslationPostMutationOptions = ApolloReactCommon.BaseMutationOptions<UnpublishTranslationPostMutation, UnpublishTranslationPostMutationVariables>;
export const AddTagDocument = gql`
    mutation AddTag($localeId: String!, $tag: String!) {
  addTag(localeId: $localeId, tag: $tag) {
    ...TagFragment
  }
}
    ${TagFragmentFragmentDoc}`;
export type AddTagMutationFn = ApolloReactCommon.MutationFunction<AddTagMutation, AddTagMutationVariables>;

/**
 * __useAddTagMutation__
 *
 * To run a mutation, you first call `useAddTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTagMutation, { data, loading, error }] = useAddTagMutation({
 *   variables: {
 *      localeId: // value for 'localeId'
 *      tag: // value for 'tag'
 *   },
 * });
 */
export function useAddTagMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddTagMutation, AddTagMutationVariables>) {
        return ApolloReactHooks.useMutation<AddTagMutation, AddTagMutationVariables>(AddTagDocument, baseOptions);
      }
export type AddTagMutationHookResult = ReturnType<typeof useAddTagMutation>;
export type AddTagMutationResult = ApolloReactCommon.MutationResult<AddTagMutation>;
export type AddTagMutationOptions = ApolloReactCommon.BaseMutationOptions<AddTagMutation, AddTagMutationVariables>;
export const AllTagsDocument = gql`
    query AllTags($localeId: String!) {
  allTags(localeId: $localeId) {
    ...TagFragment
  }
}
    ${TagFragmentFragmentDoc}`;

/**
 * __useAllTagsQuery__
 *
 * To run a query within a React component, call `useAllTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllTagsQuery({
 *   variables: {
 *      localeId: // value for 'localeId'
 *   },
 * });
 */
export function useAllTagsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AllTagsQuery, AllTagsQueryVariables>) {
        return ApolloReactHooks.useQuery<AllTagsQuery, AllTagsQueryVariables>(AllTagsDocument, baseOptions);
      }
export function useAllTagsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AllTagsQuery, AllTagsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AllTagsQuery, AllTagsQueryVariables>(AllTagsDocument, baseOptions);
        }
export type AllTagsQueryHookResult = ReturnType<typeof useAllTagsQuery>;
export type AllTagsLazyQueryHookResult = ReturnType<typeof useAllTagsLazyQuery>;
export type AllTagsQueryResult = ApolloReactCommon.QueryResult<AllTagsQuery, AllTagsQueryVariables>;
export const RemoveTagDocument = gql`
    mutation RemoveTag($localeId: String!, $tag: String!) {
  removeTag(localeId: $localeId, tag: $tag) {
    ...TagFragment
  }
}
    ${TagFragmentFragmentDoc}`;
export type RemoveTagMutationFn = ApolloReactCommon.MutationFunction<RemoveTagMutation, RemoveTagMutationVariables>;

/**
 * __useRemoveTagMutation__
 *
 * To run a mutation, you first call `useRemoveTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTagMutation, { data, loading, error }] = useRemoveTagMutation({
 *   variables: {
 *      localeId: // value for 'localeId'
 *      tag: // value for 'tag'
 *   },
 * });
 */
export function useRemoveTagMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveTagMutation, RemoveTagMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveTagMutation, RemoveTagMutationVariables>(RemoveTagDocument, baseOptions);
      }
export type RemoveTagMutationHookResult = ReturnType<typeof useRemoveTagMutation>;
export type RemoveTagMutationResult = ApolloReactCommon.MutationResult<RemoveTagMutation>;
export type RemoveTagMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveTagMutation, RemoveTagMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    user {
      ...UserFragment
    }
  }
}
    ${UserFragmentFragmentDoc}`;
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
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

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
export const RolesDocument = gql`
    query Roles {
  roles {
    id
    name
  }
}
    `;

/**
 * __useRolesQuery__
 *
 * To run a query within a React component, call `useRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRolesQuery({
 *   variables: {
 *   },
 * });
 */
export function useRolesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RolesQuery, RolesQueryVariables>) {
        return ApolloReactHooks.useQuery<RolesQuery, RolesQueryVariables>(RolesDocument, baseOptions);
      }
export function useRolesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RolesQuery, RolesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RolesQuery, RolesQueryVariables>(RolesDocument, baseOptions);
        }
export type RolesQueryHookResult = ReturnType<typeof useRolesQuery>;
export type RolesLazyQueryHookResult = ReturnType<typeof useRolesLazyQuery>;
export type RolesQueryResult = ApolloReactCommon.QueryResult<RolesQuery, RolesQueryVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($input: EditProfileInput!) {
  updateProfile(input: $input) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;
export type UpdateProfileMutationFn = ApolloReactCommon.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, baseOptions);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = ApolloReactCommon.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

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