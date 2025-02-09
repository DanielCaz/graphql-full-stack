import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { aws_appsync as appsync, aws_dynamodb as dynamodb } from "aws-cdk-lib";

export class GraphqlFullStackStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new appsync.GraphqlApi(this, "apis-post", {
      name: "api-to-process-posts",
      definition: {
        schema: appsync.SchemaFile.fromAsset("schema/schema.graphql"),
      },
    });

    const tablePosts = new dynamodb.Table(this, "posts-table", {
      partitionKey: {
        name: "id",
        type: dynamodb.AttributeType.STRING,
      },
    });

    const dataSourcePosts = api.addDynamoDbDataSource(
      "datasource-posts",
      tablePosts
    );

    const funcGetPost = new appsync.AppsyncFunction(this, "func-get-post", {
      api,
      name: "getPosts",
      dataSource: dataSourcePosts,
      code: appsync.Code.fromInline(`
        export function request(ctx) {
          return { operation: 'Scan' };
        }

        export function response(ctx) {
          return ctx.result.items;
        }
      `),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
    });

    const funcCreatePost = new appsync.AppsyncFunction(
      this,
      "func-create-post",
      {
        api,
        name: "createPost",
        dataSource: dataSourcePosts,
        code: appsync.Code.fromInline(`
          export function request(ctx) {
            return {
              operation: 'PutItem',
              key: util.dynamodb.toMapValues({id: util.autoId()}),
              attributeValues: util.dynamodb.toMapValues(ctx.args.input),
            };
          }

          export function response(ctx) {
            return ctx.result;
          }
        `),
        runtime: appsync.FunctionRuntime.JS_1_0_0,
      }
    );

    new appsync.Resolver(this, "resolver-get-post", {
      api,
      typeName: "Query",
      fieldName: "getPosts",
      code: appsync.Code.fromInline(`
        export function request(ctx) {
          return {};
        }

        export function response(ctx) {
          return ctx.prev.result;
        }
      `),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      pipelineConfig: [funcGetPost],
    });

    new appsync.Resolver(this, "resolver-create-post", {
      api,
      typeName: "Mutation",
      fieldName: "createPost",
      code: appsync.Code.fromInline(`
        export function request(ctx) {
          return {};
        }

        export function response(ctx) {
          return ctx.prev.result;
        }
      `),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      pipelineConfig: [funcCreatePost],
    });
  }
}
