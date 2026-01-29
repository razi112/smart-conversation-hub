import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

export const ChatMessage = ({ role, content, isStreaming }: ChatMessageProps) => {
  const isAI = role === "assistant";

  return (
    <div
      className={`flex gap-3 animate-fade-up ${
        isAI ? "justify-start" : "justify-end"
      }`}
    >
      {isAI && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <Bot className="w-4 h-4 text-primary" />
        </div>
      )}
      <div
        className={`max-w-[80%] px-4 py-3 ${
          isAI ? "chat-bubble-ai" : "chat-bubble-user"
        }`}
      >
        {isAI ? (
          <div className="prose prose-invert prose-sm max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
            {isStreaming && (
              <span className="inline-block w-2 h-4 ml-1 bg-primary/60 animate-pulse" />
            )}
          </div>
        ) : (
          <p className="text-foreground text-sm">{content}</p>
        )}
      </div>
      {!isAI && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
          <User className="w-4 h-4 text-secondary-foreground" />
        </div>
      )}
    </div>
  );
};
