// src/pages/admin/ProductsPage.tsx
import React, { useState, useEffect, useMemo, FC, FormEvent } from 'react';
import toast from 'react-hot-toast';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PageHeader from '@/components/admin/PageHeader';
import Modal from '@/components/admin/Modal';
import AdminTable, { Column } from '@/components/admin/AdminTable';
import { Trash2, Edit, AlertTriangle, PlusCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from '../../supabase';
import { Product } from '../../types';

type NewProductData = Omit<Product, 'id' | 'docId'>;

const ProductForm: FC<{
  onSubmit: (product: Partial<NewProductData>) => void;
  onCancel: () => void;
  initialData?: Product | null;
}> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    name: '', price: 0, originalPrice: 0, stock: 0, category: '',
    tags: '', gradient: '', image: '', description: '',
    features: [{ title: '', desc: '' }]
  });
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        price: initialData.price || 0,
        originalPrice: initialData.originalPrice ?? 0,
        stock: initialData.stock || 0,
        category: initialData.category || '',
        tags: (initialData.tags || []).join(', '),
        gradient: (initialData.gradient || []).join(', '),
        features: initialData.features?.length ? initialData.features : [{ title: '', desc: '' }],
        image: initialData.image || '',
        description: initialData.description || '',
      });
    }
  }, [initialData]);

  useEffect(() => {
    supabase.from('categories').select('name').then(({ data, error }) => {
      if (!error && data) {
        setCategories(data.map((c: any) => c.name).filter(Boolean));
      }
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'number' ? parseFloat(value) || 0 : value }));
  };

  const handleFeatureChange = (index: number, field: 'title' | 'desc', value: string) => {
    const updated = [...formData.features];
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, features: updated }));
  };

  const addFeature = () => setFormData(prev => ({ ...prev, features: [...prev.features, { title: '', desc: '' }] }));
  const removeFeature = (index: number) => setFormData(prev => ({ ...prev, features: formData.features.filter((_, i) => i !== index) }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.category) return toast.error("Name and Category are required");

    const finalData: Partial<NewProductData> = {
      name: formData.name,
      price: Number(formData.price) || 0,
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
      stock: Number(formData.stock) || 0,
      category: formData.category,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      gradient: formData.gradient.split(',').map(g => g.trim()).filter(Boolean),
      features: formData.features.filter(f => f.title.trim() || f.desc.trim()),
      image: formData.image,
      description: formData.description
    };

    onSubmit(finalData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-white max-h-[75vh] overflow-y-auto p-1 pr-2">
      <div className="space-y-2">
        <label className="block text-sm font-semibold">Product Name</label>
        <input name="name" value={formData.name} onChange={handleChange} required className="input" />

        <label className="block text-sm font-semibold">Price</label>
        <input name="price" type="number" value={formData.price} onChange={handleChange} className="input" />

        <label className="block text-sm font-semibold">Original Price</label>
        <input name="originalPrice" type="number" value={formData.originalPrice} onChange={handleChange} className="input" />

        <label className="block text-sm font-semibold">Stock</label>
        <input name="stock" type="number" value={formData.stock} onChange={handleChange} className="input" />

        <label className="block text-sm font-semibold">Category</label>
        <select name="category" value={formData.category} onChange={handleChange} className="input">
          <option value="">Select Category</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold">Tags (comma-separated)</label>
        <input name="tags" value={formData.tags} onChange={handleChange} className="input" />

        <label className="block text-sm font-semibold">Gradient Colors (comma-separated)</label>
        <input name="gradient" value={formData.gradient} onChange={handleChange} className="input" />

        <label className="block text-sm font-semibold">Image URL</label>
        <input name="image" value={formData.image} onChange={handleChange} className="input" />

        <label className="block text-sm font-semibold">Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} className="input" />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-bold">Product Features</label>
        {formData.features.map((f, i) => (
          <div key={i} className="flex gap-2">
            <input value={f.title} onChange={e => handleFeatureChange(i, 'title', e.target.value)} placeholder="Title" className="input" />
            <input value={f.desc} onChange={e => handleFeatureChange(i, 'desc', e.target.value)} placeholder="Description" className="input flex-1" />
            <button onClick={() => removeFeature(i)} type="button" className="text-red-400"><XCircle size={18} /></button>
          </div>
        ))}
        <button type="button" onClick={addFeature} className="text-cyan-400 flex items-center gap-1 text-sm">
          <PlusCircle size={18} /> Add Feature
        </button>
      </div>

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="bg-gray-700 px-4 py-2 rounded">Cancel</button>
        <button type="submit" className="bg-purple-600 px-6 py-2 rounded">Save</button>
      </div>
    </form>
  );
};

