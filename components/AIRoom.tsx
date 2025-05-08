"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@aws-amplify/ui-react";
import { AIConversation } from "@aws-amplify/ui-react-ai";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { getUserName, useAIConversation } from "@/utils/client-utils";

export default function AIRoom() {
  const [user, setUser] = useState("");
  const [
    {
      data: { messages },
      isLoading,
    },
    sendMessage,
  ] = useAIConversation("chat");

  useEffect(() => {
    async function getUserInfo() {
      const userInfo = await getUserName();
      setUser(userInfo?.toString() || "User");
    }
    getUserInfo();
  }, []);

  return (
    <>
      <Card className="w-full max-w-4xl flex flex-col  overflow-hidden  h-[600px] ">
        <CardHeader>
          <CardTitle>AI Chat Room</CardTitle>
          <CardDescription>Chat with a Claude 3.5 Sonnet model</CardDescription>
        </CardHeader>
        <CardContent className="last:mt-auto flex-1 overflow-hidden ">
          <AIConversation
            messages={messages}
            handleSendMessage={sendMessage}
            displayText={{
              getMessageTimestampText: () => "",
            }}
            isLoading={isLoading}
            avatars={{
              user: {
                username: user,
              },
              ai: {
                username: "AI Chatter",
              },
            }}
          />
        </CardContent>
      </Card>

      <Link href="/" className="w-full text-center">
        <Button
          variation="primary"
          size="large"
          width="10%"
          backgroundColor="white"
          color="black"
        >
          Go Back
        </Button>
      </Link>
    </>
  );
}
