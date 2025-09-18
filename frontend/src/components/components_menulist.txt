import React from "react";

export default function MenuList({menu}) {
    if (!menu || menu.length === 0) return <p>No Items Yet.</p>;

    return (
        <div style={{ maxHeight: "300px", overflowY: "auto", border: "1px solid #ccc", padding: "0.5rem" }}>
            <h2>Menu</h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>Name</th>
                        <th style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>Description</th>
                        <th style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>Price</th>
                        <th style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>Available</th>
                    </tr>
                </thead>
                <tbody>
                    {menu.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>₹{item.price}</td>
                            <td>{item.available ? "Yes" : "No"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}