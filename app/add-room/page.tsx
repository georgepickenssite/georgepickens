"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, Button as ButtonAmp } from "@aws-amplify/ui-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { addRoom, getRooms } from "@/actions/actions";
import { checkRoomOptions, duplicateRoomCheck } from "@/utils/shared-utils";
import Link from "next/link";

export default function AddRoom() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const roomNameNoSpace = name.replaceAll(" ", "");
    // checks if room name is valid
    if (checkRoomOptions(name, description)) {
      setError("Room name not valid");
      return;
    }

    // verify room name is not already taken
    const rooms = await getRooms();
    const foundRoom = duplicateRoomCheck(rooms, roomNameNoSpace);
    if (foundRoom) {
      setError("Room name already taken");
      return;
    }

    // add room
    await addRoom(description, roomNameNoSpace);

    router.push("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-400 via-blue-500 to-purple-600 p-4 flex-col gap-4">
      <Card className="w-full max-w-md ">
        <CardHeader>
          <CardTitle>Add New Room</CardTitle>
          <CardDescription>Enter the details of your new room</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            {error ? <Alert variation="error">{error}</Alert> : null}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Add Room
            </Button>
          </CardFooter>
        </form>
      </Card>
      <Link href="/" className="w-full text-center">
        <ButtonAmp
          variation="primary"
          width="10%"
          size="large"
          backgroundColor="white"
          color="black"
        >
          Go Back
        </ButtonAmp>
      </Link>
    </div>
  );
}
