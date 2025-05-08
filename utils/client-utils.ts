import { generateClient } from "aws-amplify/api";
import { fetchAuthSession } from "aws-amplify/auth";
import { createAIHooks } from "@aws-amplify/ui-react-ai";
import { Schema } from "@/amplify/data/resource";

export const client = generateClient<Schema>();
export const { useAIConversation, useAIGeneration } = createAIHooks(client);

export async function getUserName() {
  const userInfo = await fetchAuthSession();

  return userInfo.tokens?.idToken?.payload.preferred_username;
}

export const getFirstLetter = (sender: string) =>
  sender
    .split(" ")
    .map((n) => n[0])
    .join("");
