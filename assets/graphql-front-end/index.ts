import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";
import { initSchema } from "@aws-amplify/datastore";

import { schema } from "./schema";





type EagerPostModel = {
  readonly content?: string | null;
  readonly id: string;
  readonly title?: string | null;
}

type LazyPostModel = {
  readonly content?: string | null;
  readonly id: string;
  readonly title?: string | null;
}

export declare type PostModel = LazyLoading extends LazyLoadingDisabled ? EagerPostModel : LazyPostModel

export declare const PostModel: (new (init: ModelInit<PostModel>) => PostModel)

const { Post } = initSchema(schema) as {
  Post: PersistentModelConstructor<PostModel>;
};

export {
  
};