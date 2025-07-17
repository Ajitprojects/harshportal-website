import React, { useState, useEffect, useMemo, FC, FormEvent } from 'react';
import toast from 'react-hot-toast';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AdminTable from "@/components/admin/AdminTable";
import PageHeader from '@/components/admin/PageHeader';
import Modal from '@/components/admin/Modal';
import { Trash2, Edit, AlertTriangle, PlusCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from '../../supabase';
import { Product } from '../../types';

type NewProductData = Omit<Product, 'id' | 'docId'>;

// --- FORM COMPONENT ---
interface ProductFormProps {
    onSubmit: (product: Partial<NewProductData>) => void;
    onCancel: () => void;
    initialData?: Product | null;
    existingCategories: string[];
}

const ProductForm: FC<ProductFormProps> = ({ onSubmit, onCancel, initialData, existingCategories }) => {
    const [formData, setFormData] = useState({
        name: '', price: 0, originalPrice: 0, stock: 0, category: '',
        tags: '', gradient: '', image: '', description: '',
        features: [{ title: '', desc: '' }]
    });
    const [newCategory, setNewCategory] = useState('');
    const isEditMode = !!initialData;

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                price: initialData.price || 0,
                originalPrice: initialData.originalPrice || 0,
                stock: initialData.stock || 0,
                category: initialData.category || '',
                tags: initialData.tags?.join(', ') || '',
                gradient: initialData.gradient?.join(', ') || '',
                features: initialData.features?.length ? initialData.features : [{ title: '', desc: '' }],
                image: initialData.image || '',
                description: initialData.description || '',
            });
        } else {
            setFormData({
                name: '', price: 0, originalPrice: 0, stock: 0, category: '',
                tags: '', gradient: '', image: '', description: '',
                features: [{ title: '', desc: '' }]
            });
        }
        setNewCategory('');
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFeatureChange = (index: number, field: 'title' | 'desc', value: string) => {
        const updatedFeatures = [...formData.features];
        updatedFeatures[index][field] = value;
        setFormData(prev => ({ ...prev, features: updatedFeatures }));
    };

    const addFeature = () => setFormData(prev => ({ ...prev, features: [...prev.features, { title: '', desc: '' }] }));
    const removeFeature = (index: number) => setFormData(prev => ({ ...prev, features: formData.features.filter((_, i) => i !== index) }));

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const finalCategory = formData.category === 'add_new' ? newCategory : formData.category;
        if (!finalCategory) {
            toast.error("Please select or add a category.");
            return;
        }

        const finalData = {
            name: formData.name,
            price: Number(formData.price) || 0,
            originalPrice: Number(formData.originalPrice) || undefined,
            stock: Number(formData.stock) || 0,
            category: finalCategory,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
            gradient: formData.gradient.split(',').map(g => g.trim()).filter(Boolean),
            features: formData.features.filter(f => f.title && f.desc),
            image: formData.image,
            description: formData.description,
        };
        onSubmit(finalData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 text-white max-h-[70vh] overflow-y-auto p-1 pr-4">
            <div>
                <label className="block text-sm font-medium text-purple-300 mb-1">Product Name</label>
                <input name="name" value={formData.name} onChange={handleChange} required className="w-full bg-black/30 p-2 rounded-md border border-purple-400" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-purple-300 mb-1">Price</label>
                    <input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required className="w-full bg-black/30 p-2 rounded-md border border-purple-400" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-purple-300 mb-1">Original Price (Optional)</label>
                    <input name="originalPrice" type="number" step="0.01" value={formData.originalPrice} onChange={handleChange} className="w-full bg-black/30 p-2 rounded-md border border-purple-400" />
                </div>
            </div>
             <div>
                <label className="block text-sm font-medium text-purple-300 mb-1">Stock</label>
                <input name="stock" type="number" value={formData.stock} onChange={handleChange} className="w-full bg-black/30 p-2 rounded-md border border-purple-400" />
            </div>
            <div>
                <label className="block text-sm font-medium text-purple-300 mb-1">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} required className="w-full bg-black/30 p-2 rounded-md border border-purple-400">
                    <option value="">Select an existing category</option>
                    {existingCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    <option value="add_new" className="font-bold text-cyan-400">-- Add New Category --</option>
                </select>
                {formData.category === 'add_new' && (
                  <input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Type new category name..." className="w-full bg-black/30 p-2 mt-2 rounded-md border border-cyan-500/50" />
                )}
            </div>
            <div>
                <label className="block text-sm font-medium text-purple-300 mb-1">Image URL</label>
                <input name="image" value={formData.image} onChange={handleChange} placeholder="https://..." className="w-full bg-black/30 p-2 rounded-md border border-purple-400" />
            </div>
            <div>
                <label className="block text-sm font-medium text-purple-300 mb-1">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full bg-black/30 p-2 rounded-md border border-purple-400" />
            </div>
            <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">Key Features</label>
                <div className="space-y-3">
                    {formData.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <input value={feature.title} onChange={(e) => handleFeatureChange(index, 'title', e.target.value)} placeholder="Feature Title" className="w-1/3 bg-black/30 p-2 rounded-md border border-purple-400/50 text-sm"/>
                            <input value={feature.desc} onChange={(e) => handleFeatureChange(index, 'desc', e.target.value)} placeholder="Feature Description" className="flex-1 bg-black/30 p-2 rounded-md border border-purple-400/50 text-sm"/>
                            <button type="button" onClick={() => removeFeature(index)} className="text-red-500 hover:text-red-400"><XCircle size={20} /></button>
                        </div>
                    ))}
                </div>
                 <button type="button" onClick={addFeature} className="mt-3 flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-200"><PlusCircle size={18} /> Add Feature</button>
            </div>
            <div className="flex justify-end gap-4 pt-6">
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
  const [deletingProductId, setDeletingProductId] = useState<number | null>(null);

  const uniqueCategories = useMemo(() => {
    const categories = products.map(p => p.category).filter(Boolean);
    return [...new Set(categories)];
  }, [products]);

  const getProducts = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from('products').select('*').order('id', { ascending: true });
      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      toast.error("Failed to fetch products.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleFormSubmit = async (productData: Partial<NewProductData>) => {
    const toastId = toast.loading(editingProduct ? 'Updating product...' : 'Adding product...');
    try {
      if (editingProduct) {
        const { error } = await supabase.from('products').update(productData).eq('id', editingProduct.id);
        if (error) throw error;
        toast.success("Product updated successfully!", { id: toastId });
      } else {
        const { error } = await supabase.from('products').insert([productData]).select();
        if (error) throw error;
        toast.success("Product added successfully!", { id: toastId });
      }
      closeFormModal();
      getProducts();
    } catch (error) {
      console.error("Supabase error:", error);
      toast.error("An error occurred.", { id: toastId });
    }
  };

  const handleDeleteConfirm = async () => {
    if (deletingProductId !== null) {
      const toastId = toast.loading('Deleting product...');
      try {
        const { error } = await supabase.from('products').delete().eq('id', deletingProductId);
        if (error) throw error;
        toast.success("Product deleted successfully!", { id: toastId });
        closeDeleteModal();
        getProducts();
      } catch (error) {
        toast.error("Failed to delete product.", { id: toastId });
      }
    }
  };

  const openFormModal = (product: Product | null = null) => { setEditingProduct(product); };
  const closeFormModal = () => { setEditingProduct(null); setIsFormModalOpen(false); };
  const openDeleteModal = (id: number) => { setDeletingProductId(id); setIsDeleteModalOpen(true); };
  const closeDeleteModal = () => { setDeletingProductId(null); setIsDeleteModalOpen(false); };

  useEffect(() => {
    if (editingProduct) setIsFormModalOpen(true);
  }, [editingProduct]);

  const filteredProducts = useMemo(() => 
    products.filter(product => 
      (product.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (product.category?.toLowerCase() || '').includes(searchQuery.toLowerCase())
    ), [products, searchQuery]);
    
  const columns: { key: keyof Product | 'actions'; label: string; render?: (...args: any) => React.ReactNode; sortable?: boolean; }[] = [
    { key: "id", label: "ID", sortable: true },
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
            existingCategories={uniqueCategories}
        />
      </Modal>
      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} title="Confirm Deletion">
        <div className="text-white text-center p-4">
          <AlertTriangle className="text-red-500 w-12 h-12 mx-auto mb-4"/>
          <p>Are you sure you want to delete this product?</p>
          <div className="flex justify-center gap-4 pt-6">
            <button onClick={closeDeleteModal} className="px-6 py-2 rounded-md bg-black/20 text-gray-300 hover:bg-black/40">Cancel</button>
            <button onClick={handleDeleteConfirm} className="px-8 py-2 rounded-md font-semibold text-white bg-red-600 hover:bg-red-700">Delete</button>
          </div>
        </div>
      </Modal>
      <div className="grid gap-6">
        <Card className="bg-black/20 border border-purple-700/30 shadow-lg">
          <CardHeader>
            <PageHeader title="Products Management" buttonText="Add Product" searchPlaceholder="Search by name or category..." searchQuery={searchQuery} onSearchChange={setSearchQuery} onButtonClick={() => openFormModal()} />
          </CardHeader>
          <CardContent>
            <AdminTable data={filteredProducts} columns={columns} isLoading={isLoading} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProductsPage;