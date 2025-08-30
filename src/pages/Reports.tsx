import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, 
  Download,
  Eye,
  Calendar,
  Filter,
  TrendingUp,
  BarChart3,
  PieChart,
  FileSpreadsheet
} from "lucide-react"

const Reports = () => {
  const reportTypes = [
    {
      title: "Sales Report",
      description: "Comprehensive sales analysis and trends",
      icon: TrendingUp,
      lastGenerated: "2024-01-15",
      status: "Available"
    },
    {
      title: "Customer Report",
      description: "Customer behavior and analytics",
      icon: FileText,
      lastGenerated: "2024-01-14",
      status: "Available"
    },
    {
      title: "Financial Report",
      description: "Revenue, expenses, and profit analysis",
      icon: BarChart3,
      lastGenerated: "2024-01-13",
      status: "Processing"
    },
    {
      title: "Inventory Report",
      description: "Stock levels and inventory management",
      icon: PieChart,
      lastGenerated: "2024-01-12",
      status: "Available"
    }
  ]

  const recentReports = [
    {
      name: "Monthly Sales Report - January 2024",
      type: "Sales",
      generatedDate: "2024-01-15",
      size: "2.4 MB",
      format: "PDF"
    },
    {
      name: "Customer Analytics - Q4 2023",
      type: "Analytics",
      generatedDate: "2024-01-10",
      size: "1.8 MB",
      format: "Excel"
    },
    {
      name: "Profit & Loss Statement - December 2023",
      type: "Financial",
      generatedDate: "2024-01-05",
      size: "890 KB",
      format: "PDF"
    },
    {
      name: "Inventory Summary - Week 2",
      type: "Inventory",
      generatedDate: "2024-01-08",
      size: "1.2 MB",
      format: "Excel"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available": return "bg-success/10 text-success border-success/20"
      case "Processing": return "bg-warning/10 text-warning border-warning/20"
      case "Error": return "bg-destructive/10 text-destructive border-destructive/20"
      default: return "bg-muted/10 text-muted-foreground border-muted/20"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Reports & Analytics</h1>
            <p className="text-muted-foreground mt-2">
              Generate and view comprehensive business reports
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Report Types */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {reportTypes.map((report, index) => {
            const Icon = report.icon
            return (
              <Card key={index} className="glass-card hover-lift cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Icon className="h-8 w-8 text-primary" />
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{report.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {report.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Last: {report.lastGenerated}
                    </span>
                    <Button size="sm" variant="outline">
                      Generate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Recent Reports */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>
              Your recently generated reports and analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      {report.format === "PDF" ? (
                        <FileText className="h-5 w-5 text-primary" />
                      ) : (
                        <FileSpreadsheet className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{report.type}</span>
                        <span>•</span>
                        <span>{report.generatedDate}</span>
                        <span>•</span>
                        <span>{report.size}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="glass-card hover-lift cursor-pointer">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Schedule Report</h3>
              <p className="text-sm text-muted-foreground">Set up automated report generation</p>
            </CardContent>
          </Card>
          
          <Card className="glass-card hover-lift cursor-pointer">
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-8 w-8 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Custom Analytics</h3>
              <p className="text-sm text-muted-foreground">Create custom analytical reports</p>
            </CardContent>
          </Card>
          
          <Card className="glass-card hover-lift cursor-pointer">
            <CardContent className="p-6 text-center">
              <Download className="h-8 w-8 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Export Data</h3>
              <p className="text-sm text-muted-foreground">Export raw data in various formats</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Reports