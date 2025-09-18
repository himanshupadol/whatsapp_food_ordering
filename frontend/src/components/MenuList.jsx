import React, { useState } from "react";
import { updateMenuItem } from "../services/api";

export default function MenuList({ menu, fetchMenu }) {
    const [editingItemId, setEditingItemId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editPrice, setEditPrice] = useState("");

    if (!menu || menu.length === 0) return <p>No Items Yet.</p>;

    return (
        <div style={{ maxHeight: "300px", overflowY: "auto", border: "1px solid #ccc", padding: "0.5rem" }}>
            <h2>Menu</h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid #ddd", textAlign: "left", padding: "8px" }}>Name</th>
                        <th style={{ border: "1px solid #ddd", textAlign: "left", padding: "8px" }}>Description</th>
                        <th style={{ border: "1px solid #ddd", textAlign: "left", padding: "8px" }}>Price</th>
                        <th style={{ border: "1px solid #ddd", textAlign: "left", padding: "8px" }}>Available</th>
                        <th style={{ border: "1px solid #ddd", textAlign: "left", padding: "8px" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {menu.map(item => (
                        <tr key={item.id}>
                            {editingItemId === item.id ? (
                                <>
                                    <td>
                                        <input
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                            style={{ width: "100%" }}
                                        />
                                    </td>
                                    <td>{item.description}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={editPrice}
                                            onChange={(e) => setEditPrice(e.target.value)}
                                            style={{ width: "80px" }}
                                        />
                                    </td>
                                    <td>{item.available ? "Yes" : "No"}</td>
                                    <td>
                                        <button
                                            onClick={async () => {
                                                await updateMenuItem(item.id, {
                                                    name: editName,
                                                    price: parseFloat(editPrice)
                                                });
                                                setEditingItemId(null);
                                                fetchMenu();
                                            }}>
                                            Save
                                        </button>
                                        <button onClick={() => setEditingItemId(null)}>Cancel</button>
                                    </td>
                                </>                                
                            ) : (
                                <>
                                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.name}</td>
                                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.description}</td>
                                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>₹{item.price}</td>
                                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.available ? "Yes" : "No"}</td>
                                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                        <button 
                                            onClick={() => {
                                                setEditingItemId(item.id);
                                                setEditName(item.name);
                                                setEditPrice(item.price);
                                            }}>
                                        Edit
                                        </button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}