import { Schema } from "@/amplify/data/resource";

export const MAX_MESSAGE_LENGTH = 100;
export function getFirst100(event: string): string {
  return event.length >= 100
    ? event.slice(0, MAX_MESSAGE_LENGTH).trim()
    : event.trim();
}

export function checkRoomOptions(name: string, description: string) {
  return !name || !description || !/^[\x00-\x7F]*$/.test(name);
}

export function duplicateRoomCheck(
  rooms: Pick<Schema["Room"]["type"], "name">[],
  room2: string
) {
  return rooms.find(
    (room) => room.name.toLocaleLowerCase() === room2.toLowerCase()
  );
}
