"use client";

import { useDemoStore } from "@/store/demo-store";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Recycle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const { profiles, login } = useDemoStore();
  const router = useRouter();

  const handleLogin = (email: string, role: string) => {
    login(email);
    switch(role) {
      case 'resident':
      case 'business':
        router.push('/dashboard');
        break;
      case 'collector':
        router.push('/collector');
        break;
      case 'admin':
        router.push('/admin');
        break;
      case 'recycler':
        router.push('/recycler');
        break;
      default:
        router.push('/dashboard');
    }
  };

  const roleDescriptions: Record<string, string> = {
    resident: "Request pickups, report dumps.",
    business: "Schedule larger, recurring pickups.",
    collector: "View and accept assigned routes.",
    admin: "Monitor system health and dispatch.",
    recycler: "Find and claim recyclable materials."
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col items-center justify-center p-6">
      <div className="absolute top-6 left-6">
        <Link href="/" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="w-full max-w-2xl text-center mb-10">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
          <Recycle className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold mb-3">Welcome to Demo Mode</h1>
        <p className="text-muted-foreground">
          For the hackathon presentation, select a persona below to explore the application from their perspective. No password required.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        {profiles.map((profile) => (
          <Card key={profile.id} className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleLogin(profile.email, profile.role)}>
            <CardHeader className="pb-3">
              <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">{profile.role}</div>
              <CardTitle className="text-lg">{profile.full_name}</CardTitle>
              <CardDescription className="text-xs truncate">{profile.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {roleDescriptions[profile.role]}
              </p>
              <Button className="w-full" variant="outline">Login as {profile.full_name.split(' ')[0]}</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
