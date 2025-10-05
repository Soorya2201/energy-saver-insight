import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import tisPureLogo from "@/assets/tis-pure-logo.png";

const Plans = () => {
  const navigate = useNavigate();
  const plans = [
    {
      name: "Basic Plan",
      price: 499,
      duration: "60 Months",
      features: [
        "TIS PURE will help you identify opportunities",
        "You and your family and friends will be invited to invest",
        "Committed 6% returns backed by our reliable solar installation",
        "Quarterly dividends"
      ]
    },
    {
      name: "Power Plan",
      price: 2999,
      duration: "60 Months",
      features: [
        "TIS PURE will setup you identify opportunities",
        "Identify investment of monthly capacity",
        "12-18% Annual Returns on your investments",
        "Monthly dividends",
        "Priority support 24/7"
      ],
      recommended: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <img src={tisPureLogo} alt="TIS PURE" className="h-10" />
          <h1 className="text-lg font-semibold">How we can help you!</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Choose your plan</h2>
          <p className="text-muted-foreground">
            Break Even period for your 3Kva solar panel on grid investment
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={plan.recommended ? "border-primary shadow-lg" : ""}
            >
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.duration}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">₹{plan.price.toLocaleString()}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  size="lg"
                  variant={plan.recommended ? "default" : "outline"}
                  onClick={() => navigate("/thank-you")}
                >
                  {plan.recommended ? "Proceed to Payment" : "Choose Plan"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            All plans include installation, maintenance, and monitoring services
          </p>
        </div>
      </main>
    </div>
  );
};

export default Plans;
