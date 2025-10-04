import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import tisPureLogo from "@/assets/tis-pure-logo.png";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center space-y-6">
        <div className="flex justify-center">
          <img src={tisPureLogo} alt="TIS PURE" className="h-16" />
        </div>
        
        <div className="flex justify-center">
          <CheckCircle className="h-20 w-20 text-primary" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Thank You!</h1>
          <p className="text-lg text-muted-foreground">
            Thank you for choosing TIS PURE
          </p>
        </div>

        <p className="text-muted-foreground">
          Our team will get back to you shortly to complete your solar investment journey.
        </p>

        <Button onClick={() => navigate("/dashboard")} className="w-full" size="lg">
          Back to Dashboard
        </Button>
      </Card>
    </div>
  );
};

export default ThankYou;
