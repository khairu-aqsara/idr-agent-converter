
// src/components/chat/ChatMessage.tsx
"use client";

import type { FC } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessageProps {
  sender: "user" | "ai" | "error";
  text: string;
  isLoading?: boolean;
}

const ChatMessage: FC<ChatMessageProps> = ({ sender, text, isLoading }) => {
  const isUser = sender === "user";
  const isAi = sender === "ai";

  const messageMaxWidth = isUser ? "max-w-[80%] md:max-w-[70%]" : "max-w-[95%] md:max-w-[90%]";


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
          "rounded-lg px-3 py-2 shadow-md prose prose-base dark:prose-invert prose-p:my-1 prose-headings:my-2 prose-table:my-2 prose-th:px-2 prose-th:py-1 prose-td:px-2 prose-td:py-1",
          messageMaxWidth,
          isUser
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-card text-card-foreground rounded-bl-none",
          isAi && !isLoading && "prose-table:w-full prose-table:border prose-table:rounded-md prose-table:border-border"
        )}
      >
        {isLoading ? (
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : isAi ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
        ) : (
          <p className="text-base whitespace-pre-wrap">{text}</p>
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
