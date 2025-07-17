import { useState, useEffect, useMemo, FC, FormEvent } from 'react';
import toast from 'react-hot-toast';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AdminTable from "@/components/admin/AdminTable";
import PageHeader from '@/components/admin/PageHeader';
import Modal from '@/components/admin/Modal';
import { Trash2, Edit, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from '../../supabase'; // Import Supabase client
import { AuthUser } from '../../context/AuthContext'; // Import the main user type

// Use the existing AuthUser type, but add the database 'id' for table keys
interface User extends AuthUser {
    id: string; // This is the user's UUID from Supabase auth
}
type NewUser = Omit<User, 'id'>;

// --- FORM COMPONENT ---
interface UserFormProps {
    onSubmit: (user: Partial<NewUser>) => void;
    onCancel: () => void;
    initialData?: User | null;
}
const UserForm: FC<UserFormProps> = ({ onSubmit, onCancel, initialData }) => {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        email: initialData?.email || '',
        role: initialData?.role || 'Customer'
    });
    const isEditMode = !!initialData;

    useEffect(() => {
        setFormData({
            name: initialData?.name || '',
            email: initialData?.email || '',
            role: initialData?.role || 'Customer'
        });
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };
    
    return (
        <form onSubmit={handleSubmit} className="space-y-4 text-white">
            <div>
                <label className="block text-sm font-medium text-purple-300 mb-1">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-black/30 p-2 rounded-md border border-purple-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none" />
            </div>
            <div>
                <label className="block text-sm font-medium text-purple-300 mb-1">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required disabled={isEditMode} className="w-full bg-black/30 p-2 rounded-md border border-purple-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none disabled:opacity-50" />
            </div>
            <div>
                <label className="block text-sm font-medium text-purple-300 mb-1">Role</label>
                <select name="role" value={formData.role} onChange={handleChange} className="w-full bg-black/30 p-2 rounded-md border border-purple-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none">
                    <option value="Customer">Customer</option>
                    <option value="Admin">Admin</option>
                </select>
            </div>
            <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md bg-black/20 text-gray-300 hover:bg-black/40">Cancel</button>
                <button type="submit" className="px-6 py-2 rounded-md font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90">
                    {isEditMode ? 'Save Changes' : 'Add User'}
                </button>
            </div>
        </form>
    );
};


// --- MAIN PAGE COMPONENT ---
const UsersPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

    const getUsers = async () => {
        setIsLoading(true);
        try {
            // Fetch users from the 'profiles' table in Supabase
            const { data, error } = await supabase.from('profiles').select('*');
            if (error) throw error;
            setUsers(data as User[] || []);
        } catch (error: any) {
            toast.error("Failed to fetch users.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleFormSubmit = async (userData: Partial<NewUser>) => {
        const toastId = toast.loading(editingUser ? 'Updating user...' : 'Adding user...');
        try {
            if (editingUser) {
                // Update user role in the 'profiles' table
                const { error } = await supabase.from('profiles').update({ role: userData.role, name: userData.name }).eq('id', editingUser.id);
                if (error) throw error;
                toast.success("User updated successfully!", { id: toastId });
            } else {
                // Note: Creating a user from the admin panel is complex.
                // It requires using Supabase Admin privileges on a secure server, not the client.
                // For this example, we will show an informative toast.
                toast.error("User creation must be done via the Signup page.", { id: toastId });
            }
            closeFormModal();
            getUsers();
        } catch (error) {
            toast.error("An error occurred.", { id: toastId });
        }
    };

    const handleDeleteConfirm = async () => {
        // Deleting users should be done from a secure backend for safety.
        toast.error("User deletion from the admin panel is disabled for this example.");
        closeDeleteModal();
    };

    const openFormModal = (user: User | null = null) => { setEditingUser(user); setIsFormModalOpen(true); };
    const closeFormModal = () => { setEditingUser(null); setIsFormModalOpen(false); };
    const openDeleteModal = (id: string) => { setDeletingUserId(id); setIsDeleteModalOpen(true); };
    const closeDeleteModal = () => { setDeletingUserId(null); setIsDeleteModalOpen(false); };

    const filteredUsers = useMemo(() =>
        users.filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        ), [users, searchQuery]);

    const columns: { key: keyof User | 'actions'; label: string; render?: (...args: any) => React.ReactNode; sortable?: boolean; }[] = [
        { key: "name", label: "Name", sortable: true },
        { key: "email", label: "Email", sortable: true },
        { key: "role", label: "Role", sortable: true },
        {
            key: "actions", label: "Actions", sortable: false,
            render: (_, row: User) => (
                <div className="flex gap-2">
                    <motion.button onClick={() => openFormModal(row)} whileTap={{ scale: 0.9 }} className="p-2 text-cyan-400 hover:text-cyan-200"><Edit size={16} /></motion.button>
                    <motion.button onClick={() => openDeleteModal(row.id)} whileTap={{ scale: 0.9 }} className="p-2 text-red-500 hover:text-red-400"><Trash2 size={16} /></motion.button>
                </div>
            )
        },
    ];

    return (
        <>
            <Modal isOpen={isFormModalOpen} onClose={closeFormModal} title={editingUser ? "Edit User" : "Add New User"}>
                <UserForm onSubmit={handleFormSubmit} onCancel={closeFormModal} initialData={editingUser} />
            </Modal>
            <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} title="Confirm Deletion">
                <div className="text-white text-center p-4">
                    <AlertTriangle className="text-red-500 w-12 h-12 mx-auto mb-4" />
                    <p>Are you sure you want to delete this user's database record? (This action is disabled in this example)</p>
                    <div className="flex justify-center gap-4 pt-6">
                        <button onClick={closeDeleteModal} className="px-6 py-2 rounded-md bg-black/20 text-gray-300 hover:bg-black/40">Cancel</button>
                        <button onClick={handleDeleteConfirm} className="px-8 py-2 rounded-md font-semibold text-white bg-red-600 hover:bg-red-700 disabled:opacity-50" disabled>Delete</button>
                    </div>
                </div>
            </Modal>
            <div className="grid gap-6">
                <Card className="bg-black/20 border border-purple-700/30 shadow-lg">
                    <CardHeader>
                        <PageHeader title="Users Management" buttonText="Add User" searchPlaceholder="Search by name or email..." searchQuery={searchQuery} onSearchChange={setSearchQuery} onButtonClick={() => openFormModal()} />
                    </CardHeader>
                    <CardContent>
                        <AdminTable data={filteredUsers} columns={columns} isLoading={isLoading} />
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default UsersPage;