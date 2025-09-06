import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Folder, FolderOpen } from "lucide-react";

interface Category {
  id: string;
  name: string;
  description: string;
  subcategories: Subcategory[];
  createdAt: string;
}

interface Subcategory {
  id: string;
  name: string;
  description: string;
  categoryId: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "Electronics",
      description: "Electronic devices and accessories",
      subcategories: [
        { id: "1", name: "Computers", description: "Laptops, PCs, tablets", categoryId: "1" },
        { id: "2", name: "Mobile", description: "Smartphones and accessories", categoryId: "1" },
      ],
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Clothing",
      description: "Apparel and fashion items",
      subcategories: [
        { id: "3", name: "Casual", description: "Casual wear", categoryId: "2" },
        { id: "4", name: "Formal", description: "Formal attire", categoryId: "2" },
      ],
      createdAt: new Date().toISOString(),
    },
  ]);

  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isSubcategoryDialogOpen, setIsSubcategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingSubcategory, setEditingSubcategory] = useState<Subcategory | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const { toast } = useToast();

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
  });

  const [subcategoryForm, setSubcategoryForm] = useState({
    name: "",
    description: "",
    categoryId: "",
  });

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCategory) {
      setCategories(categories.map(c => 
        c.id === editingCategory.id 
          ? { ...editingCategory, ...categoryForm }
          : c
      ));
      toast({
        title: "Category Updated",
        description: "Category has been updated successfully.",
      });
    } else {
      const newCategory: Category = {
        id: Date.now().toString(),
        ...categoryForm,
        subcategories: [],
        createdAt: new Date().toISOString(),
      };
      setCategories([...categories, newCategory]);
      toast({
        title: "Category Added",
        description: "New category has been added successfully.",
      });
    }

    resetCategoryForm();
    setIsCategoryDialogOpen(false);
  };

  const handleSubcategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSubcategory) {
      setCategories(categories.map(c => ({
        ...c,
        subcategories: c.subcategories.map(s => 
          s.id === editingSubcategory.id 
            ? { ...editingSubcategory, ...subcategoryForm }
            : s
        )
      })));
      toast({
        title: "Subcategory Updated",
        description: "Subcategory has been updated successfully.",
      });
    } else {
      const newSubcategory: Subcategory = {
        id: Date.now().toString(),
        ...subcategoryForm,
      };
      
      setCategories(categories.map(c => 
        c.id === subcategoryForm.categoryId 
          ? { ...c, subcategories: [...c.subcategories, newSubcategory] }
          : c
      ));
      
      toast({
        title: "Subcategory Added",
        description: "New subcategory has been added successfully.",
      });
    }

    resetSubcategoryForm();
    setIsSubcategoryDialogOpen(false);
  };

  const resetCategoryForm = () => {
    setCategoryForm({ name: "", description: "" });
    setEditingCategory(null);
  };

  const resetSubcategoryForm = () => {
    setSubcategoryForm({ name: "", description: "", categoryId: "" });
    setEditingSubcategory(null);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setCategoryForm({ name: category.name, description: category.description });
    setIsCategoryDialogOpen(true);
  };

  const handleEditSubcategory = (subcategory: Subcategory) => {
    setEditingSubcategory(subcategory);
    setSubcategoryForm({ 
      name: subcategory.name, 
      description: subcategory.description,
      categoryId: subcategory.categoryId 
    });
    setIsSubcategoryDialogOpen(true);
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
    toast({
      title: "Category Deleted",
      description: "Category has been deleted successfully.",
    });
  };

  const handleDeleteSubcategory = (categoryId: string, subcategoryId: string) => {
    setCategories(categories.map(c => 
      c.id === categoryId 
        ? { ...c, subcategories: c.subcategories.filter(s => s.id !== subcategoryId) }
        : c
    ));
    toast({
      title: "Subcategory Deleted",
      description: "Subcategory has been deleted successfully.",
    });
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Categories Management</h1>
            <p className="text-muted-foreground">Manage product categories and subcategories</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetCategoryForm}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
                  <DialogDescription>
                    {editingCategory ? "Update category details" : "Enter category information"}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCategorySubmit}>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="categoryName">Category Name</Label>
                      <Input
                        id="categoryName"
                        value={categoryForm.name}
                        onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="categoryDescription">Description</Label>
                      <Input
                        id="categoryDescription"
                        value={categoryForm.description}
                        onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingCategory ? "Update" : "Add"} Category
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={isSubcategoryDialogOpen} onOpenChange={setIsSubcategoryDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" onClick={resetSubcategoryForm}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Subcategory
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingSubcategory ? "Edit Subcategory" : "Add New Subcategory"}</DialogTitle>
                  <DialogDescription>
                    {editingSubcategory ? "Update subcategory details" : "Enter subcategory information"}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubcategorySubmit}>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="subcategoryCategory">Parent Category</Label>
                      <select
                        id="subcategoryCategory"
                        className="w-full p-2 border rounded-md"
                        value={subcategoryForm.categoryId}
                        onChange={(e) => setSubcategoryForm({ ...subcategoryForm, categoryId: e.target.value })}
                        required
                      >
                        <option value="">Select a category</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subcategoryName">Subcategory Name</Label>
                      <Input
                        id="subcategoryName"
                        value={subcategoryForm.name}
                        onChange={(e) => setSubcategoryForm({ ...subcategoryForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subcategoryDescription">Description</Label>
                      <Input
                        id="subcategoryDescription"
                        value={subcategoryForm.description}
                        onChange={(e) => setSubcategoryForm({ ...subcategoryForm, description: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsSubcategoryDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingSubcategory ? "Update" : "Add"} Subcategory
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="glass-card">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Folder className="w-5 h-5 text-primary" />
                    <CardTitle>{category.name}</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditCategory(category)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Subcategories:</h4>
                  {category.subcategories.length > 0 ? (
                    <div className="grid gap-2">
                      {category.subcategories.map((subcategory) => (
                        <div
                          key={subcategory.id}
                          className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"
                        >
                          <div className="flex items-center gap-2">
                            <FolderOpen className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{subcategory.name}</p>
                              <p className="text-sm text-muted-foreground">{subcategory.description}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditSubcategory(subcategory)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteSubcategory(category.id, subcategory.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No subcategories yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Categories;