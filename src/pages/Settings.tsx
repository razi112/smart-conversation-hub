import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, Bell, Shield, Palette, Database } from "lucide-react";
import { Sparkles } from "lucide-react";

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      marketing: false,
    },
    privacy: {
      profileVisible: true,
      allowMessages: true,
    },
    theme: "auto",
    dataRetention: "6months",
  });

  const handleToggle = (section: string, key: string) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...(prev as any)[section],
        [key]: !(prev as any)[section][key],
      },
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="h-14 border-b border-border flex items-center px-6 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg text-foreground">Hikma AI</span>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border bg-muted/30 min-h-[calc(100vh-56px)]">
          <div className="p-6">
            <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
              <ChevronLeft className="w-4 h-4" />
              Back to Chat
            </Link>

            <nav className="space-y-2">
              <Link
                to="/profile"
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-foreground hover:bg-muted text-sm font-medium transition-colors"
              >
                Profile
              </Link>
              <Link
                to="/settings"
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium transition-colors"
              >
                Settings
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-2xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
              <p className="text-muted-foreground">Customize your experience and manage preferences</p>
            </div>

            {/* Notifications Section */}
            <Card className="p-8 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium text-foreground">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch
                    checked={settings.notifications.email}
                    onCheckedChange={() => handleToggle("notifications", "email")}
                  />
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium text-foreground">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive browser notifications</p>
                    </div>
                    <Switch
                      checked={settings.notifications.push}
                      onCheckedChange={() => handleToggle("notifications", "push")}
                    />
                  </div>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium text-foreground">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">Receive promotional content</p>
                    </div>
                    <Switch
                      checked={settings.notifications.marketing}
                      onCheckedChange={() => handleToggle("notifications", "marketing")}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Privacy Section */}
            <Card className="p-8 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Privacy</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium text-foreground">Profile Visible</Label>
                    <p className="text-sm text-muted-foreground">Allow others to view your profile</p>
                  </div>
                  <Switch
                    checked={settings.privacy.profileVisible}
                    onCheckedChange={() => handleToggle("privacy", "profileVisible")}
                  />
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium text-foreground">Allow Messages</Label>
                      <p className="text-sm text-muted-foreground">Let others message you</p>
                    </div>
                    <Switch
                      checked={settings.privacy.allowMessages}
                      onCheckedChange={() => handleToggle("privacy", "allowMessages")}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Appearance Section */}
            <Card className="p-8 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <Palette className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Appearance</h2>
              </div>
              <div>
                <Label className="text-base font-medium text-foreground block mb-3">Theme</Label>
                <div className="flex gap-3">
                  {["light", "dark", "auto"].map((theme) => (
                    <Button
                      key={theme}
                      variant={settings.theme === theme ? "default" : "outline"}
                      onClick={() => setSettings((prev) => ({ ...prev, theme }))}
                      className="capitalize"
                    >
                      {theme}
                    </Button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Data Section */}
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Database className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Data & Storage</h2>
              </div>
              <div>
                <Label className="text-base font-medium text-foreground block mb-3">Data Retention</Label>
                <select
                  value={settings.dataRetention}
                  onChange={(e) => setSettings((prev) => ({ ...prev, dataRetention: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground"
                >
                  <option value="3months">3 Months</option>
                  <option value="6months">6 Months</option>
                  <option value="1year">1 Year</option>
                  <option value="indefinite">Indefinite</option>
                </select>
                <p className="text-sm text-muted-foreground mt-2">How long we keep your conversation history</p>
              </div>
            </Card>

            {/* Save Button */}
            <div className="mt-8">
              <Button size="lg" className="w-full">
                Save All Settings
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
