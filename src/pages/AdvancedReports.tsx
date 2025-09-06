import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Download, FileText, Filter, Calendar, TrendingUp, Package, Users, DollarSign } from "lucide-react";

const AdvancedReports = () => {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [reportType, setReportType] = useState("inventory");
  const [selectedSupplier, setSelectedSupplier] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState("all");
  const { toast } = useToast();

  const [reportData, setReportData] = useState({
    inventory: [
      { product: "Laptop", category: "Electronics", stock: 5, value: 60000, supplier: "Tech Supplies Co." },
      { product: "T-Shirt", category: "Clothing", stock: 50, value: 1250, supplier: "Fashion Hub" },
    ],
    sales: [
      { date: "2024-01-15", product: "Laptop", quantity: 2, amount: 24000, customer: "John Doe" },
      { date: "2024-01-16", product: "T-Shirt", quantity: 5, amount: 125, customer: "Jane Smith" },
    ],
    purchase: [
      { date: "2024-01-10", supplier: "Tech Supplies Co.", product: "Laptop", quantity: 10, amount: 80000 },
      { date: "2024-01-12", supplier: "Fashion Hub", product: "T-Shirt", quantity: 100, amount: 1500 },
    ],
    profitLoss: [
      { period: "Jan 2024", revenue: 50000, expenses: 30000, profit: 20000, margin: "40%" },
      { period: "Dec 2023", revenue: 45000, expenses: 28000, profit: 17000, margin: "37.8%" },
    ],
  });

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => row[header]).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Export Successful",
      description: `${filename}.csv has been downloaded.`,
    });
  };

  const exportToPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const currentData = reportData[reportType as keyof typeof reportData];
    
    printWindow.document.write(`
      <html>
        <head>
          <title>${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .header { text-align: center; margin-bottom: 20px; }
            .date { font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report</h1>
            <div class="date">Generated on: ${new Date().toLocaleDateString()}</div>
            ${dateFrom && dateTo ? `<div class="date">Period: ${dateFrom} to ${dateTo}</div>` : ''}
          </div>
          <table>
            <thead>
              <tr>
                ${Object.keys(currentData[0] || {}).map(key => 
                  `<th>${key.charAt(0).toUpperCase() + key.slice(1)}</th>`
                ).join('')}
              </tr>
            </thead>
            <tbody>
              ${currentData.map(row => 
                `<tr>${Object.values(row).map(value => `<td>${value}</td>`).join('')}</tr>`
              ).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
    
    toast({
      title: "PDF Generated",
      description: "Report has been prepared for printing/saving as PDF.",
    });
  };

  const generateReport = () => {
    toast({
      title: "Report Generated",
      description: `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report has been generated successfully.`,
    });
  };

  const getReportHeaders = () => {
    switch (reportType) {
      case "inventory":
        return ["Product", "Category", "Stock", "Value", "Supplier"];
      case "sales":
        return ["Date", "Product", "Quantity", "Amount", "Customer"];
      case "purchase":
        return ["Date", "Supplier", "Product", "Quantity", "Amount"];
      case "profitLoss":
        return ["Period", "Revenue", "Expenses", "Profit", "Margin"];
      default:
        return [];
    }
  };

  const getCurrentData = () => {
    return reportData[reportType as keyof typeof reportData] || [];
  };

  const getReportSummary = () => {
    const data = getCurrentData();
    switch (reportType) {
      case "inventory":
        return {
          totalItems: data.length,
          totalValue: data.reduce((sum: number, item: any) => sum + item.value, 0),
          lowStock: data.filter((item: any) => item.stock < 10).length,
        };
      case "sales":
        return {
          totalSales: data.length,
          totalRevenue: data.reduce((sum: number, item: any) => sum + item.amount, 0),
          avgOrderValue: data.length > 0 ? (data.reduce((sum: number, item: any) => sum + item.amount, 0) / data.length).toFixed(2) : 0,
        };
      case "purchase":
        return {
          totalOrders: data.length,
          totalAmount: data.reduce((sum: number, item: any) => sum + item.amount, 0),
          uniqueSuppliers: [...new Set(data.map((item: any) => item.supplier))].length,
        };
      case "profitLoss":
        return {
          totalRevenue: data.reduce((sum: number, item: any) => sum + item.revenue, 0),
          totalExpenses: data.reduce((sum: number, item: any) => sum + item.expenses, 0),
          totalProfit: data.reduce((sum: number, item: any) => sum + item.profit, 0),
        };
      default:
        return {};
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Advanced Reports</h1>
            <p className="text-muted-foreground">Generate comprehensive business reports</p>
          </div>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Report Filters
            </CardTitle>
            <CardDescription>Configure your report parameters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reportType">Report Type</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inventory">Inventory Report</SelectItem>
                    <SelectItem value="sales">Sales Report</SelectItem>
                    <SelectItem value="purchase">Purchase Report</SelectItem>
                    <SelectItem value="profitLoss">Profit & Loss</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dateFrom">From Date</Label>
                <Input
                  id="dateFrom"
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dateTo">To Date</Label>
                <Input
                  id="dateTo"
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier Filter</Label>
                <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
                  <SelectTrigger>
                    <SelectValue placeholder="All suppliers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Suppliers</SelectItem>
                    <SelectItem value="tech-supplies">Tech Supplies Co.</SelectItem>
                    <SelectItem value="fashion-hub">Fashion Hub</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button onClick={generateReport}>
                <TrendingUp className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline" onClick={() => exportToCSV(getCurrentData(), `${reportType}_report`)}>
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button variant="outline" onClick={exportToPDF}>
                <FileText className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Report Summary Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          {Object.entries(getReportSummary()).map(([key, value]) => (
            <Card key={key} className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  {key.includes('total') || key.includes('revenue') ? 
                    <DollarSign className="w-4 h-4 text-green-500" /> :
                    key.includes('stock') || key.includes('Items') ?
                    <Package className="w-4 h-4 text-blue-500" /> :
                    <Users className="w-4 h-4 text-purple-500" />
                  }
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </p>
                    <p className="text-lg font-semibold">
                      {typeof value === 'number' && key.includes('amount') || key.includes('revenue') || key.includes('value') || key.includes('profit') || key.includes('expenses') ? 
                        `₹${value.toLocaleString()}` : 
                        value
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>
              {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report
            </CardTitle>
            <CardDescription>
              Detailed {reportType} information
              {dateFrom && dateTo && ` from ${dateFrom} to ${dateTo}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  {getReportHeaders().map((header) => (
                    <TableHead key={header}>{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {getCurrentData().map((row: any, index: number) => (
                  <TableRow key={index}>
                    {Object.values(row).map((value: any, cellIndex: number) => (
                      <TableCell key={cellIndex}>
                        {typeof value === 'number' && getReportHeaders()[cellIndex]?.toLowerCase().includes('amount') ||
                         getReportHeaders()[cellIndex]?.toLowerCase().includes('value') ||
                         getReportHeaders()[cellIndex]?.toLowerCase().includes('revenue') ||
                         getReportHeaders()[cellIndex]?.toLowerCase().includes('expenses') ||
                         getReportHeaders()[cellIndex]?.toLowerCase().includes('profit') ? 
                          `₹${value.toLocaleString()}` : 
                          value
                        }
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdvancedReports;