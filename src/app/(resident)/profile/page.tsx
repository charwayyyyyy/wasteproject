"use client";

import { useDemoStore } from "@/store/demo-store";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserCircle, MapPin, Phone, Mail, Award, LogOut, ArrowRightLeft } from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
  const router = useRouter();
  const { currentUser, transactions, updateProfile, logout } = useDemoStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    area: "",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        full_name: currentUser.full_name || "",
        phone: currentUser.phone || "",
        area: currentUser.area || "",
      });
    }
  }, [currentUser]);

  if (!currentUser) return null;

  const totalPoints = transactions
    .filter(t => t.user_id === currentUser.id)
    .reduce((sum, t) => sum + t.points, 0);

  const handleSave = () => {
    const result = updateProfile(currentUser.id, formData);
    if (result.success) {
      toast.success(result.message);
      setIsEditing(false);
    } else {
      toast.error(result.message);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/presentation");
  };

  const handleSwitchRole = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and preferences.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Info Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCircle className="h-5 w-5 text-primary" />
              Personal Information
            </CardTitle>
            <CardDescription>Your contact details and service area</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input 
                value={formData.full_name}
                onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label>Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  className="pl-9"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Service Area</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  className="pl-9"
                  value={formData.area}
                  onChange={(e) => setFormData({...formData, area: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  className="pl-9"
                  value={currentUser.email}
                  disabled
                />
              </div>
              <p className="text-xs text-muted-foreground">Email cannot be changed in the prototype.</p>
            </div>

            <div className="pt-4 border-t flex justify-end gap-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                  <Button onClick={handleSave}>Save Changes</Button>
                </>
              ) : (
                <Button variant="outline" onClick={() => setIsEditing(true)}>Edit Profile</Button>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* Account Summary Card */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-green-500" />
                Account Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total EcoPoints</p>
                  <p className="text-3xl font-bold text-green-600">{totalPoints}</p>
                </div>
                <Award className="h-10 w-10 text-green-500 opacity-20" />
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium">Account Role</p>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary capitalize">
                    {currentUser.role}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Demo Actions Card */}
          <Card className="shadow-sm border-orange-100 bg-orange-50/30">
            <CardHeader>
              <CardTitle className="text-orange-800 text-lg">Demo Mode Actions</CardTitle>
              <CardDescription>Navigate between roles to test the full ecosystem</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start text-orange-700 hover:text-orange-800 hover:bg-orange-100 border-orange-200"
                onClick={handleSwitchRole}
              >
                <ArrowRightLeft className="mr-2 h-4 w-4" />
                Switch Demo Role
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout to Presentation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
