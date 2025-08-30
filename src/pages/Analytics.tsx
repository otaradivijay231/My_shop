import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  TrendingUp, 
  TrendingDown,
  Users,
  DollarSign,
  ShoppingCart,
  Activity,
  Calendar,
  Filter
} from "lucide-react"

const Analytics = () => {
  const metrics = [
    {
      title: "Revenue Growth",
      value: "+23.5%",
      change: "+4.2% from last month",
      icon: TrendingUp,
      trend: "up"
    },
    {
      title: "Customer Acquisition",
      value: "+127",
      change: "New customers this month",
      icon: Users,
      trend: "up"
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "-0.5% from last month",
      icon: Activity,
      trend: "down"
    },
    {
      title: "Average Order Value",
      value: "$156.32",
      change: "+12.1% from last month",
      icon: ShoppingCart,
      trend: "up"
    }
  ]

  const topProducts = [
    { name: "Premium Service Package", sales: 145, revenue: "$14,500" },
    { name: "Basic Consultation", sales: 89, revenue: "$8,900" },
    { name: "Advanced Analytics Tool", sales: 67, revenue: "$13,400" },
    { name: "Monthly Subscription", sales: 234, revenue: "$7,020" },
    { name: "Custom Solution", sales: 23, revenue: "$11,500" }
  ]

  const customerSegments = [
    { segment: "Enterprise", percentage: 35, value: "$45,230" },
    { segment: "Small Business", percentage: 45, value: "$28,150" },
    { segment: "Individual", percentage: 20, value: "$12,400" }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Analytics Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Deep insights into your business performance
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Date Range
            </Button>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown
            return (
              <Card key={index} className="stat-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {metric.title}
                  </CardTitle>
                  <Icon className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                  <p className={`text-xs flex items-center mt-2 ${
                    metric.trend === "up" ? "text-success" : "text-destructive"
                  }`}>
                    <TrendIcon className="h-3 w-3 mr-1" />
                    {metric.change}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Revenue Chart Placeholder */}
          <Card className="lg:col-span-2 glass-card">
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
              <CardDescription>
                Monthly revenue performance over time
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <p>Interactive revenue chart</p>
                  <p className="text-sm">Chart visualization will be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>
                Best performing products this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                    </div>
                    <div className="text-sm font-medium text-success">
                      {product.revenue}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Customer Segments */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Customer Segments</CardTitle>
              <CardDescription>
                Revenue breakdown by customer type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customerSegments.map((segment, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{segment.segment}</span>
                      <span className="text-sm text-muted-foreground">{segment.percentage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${segment.percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Revenue: {segment.value}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Insights */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Performance Insights</CardTitle>
              <CardDescription>
                Key insights and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="font-medium text-success">Strong Growth</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Revenue is up 23.5% this month. Keep up the excellent work!
                  </p>
                </div>
                
                <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-4 w-4 text-warning" />
                    <span className="font-medium text-warning">Attention Needed</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Conversion rate has decreased. Consider optimizing your sales funnel.
                  </p>
                </div>
                
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="font-medium text-primary">New Opportunity</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Customer acquisition is strong. Consider expanding marketing efforts.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Analytics