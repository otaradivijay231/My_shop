import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Plus, 
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
  MapPin
} from "lucide-react"

const Customers = () => {
  const customers = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      totalSpent: "$5,234.56",
      orders: 12,
      status: "Active",
      joinDate: "2023-06-15"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 (555) 987-6543",
      location: "Los Angeles, CA",
      totalSpent: "$3,456.78",
      orders: 8,
      status: "Active",
      joinDate: "2023-07-22"
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      phone: "+1 (555) 456-7890",
      location: "Chicago, IL",
      totalSpent: "$7,890.12",
      orders: 15,
      status: "VIP",
      joinDate: "2023-03-10"
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice.brown@example.com",
      phone: "+1 (555) 321-0987",
      location: "Houston, TX",
      totalSpent: "$1,234.56",
      orders: 3,
      status: "Inactive",
      joinDate: "2023-11-05"
    },
    {
      id: 5,
      name: "Charlie Wilson",
      email: "charlie.wilson@example.com",
      phone: "+1 (555) 654-3210",
      location: "Phoenix, AZ",
      totalSpent: "$2,567.89",
      orders: 6,
      status: "Active",
      joinDate: "2023-08-18"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-success/10 text-success border-success/20"
      case "VIP": return "bg-primary/10 text-primary border-primary/20"
      case "Inactive": return "bg-muted/10 text-muted-foreground border-muted/20"
      default: return "bg-muted/10 text-muted-foreground border-muted/20"
    }
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Customer Management</h1>
            <p className="text-muted-foreground mt-2">
              Manage your customer relationships and data
            </p>
          </div>
          <Button className="gradient-button" onClick={() => {
            alert('Add Customer form would open here')
          }}>
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>

        {/* Customer Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="stat-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Total Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-success">+12 this week</p>
            </CardContent>
          </Card>
          
          <Card className="stat-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Active Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">987</div>
              <p className="text-xs text-success">80% active rate</p>
            </CardContent>
          </Card>
          
          <Card className="stat-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">VIP Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">67</div>
              <p className="text-xs text-primary">High value clients</p>
            </CardContent>
          </Card>
          
          <Card className="stat-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Avg. Order Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$234.56</div>
              <p className="text-xs text-success">+5.2% this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search customers..." 
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Customers List */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>All Customers</CardTitle>
            <CardDescription>
              Manage and view all your customer information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customers.map((customer) => (
                <div key={customer.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`/placeholder-user-${customer.id}.jpg`} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(customer.name)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold">{customer.name}</h3>
                        <Badge className={getStatusColor(customer.status)}>
                          {customer.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {customer.phone}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {customer.location}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <div className="font-semibold text-success">{customer.totalSpent}</div>
                      <div className="text-sm text-muted-foreground">{customer.orders} orders</div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Joined</div>
                      <div className="text-sm">{customer.joinDate}</div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          alert(`Customer Details:\n\nName: ${customer.name}\nEmail: ${customer.email}\nPhone: ${customer.phone}\nTotal Orders: ${customer.orders}\nTotal Spent: ${customer.totalSpent}`)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          alert(`Edit customer: ${customer.name}`)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          const printWindow = window.open('', '_blank')
                          if (printWindow) {
                            printWindow.document.write(`
                              <html>
                                <head><title>Customer Report - ${customer.name}</title></head>
                                <body style="font-family: Arial, sans-serif; margin: 20px;">
                                  <h1>Customer Report</h1>
                                  <p><strong>Name:</strong> ${customer.name}</p>
                                  <p><strong>Email:</strong> ${customer.email}</p>
                                  <p><strong>Phone:</strong> ${customer.phone}</p>
                                  <p><strong>Total Orders:</strong> ${customer.orders}</p>
                                  <p><strong>Total Spent:</strong> ${customer.totalSpent}</p>
                                  <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
                                </body>
                              </html>
                            `)
                            printWindow.document.close()
                            printWindow.print()
                          }
                        }}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default Customers