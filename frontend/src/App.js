import React, { useState, useEffect } from "react";
import MenuList from "./components/MenuList";
import AddMenuForm from "./components/AddMenuForm";
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
    <div style={{padding: 20}}>
      <h1
        style={{
          backgroundColor: "#DDA0DD",
          color: "white",
          padding: "10px",
          borderRadius: "5px"
        }}>Aumne's WhatsApp Food Ordering System - Admin
      </h1>
      <div style={{display:"flex", gap: "2rem", alignItems: "flex-start"}}>
        <div style={{flex:1}}>
          <AddMenuForm onAdded={fetchMenu} />
        </div>
        <div style={{flex:2}}>
          <MenuList menu={menu} />
        </div>
      </div>
    </div>
  );
}

export default App;