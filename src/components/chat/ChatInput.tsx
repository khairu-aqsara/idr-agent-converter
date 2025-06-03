"use client";

import type { FC } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";

const chatInputSchema = z.object({
  question: z.string().min(1, "Message cannot be empty."),
});

type ChatInputFormValues = z.infer<typeof chatInputSchema>;

interface ChatInputProps {
  onSubmit: (question: string) => void;
  isLoading: boolean;
}

const ChatInput: FC<ChatInputProps> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChatInputFormValues>({
    resolver: zodResolver(chatInputSchema),
  });

  const handleFormSubmit: SubmitHandler<ChatInputFormValues> = (data) => {
    onSubmit(data.question);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex items-start gap-2 p-4 border-t border-border"
    >
      <div className="flex-grow">
        <Input
          {...register("question")}
          placeholder="Enter IDR amount (e.g., 100000 IDR) or ask for rates..."
          className="w-full resize-none"
          disabled={isLoading}
          aria-invalid={errors.question ? "true" : "false"}
        />
        {errors.question && (
          <p className="text-xs text-destructive mt-1">
            {errors.question.message}
          </p>
        )}
      </div>
      <Button type="submit" size="icon" disabled={isLoading} aria-label="Send message">
        {isLoading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
        ) : (
          <SendHorizonal />
        )}
      </Button>
    </form>
  );
};

export default ChatInput;
