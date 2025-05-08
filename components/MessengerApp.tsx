"use client";

import { useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Button } from "@aws-amplify/ui-react";
import RoomList from "./RoomList";
import ChatArea from "./ChatArea";
import { RoomListType } from "../types/types";

export default function MessengerApp() {
  const [selectedRoom, setSelectedRoom] = useState<null | RoomListType>(null);

  const { signOut } = useAuthenticator((context) => [context.signOut]);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex h-[600px] w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-lg">
        <RoomList onSelectRoom={setSelectedRoom} selectedRoom={selectedRoom} />
        <ChatArea selectedRoom={selectedRoom} />
      </div>
      <Button
        variation="primary"
        color="red.60"
        backgroundColor="white"
        width="10%"
        onClick={() => signOut()}
        size="large"
      >
        Sign Out
      </Button>
    </div>
  );
}
