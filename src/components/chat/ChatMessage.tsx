"use client";

import type { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  sender: "user" | "ai" | "error";
  text: string;
  isLoading?: boolean;
}

const ChatMessage: FC<ChatMessageProps> = ({ sender, text, isLoading }) => {
  const isUser = sender === "user";

  return (
    <div
      className={cn(
        "flex items-end gap-2 mb-4 animate-in fade-in-50 slide-in-from-bottom-4 duration-300",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8 self-start">
          <AvatarFallback>
            <Bot className="h-5 w-5 text-primary" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[70%] rounded-lg px-3 py-2 shadow-md",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-card text-card-foreground rounded-bl-none"
        )}
      >
        {isLoading ? (
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : (
          <p className="text-sm whitespace-pre-wrap">{text}</p>
        )}
      </div>
      {isUser && (
         <Avatar className="h-8 w-8 self-start">
          <AvatarFallback>
            <UserCircle className="h-5 w-5 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
