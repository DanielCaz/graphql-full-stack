import { generateClient } from "aws-amplify/api";
import { getPosts } from "../graphql/queries";
import { createPost } from "../graphql/mutations";
import { CreatePostInput } from "../API";

const client = generateClient();

export const queryPosts = async () => {
  const { data } = await client.graphql({
    query: getPosts,
  });

  return data.getPosts;
};

export const mutatePost = async (input: CreatePostInput) => {
  const { data } = await client.graphql({
    query: createPost,
    variables: { input },
  });

  return data.createPost;
};
