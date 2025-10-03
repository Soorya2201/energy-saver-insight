import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import tisPureLogo from "@/assets/tis-pure-logo.png";

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mobileNumber, setMobileNumber] = useState("");
  const [ebNumber, setEbNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber && ebNumber && !otpSent) {
      // Generate a mock OTP for demo
      const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(mockOtp);
      setOtpSent(true);
      
      // Show OTP in toast for demo purposes
      toast({
        title: "OTP Sent!",
        description: `Your OTP is: ${mockOtp} (Demo mode)`,
        duration: 10000,
      });
    }
  };

  const handleVerifyOtp = () => {
    if (otp === generatedOtp) {
      // Store data in localStorage
      localStorage.setItem("userData", JSON.stringify({ mobileNumber, ebNumber }));
      toast({
        title: "Success!",
        description: "OTP verified successfully",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please enter the correct OTP",
        variant: "destructive",
      });
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
              disabled={otpSent}
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
              disabled={otpSent}
            />
          </div>

          {!otpSent && (
            <Button type="submit" className="w-full" size="lg">
              Send OTP
            </Button>
          )}
        </form>

        {otpSent && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-center block">
                Enter OTP sent to {mobileNumber}
              </Label>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            <Button 
              onClick={handleVerifyOtp} 
              className="w-full" 
              size="lg"
              disabled={otp.length !== 6}
            >
              Verify OTP
            </Button>

            <Button
              variant="ghost"
              onClick={() => {
                setOtpSent(false);
                setOtp("");
              }}
              className="w-full"
              size="sm"
            >
              Change Mobile Number
            </Button>
          </div>
        )}

        <p className="text-xs text-center text-muted-foreground">
          By continuing, you agree to our Terms of Service & Privacy Policy
        </p>
      </Card>
    </div>
  );
};

export default Onboarding;
