import { memo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const RoomHeader = memo(function RoomHeader({
  room,
}: {
  room: { name: string; status: string };
}) {
  return (
    <div className="flex items-center border-b border-gray-200 bg-white p-4">
      <Avatar className="h-10 w-10">
        <AvatarImage alt={room.name} />
        <AvatarFallback>
          {room.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="ml-3">
        <p className="font-medium">{room.name}</p>
        <p className="text-sm text-gray-500">{room.status}</p>
      </div>
    </div>
  );
});
