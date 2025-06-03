import ChatWindow from "@/components/chat/ChatWindow";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 font-body">
      <header className="mb-8 text-center">
        <h1 className="font-headline text-5xl md:text-6xl font-bold text-primary">
          IDR Currency Converter
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Convert IDR to GBP, USD, MYR, AUD, and SGD
        </p>
      </header>
      <ChatWindow />
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Currency Converter. Powered by AI.</p>
      </footer>
    </main>
  );
}
