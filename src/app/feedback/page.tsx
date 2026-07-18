"use client";

import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function FeedbackPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-muted/20 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>

        {isSubmitted ? (
          <Card className="border-0 shadow-md text-center py-12">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Send className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Feedback Received!</CardTitle>
              <CardDescription className="text-base mt-2 max-w-md mx-auto">
                Thank you for testing the EcoLoop prototype. Your insights are invaluable as we iterate and improve our solution for Case 13.
              </CardDescription>
            </CardHeader>
            <CardFooter className="justify-center mt-6">
              <Link href="/">
                <Button>Return to Home</Button>
              </Link>
            </CardFooter>
          </Card>
        ) : (
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl">Prototype Feedback</CardTitle>
              <CardDescription>
                We are constantly testing and improving. Let us know your thoughts on the EcoLoop experience.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium block mb-1">Your Name / Role (Optional)</label>
                    <Input placeholder="E.g., Hackathon Judge, Tester" />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">What worked well?</label>
                    <Textarea placeholder="What did you like about the prototype?" className="min-h-[100px]" />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">What could be improved?</label>
                    <Textarea placeholder="Any friction points or missing features?" className="min-h-[100px]" />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">Does this address Case 13 effectively?</label>
                    <div className="flex gap-4 mt-2">
                      <label className="flex items-center gap-2">
                        <input type="radio" name="case13" value="yes" className="accent-primary" /> Yes, very well
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="case13" value="somewhat" className="accent-primary" /> Somewhat
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="case13" value="no" className="accent-primary" /> No
                      </label>
                    </div>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Feedback"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
