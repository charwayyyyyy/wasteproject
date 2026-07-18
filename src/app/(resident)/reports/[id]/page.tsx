"use client";

import { useDemoStore } from "@/store/demo-store";
import { useParams } from "next/navigation";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { ArrowLeft, MapPin, AlertTriangle, Calendar } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ReportDetail() {
  const { id } = useParams();
  const { reports } = useDemoStore();
  
  const report = reports.find(r => r.id === id);
  
  if (!report) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-2">Report Not Found</h2>
        <p className="text-muted-foreground mb-6">The requested report could not be found.</p>
        <Link href="/reports" className="text-primary hover:underline">Return to Reports</Link>
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'Urgent': return 'bg-red-500 hover:bg-red-600 text-white';
      case 'High': return 'bg-orange-500 hover:bg-orange-600 text-white';
      case 'Moderate': return 'bg-amber-500 hover:bg-amber-600 text-white';
      default: return 'bg-blue-500 hover:bg-blue-600 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    if (status === 'Cleared') return 'bg-green-100 text-green-800 border-green-200';
    if (status === 'In Progress') return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-blue-100 text-blue-800 border-blue-200';
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/reports" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Reports
        </Link>
        <span className="text-xs font-mono text-muted-foreground">ID: {report.id}</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-lg border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold mb-2">{report.waste_type}</h1>
          <div className="flex items-center text-sm text-muted-foreground gap-4">
            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> Reported on {format(parseISO(report.created_at), 'MMM d, yyyy')}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={`text-sm px-3 py-1 ${getSeverityColor(report.severity)} border-transparent`}>
            {report.severity} Priority
          </Badge>
          <Badge variant="outline" className={`text-sm px-3 py-1 ${getStatusColor(report.status)}`}>
            {report.status}
          </Badge>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground uppercase tracking-wider font-semibold flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Location Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium text-lg mb-1">{report.location}</p>
            <p className="text-muted-foreground">{report.area}, {report.community}</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground uppercase tracking-wider font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" /> Issue Description
            </CardTitle>
          </CardHeader>
          <CardContent>
            {report.description ? (
              <p className="text-sm bg-muted/50 p-4 rounded-md">{report.description}</p>
            ) : (
              <p className="text-sm text-muted-foreground italic">No additional details provided.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {report.status === 'Cleared' && (
        <Card className="border-0 shadow-sm bg-green-50 border-green-100">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              Issue Resolved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-700">
              This reported issue has been addressed and the waste has been cleared by the community administration team. 
              Thank you for contributing to a cleaner environment!
            </p>
          </CardContent>
        </Card>
      )}

      {report.status === 'In Progress' && (
        <Card className="border-0 shadow-sm bg-amber-50 border-amber-100">
          <CardHeader>
            <CardTitle className="text-amber-800 flex items-center gap-2">
              Currently Being Addressed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-amber-700">
              The community administration team is aware of this issue and has dispatched a team or scheduled a cleanup for this location.
            </p>
          </CardContent>
        </Card>
      )}

      {report.status === 'Reported' && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">
              Your report has been logged and is awaiting review by the community administrators. You will see an update here once action is taken.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
