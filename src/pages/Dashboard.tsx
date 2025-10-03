import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Zap, TrendingDown, Leaf, ArrowRight } from "lucide-react";
import tisPureLogo from "@/assets/tis-pure-logo.png";

const Dashboard = () => {
  const navigate = useNavigate();

  // Dummy data for analytics
  const analyticsData = {
    monthlyConsumption: 360,
    annualConsumption: 4320,
    moneySpentPerAnnum: 25920,
    co2Emissions: 3.2,
    potentialSavings: 15552,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <img src={tisPureLogo} alt="TIS PURE" className="h-10" />
          <p className="text-sm text-muted-foreground">Welcome back</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
        {/* Consumption Card */}
        <Card className="bg-gradient-to-br from-primary/10 to-info/10 border-primary/20">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold">
              {analyticsData.annualConsumption.toLocaleString()} (kWh)
            </CardTitle>
            <p className="text-center text-sm text-muted-foreground">
              Your annual electricity consumption
            </p>
          </CardHeader>
        </Card>

        {/* Analytics Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Money Spent per Annum
              </CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₹{analyticsData.moneySpentPerAnnum.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Based on current electricity rates
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                CO2 Emissions
              </CardTitle>
              <Leaf className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analyticsData.co2Emissions} tons
              </div>
              <p className="text-xs text-muted-foreground">
                Your carbon footprint for 12 months can be tracked with carbon taxes and emission
                trading system (ETS) in India
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Potential Savings */}
        <Card className="bg-accent/10 border-accent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5" />
              Potential Annual Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary mb-2">
              ₹{analyticsData.potentialSavings.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Switch to solar and reduce your electricity consumption by up to 60%
            </p>
            <Progress value={60} className="h-2" />
          </CardContent>
        </Card>

        {/* Solar Panel Proposal */}
        <Card>
          <CardHeader>
            <CardTitle>Your Proposed 3Kva Solar Panel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>Generates 4,080 units per year</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>
                  Gives your home ₹2,520 savings per month
                </span>
              </div>
            </div>

            <Button
              onClick={() => navigate("/plans")}
              className="w-full"
              size="lg"
            >
              Proceed
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
