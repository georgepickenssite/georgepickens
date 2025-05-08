import { FormEvent, useEffect, useState, useRef } from "react";
import { events } from "aws-amplify/data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatAreaProps, MessageType } from "@/types/types";
import { getUserName } from "@/utils/client-utils";
import { getAllMessageFromChatRoomId, postMessage } from "@/actions/actions";
import { getFirst100 } from "@/utils/shared-utils";
import { FormComponent } from "./FormComponent";
import { Message } from "./Message";
import { RoomHeader } from "./RoomHeader";
import { RoomName } from "../types/types";
import { Loader } from "@aws-amplify/ui-react";

export default function ChatArea({ selectedRoom }: ChatAreaProps) {
  const [messages, setMessages] = useState<(MessageType & RoomName)[]>([]);
  const [userName, setUserName] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatRoom = `/chat/${selectedRoom?.id}`;

  // scroll down to bottom of messages after every new messge
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
    setLoading(false);
  }, [messages]);

  // load chat
  useEffect(() => {
    setLoading(true);
    const loadChat = async () => {
      if (!selectedRoom) return;
      const messages = await getAllMessageFromChatRoomId(selectedRoom.id);
      if (!messages) return;

      setMessages(messages);
    };

    loadChat();
  }, [selectedRoom]);

  // Setup Pub/Sub with Events API
  useEffect(() => {
    const subscribeToChat = async () => {
      const userName = (await getUserName()) as string;
      setUserName(userName || "user");

      const channel = await events.connect(chatRoom);
      const sub = channel.subscribe({
        next: (data) => {
          setMessages((prevMessages) => {
            const combined = [
              ...prevMessages,
              {
                text: data.event.message as string,
                sender: data.event.user as string,
                id: data.id as string,
                roomName: selectedRoom?.id as string,
              },
            ];
            // Remove any optimistic version of this message if it exists
            return combined.filter((msg) => !msg.id.startsWith("optimstic-"));
          });
        },
        error: (err) => console.error("error", err),
      });
      return sub;
    };

    const subPromise = subscribeToChat();
    return () => {
      Promise.resolve(subPromise).then((sub) => {
        sub.unsubscribe();
      });
    };
  }, [chatRoom, selectedRoom, selectedRoom?.id]);

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // message check
    if (!newMessage) return;

    // only show the first 100 characters
    const updatedText = getFirst100(newMessage);

    if (updatedText) {
      // update as optimistic
      const id = `optimstic-${Date.now()}`;

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: userName,
          text: updatedText,
          id,
          roomName: selectedRoom?.id as string,
        },
      ]);
      setNewMessage("");
      await postMessage(updatedText, chatRoom, selectedRoom?.id || "");
    }
  };

  if (!selectedRoom) {
    return (
      <div className="flex w-2/3 items-center justify-center">
        <p className="text-gray-500">Select a room to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex w-2/3 flex-col ">
      <RoomHeader room={selectedRoom} />
      {loading ? (
        <Loader size="large" variation="linear" marginTop={"-11px"} />
      ) : null}
      <ScrollArea className="flex-grow p-4">
        {messages.map((message, index, row) => (
          <Message
            ref={index + 1 === row.length ? messagesEndRef : null}
            key={index}
            message={message}
            userName={userName}
            selectedRoomName={selectedRoom.id}
          />
        ))}
      </ScrollArea>
      <FormComponent
        handleSendMessage={handleSendMessage}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
      />
    </div>
  );
}
