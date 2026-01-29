import { useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles } from "lucide-react";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
  isStreaming: boolean;
  onSend: (message: string) => void;
}

export const ChatContainer = ({
  messages,
  isLoading,
  isStreaming,
  onSend,
}: ChatContainerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-full glass-panel rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-border/50 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-foreground">NexusAI</h3>
          <p className="text-xs text-muted-foreground">Always here to help</p>
        </div>
      </div>

      <ScrollArea ref={scrollRef} className="flex-1 px-5 py-4">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                Start a conversation
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Ask me anything! I'm here to help with questions, creative tasks,
                analysis, and more.
              </p>
            </div>
          )}
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              role={message.role}
              content={message.content}
              isStreaming={
                isStreaming &&
                index === messages.length - 1 &&
                message.role === "assistant"
              }
            />
          ))}
          {isLoading && !isStreaming && <TypingIndicator />}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border/50">
        <ChatInput onSend={onSend} isLoading={isLoading} />
      </div>
    </div>
  );
};
