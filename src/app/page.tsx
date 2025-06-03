
import ChatWindow from "@/components/chat/ChatWindow";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 font-body">
      <header className="w-full max-w-2xl flex justify-between items-center mb-8 text-center">
        <div></div> {/* Spacer for left alignment of title */}
        <div className="flex flex-col items-center">
          <h1 className="font-headline text-5xl md:text-6xl font-bold text-primary">
            IDR Currency Converter
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Convert IDR to GBP, USD, MYR, AUD, and SGD
          </p>
        </div>
        <ThemeToggle />
      </header>
      <ChatWindow />
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Currency Converter. Powered by AI.</p>
      </footer>
    </main>
  );
}
