"use server";
import {
  checkRoomOptions,
  duplicateRoomCheck,
  getFirst100,
} from "@/utils/shared-utils";
import config from "../amplify_outputs.json";
import { cookieBasedClient, idToken } from "../utils/server-utils";

export async function getAllMessageFromChatRoomId(id: string) {
  const { data: roomMessages } = await cookieBasedClient.models.Room.get(
    {
      id,
    },
    {
      selectionSet: ["chatMessages.*"],
    }
  );

  if (roomMessages) {
    return roomMessages.chatMessages.map((message) => {
      return {
        text: message.text,
        sender: message.sender,
        id: message.id,
        roomName: message.chatMessageId?.toString() || "",
      };
    });
  }

  return roomMessages;
}

export async function addMessageToDB(
  text: string,
  sender: string,
  chatMessageId: string
) {
  await cookieBasedClient.models.ChatMessage.create({
    sender,
    text,
    chatMessageId,
  }).catch((e) => {
    console.log("error", e);
    return new Response("Error", { status: 500 });
  });
}

export async function getRooms() {
  const { data: rooms } = await cookieBasedClient.models.Room.list({
    selectionSet: ["name"],
  });

  return rooms;
}

export async function addRoom(description: string, name: string) {
  // return if room name is empty
  if (checkRoomOptions(name, description)) return;
  const roomNameNoSpace = name.replaceAll(" ", "");

  // verify room isn't already taken
  const rooms = await getRooms();
  if (duplicateRoomCheck(rooms, roomNameNoSpace)) return;

  await cookieBasedClient.models.Room.create({
    description,
    name: roomNameNoSpace,
  }).catch((e) => {
    console.log("error", e);
    return new Response("Error", { status: 500 });
  });
}

export async function postMessage(event: string, room: string, id: string) {
  const { token, userName } = await idToken();

  // check if event, token, or username is empty
  if (!token || !userName || !event) return;

  const url = config.custom.events.url;
  const eventText = getFirst100(event);

  // Add messages to Database
  await addMessageToDB(event, userName.toString(), id);

  const data = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      channel: room,
      events: [JSON.stringify({ message: eventText, user: userName })],
    }),
  }).catch((e) => {
    console.log("error", e);
    return new Response("Error", { status: 500 });
  });
  return await data.json();
}
