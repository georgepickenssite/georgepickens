import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import {
  AuthorizationType,
  CfnApi,
  CfnChannelNamespace,
} from "aws-cdk-lib/aws-appsync";
import { Policy, PolicyStatement } from "aws-cdk-lib/aws-iam";

const backend = defineBackend({
  auth,
  data,
});

const customResource = backend.createStack("custom-event-resource");

const cfnEventAPI = new CfnApi(customResource, "EventApi", {
  name: "EventApi",
  eventConfig: {
    authProviders: [
      {
        authType: AuthorizationType.USER_POOL,
        cognitoConfig: {
          userPoolId: backend.auth.resources.userPool.userPoolId,
          awsRegion: customResource.region,
        },
      },
    ],

    connectionAuthModes: [
      {
        authType: AuthorizationType.USER_POOL,
      },
    ],
    defaultPublishAuthModes: [{ authType: AuthorizationType.USER_POOL }],
    defaultSubscribeAuthModes: [{ authType: AuthorizationType.USER_POOL }],
  },
});

// attach a policy to the authenticated user role in our User Pool to grant access to the Event API:
backend.auth.resources.authenticatedUserIamRole.attachInlinePolicy(
  new Policy(customResource, "AppSyncEventPolicy", {
    statements: [
      new PolicyStatement({
        actions: [
          "appsync:EventConnect",
          "appsync:EventSubscribe",
          "appsync:EventPublish",
        ],
        resources: [`${cfnEventAPI.attrApiArn}/*`, `${cfnEventAPI.attrApiArn}`],
      }),
    ],
  })
);

new CfnChannelNamespace(customResource, "cfnEventAPINamespace", {
  apiId: cfnEventAPI.attrApiId,
  name: "chat",
});

backend.addOutput({
  custom: {
    events: {
      url: `https://${cfnEventAPI.getAtt("Dns.Http").toString()}/event`,
      aws_region: customResource.region,
      default_authorization_type: AuthorizationType.USER_POOL,
    },
  },
});
