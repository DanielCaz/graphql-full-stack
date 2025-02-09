import { DataStoreSchema } from "@aws-amplify/datastore";

export const schema: DataStoreSchema = {
  models: {},
  enums: {},
  nonModels: {
    Post: {
      name: "Post",
      fields: {
        content: {
          name: "content",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        id: {
          name: "id",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        title: {
          name: "title",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
      },
    },
  },
  codegenVersion: "3.4.4",
  version: "4a6d920cb0e68a54955d0f1e4c6347fa",
};
