import { useRef } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { useChat } from "@/hooks/useChat";

const Index = () => {
  const chatRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading, isStreaming, sendMessage } = useChat();

  const scrollToChat = () => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-16">
        <Hero onGetStarted={scrollToChat} />
      </section>

      {/* Chat Demo Section */}
      <section
        id="demo"
        ref={chatRef}
        className="max-w-3xl mx-auto px-6 py-20"
      >
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Try it yourself
          </h2>
          <p className="text-muted-foreground">
            Start a conversation with NexusAI right now
          </p>
        </div>

        <div className="h-[600px]">
          <ChatContainer
            messages={messages}
            isLoading={isLoading}
            isStreaming={isStreaming}
            onSend={sendMessage}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>© 2025 NexusAI. Built with advanced language models.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
