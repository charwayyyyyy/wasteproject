"use client";

import { MessageSquare, ThumbsUp, Filter, SearchX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";

// Static seeded feedback for prototype demonstration
const seededFeedback = [
  {
    id: "fb-1",
    role: "Resident",
    date: "2023-11-12",
    rating: "Positive",
    content: "The reporting feature is great, but I wish I could track exactly when the collector arrives. Sometimes they come when I'm not home.",
    response: "Added real-time status updates (En Route) to the Resident dashboard based on this feedback."
  },
  {
    id: "fb-2",
    role: "Collector",
    date: "2023-11-14",
    rating: "Constructive",
    content: "When accepting jobs, it's hard to tell what the waste type is without clicking into details. Needs to be more prominent.",
    response: "Moved waste type and quantity tags to the top of the job cards in the Collector dashboard."
  },
  {
    id: "fb-3",
    role: "Recycler",
    date: "2023-11-16",
    rating: "Constructive",
    content: "I need to filter materials by quality. Not all sorted plastics are usable for my facility.",
    response: "Added 'Sorting Quality' badges to the Marketplace."
  }
];

export default function AdminFeedback() {
  return (
    <div className="space-y-6 pb-20 md:pb-0 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight mb-2">Prototype Feedback</h1>
        <p className="text-text-secondary text-[15px]">Insights collected during user testing and hackathon demonstration.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{seededFeedback.length}</div>
            <p className="text-xs text-muted-foreground">Responses collected</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resident Testers</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {seededFeedback.filter(f => f.role === 'Resident').length}
            </div>
            <p className="text-xs text-muted-foreground">Community participants</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Positive Rating</CardTitle>
            <ThumbsUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100%</div>
            <p className="text-xs text-muted-foreground">Found prototype useful</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>What Changed After Testing</CardTitle>
          <CardDescription>Honest adjustments made to EcoLoop based on real feedback</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {seededFeedback.length > 0 ? (
            seededFeedback.map((fb) => (
              <div key={fb.id} className="border-b last:border-0 pb-6 last:pb-0">
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant="outline" className="text-xs">{fb.role}</Badge>
                  <span className="text-xs text-muted-foreground">{fb.date}</span>
                </div>
                
                <p className="text-sm text-text-primary mb-3 leading-relaxed break-words whitespace-pre-wrap">
                  &quot;{fb.content}&quot;
                </p>
                
                <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-1 block">
                    Action Taken
                  </span>
                  <p className="text-sm text-text-secondary leading-relaxed break-words">
                    {fb.response}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <EmptyState 
              icon={SearchX}
              title="No feedback available"
              description="No feedback has been collected from the prototype yet."
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
