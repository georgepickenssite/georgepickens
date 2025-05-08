import { memo } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { MessageProps } from "@/types/types";
import { getFirstLetter } from "@/utils/client-utils";

export const Message = memo(function Message({
  message,
  userName,
  selectedRoomName,
  ref,
}: MessageProps) {
  if (message.roomName !== selectedRoomName) return null;

  return (
    <div
      ref={ref}
      className={`mb-2 flex  gap-2 flex-col justify-center ${
        message.sender === userName ? "items-end" : "items-start"
      }`}
    >
      <div className="flex gap-4 items-center">
        <Avatar className="h-10 w-10">
          <AvatarFallback>{getFirstLetter(message.sender)}</AvatarFallback>
        </Avatar>
        <div className="font-bold">{message.sender}</div>
      </div>
      <div
        className={`rounded-lg p-2 ml-14 ${
          message.sender === userName
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
});
