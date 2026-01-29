import { ChatContainer } from "@/components/chat/ChatContainer";
import { useChat } from "@/hooks/useChat";
import { Sparkles } from "lucide-react";

const Index = () => {
  const { messages, isLoading, isStreaming, sendMessage } = useChat();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-border flex items-center px-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg text-foreground">NexusAI</span>
        </div>
      </header>

      {/* Chat area - full remaining height */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4">
        <div className="h-full">
          <ChatContainer
            messages={messages}
            isLoading={isLoading}
            isStreaming={isStreaming}
            onSend={sendMessage}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
