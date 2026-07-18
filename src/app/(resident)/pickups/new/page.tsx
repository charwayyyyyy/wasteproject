"use client";

import { useDemoStore } from "@/store/demo-store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { format, addDays } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  waste_type: z.string().min(1, "Please select a waste type"),
  quantity_category: z.string().min(1, "Please select an estimated quantity"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  landmark: z.string().optional(),
  preferred_date: z.string().min(1, "Please select a preferred date"),
  notes: z.string().optional(),
});

export default function NewPickupPage() {
  const { currentUser, addPickup } = useDemoStore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [newPickupId, setNewPickupId] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      waste_type: "",
      quantity_category: "",
      address: currentUser?.address || "",
      landmark: "",
      preferred_date: "",
      notes: "",
    },
  });

  if (!currentUser) return null;

  const today = new Date();
  const tomorrow = addDays(today, 1);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const id = `pickup-${Date.now()}`;
    addPickup({
      user_id: currentUser!.id,
      waste_type: values.waste_type,
      quantity_category: values.quantity_category,
      address: values.address,
      community: currentUser!.community,
      area: currentUser!.area,
      landmark: values.landmark,
      preferred_date: values.preferred_date,
      status: 'Submitted',
      priority: 1,
      notes: values.notes,
    });
    
    setNewPickupId(id);
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
            <CardTitle className="text-2xl">Request Submitted</CardTitle>
            <CardDescription className="text-base mt-2">
              Your pickup request has been successfully submitted and is awaiting assignment.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-md inline-block mb-4">
              <p className="text-sm text-muted-foreground mb-1">Reference Number</p>
              <p className="font-mono font-medium">{newPickupId}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              A collector in your area will be assigned shortly. You can track the status on your dashboard.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
            <Link href={`/pickups/${newPickupId}`}>
              <Button className="w-full sm:w-auto">Track Request</Button>
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
      <Link href="/pickups" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Pickups
      </Link>
      
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <div className="mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold">Request a Pickup</h1>
          <p className="text-muted-foreground">Schedule a waste collection from your location.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            <div className="space-y-4">
              <h3 className="font-medium text-lg">1. What needs to be collected?</h3>
              
              <FormField
                control={form.control}
                name="waste_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Waste Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type of waste" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="General household waste">General household waste</SelectItem>
                        <SelectItem value="Plastic">Plastic (Recyclable)</SelectItem>
                        <SelectItem value="Paper or cardboard">Paper or cardboard</SelectItem>
                        <SelectItem value="Glass">Glass</SelectItem>
                        <SelectItem value="Metal">Metal</SelectItem>
                        <SelectItem value="Organic waste">Organic waste</SelectItem>
                        <SelectItem value="Electronic waste">Electronic waste</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity_category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Quantity</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select approximate quantity" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="One small bag">One small bag</SelectItem>
                        <SelectItem value="Two to three bags">Two to three bags</SelectItem>
                        <SelectItem value="Four to six bags">Four to six bags</SelectItem>
                        <SelectItem value="Large household amount">Large household amount</SelectItem>
                        {currentUser.role === 'business' && (
                          <SelectItem value="Business quantity">Business quantity</SelectItem>
                        )}
                        <SelectItem value="Custom estimate">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-medium text-lg">2. Where should we pick it up?</h3>
              
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address / Location</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., Hse No. 42, Station Road" {...field} />
                    </FormControl>
                    <FormDescription>Your registered area is {currentUser.area}.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="landmark"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nearest Landmark (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., Opposite the blue kiosk" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-medium text-lg">3. When is a good time?</h3>
              
              <FormField
                control={form.control}
                name="preferred_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Timing</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select preferred timing" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={today.toISOString()}>Today</SelectItem>
                        <SelectItem value={tomorrow.toISOString()}>Tomorrow</SelectItem>
                        <SelectItem value={addDays(today, 2).toISOString()}>In 2 Days</SelectItem>
                        <SelectItem value={addDays(today, 3).toISOString()}>In 3 Days</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Collectors will try to match this date based on their routes.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Any instructions for the collector?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-6 border-t flex justify-end gap-4">
              <Link href="/pickups">
                <Button variant="outline" type="button">Cancel</Button>
              </Link>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Confirm Pickup Request"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
