import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, X } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { client } from "@/utils/client-utils";
import { RoomListProps } from "../types/types";

export default function RoomList({
  onSelectRoom,
  selectedRoom,
}: RoomListProps) {
  const [rooms, setRooms] = useState<
    { id: string; name: string; status: string }[]
  >([]);

  useEffect(() => {
    async function getAllRooms() {
      const sub = await client.models.Room.observeQuery()
        .pipe()
        .subscribe((data) => {
          const filteredRooms = data.items.map((room) => ({
            id: room.id,
            name: room.name,
            status: room.description,
          }));
          setRooms(filteredRooms);
          // Check if new filtered room was deleted
          const findSelectedRoom = filteredRooms.find(
            (room) => room.id === selectedRoom?.id
          );
          if (!findSelectedRoom) {
            onSelectRoom(null);
          }
        });
      return sub;
    }

    const subPromise = getAllRooms();

    return () => {
      Promise.resolve(subPromise).then((sub) => {
        sub.unsubscribe();
      });
    };
  }, [onSelectRoom, selectedRoom?.id]);

  async function deleteRoom(id: string) {
    await client.models.Room.delete({
      id,
    }).catch((err) => console.log(err));
  }

  return (
    <div className="w-1/3 border-r border-gray-200 bg-gray-50 z-50">
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Rooms</h2>
          <div className="flex gap-4">
            <Link href="/ai-room" className="flex gap-2">
              <Button size="sm" variant="outline" className="bg-purple-200">
                <span className="text-blue-600 hover:text-blue-800 pointer">
                  AI
                </span>
                <Plus className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/add-room" className="flex gap-2">
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        <ScrollArea className="h-[500px]">
          {rooms.map((room, index) => (
            <div key={index}>
              <div
                className="flex justify-between hover:bg-gray-100 cursor-pointer"
                onClick={() => onSelectRoom(room)}
              >
                <div
                  key={room.id}
                  className="mb-2 flex  items-center rounded-lg p-2  "
                >
                  <Avatar className="h-10 w-10">
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
                <Button
                  size="sm"
                  variant="outline"
                  className="self-center justify-self-end"
                  onClick={() => deleteRoom(room.id)}
                >
                  <X className="h-2 w-2" />
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
