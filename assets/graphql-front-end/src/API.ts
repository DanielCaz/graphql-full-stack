/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreatePostInput = {
  title?: string | null,
  content?: string | null,
};

export type Post = {
  __typename: "Post",
  id: string,
  title?: string | null,
  content?: string | null,
};

export type CreatePostMutationVariables = {
  input: CreatePostInput,
};

export type CreatePostMutation = {
  createPost?:  {
    __typename: "Post",
    id: string,
    title?: string | null,
    content?: string | null,
  } | null,
};

export type GetPostsQueryVariables = {
};

export type GetPostsQuery = {
  getPosts?:  Array< {
    __typename: "Post",
    id: string,
    title?: string | null,
    content?: string | null,
  } | null > | null,
};
