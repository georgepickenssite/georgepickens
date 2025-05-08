import { defineAuth } from "@aws-amplify/backend";
import { preSignUp } from "./pre-signup/resource";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  triggers: {
    preSignUp,
  },
  userAttributes: {
    preferredUsername: { required: true },
  },
  access: (allow) => [allow.resource(preSignUp).to(["listUsers"])],
});
