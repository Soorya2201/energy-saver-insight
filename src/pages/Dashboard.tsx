import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, TrendingDown, Leaf, ArrowRight } from "lucide-react";
import tisPureLogo from "@/assets/tis-pure-logo.png";
import { calculateTNEBBill, tnElectricityCO2 } from "@/lib/electricityCalculations";

const Dashboard = () => {
  const navigate = useNavigate();
  const [biMonthlyUnits, setBiMonthlyUnits] = useState<string>("");

  // Calculate annual values based on bi-monthly input
  const units = parseFloat(biMonthlyUnits) || 0;
  const annualConsumption = units * 6;
  const biMonthlyBill = calculateTNEBBill(units);
  const moneySpentPerAnnum = biMonthlyBill * 6;
  const co2Data = tnElectricityCO2(units);
  const co2Emissions = co2Data.tCO2 * 6;
  const potentialSavings = moneySpentPerAnnum * 0.6;

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
        {/* Consumption Input Card */}
        <Card className="bg-gradient-to-br from-primary/10 to-info/10 border-primary/20">
          <CardHeader>
            <CardTitle className="text-center text-xl font-bold mb-4">
              Your Annual Electricity Consumption
            </CardTitle>
            <div className="space-y-2 max-w-md mx-auto">
              <Label htmlFor="bimonthly-units">
                Enter Bi-Monthly Consumption (kWh)
              </Label>
              <Input
                id="bimonthly-units"
                type="number"
                placeholder="e.g., 360"
                value={biMonthlyUnits}
                onChange={(e) => setBiMonthlyUnits(e.target.value)}
                className="text-center text-lg"
              />
            </div>
            {units > 0 && (
              <div className="text-center mt-4">
                <p className="text-3xl font-bold">
                  {annualConsumption.toLocaleString()} kWh
                </p>
                <p className="text-sm text-muted-foreground">
                  Annual consumption (6 billing cycles)
                </p>
              </div>
            )}
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
                ₹{moneySpentPerAnnum.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground">
                Based on TNEB electricity rates
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
                {co2Emissions.toFixed(3)} tons
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
              ₹{potentialSavings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
