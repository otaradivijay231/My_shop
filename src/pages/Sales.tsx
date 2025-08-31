import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Printer,
  FileText
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const Sales = () => {
  const salesData = [
    { id: "INV-001", customer: "John Doe", amount: "$1,234.56", status: "Paid", date: "2024-01-15" },
    { id: "INV-002", customer: "Jane Smith", amount: "$987.65", status: "Pending", date: "2024-01-14" },
    { id: "INV-003", customer: "Bob Johnson", amount: "$2,345.67", status: "Paid", date: "2024-01-13" },
    { id: "INV-004", customer: "Alice Brown", amount: "$876.54", status: "Overdue", date: "2024-01-12" },
    { id: "INV-005", customer: "Charlie Wilson", amount: "$1,543.21", status: "Paid", date: "2024-01-11" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid": return "bg-success/10 text-success border-success/20"
      case "Pending": return "bg-warning/10 text-warning border-warning/20"
      case "Overdue": return "bg-destructive/10 text-destructive border-destructive/20"
      default: return "bg-muted/10 text-muted-foreground border-muted/20"
    }
  }

  const printBill = (sale: any, withGST: boolean) => {
    const gstRate = 0.18 // 18% GST
    const amount = parseFloat(sale.amount.replace('$', ''))
    const gst = withGST ? amount * gstRate : 0
    const total = amount + gst

    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Bill - ${sale.id}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
              .company-name { font-size: 24px; font-weight: bold; color: #333; }
              .bill-details { margin: 20px 0; }
              .customer-info { background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
              .amount-section { text-align: right; margin-top: 30px; }
              .total-line { font-weight: bold; font-size: 18px; border-top: 2px solid #333; padding-top: 10px; margin-top: 10px; }
              .gst-info { color: #666; font-size: 12px; margin-top: 10px; }
              .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="company-name">BusinessHub</div>
              <p>Professional Business Solutions</p>
            </div>
            
            <div class="bill-details">
              <h2>BILL / INVOICE</h2>
              <p><strong>Invoice Number:</strong> ${sale.id}</p>
              <p><strong>Date:</strong> ${sale.date}</p>
              <p><strong>Bill Type:</strong> ${withGST ? 'With GST (18%)' : 'Without GST'}</p>
            </div>
            
            <div class="customer-info">
              <h3>Bill To:</h3>
              <p><strong>${sale.customer}</strong></p>
              <p>Customer ID: CUST-${Math.floor(Math.random() * 1000)}</p>
            </div>
            
            <div class="amount-section">
              <p>Amount: ${sale.amount}</p>
              ${withGST ? `<p>GST (18%): $${gst.toFixed(2)}</p>` : ''}
              <div class="total-line">
                Total Amount: $${total.toFixed(2)}
              </div>
              <div class="gst-info">
                ${withGST ? 'This bill includes 18% GST as per government regulations' : 'This bill is generated without GST'}
              </div>
            </div>
            
            <div class="footer">
              <p>Thank you for your business!</p>
              <p>Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
            </div>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Sales Management</h1>
            <p className="text-muted-foreground mt-2">
              Manage your sales records and transactions
            </p>
          </div>
          <Button className="gradient-button" onClick={() => window.location.href = '/generate-bill'}>
            <Plus className="mr-2 h-4 w-4" />
            New Sale
          </Button>
        </div>

        {/* Filters and Search */}
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search sales..." 
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

        {/* Sales Table */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>
              A list of all your sales transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesData.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium">{sale.id}</p>
                      <p className="text-sm text-muted-foreground">{sale.customer}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-semibold">{sale.amount}</p>
                      <p className="text-sm text-muted-foreground">{sale.date}</p>
                    </div>
                    
                    <Badge className={getStatusColor(sale.status)}>
                      {sale.status}
                    </Badge>
                    
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          alert(`Viewing details for ${sale.id}:\n\nCustomer: ${sale.customer}\nAmount: ${sale.amount}\nStatus: ${sale.status}\nDate: ${sale.date}`)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => window.location.href = `/generate-bill?edit=${sale.id}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Printer className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-popover border border-border">
                          <DropdownMenuItem 
                            onClick={() => printBill(sale, true)}
                            className="cursor-pointer hover:bg-accent"
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            Print Bill with GST
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => printBill(sale, false)}
                            className="cursor-pointer hover:bg-accent"
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            Print Bill without GST
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          if(confirm(`Are you sure you want to delete ${sale.id}?`)) {
                            alert('Sale deleted successfully!')
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="stat-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$8,987.63</div>
              <p className="text-xs text-success">+12.5% from last month</p>
            </CardContent>
          </Card>
          
          <Card className="stat-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Pending Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,234.56</div>
              <p className="text-xs text-warning">2 invoices pending</p>
            </CardContent>
          </Card>
          
          <Card className="stat-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Overdue Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$876.54</div>
              <p className="text-xs text-destructive">1 invoice overdue</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Sales