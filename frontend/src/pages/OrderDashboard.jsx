import React, { useEffect, useState, useRef } from "react";
import { getOrders, updateOrderStatus, cancelOrder } from "../services/api";

export default function OrderDashboard() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updatingOrderId, setUpdatingOrderId] = useState(null);
    const intervalRef = useRef(null);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const data = await getOrders();
            setOrders(Array.isArray(data) ? data: (data.items || []));
        }   catch (err) {
            console.error("Failed to fetch orders", err);
        }   finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();

        intervalRef.current = setInterval(fetchOrders, 10000);
        return () => clearInterval(intervalRef.current);
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        setUpdatingOrderId(orderId);
        try {
            await updateOrderStatus(orderId, { status: newStatus });
            await fetchOrders();
        }   catch (err) {
            console.error("Failed to update status", err);
            alert("Failed to update status. See console for details.");
        }   finally {
            setUpdatingOrderId(null);
        }
    };

    const handleCancel = async (orderId) => {
        if (!window.confirm("Are you sure you want to cancel this order?")) return;
        setUpdatingOrderId(orderId);
        try {
            await cancelOrder(orderId);
            await fetchOrders();
        }   catch (err) {
            console.error("Failed to cancel order", err);
            alert("Failed to cancel order. See console for details.");
        }   finally {
            setUpdatingOrderId(null);
        }
    };

    const statusOptions = ["received", "preparing", "ready", "completed", "cancelled"];

    return (
        <div style={{ padding: 12 }}>
            <h2>Order Dashboard</h2>
            {loading ? <p>Loading orders…</p> : null}
            <div style={{ maxHeight: 500, overflowY: "auto", border: "1px solid #ddd", padding: 8 }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th style={{ border: "1px solid #ddd", padding: 8 }}>Order ID</th>
                            <th style={{ border: "1px solid #ddd", padding: 8 }}>Customer</th>
                            <th style={{ border: "1px solid #ddd", padding: 8 }}>Items</th>
                            <th style={{ border: "1px solid #ddd", padding: 8 }}>Total</th>
                            <th style={{ border: "1px solid #ddd", padding: 8 }}>Status</th>
                            <th style={{ border: "1px solid #ddd", padding: 8 }}>Placed At</th>
                            <th style={{ border: "1px solid #ddd", padding: 8 }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 && (
                            <tr>
                                <td colSpan={7} style={{ textAlign: "center", padding: 12 }}>No orders yet.</td>
                            </tr>
                        )}
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td style={{ border: "1px solid #ddd", padding: 8 }}>{order.id}</td>
                                <td style={{ border: "1px solid #ddd", padding: 8 }}>{order.customer_name || order.customer || "—"}</td>
                                <td>
                                    {Array.isArray(order.items)
                                        ? order.items.map((it) => `${it.name} x${it.quantity || 1}`).join(", ")
                                        : (order.items || "-")}
                                </td>
                                <td style={{ border: "1px solid #ddd", padding: 8 }}>₹{order.total ?? order.amount ?? "—"}</td>
                                <td>
                                    <select
                                        value={order.status}
                                        disabled={updatingOrderId === order.id}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                    >
                                        {statusOptions.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </td>
                                <td style={{ border: "1px solid #ddd", padding: 8 }}>{order.created_at || order.placed_at || "—"}</td>
                                <td>
                                    <button
                                        onClick={() => handleCancel(order.id)}
                                        disabled={updatingOrderId === order.id || order.status === "cancelled" || order.status === "completed"}
                                        style={{ marginRight: 8 }}
                                    >Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}