const ProductsPage: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const categories = useMemo(() => [...new Set(products.map(p => p.category).filter(Boolean))], [products]);

  const getProducts = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from('products').select('*');
    if (!error && data) setProducts(data);
    else toast.error("Failed to load products");
    setIsLoading(false);
  };

  useEffect(() => { getProducts(); }, []);

  const handleSubmit = async (values: Partial<NewProductData>) => {
    const isEdit = !!editingProduct;
    const toastId = toast.loading(isEdit ? 'Updating...' : 'Adding...');
    try {
      const query = isEdit
        ? supabase.from('products').update(values).eq('id', editingProduct!.id)
        : supabase.from('products').insert([values]);
      const { error } = await query;
      if (error) throw error;
      toast.success(isEdit ? 'Updated!' : 'Added!', { id: toastId });
      getProducts();
      setShowForm(false);
      setEditingProduct(null);
    } catch {
      toast.error("Error while saving", { id: toastId });
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    const { error } = await supabase.from('products').delete().eq('id', deletingId);
    if (!error) {
      toast.success("Deleted");
      getProducts();
    } else {
      toast.error("Failed to delete");
    }
    setDeletingId(null);
  };

  const openFormModal = (product: Product | null = null) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const openDeleteModal = (id: number) => setDeletingId(id);

  const columns: Column<Product>[] = [
    { key: "id", label: "ID", sortable: true },
    { key: "name", label: "Product Name", sortable: true },
    { key: "category", label: "Category", sortable: true },
    { key: "price", label: "Price", sortable: true },
    { key: "stock", label: "Stock", sortable: true },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex gap-2">
          <motion.button onClick={() => openFormModal(row)} whileTap={{ scale: 0.9 }} className="p-2 text-cyan-400 hover:text-cyan-200"><Edit size={16} /></motion.button>
          <motion.button onClick={() => openDeleteModal(row.id)} whileTap={{ scale: 0.9 }} className="p-2 text-red-500 hover:text-red-400"><Trash2 size={16} /></motion.button>
        </div>
      )
    }
  ];

  return (
    <>
      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title={editingProduct ? "Edit Product" : "Add Product"}>
       <ProductForm
  initialData={editingProduct}
  onSubmit={handleSubmit}
  onCancel={() => { setEditingProduct(null); setShowForm(false); }}
/>

      </Modal>

      <Modal isOpen={!!deletingId} onClose={() => setDeletingId(null)} title="Confirm Deletion">
        <div className="p-4 text-white">
          <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-4" />
          <p className="text-center">Are you sure you want to delete this product?</p>
          <div className="flex justify-center gap-4 mt-6">
            <button onClick={() => setDeletingId(null)} className="btn">Cancel</button>
            <button onClick={handleDelete} className="btn bg-red-600">Delete</button>
          </div>
        </div>
      </Modal>

      <Card className="bg-black/20 border border-purple-700/30">
        <CardHeader>
          <PageHeader
            title="Products Management"
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            buttonText="Add Product"
            onButtonClick={() => setShowForm(true)}
            searchPlaceholder="Search by name or category..."
          />
        </CardHeader>
        <CardContent>
          <AdminTable
            data={products.filter(p =>
              p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.category?.toLowerCase().includes(searchQuery.toLowerCase())
            )}
            columns={columns}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default ProductsPage;
