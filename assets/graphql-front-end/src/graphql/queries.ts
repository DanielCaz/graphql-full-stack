/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getPosts = /* GraphQL */ `query GetPosts {
  getPosts {
    id
    title
    content
    __typename
  }
}
` as GeneratedQuery<APITypes.GetPostsQueryVariables, APITypes.GetPostsQuery>;
