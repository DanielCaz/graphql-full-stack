#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { GraphqlFullStackStack } from "../lib/graphql-full-stack-stack";

const app = new cdk.App();
new GraphqlFullStackStack(app, "GraphqlFullStackStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
