"use client";

import { useDemoStore } from "@/store/demo-store";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NewReportPage() {
  const { currentUser, addReport } = useDemoStore();
  
  const [location, setLocation] = useState("");
  const [wasteType, setWasteType] = useState("");
  const [severity, setSeverity] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [newReportId, setNewReportId] = useState("");
  const [error, setError] = useState("");

  if (!currentUser) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image must be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!currentUser) return;
    setError("");
    
    if (location.length < 5) {
      setError("Location details must be at least 5 characters.");
      return;
    }
    if (!wasteType) {
      setError("Please select the type of waste.");
      return;
    }
    if (!severity) {
      setError("Please select the severity level.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const id = `rep-${Date.now()}`;
    addReport({
      reporter_id: currentUser.id,
      location: location,
      community: currentUser.community,
      area: currentUser.area,
      waste_type: wasteType,
      severity: severity as "Low" | "Moderate" | "High" | "Urgent",
      status: 'Submitted',
      description: description,
      image_url: imagePreview || undefined,
      drain_blocked: false,
      active_burning: false,
      verified: false,
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

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm font-medium">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Exact Location</label>
              <Input 
                placeholder="E.g., Behind the primary school, near the big tree" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <p className="text-[13px] text-muted-foreground">Please be as specific as possible to help the cleanup team find it.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Type of Issue</label>
                <Select value={wasteType} onValueChange={(val) => val && setWasteType(val as string)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Illegal dump site">Illegal dump site</SelectItem>
                    <SelectItem value="Overflowing communal bin">Overflowing communal bin</SelectItem>
                    <SelectItem value="Blocked drain (plastics)">Blocked drain (plastics)</SelectItem>
                    <SelectItem value="Burning of waste">Burning of waste</SelectItem>
                    <SelectItem value="Dead animal">Dead animal</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Severity Level</label>
                <Select value={severity} onValueChange={(val) => val && setSeverity(val as string)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low (Small pile)</SelectItem>
                    <SelectItem value="Moderate">Moderate (Medium pile)</SelectItem>
                    <SelectItem value="High">High (Large dump or blocked drain)</SelectItem>
                    <SelectItem value="Urgent">Urgent (Health hazard or active burning)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Additional Details (Optional)</label>
              <Textarea 
                placeholder="Any other context? E.g., 'Has been here for 3 days'" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Photo Evidence (Optional)</label>
              <div className="flex items-center gap-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => document.getElementById('image-upload')?.click()}
                  className="w-full sm:w-auto bg-muted/50"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Photo
                </Button>
                <Input 
                  id="image-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageChange}
                />
              </div>
              {imagePreview && (
                <div className="mt-4 relative rounded-md overflow-hidden border inline-block bg-muted/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imagePreview} alt="Preview" className="max-h-[200px] object-contain rounded-md" />
                  <Button 
                    type="button" 
                    variant="destructive" 
                    size="icon" 
                    className="absolute top-2 right-2 h-7 w-7 opacity-80 hover:opacity-100" 
                    onClick={() => {
                      setImagePreview(null);
                      const input = document.getElementById('image-upload') as HTMLInputElement;
                      if (input) input.value = '';
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
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
      </div>
    </div>
  );
}
