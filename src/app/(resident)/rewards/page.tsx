"use client";

import { useDemoStore } from "@/store/demo-store";
import { format, parseISO } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Gift, ArrowUpRight, ArrowDownRight, Award, Trophy, Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export default function RewardsPage() {
  const { currentUser, transactions } = useDemoStore();
  
  if (!currentUser) return null;

  const userTransactions = transactions.filter(t => t.user_id === currentUser.id)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const totalPoints = userTransactions.reduce((sum, tx) => sum + tx.points, 0);
  
  // Fake tier logic for demo purposes
  const getTier = (points: number) => {
    if (points >= 1000) return { name: "Eco Champion", nextTier: null, pointsNeeded: 0, progress: 100 };
    if (points >= 500) return { name: "Green Guardian", nextTier: "Eco Champion", pointsNeeded: 1000 - points, progress: (points / 1000) * 100 };
    if (points >= 100) return { name: "Waste Warrior", nextTier: "Green Guardian", pointsNeeded: 500 - points, progress: (points / 500) * 100 };
    return { name: "Beginner", nextTier: "Waste Warrior", pointsNeeded: 100 - points, progress: (points / 100) * 100 };
  };

  const currentTier = getTier(totalPoints);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 bg-white p-6 rounded-lg border shadow-sm mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">EcoPoints Rewards</h1>
          <p className="text-muted-foreground text-sm">Track your contribution and redeem rewards</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Points Summary */}
        <Card className="border-0 shadow-sm md:col-span-1 bg-primary text-primary-foreground">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Gift className="h-5 w-5" /> Current Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold mb-2">{totalPoints}</div>
            <p className="text-primary-foreground/80 text-sm">EcoPoints</p>
          </CardContent>
          <CardFooter className="pt-4 border-t border-primary-foreground/20">
            <Button variant="secondary" className="w-full">Redeem Points</Button>
          </CardFooter>
        </Card>

        {/* Tier Status */}
        <Card className="border-0 shadow-sm md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" /> Tier Status: {currentTier.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            {currentTier.nextTier ? (
              <>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-muted-foreground">{totalPoints} pts</span>
                  <span className="font-medium">{totalPoints + currentTier.pointsNeeded} pts</span>
                </div>
                <Progress value={currentTier.progress} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  Earn <strong>{currentTier.pointsNeeded} more points</strong> to reach {currentTier.nextTier} status!
                </p>
              </>
            ) : (
              <>
                <Progress value={100} className="h-3" />
                <p className="text-sm text-muted-foreground mt-2">
                  Congratulations! You have reached the highest tier. Keep up the great work.
                </p>
              </>
            )}

            <div className="bg-muted/50 p-4 rounded-md flex gap-3 mt-6">
              <Info className="h-5 w-5 text-primary shrink-0" />
              <p className="text-sm text-muted-foreground">
                <strong>How to earn points:</strong> Earn 50 points for every successful plastic recycling pickup, and 20 points for general waste. Bonus points are awarded for consistent responsible disposal.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-bold mt-8 mb-4">Transaction History</h2>
      
      {userTransactions.length === 0 ? (
        <Card className="border-0 shadow-sm text-center py-12">
          <CardContent>
            <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No transactions yet</p>
            <p className="text-muted-foreground">Request pickups and recycle properly to start earning EcoPoints.</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-0 shadow-sm overflow-hidden">
          <div className="divide-y">
            {userTransactions.map((tx) => (
              <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    tx.points > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {tx.points > 0 ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="font-medium">{tx.description}</p>
                    <p className="text-xs text-muted-foreground">{format(parseISO(tx.created_at), 'MMM d, yyyy • h:mm a')}</p>
                  </div>
                </div>
                <div className={`font-bold text-lg ${tx.points > 0 ? 'text-green-600' : 'text-foreground'}`}>
                  {tx.points > 0 ? '+' : ''}{tx.points}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
