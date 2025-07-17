import { useState, useEffect, useMemo, FC, FormEvent } from 'react';
import toast from 'react-hot-toast';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AdminTable from "@/components/admin/AdminTable";
import PageHeader from '@/components/admin/PageHeader';
import Modal from '@/components/admin/Modal';
import { Trash2, Edit, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { db } from '../../firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc 
} from "firebase/firestore";

// --- TYPE DEFINITIONS ---
interface Product {
  id: string; 
  name: string;
  price: string;
  stock: number;
  category: string;
}
type NewProduct = Omit<Product, 'id'>;

// --- FORM COMPONENT ---
interface ProductFormProps {
    onSubmit: (product: NewProduct) => void;
    onCancel: () => void;
    initialData?: NewProduct | null;
}
const ProductForm: FC<ProductFormProps> = ({ onSubmit, onCancel, initialData }) => {
    const [formData, setFormData] = useState<NewProduct>(
        initialData || { name: '', category: '', price: '', stock: 0 }
    );
    const isEditMode = !!initialData;

    useEffect(() => {
        setFormData(initialData || { name: '', category: '', price: '', stock: 0 });
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseInt(value, 10) || 0 : value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    // --- ADD THIS RETURN STATEMENT WITH THE JSX ---
    return (
        <form onSubmit={handleSubmit} className="space-y-4 text-white">
            <div>
                <label className="block text-sm font-medium text-purple-300 mb-1">Product Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-black/30 p-2 rounded-md border border-purple-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none" />
            </div>
            <div>
                <label className="block text-sm font-medium text-purple-300 mb-1">Category</label>
                <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full bg-black/30 p-2 rounded-md border border-purple-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none" />
            </div>
            <div className="flex gap-4">
                <div className="w-1/2">
                    <label className="block text-sm font-medium text-purple-300 mb-1">Price</label>
                    <input type="text" name="price" placeholder="$9.99" value={formData.price} onChange={handleChange} required className="w-full bg-black/30 p-2 rounded-md border border-purple-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none" />
                </div>
                <div className="w-1/2">
                    <label className="block text-sm font-medium text-purple-300 mb-1">Stock</label>
                    <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full bg-black/30 p-2 rounded-md border border-purple-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none" />
                </div>
            </div>
            <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md bg-black/20 text-gray-300 hover:bg-black/40">Cancel</button>
                <button type="submit" className="px-6 py-2 rounded-md font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90">
                    {isEditMode ? 'Save Changes' : 'Add Product'}
                </button>
            </div>
        </form>
    );
};



// --- MAIN PAGE COMPONENT ---
const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
  
  const productsCollectionRef = collection(db, "products");

  // Fetch products from Firestore
  const getProducts = async () => {
    setIsLoading(true);
    try {
      const data = await getDocs(productsCollectionRef);
      const fetchedProducts = data.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Product[];
      setProducts(fetchedProducts);
    } catch (error) {
      toast.error("Failed to fetch products.");
      console.error("Error fetching products: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // --- CRUD Handlers for Firestore ---

  const handleFormSubmit = async (productData: NewProduct) => {
    if (editingProduct) {
      // UPDATE logic
      const productDoc = doc(db, "products", editingProduct.id);
      await updateDoc(productDoc, productData);
      toast.success("Product updated successfully!");
    } else {
      // CREATE logic
      await addDoc(productsCollectionRef, productData);
      toast.success("Product added successfully!");
    }
    closeFormModal();
    getProducts(); // Refresh the list
  };

  const handleDeleteConfirm = async () => {
    if (deletingProductId) {
      // DELETE logic
      const productDoc = doc(db, "products", deletingProductId);
      await deleteDoc(productDoc);
      toast.success("Product deleted successfully!");
      closeDeleteModal();
      getProducts(); // Refresh the list
    }
  };

  // --- Modal Control Functions ---
  const openFormModal = (product: Product | null = null) => { setEditingProduct(product); setIsFormModalOpen(true); };
  const closeFormModal = () => { setEditingProduct(null); setIsFormModalOpen(false); };
  const openDeleteModal = (id: string) => { setDeletingProductId(id); setIsDeleteModalOpen(true); };
  const closeDeleteModal = () => { setDeletingProductId(null); setIsDeleteModalOpen(false); };
  
  // This client-side filtering still works perfectly
  const filteredProducts = useMemo(() => 
    products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    ), [products, searchQuery]);

  const columns: { key: keyof Product | 'actions'; label: string; render?: (...args: any) => React.ReactNode; sortable?: boolean; }[] = [
    { key: "name", label: "Product Name", sortable: true },
    { key: "category", label: "Category", sortable: true },
    { key: "price", label: "Price", sortable: true },
    { key: "stock", label: "Stock", sortable: true },
    {
      key: "actions", label: "Actions", sortable: false,
      render: (_, row: Product) => (
        <div className="flex gap-2">
          <motion.button onClick={() => openFormModal(row)} whileTap={{ scale: 0.9 }} className="p-2 text-cyan-400 hover:text-cyan-200"><Edit size={16} /></motion.button>
          <motion.button onClick={() => openDeleteModal(row.id)} whileTap={{ scale: 0.9 }} className="p-2 text-red-500 hover:text-red-400"><Trash2 size={16} /></motion.button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Modal isOpen={isFormModalOpen} onClose={closeFormModal} title={editingProduct ? "Edit Product" : "Add New Product"}>
        <ProductForm 
            onSubmit={handleFormSubmit} 
            onCancel={closeFormModal} 
            initialData={editingProduct}
        />
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} title="Confirm Deletion">
        <div className="text-white">
            <div className="flex items-center gap-4 mb-4">
                <AlertTriangle className="text-red-500" size={40} />
                <p>Are you sure you want to delete this product? This action cannot be undone.</p>
            </div>
            <div className="flex justify-end gap-4 pt-4">
                <button onClick={closeDeleteModal} className="px-4 py-2 rounded-md bg-black/20 text-gray-300 hover:bg-black/40">Cancel</button>
                <button onClick={handleDeleteConfirm} className="px-6 py-2 rounded-md font-semibold text-white bg-red-600 hover:bg-red-700">Delete</button>
            </div>
        </div>
      </Modal>

      <div className="grid gap-6">
        <Card className="bg-black/20 border border-purple-700/30 shadow-lg">
          <CardHeader>
            <PageHeader
              title="Products Management"
              buttonText="Add Product"
              searchPlaceholder="Search by name or category..."
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onButtonClick={() => openFormModal()}
            />
          </CardHeader>
          <CardContent>
            <AdminTable 
              data={filteredProducts} 
              columns={columns} 
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProductsPage;