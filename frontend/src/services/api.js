import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000"

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

// Menu endpoints
export const getMenu = async () => {
    const res = await api.get("/menu");
    return res.data;
};

export const addMenuItem = async (item) => {
    const res = await api.post("/menu", item);
    return res.data;
};

export const updateMenuItem = async (id, data) => {
    const res = await api.put(`/menu/${id}`, null, { params: data });
    return res.data;
};

export const toggleAvailability = async (id, available) => {
    const res = await api.patch(`/menu/${id}/availability`, null, {
        params: {available},
    });
    return res.data;
};

export const getOrders = async () => {
    const res = await api.get("/orders");
    return res.data;
};

export const createOrder = async  (orderData) => {
    const res = await api.post("/orders", orderData);
    return res.data;
};

export const updateOrderStatus = async (orderId, data) => {
    const res = await api.patch(`/orders/${orderId}`, data);
    return res.data;
};

export default api;