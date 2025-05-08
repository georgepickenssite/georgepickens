import { cookies } from "next/headers";
import { fetchAuthSession } from "aws-amplify/auth/server";
import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/data";
import { Schema } from "@/amplify/data/resource";
import config from "@/amplify_outputs.json";

export const cookieBasedClient = generateServerClientUsingCookies<Schema>({
  config,
  cookies,
  authMode: "userPool",
});

export const { runWithAmplifyServerContext } = createServerRunner({
  config,
});

export const idToken = async () =>
  await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    async operation(contextSpec) {
      try {
        const idToken = await fetchAuthSession(contextSpec);
        const userName = idToken.tokens?.idToken?.payload.preferred_username;
        const token = idToken.tokens?.idToken?.toString();
        if (!token || !userName) throw new Error("No token or username");
        return { token, userName };
      } catch (error) {
        console.log("error", error);
        return { token: "", userName: "" };
      }
    },
  });
