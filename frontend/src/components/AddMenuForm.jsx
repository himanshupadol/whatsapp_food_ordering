import React, { useState } from "react";
import api from "../services/api";

 export default function AddMenuForm({ onAdded }) {
    const [name, setName] = useState("");
    const [description, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [available, setAvailable] = useState(true);
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Saving...");
        try {
            const payload = {
                name,
                description,
                price: parseFloat(price),
                available,
            };
            console.log("Sending payload:", payload);
            const res = await api.post("/menu/", payload);
            console.log("Response:", res.data);
            setStatus("Saved");
            if (onAdded) onAdded();
            setName(""); setDesc(""); setPrice(""); setAvailable(true);
        } catch (err) {
            console.error("Error adding menu", err);
            setStatus("Error saving item");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{marginTop: "1rem", maxWidth: "400px"}}>
            <h3>Add Menu Item</h3>
            <div style={{ marginBottom: "0.8rem" }}>
                <label>Name</label><br/>
                <input
                    type="text"
                    value={name}
                    onChange={(e)=>setName(e.target.value)} required style={{ width: "100%", padding: "0.4rem"}}/>
            </div>
            <div style={{ marginBottom: "0.8rem" }}>
                <label>Description</label><br/>
                <textarea
                    value={description}
                    onChange={(e)=>setDesc(e.target.value)} style={{ width: "100%", padding: "0.4rem" }}/>
            </div>
            <div style={{ marginBottom: "0.8rem" }}>
                <label>Price</label><br/>
                <input
                    type="number"
                    value={price}
                    onChange={(e)=>setPrice(e.target.value)} required step="0.01" min="0" style={{ width: "100%", padding: "0.4rem" }}/>
            </div>
            <div style={{ marginBottom: "0.8rem" }}>
                <label>
                    <input
                        type="checkbox"
                        checked={available}
                        onChange={(e)=>setAvailable(e.target.checked)} />{" "} Available
                </label>
            </div>
            <button type="submit" style={{ padding: "0.5rem 1rem" }}>Add Item</button>
            <div style={{marginTop:"0.5rem", color: "green" }}>{status}</div>
        </form>
    );
 }