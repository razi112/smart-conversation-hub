import { Bot } from "lucide-react";

export const TypingIndicator = () => {
  return (
    <div className="flex gap-3 animate-fade-up">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
        <Bot className="w-4 h-4 text-primary" />
      </div>
      <div className="chat-bubble-ai px-4 py-3 flex items-center gap-1.5">
        <span
          className="w-2 h-2 rounded-full bg-primary/60 animate-typing"
          style={{ animationDelay: "0ms" }}
        />
        <span
          className="w-2 h-2 rounded-full bg-primary/60 animate-typing"
          style={{ animationDelay: "150ms" }}
        />
        <span
          className="w-2 h-2 rounded-full bg-primary/60 animate-typing"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </div>
  );
};
