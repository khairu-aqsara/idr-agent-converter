import ChatWindow from "@/components/chat/ChatWindow";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 font-body">
      <header className="mb-8 text-center">
        <h1 className="font-headline text-5xl md:text-6xl font-bold text-primary">
          Bali Buddy
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Your AI-powered guide to the Island of Gods
        </p>
      </header>
      <ChatWindow />
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Bali Buddy. Powered by AI.</p>
      </footer>
    </main>
  );
}
