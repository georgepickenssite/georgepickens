import { Dispatch, RefObject, SetStateAction } from "react";

export interface RoomListType {
  id: string;
  name: string;
  status: string;
}

export type RoomListProps = {
  onSelectRoom: Dispatch<SetStateAction<null | RoomListType>>;
  selectedRoom: null | RoomListType;
};

export type MessageProps = {
  message: MessageType & RoomName;
  userName: string;
  selectedRoomName: string;
  ref: RefObject<HTMLDivElement | null> | null;
};

export type RoomName = {
  roomName: string;
};

export type ChatAreaProps = {
  selectedRoom: null | RoomListType;
};

export interface MessageType {
  text: string;
  sender: string;
  id: string;
}
