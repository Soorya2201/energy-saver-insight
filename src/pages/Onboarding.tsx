import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import tisPureLogo from "@/assets/tis-pure-logo.png";

const Onboarding = () => {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState("");
  const [ebNumber, setEbNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber && ebNumber) {
      // Store data in localStorage for demo purposes
      localStorage.setItem("userData", JSON.stringify({ mobileNumber, ebNumber }));
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <img src={tisPureLogo} alt="TIS PURE" className="h-16 mb-4" />
          <h1 className="text-2xl font-bold text-center">
            Join TIS PURE to start saving
          </h1>
          <p className="text-sm text-muted-foreground text-center">
            Find how your home generate earnings for you and its contribution to nature sustainability
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              type="tel"
              placeholder="Enter your mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
              maxLength={10}
              pattern="[0-9]{10}"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ebNumber">Electricity Board Number</Label>
            <Input
              id="ebNumber"
              type="text"
              placeholder="Enter your EB number"
              value={ebNumber}
              onChange={(e) => setEbNumber(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            Get Started
          </Button>
        </form>

        <p className="text-xs text-center text-muted-foreground">
          By continuing, you agree to our Terms of Service & Privacy Policy
        </p>
      </Card>
    </div>
  );
};

export default Onboarding;
