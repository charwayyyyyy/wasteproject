"use client";

import { useDemoStore } from "@/store/demo-store";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, MapPin, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ReportsListPage() {
  const { currentUser, reports } = useDemoStore();
  
  if (!currentUser) return null;

  const userReports = reports.filter(r => r.reporter_id === currentUser.id)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const getSeverityBadgeVariant = (severity: string) => {
    switch(severity) {
      case 'Urgent': return 'destructive';
      case 'High': return 'default'; // primary color
      case 'Moderate': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-lg border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold mb-1">Waste Reports</h1>
          <p className="text-muted-foreground text-sm">Your submitted reports of illegal dumping and hotspots</p>
        </div>
        <Link href="/reports/new">
          <Button className="hidden md:flex gap-2" variant="outline">
            <AlertTriangle className="h-4 w-4 text-orange-500" /> New Report
          </Button>
          <Button size="icon" variant="outline" className="md:hidden">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
          </Button>
        </Link>
      </div>

      {userReports.length === 0 ? (
        <div className="bg-white border rounded-lg p-12 text-center shadow-sm">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-muted-foreground opacity-50" />
          </div>
          <h3 className="text-lg font-medium mb-2">No reports submitted</h3>
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
            Help keep the community clean by reporting illegal dumping or overflowing waste.
          </p>
          <Link href="/reports/new">
            <Button>Report a Waste Site</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {userReports.map((report) => (
            <Card key={report.id} className="border-0 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <Link href={`/reports/${report.id}`}>
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="p-4 flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg line-clamp-1">{report.waste_type}</h3>
                          <Badge variant={getSeverityBadgeVariant(report.severity)} className="ml-2">
                            {report.severity}
                          </Badge>
                        </div>
                        <Badge variant="outline" className={
                          report.status === 'Cleared' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-blue-100 text-blue-800 border-blue-200'
                        }>
                          {report.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1 mt-3">
                        <div className="flex items-start text-sm text-muted-foreground gap-2">
                          <MapPin className="h-4 w-4 shrink-0 mt-0.5" /> 
                          <span className="line-clamp-1">{report.location}</span>
                        </div>
                        <div className="text-xs text-muted-foreground ml-6">
                          Reported on {format(parseISO(report.created_at), 'MMM d, yyyy')}
                        </div>
                      </div>
                    </div>
                    <div className="bg-muted/30 p-4 md:w-32 flex items-center justify-center border-t md:border-t-0 md:border-l">
                      <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:underline">
                        View <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
