import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MenuList from "./components/MenuList";
import OrderDashboard from "./pages/OrderDashboard";
import AddMenuForm from "./components/AddMenuForm";
import PlaceOrderForm from "./components/PlaceOrderForm"
import api from "./services/api";

function App() {
  const [menu, setMenu] = useState([]);

  const fetchMenu = async () => {
    try {
      const res = await api.get("/menu/");
      setMenu(res.data || []);
    } catch (err) {
      console.error("Failed to fetch menu", err);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <Router>
      <div style={{padding: 20}}>
        <h1
          style={{
          backgroundColor: "#9966CC",
          color: "white",
          padding: "10px",
          borderRadius: "5px"
        }}>Aumne's WhatsApp Food Ordering System - Admin
        </h1>

        {/* Navigation */}
        <nav>
          <Link to="/menu" style={{ marginRight: "1rem" }}>Menu</Link>
          <Link to="/orders">Orders</Link>
        </nav>

        <Routes>
          <Route path="/menu" element={
            <div style={{display:"flex", gap: "2rem", alignItems: "flex-start"}}>
              <div style={{flex:1}}>
                <AddMenuForm onAdded={fetchMenu} />
              </div>
              <div style={{flex:2}}>
                <MenuList menu={menu} fetchMenu={fetchMenu} />
              </div>
            </div>
          } />
        <Route path="/orders" element={<OrderDashboard />} />
        <Route path="/place-order" element={<PlaceOrderForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;