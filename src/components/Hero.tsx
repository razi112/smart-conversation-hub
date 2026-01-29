import { ArrowRight, Zap, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[var(--gradient-hero)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 py-24 lg:py-32 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glass-panel text-sm text-muted-foreground">
          <Sparkles className="w-4 h-4 text-primary" />
          <span>Powered by advanced AI</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          Intelligent Conversations,{" "}
          <span className="text-gradient">Instant Answers</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Experience the future of conversational AI. NexusAI understands
          context, maintains natural dialogue, and delivers precise responses in
          real-time.
        </p>

        {/* CTA */}
        <Button
          onClick={onGetStarted}
          size="lg"
          className="h-12 px-8 text-base bg-primary hover:bg-primary/90 text-primary-foreground glow-primary"
        >
          Start Chatting
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          <FeatureCard
            icon={<Zap className="w-5 h-5" />}
            title="Lightning Fast"
            description="Real-time streaming responses with minimal latency"
          />
          <FeatureCard
            icon={<Shield className="w-5 h-5" />}
            title="Secure & Private"
            description="Your conversations are encrypted and never stored"
          />
          <FeatureCard
            icon={<Sparkles className="w-5 h-5" />}
            title="Context Aware"
            description="Maintains conversation history for coherent dialogue"
          />
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="glass-panel rounded-xl p-6 text-left">
    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-4">
      {icon}
    </div>
    <h3 className="font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);
