import { Dispatch, FormEvent, SetStateAction } from "react";
import { Send } from "lucide-react";
import { MAX_MESSAGE_LENGTH } from "@/utils/shared-utils";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function FormComponent({
  handleSendMessage,
  newMessage,
  setNewMessage,
}: {
  handleSendMessage: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  newMessage: string;
  setNewMessage: Dispatch<SetStateAction<string>>;
}) {
  return (
    <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4">
      <div className="flex">
        <Input
          type="text"
          placeholder="Type a message..."
          minLength={1}
          maxLength={MAX_MESSAGE_LENGTH}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="mr-2 flex-grow"
        />
        <Button type="submit">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
