"use client";

import { useState, useEffect, useRef, type FC } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { answerQuestion } from "@/ai/flows/answer-question";
import { handleNoAnswer } from "@/ai/flows/handle-no-answer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, HelpCircle } from "lucide-react"; // Changed icon

const ChatWindow: FC = () => {
  const initialMessage: Message = {
    id: "initial-welcome",
    sender: "ai",
    text: "Hello! I'm your IDR Currency Converter. Ask me to convert an IDR amount to various global currencies (e.g., 'convert 100000 IDR' or 'IDR to USD'). I can provide rates for GBP, USD, MYR, AUD, SGD, JPY, EUR, CAD, CHF, and NZD.",
    isLoading: false,
  };
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  interface Message {
    id: string;
    sender: "user" | "ai" | "error";
    text: string;
    isLoading?: boolean;
  }
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleUserSubmit = async (question: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      sender: "user",
      text: question,
    };
    const aiPlaceholderMessage: Message = {
      id: crypto.randomUUID(),
      sender: "ai",
      text: "",
      isLoading: true,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage, aiPlaceholderMessage]);
    setIsLoading(true);

    try {
      const response = await answerQuestion({ question });
      if (response && response.answer) {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === aiPlaceholderMessage.id
              ? { ...msg, text: response.answer, isLoading: false }
              : msg
          )
        );
      } else {
        // This case might not be hit if the AI prompt is robust enough to always return an answer
        const noAnswerResponse = await handleNoAnswer({ query: question });
         setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === aiPlaceholderMessage.id
              ? { ...msg, text: noAnswerResponse.answer, sender: "ai", isLoading: false } // Changed sender to "ai" for consistency
              : msg
          )
        );
      }
    } catch (error) {
      console.error("Error fetching answer:", error);
      try {
        const noAnswerResponse = await handleNoAnswer({ query: question });
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === aiPlaceholderMessage.id
              ? { ...msg, text: noAnswerResponse.answer, sender: "error", isLoading: false }
              : msg
          )
        );
      } catch (noAnswerError) {
        console.error("Error handling no answer:", noAnswerError);
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === aiPlaceholderMessage.id
              ? {
                  ...msg,
                  text: "Sorry, I'm having trouble connecting. Please try again later.",
                  sender: "error",
                  isLoading: false,
                }
              : msg
          )
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl h-[70vh] md:h-[80vh] flex flex-col shadow-2xl rounded-xl overflow-hidden">
      <CardHeader className="border-b border-border">
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <HelpCircle className="h-7 w-7 text-primary" /> {/* Changed Icon */}
          IDR Converter
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-0 overflow-hidden">
        <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              sender={msg.sender}
              text={msg.text}
              isLoading={msg.isLoading}
            />
          ))}
          <div ref={messagesEndRef} />
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-0">
        <ChatInput onSubmit={handleUserSubmit} isLoading={isLoading} />
      </CardFooter>
    </Card>
  );
};

export default ChatWindow;
