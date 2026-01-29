import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useEffect, useState, useRef } from "react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

const TypingText = ({ content }: { content: string }) => {
  const [displayedContent, setDisplayedContent] = useState("");
  const indexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const animateText = () => {
      if (indexRef.current < content.length) {
        indexRef.current += 1;
        setDisplayedContent(content.slice(0, indexRef.current));
        // Slower typing: 20ms delay per character for dramatic effect
        timeoutRef.current = setTimeout(animateText, 20);
      }
    };

    // Start animation
    if (indexRef.current < content.length) {
      timeoutRef.current = setTimeout(animateText, 20);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [content]);

  return (
    <div className="prose prose-invert prose-sm max-w-none">
      <ReactMarkdown>{displayedContent}</ReactMarkdown>
      <span className="inline-block w-0.5 h-4 ml-0.5 bg-primary animate-pulse" />
    </div>
  );
};

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
          isStreaming ? (
            <TypingText content={content} />
          ) : (
            <div className="prose prose-invert prose-sm max-w-none">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )
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
