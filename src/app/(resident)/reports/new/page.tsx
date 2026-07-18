"use client";

import { useDemoStore } from "@/store/demo-store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  location: z.string().min(5, "Location details must be at least 5 characters"),
  waste_type: z.string().min(1, "Please select the type of waste"),
  severity: z.string().min(1, "Please select the severity level"),
  description: z.string().optional(),
});

export default function NewReportPage() {
  const { currentUser, addReport } = useDemoStore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [newReportId, setNewReportId] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      waste_type: "",
      severity: "",
      description: "",
    },
  });

  if (!currentUser) return null;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const id = `rep-${Date.now()}`;
    addReport({
      reporter_id: currentUser!.id,
      location: values.location,
      community: currentUser!.community,
      area: currentUser!.area,
      waste_type: values.waste_type,
      severity: values.severity as "Low" | "Moderate" | "High" | "Urgent",
      status: 'Reported',
      description: values.description,
    });
    
    setNewReportId(id);
    setIsSuccess(true);
    setIsSubmitting(false);
  }

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto pt-8">
        <Card className="border-0 shadow-md text-center py-8">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Report Submitted</CardTitle>
            <CardDescription className="text-base mt-2">
              Thank you for helping keep our community clean. Your report has been sent to the local administrators.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-md inline-block mb-4">
              <p className="text-sm text-muted-foreground mb-1">Report Reference</p>
              <p className="font-mono font-medium">{newReportId}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              You will be notified once this issue has been addressed and cleared by the authorities.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
            <Link href={`/reports/${newReportId}`}>
              <Button className="w-full sm:w-auto">View Report</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" className="w-full sm:w-auto">Return to Dashboard</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link href="/reports" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Reports
      </Link>
      
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <div className="mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold">Report a Waste Site</h1>
          <p className="text-muted-foreground">Inform administrators about illegal dumping, overflowing bins, or blocked drains in your area.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exact Location</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., Behind the primary school, near the big tree" {...field} />
                    </FormControl>
                    <FormDescription>Please be as specific as possible to help the cleanup team find it.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="waste_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type of Issue</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Illegal dump site">Illegal dump site</SelectItem>
                          <SelectItem value="Overflowing communal bin">Overflowing communal bin</SelectItem>
                          <SelectItem value="Blocked drain (plastics)">Blocked drain (plastics)</SelectItem>
                          <SelectItem value="Burning of waste">Burning of waste</SelectItem>
                          <SelectItem value="Dead animal">Dead animal</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="severity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Severity Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select severity" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Low">Low (Small pile)</SelectItem>
                          <SelectItem value="Moderate">Moderate (Medium pile)</SelectItem>
                          <SelectItem value="High">High (Large dump or blocked drain)</SelectItem>
                          <SelectItem value="Urgent">Urgent (Health hazard or active burning)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Details (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Any other context? E.g., 'Has been here for 3 days'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-6 border-t flex justify-end gap-4">
              <Link href="/reports">
                <Button variant="outline" type="button">Cancel</Button>
              </Link>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
