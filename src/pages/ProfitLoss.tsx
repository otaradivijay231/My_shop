import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

const ProfitLoss = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Profit & Loss</h1>
        <p className="text-muted-foreground mt-2">Financial performance overview</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="stat-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm text-muted-foreground">Total Revenue</CardTitle>
            <TrendingUp className="h-5 w-5 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">$124,567.89</div>
            <p className="text-xs text-muted-foreground">+15.2% from last period</p>
          </CardContent>
        </Card>
        
        <Card className="stat-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm text-muted-foreground">Total Expenses</CardTitle>
            <TrendingDown className="h-5 w-5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">$78,432.10</div>
            <p className="text-xs text-muted-foreground">Operating costs</p>
          </CardContent>
        </Card>
        
        <Card className="stat-card md:col-span-2">
          <CardHeader>
            <CardTitle className="text-primary">Net Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">$46,135.79</div>
            <p className="text-sm text-muted-foreground">37.1% profit margin</p>
          </CardContent>
        </Card>
      </div>
    </div>
  </DashboardLayout>
)

export default ProfitLoss