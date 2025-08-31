import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  CreditCard
} from "lucide-react"

const Index = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1% from last month",
      icon: DollarSign,
      trend: "up"
    },
    {
      title: "Sales",
      value: "+2350",
      change: "+180.1% from last month",
      icon: CreditCard,
      trend: "up"
    },
    {
      title: "Active Customers",
      value: "+12,234",
      change: "+19% from last month",
      icon: Users,
      trend: "up"
    },
    {
      title: "Total Orders",
      value: "+573",
      change: "+201 since last hour",
      icon: Activity,
      trend: "up"
    }
  ]

  const recentSales = [
    { customer: "Olivia Martin", email: "olivia.martin@email.com", amount: "+$1,999.00" },
    { customer: "Jackson Lee", email: "jackson.lee@email.com", amount: "+$39.00" },
    { customer: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "+$299.00" },
    { customer: "William Kim", email: "will@email.com", amount: "+$99.00" },
    { customer: "Sofia Davis", email: "sofia.davis@email.com", amount: "+$39.00" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Dashboard Overview</h1>
            <p className="text-muted-foreground mt-2">
              Track your business performance and analytics
            </p>
          </div>
          <Button className="gradient-button" onClick={() => window.location.href = '/reports'}>
            <TrendingUp className="mr-2 h-4 w-4" />
            View Full Report
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="stat-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-xs text-muted-foreground flex items-center mt-2">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3 text-success mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-destructive mr-1" />
                    )}
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Charts and Recent Activity */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          {/* Overview Chart */}
          <Card className="col-span-4 glass-card">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>
                Your revenue performance over the last 12 months
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <p>Revenue chart will be displayed here</p>
                  <p className="text-sm">Integration with charts library needed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Sales */}
          <Card className="col-span-3 glass-card">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>
                You made 265 sales this month.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSales.map((sale, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{sale.customer}</p>
                        <p className="text-xs text-muted-foreground">{sale.email}</p>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-success">
                      {sale.amount}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="glass-card hover-lift cursor-pointer" onClick={() => window.location.href = '/sales'}>
            <CardContent className="p-6 text-center">
              <ShoppingCart className="h-8 w-8 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">New Sale</h3>
              <p className="text-sm text-muted-foreground">Create a new sales entry</p>
            </CardContent>
          </Card>
          
          <Card className="glass-card hover-lift cursor-pointer" onClick={() => window.location.href = '/customers'}>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Add Customer</h3>
              <p className="text-sm text-muted-foreground">Register a new customer</p>
            </CardContent>
          </Card>
          
          <Card className="glass-card hover-lift cursor-pointer" onClick={() => window.location.href = '/reports'}>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">View Reports</h3>
              <p className="text-sm text-muted-foreground">Analyze your business data</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
};

export default Index;
