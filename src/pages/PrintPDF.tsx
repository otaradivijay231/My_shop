import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Printer, Download, Eye, FileText } from "lucide-react"

const PrintPDF = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Print & PDF</h1>
          <p className="text-muted-foreground mt-2">Generate and print documents</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Printer className="mr-2 h-4 w-4" />
          Print Document
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        {["Invoice Template", "Sales Report", "Customer List"].map((doc) => (
          <Card key={doc} className="glass-card hover-lift cursor-pointer">
            <CardContent className="p-6 text-center">
              <FileText className="h-8 w-8 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">{doc}</h3>
              <div className="flex gap-2 justify-center">
                <Button size="sm" variant="outline"><Eye className="h-4 w-4" /></Button>
                <Button size="sm" variant="outline"><Download className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </DashboardLayout>
)

export default PrintPDF