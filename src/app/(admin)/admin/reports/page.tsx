"use client";

import { useDemoStore } from "@/store/demo-store";
import { format, parseISO } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, AlertTriangle, CheckCircle2, MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { ReportStatus } from "@/types";

export default function AdminReportsPage() {
  const { currentUser, reports, updateReportStatus } = useDemoStore();
  
  if (!currentUser) return null;

  const communityReports = reports.filter(r => r.community === currentUser.community)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const getSeverityBadgeVariant = (severity: string) => {
    switch(severity) {
      case 'Urgent': return 'destructive';
      case 'High': return 'default'; // primary color
      case 'Moderate': return 'secondary';
      default: return 'outline';
    }
  };

  const handleUpdateStatus = (id: string, status: ReportStatus) => {
    updateReportStatus(id, status);
    toast.success(`Report status updated to ${status}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-lg border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold mb-1">Manage Reports</h1>
          <p className="text-muted-foreground text-sm">Review and update waste reports in {currentUser.community}</p>
        </div>
      </div>

      <div className="grid gap-4">
        {communityReports.map((report) => (
          <Card key={report.id} className="border-0 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="p-5 flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg line-clamp-1">{report.waste_type}</h3>
                      <Badge variant={getSeverityBadgeVariant(report.severity)} className="ml-2">
                        {report.severity}
                      </Badge>
                    </div>
                    <Badge variant="outline" className={
                      report.status === 'Cleared' ? 'bg-green-100 text-green-800 border-green-200' : 
                      report.status === 'In Progress' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                      'bg-blue-100 text-blue-800 border-blue-200'
                    }>
                      {report.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1 mt-3">
                    <div className="flex items-start text-sm text-muted-foreground gap-2">
                      <MapPin className="h-4 w-4 shrink-0 mt-0.5" /> 
                      <span className="line-clamp-1">{report.location}</span>
                    </div>
                    <div className="text-sm text-muted-foreground ml-6">
                      Reported by user ID {report.reporter_id} on {format(parseISO(report.created_at), 'MMM d, yyyy')}
                    </div>
                  </div>
                  
                  {report.description && (
                    <div className="mt-4 bg-slate-50 p-3 rounded text-sm text-slate-700">
                      <strong>Details:</strong> {report.description}
                    </div>
                  )}
                </div>
                
                <div className="bg-slate-50 p-4 md:w-48 flex flex-col justify-center gap-2 border-t md:border-t-0 md:border-l">
                  {report.status !== 'Cleared' && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full">
                          Update Status <MoreVertical className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {report.status === 'Reported' && (
                          <DropdownMenuItem onClick={() => handleUpdateStatus(report.id, 'In Progress')}>
                            Mark In Progress
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => handleUpdateStatus(report.id, 'Cleared')}>
                          Mark as Cleared
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                  {report.status === 'Cleared' && (
                    <div className="flex items-center justify-center text-green-600 gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="font-medium">Resolved</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {communityReports.length === 0 && (
          <div className="bg-white border rounded-lg p-12 text-center shadow-sm">
            <h3 className="text-lg font-medium mb-2">No reports found</h3>
            <p className="text-muted-foreground">There are no waste reports for this community.</p>
          </div>
        )}
      </div>
    </div>
  );
}
