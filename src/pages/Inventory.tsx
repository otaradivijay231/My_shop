import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Package, PackagePlus, PackageMinus, AlertTriangle, Eye } from "lucide-react";

interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  type: "in" | "out" | "adjustment";
  quantity: number;
  reason: string;
  date: string;
  batchNumber?: string;
  expiryDate?: string;
  reference: string;
}

interface Product {
  id: string;
  name: string;
  currentStock: number;
  minStockLevel: number;
  unit: string;
}

const Inventory = () => {
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);
  const [products] = useState<Product[]>([
    { id: "1", name: "Laptop", currentStock: 5, minStockLevel: 10, unit: "pcs" },
    { id: "2", name: "T-Shirt", currentStock: 50, minStockLevel: 20, unit: "pcs" },
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMovement, setSelectedMovement] = useState<StockMovement | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    productId: "",
    type: "in" as "in" | "out" | "adjustment",
    quantity: 0,
    reason: "",
    batchNumber: "",
    expiryDate: "",
    reference: "",
  });

  useEffect(() => {
    // Load sample stock movements
    const sampleMovements: StockMovement[] = [
      {
        id: "1",
        productId: "1",
        productName: "Laptop",
        type: "in",
        quantity: 10,
        reason: "Purchase order",
        date: new Date().toISOString(),
        reference: "PO-001",
      },
      {
        id: "2",
        productId: "2",
        productName: "T-Shirt",
        type: "out",
        quantity: 5,
        reason: "Sale",
        date: new Date().toISOString(),
        reference: "SALE-001",
      },
    ];
    setStockMovements(sampleMovements);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedProduct = products.find(p => p.id === formData.productId);
    if (!selectedProduct) return;

    const newMovement: StockMovement = {
      id: Date.now().toString(),
      productName: selectedProduct.name,
      ...formData,
      date: new Date().toISOString(),
    };

    setStockMovements([...stockMovements, newMovement]);
    
    toast({
      title: "Stock Movement Recorded",
      description: `${formData.type === "in" ? "Stock In" : formData.type === "out" ? "Stock Out" : "Stock Adjustment"} recorded successfully.`,
    });

    resetForm();
    setIsDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      productId: "",
      type: "in",
      quantity: 0,
      reason: "",
      batchNumber: "",
      expiryDate: "",
      reference: "",
    });
  };

  const filteredMovements = stockMovements.filter(movement => {
    const matchesSearch = movement.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movement.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || movement.type === selectedType;
    return matchesSearch && matchesType;
  });

  const lowStockProducts = products.filter(p => p.currentStock <= p.minStockLevel);

  const getMovementIcon = (type: string) => {
    switch (type) {
      case "in":
        return <PackagePlus className="w-4 h-4 text-green-500" />;
      case "out":
        return <PackageMinus className="w-4 h-4 text-red-500" />;
      case "adjustment":
        return <Package className="w-4 h-4 text-blue-500" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getMovementBadgeVariant = (type: string) => {
    switch (type) {
      case "in":
        return "default";
      case "out":
        return "destructive";
      case "adjustment":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Inventory Management</h1>
            <p className="text-muted-foreground">Track stock movements and manage inventory levels</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                Record Stock Movement
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Record Stock Movement</DialogTitle>
                <DialogDescription>Enter stock movement details</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="product">Product</Label>
                    <Select value={formData.productId} onValueChange={(value) => setFormData({ ...formData, productId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map(product => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name} (Current: {product.currentStock} {product.unit})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Movement Type</Label>
                    <Select value={formData.type} onValueChange={(value: "in" | "out" | "adjustment") => setFormData({ ...formData, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in">Stock In</SelectItem>
                        <SelectItem value="out">Stock Out</SelectItem>
                        <SelectItem value="adjustment">Stock Adjustment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason</Label>
                    <Input
                      id="reason"
                      value={formData.reason}
                      onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                      placeholder="e.g., Purchase, Sale, Damaged, etc."
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reference">Reference</Label>
                    <Input
                      id="reference"
                      value={formData.reference}
                      onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                      placeholder="e.g., PO-001, SALE-001"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="batchNumber">Batch Number (Optional)</Label>
                    <Input
                      id="batchNumber"
                      value={formData.batchNumber}
                      onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
                    <Input
                      id="expiryDate"
                      type="date"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Record Movement</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {lowStockProducts.length > 0 && (
          <Card className="border-destructive/50 bg-destructive/5">
            <CardHeader>
              <CardTitle className="text-destructive flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Low Stock Alert
              </CardTitle>
              <CardDescription>
                {lowStockProducts.length} product(s) are running low on stock
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {lowStockProducts.map(product => (
                  <div key={product.id} className="flex justify-between items-center">
                    <span>{product.name}</span>
                    <Badge variant="destructive">{product.currentStock} {product.unit} left</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="glass-card">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Stock Movements</CardTitle>
              <div className="flex gap-4">
                <Input
                  placeholder="Search movements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="in">Stock In</SelectItem>
                    <SelectItem value="out">Stock Out</SelectItem>
                    <SelectItem value="adjustment">Adjustment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMovements.map((movement) => (
                  <TableRow key={movement.id}>
                    <TableCell>
                      {new Date(movement.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium">{movement.productName}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getMovementIcon(movement.type)}
                        <Badge variant={getMovementBadgeVariant(movement.type)}>
                          {movement.type.toUpperCase()}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={movement.type === "out" ? "text-red-500" : "text-green-500"}>
                        {movement.type === "out" ? "-" : "+"}{movement.quantity}
                      </span>
                    </TableCell>
                    <TableCell>{movement.reason}</TableCell>
                    <TableCell>{movement.reference}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedMovement(movement)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {selectedMovement && (
          <Dialog open={!!selectedMovement} onOpenChange={() => setSelectedMovement(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Movement Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Product</Label>
                  <p className="font-medium">{selectedMovement.productName}</p>
                </div>
                <div>
                  <Label>Type</Label>
                  <div className="flex items-center gap-2">
                    {getMovementIcon(selectedMovement.type)}
                    <Badge variant={getMovementBadgeVariant(selectedMovement.type)}>
                      {selectedMovement.type.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label>Quantity</Label>
                  <p className="font-medium">{selectedMovement.quantity}</p>
                </div>
                <div>
                  <Label>Reason</Label>
                  <p className="font-medium">{selectedMovement.reason}</p>
                </div>
                <div>
                  <Label>Reference</Label>
                  <p className="font-medium">{selectedMovement.reference}</p>
                </div>
                <div>
                  <Label>Date</Label>
                  <p className="font-medium">{new Date(selectedMovement.date).toLocaleString()}</p>
                </div>
                {selectedMovement.batchNumber && (
                  <div>
                    <Label>Batch Number</Label>
                    <p className="font-medium">{selectedMovement.batchNumber}</p>
                  </div>
                )}
                {selectedMovement.expiryDate && (
                  <div>
                    <Label>Expiry Date</Label>
                    <p className="font-medium">{new Date(selectedMovement.expiryDate).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Inventory;