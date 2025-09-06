import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Eye, FileText, Package, Phone, Mail, MapPin } from "lucide-react";

interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  contactPerson: string;
  gstNumber: string;
  paymentTerms: string;
  status: "active" | "inactive";
  totalOrders: number;
  totalValue: number;
  createdAt: string;
}

interface PurchaseOrder {
  id: string;
  supplierId: string;
  supplierName: string;
  orderDate: string;
  expectedDelivery: string;
  status: "pending" | "delivered" | "cancelled";
  totalAmount: number;
  items: {
    productName: string;
    quantity: number;
    unitPrice: number;
  }[];
}

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: "1",
      name: "Tech Supplies Co.",
      email: "contact@techsupplies.com",
      phone: "+91 9876543210",
      address: "123 Tech Street, Mumbai, Maharashtra",
      contactPerson: "John Doe",
      gstNumber: "27AABCT1234L1Z5",
      paymentTerms: "30 days",
      status: "active",
      totalOrders: 15,
      totalValue: 150000,
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Fashion Hub",
      email: "orders@fashionhub.com",
      phone: "+91 9876543211",
      address: "456 Fashion Avenue, Delhi",
      contactPerson: "Jane Smith",
      gstNumber: "07AABCF1234L1Z5",
      paymentTerms: "15 days",
      status: "active",
      totalOrders: 8,
      totalValue: 75000,
      createdAt: new Date().toISOString(),
    },
  ]);

  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([
    {
      id: "PO-001",
      supplierId: "1",
      supplierName: "Tech Supplies Co.",
      orderDate: new Date().toISOString(),
      expectedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: "pending",
      totalAmount: 25000,
      items: [
        { productName: "Laptop", quantity: 5, unitPrice: 50000 },
      ],
    },
  ]);

  const [isSupplierDialogOpen, setIsSupplierDialogOpen] = useState(false);
  const [isPODialogOpen, setIsPODialogOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const [supplierForm, setSupplierForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    contactPerson: "",
    gstNumber: "",
    paymentTerms: "",
  });

  const [poForm, setPOForm] = useState({
    supplierId: "",
    expectedDelivery: "",
    items: [{ productName: "", quantity: 1, unitPrice: 0 }],
  });

  const handleSupplierSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSupplier) {
      setSuppliers(suppliers.map(s => 
        s.id === editingSupplier.id 
          ? { ...editingSupplier, ...supplierForm }
          : s
      ));
      toast({
        title: "Supplier Updated",
        description: "Supplier has been updated successfully.",
      });
    } else {
      const newSupplier: Supplier = {
        id: Date.now().toString(),
        ...supplierForm,
        status: "active",
        totalOrders: 0,
        totalValue: 0,
        createdAt: new Date().toISOString(),
      };
      setSuppliers([...suppliers, newSupplier]);
      toast({
        title: "Supplier Added",
        description: "New supplier has been added successfully.",
      });
    }

    resetSupplierForm();
    setIsSupplierDialogOpen(false);
  };

  const handlePOSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const supplier = suppliers.find(s => s.id === poForm.supplierId);
    if (!supplier) return;

    const totalAmount = poForm.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    
    const newPO: PurchaseOrder = {
      id: `PO-${Date.now()}`,
      supplierId: poForm.supplierId,
      supplierName: supplier.name,
      orderDate: new Date().toISOString(),
      expectedDelivery: poForm.expectedDelivery,
      status: "pending",
      totalAmount,
      items: poForm.items,
    };

    setPurchaseOrders([...purchaseOrders, newPO]);
    toast({
      title: "Purchase Order Created",
      description: "Purchase order has been created successfully.",
    });

    resetPOForm();
    setIsPODialogOpen(false);
  };

  const resetSupplierForm = () => {
    setSupplierForm({
      name: "",
      email: "",
      phone: "",
      address: "",
      contactPerson: "",
      gstNumber: "",
      paymentTerms: "",
    });
    setEditingSupplier(null);
  };

  const resetPOForm = () => {
    setPOForm({
      supplierId: "",
      expectedDelivery: "",
      items: [{ productName: "", quantity: 1, unitPrice: 0 }],
    });
  };

  const handleEditSupplier = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setSupplierForm({
      name: supplier.name,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
      contactPerson: supplier.contactPerson,
      gstNumber: supplier.gstNumber,
      paymentTerms: supplier.paymentTerms,
    });
    setIsSupplierDialogOpen(true);
  };

  const handleDeleteSupplier = (id: string) => {
    setSuppliers(suppliers.filter(s => s.id !== id));
    toast({
      title: "Supplier Deleted",
      description: "Supplier has been deleted successfully.",
    });
  };

  const addPOItem = () => {
    setPOForm({
      ...poForm,
      items: [...poForm.items, { productName: "", quantity: 1, unitPrice: 0 }],
    });
  };

  const removePOItem = (index: number) => {
    if (poForm.items.length > 1) {
      setPOForm({
        ...poForm,
        items: poForm.items.filter((_, i) => i !== index),
      });
    }
  };

  const updatePOItem = (index: number, field: string, value: any) => {
    setPOForm({
      ...poForm,
      items: poForm.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      ),
    });
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "inactive":
        return "secondary";
      case "pending":
        return "secondary";
      case "delivered":
        return "default";
      case "cancelled":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Suppliers Management</h1>
            <p className="text-muted-foreground">Manage suppliers and purchase orders</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isSupplierDialogOpen} onOpenChange={setIsSupplierDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetSupplierForm}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Supplier
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingSupplier ? "Edit Supplier" : "Add New Supplier"}</DialogTitle>
                  <DialogDescription>
                    {editingSupplier ? "Update supplier details" : "Enter supplier information"}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSupplierSubmit}>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Supplier Name</Label>
                      <Input
                        id="name"
                        value={supplierForm.name}
                        onChange={(e) => setSupplierForm({ ...supplierForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson">Contact Person</Label>
                      <Input
                        id="contactPerson"
                        value={supplierForm.contactPerson}
                        onChange={(e) => setSupplierForm({ ...supplierForm, contactPerson: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={supplierForm.email}
                        onChange={(e) => setSupplierForm({ ...supplierForm, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={supplierForm.phone}
                        onChange={(e) => setSupplierForm({ ...supplierForm, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        value={supplierForm.address}
                        onChange={(e) => setSupplierForm({ ...supplierForm, address: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gstNumber">GST Number</Label>
                      <Input
                        id="gstNumber"
                        value={supplierForm.gstNumber}
                        onChange={(e) => setSupplierForm({ ...supplierForm, gstNumber: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paymentTerms">Payment Terms</Label>
                      <Input
                        id="paymentTerms"
                        value={supplierForm.paymentTerms}
                        onChange={(e) => setSupplierForm({ ...supplierForm, paymentTerms: e.target.value })}
                        placeholder="e.g., 30 days"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsSupplierDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingSupplier ? "Update" : "Add"} Supplier
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={isPODialogOpen} onOpenChange={setIsPODialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" onClick={resetPOForm}>
                  <FileText className="w-4 h-4 mr-2" />
                  Create Purchase Order
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Create Purchase Order</DialogTitle>
                  <DialogDescription>Enter purchase order details</DialogDescription>
                </DialogHeader>
                <form onSubmit={handlePOSubmit}>
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="supplier">Supplier</Label>
                        <select
                          id="supplier"
                          className="w-full p-2 border rounded-md"
                          value={poForm.supplierId}
                          onChange={(e) => setPOForm({ ...poForm, supplierId: e.target.value })}
                          required
                        >
                          <option value="">Select a supplier</option>
                          {suppliers.filter(s => s.status === "active").map(supplier => (
                            <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expectedDelivery">Expected Delivery</Label>
                        <Input
                          id="expectedDelivery"
                          type="date"
                          value={poForm.expectedDelivery}
                          onChange={(e) => setPOForm({ ...poForm, expectedDelivery: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label>Order Items</Label>
                        <Button type="button" variant="outline" size="sm" onClick={addPOItem}>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Item
                        </Button>
                      </div>
                      
                      {poForm.items.map((item, index) => (
                        <div key={index} className="grid grid-cols-4 gap-2 items-end">
                          <div className="space-y-1">
                            <Label>Product Name</Label>
                            <Input
                              value={item.productName}
                              onChange={(e) => updatePOItem(index, "productName", e.target.value)}
                              placeholder="Product name"
                              required
                            />
                          </div>
                          <div className="space-y-1">
                            <Label>Quantity</Label>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updatePOItem(index, "quantity", Number(e.target.value))}
                              min="1"
                              required
                            />
                          </div>
                          <div className="space-y-1">
                            <Label>Unit Price</Label>
                            <Input
                              type="number"
                              value={item.unitPrice}
                              onChange={(e) => updatePOItem(index, "unitPrice", Number(e.target.value))}
                              min="0"
                              step="0.01"
                              required
                            />
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removePOItem(index)}
                            disabled={poForm.items.length === 1}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      
                      <div className="text-right font-medium">
                        Total: ₹{poForm.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsPODialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Create Purchase Order</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Suppliers</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{suppliers.length}</div>
              <p className="text-xs text-muted-foreground">
                {suppliers.filter(s => s.status === "active").length} active
              </p>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Purchase Orders</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{purchaseOrders.length}</div>
              <p className="text-xs text-muted-foreground">
                {purchaseOrders.filter(po => po.status === "pending").length} pending
              </p>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₹{suppliers.reduce((sum, s) => sum + s.totalValue, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">All time purchases</p>
            </CardContent>
          </Card>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Suppliers List</CardTitle>
              <Input
                placeholder="Search suppliers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Supplier Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{supplier.name}</p>
                        <p className="text-sm text-muted-foreground">{supplier.contactPerson}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="w-3 h-3" />
                          {supplier.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="w-3 h-3" />
                          {supplier.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{supplier.totalOrders}</TableCell>
                    <TableCell>₹{supplier.totalValue.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(supplier.status)}>
                        {supplier.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedSupplier(supplier)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditSupplier(supplier)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteSupplier(supplier.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Recent Purchase Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PO Number</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Expected Delivery</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchaseOrders.map((po) => (
                  <TableRow key={po.id}>
                    <TableCell className="font-medium">{po.id}</TableCell>
                    <TableCell>{po.supplierName}</TableCell>
                    <TableCell>{new Date(po.orderDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(po.expectedDelivery).toLocaleDateString()}</TableCell>
                    <TableCell>₹{po.totalAmount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(po.status)}>
                        {po.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {selectedSupplier && (
          <Dialog open={!!selectedSupplier} onOpenChange={() => setSelectedSupplier(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Supplier Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Supplier Name</Label>
                    <p className="font-medium">{selectedSupplier.name}</p>
                  </div>
                  <div>
                    <Label>Contact Person</Label>
                    <p className="font-medium">{selectedSupplier.contactPerson}</p>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <p className="font-medium">{selectedSupplier.email}</p>
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <p className="font-medium">{selectedSupplier.phone}</p>
                  </div>
                  <div className="col-span-2">
                    <Label>Address</Label>
                    <p className="font-medium">{selectedSupplier.address}</p>
                  </div>
                  <div>
                    <Label>GST Number</Label>
                    <p className="font-medium">{selectedSupplier.gstNumber || "N/A"}</p>
                  </div>
                  <div>
                    <Label>Payment Terms</Label>
                    <p className="font-medium">{selectedSupplier.paymentTerms || "N/A"}</p>
                  </div>
                  <div>
                    <Label>Total Orders</Label>
                    <p className="font-medium">{selectedSupplier.totalOrders}</p>
                  </div>
                  <div>
                    <Label>Total Value</Label>
                    <p className="font-medium">₹{selectedSupplier.totalValue.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Suppliers;