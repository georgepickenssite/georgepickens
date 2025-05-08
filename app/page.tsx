import MessengerApp from "@/components/MessengerApp";

export default async function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-400 via-blue-500 to-purple-600 p-4">
      <MessengerApp />
    </main>
  );
}
