import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, Mail, Phone, MapPin, Save } from "lucide-react";
import { Sparkles } from "lucide-react";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "AI enthusiast and developer",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Profile saved:", formData);
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
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium transition-colors"
              >
                Profile
              </Link>
              <Link
                to="/settings"
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-foreground hover:bg-muted text-sm font-medium transition-colors"
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
              <h1 className="text-3xl font-bold text-foreground mb-2">Profile Settings</h1>
              <p className="text-muted-foreground">Manage your account information and preferences</p>
            </div>

            <Card className="p-8">
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <Label htmlFor="name" className="text-base font-semibold mb-2 block">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="text-base"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-base font-semibold mb-2 block flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="text-base"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone" className="text-base font-semibold mb-2 block flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="text-base"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Location */}
                <div>
                  <Label htmlFor="location" className="text-base font-semibold mb-2 block flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="text-base"
                    placeholder="Enter your location"
                  />
                </div>

                {/* Bio */}
                <div>
                  <Label htmlFor="bio" className="text-base font-semibold mb-2 block">
                    Bio
                  </Label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 resize-none"
                    rows={4}
                    placeholder="Tell us about yourself"
                  />
                </div>

                {/* Save Button */}
                <Button
                  onClick={handleSave}
                  className="w-full gap-2"
                  size="lg"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
