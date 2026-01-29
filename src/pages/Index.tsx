import { ChatContainer } from "@/components/chat/ChatContainer";
import { useChat } from "@/hooks/useChat";
import { Sparkles } from "lucide-react";

const Index = () => {
  const { messages, isLoading, isStreaming, sendMessage } = useChat();

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-14 border-b border-border flex items-center px-6 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg text-foreground">NexusAI</span>
        </div>
      </header>

      {/* Chat area - fills remaining space */}
      <main className="flex-1 min-h-0">
        <ChatContainer
          messages={messages}
          isLoading={isLoading}
          isStreaming={isStreaming}
          onSend={sendMessage}
        />
      </main>
    </div>
  );
};

export default Index;
