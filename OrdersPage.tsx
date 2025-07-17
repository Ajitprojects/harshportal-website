import { useState, useEffect, useMemo, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminTable from "@/components/admin/AdminTable";
import PageHeader from '@/components/admin/PageHeader';
import toast from 'react-hot-toast';

// --- TYPE DEFINITIONS ---
interface Order {
  id: number;
  customer: string;
  status: "Shipped" | "Pending" | "Delivered" | "Canceled";
  total: string;
  date: string;
}

// --- MOCK API & DATA ---
const allOrders: Order[] = [
  { id: 101, customer: "Alice Johnson", status: "Shipped", total: "$89.99", date: "2025-07-15" },
  { id: 102, customer: "Bob Williams", status: "Pending", total: "$29.99", date: "2025-07-16" },
  { id: 103, customer: "Charlie Brown", status: "Delivered", total: "$59.99", date: "2025-07-12" },
  { id: 104, customer: "Diana Miller", status: "Canceled", total: "$129.50", date: "2025-07-14" },
  { id: 105, customer: "Ethan Davis", status: "Delivered", total: "$45.00", date: "2025-07-11" },
];

const fetchOrders = (): Promise<Order[]> => new Promise(resolve => setTimeout(() => resolve(allOrders), 500));

// --- HELPER COMPONENT ---
const StatusBadge = ({ status }: { status: Order['status'] }) => {
  const statusClasses = {
    Delivered: "bg-green-500/20 text-green-300",
    Shipped: "bg-cyan-500/20 text-cyan-300",
    Pending: "bg-yellow-500/20 text-yellow-300",
    Canceled: "bg-red-500/20 text-red-300",
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status]}`}>
      {status}
    </span>
  );
};


// --- MAIN PAGE COMPONENT ---
const OrdersPage = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const effectRan = useRef(false);

    useEffect(() => {
        if (effectRan.current) return;
        effectRan.current = true;
        
        setIsLoading(true);
        fetchOrders()
          .then(data => setOrders(data))
          .catch(() => toast.error("Could not load orders."))
          .finally(() => setIsLoading(false));
    }, []);

    const filteredOrders = useMemo(() =>
        orders.filter(order =>
            order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            String(order.id).includes(searchQuery)
        ), [orders, searchQuery]);

    const columns: { key: keyof Order | 'actions'; label:string; render?:(...args:any)=>React.ReactNode; sortable?:boolean; }[] = [
        { key: "id", label: "Order ID", sortable: true },
        { key: "customer", label: "Customer", sortable: true },
        { key: "date", label: "Date", sortable: true },
        { key: "status", label: "Status", sortable: true, render: (status) => <StatusBadge status={status} /> },
        { key: "total", label: "Total", sortable: true },
    ];

    return (
        <div className="grid gap-6">
            <Card className="bg-black/20 border border-purple-700/30 shadow-lg">
                <CardHeader>
                    <PageHeader
                        title="Order Management"
                        // We remove the "Add" button for orders
                        buttonText="Export Orders"
                        onButtonClick={() => toast('Exporting orders...')}
                        searchPlaceholder="Search by customer or ID..."
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                    />
                </CardHeader>
                <CardContent>
                    <AdminTable
                        data={filteredOrders}
                        columns={columns}
                        isLoading={isLoading}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default OrdersPage;