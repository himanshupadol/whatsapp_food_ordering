import React, { useState, useEffect } from "react";
import api from "../services/api";

function PlaceOrderForm() {
  const [customerName, setCustomerName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [menu, setMenu] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("");

  // Fetch menu items from backend
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await api.get("/menu/");
        setMenu(response.data);
      } catch (error) {
        console.error("Failed to fetch menu:", error);
      }
    };
    fetchMenu();
  }, []);

  // Handle item selection + quantity
  const handleItemChange = (itemId, checked) => {
    if (checked) {
      setSelectedItems([...selectedItems, { id: itemId, quantity: 1 }]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item.id !== itemId));
    }
  };

  const handleQuantityChange = (itemId, quantity) => {
    setSelectedItems(
      selectedItems.map((item) =>
        item.id === itemId ? { ...item, quantity: parseInt(quantity) || 1 } : item
      )
    );
  };

  // Calculate total (sum of price * qty)
  useEffect(() => {
    const totalAmount = selectedItems.reduce((acc, sel) => {
      const menuItem = menu.find((m) => m.id === sel.id);
      return acc + (menuItem ? menuItem.price * sel.quantity : 0);
    }, 0);
    setTotal(totalAmount);
  }, [selectedItems, menu]);

  // Submit order
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const itemsPayload = selectedItems.map((sel) => {
        const menuItem = menu.find((m) => m.id === sel.id);
        return {
          name: menuItem.name,
          quantity: sel.quantity,
        };
      });

      const response = await api.post("/orders/", {
        customer_name: customerName,
        whatsapp_number: whatsappNumber,
        items: itemsPayload,
        total: total,
        status: status,
      });

      setMessage(`✅ Order placed successfully! ID: ${response.data.id}`);
      setCustomerName("");
      setWhatsappNumber("");
      setSelectedItems([]);
      setTotal(0);
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to place order. Check console for details.");
    }
  };

  return (
    <div>
      <h2>Place an Order</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>WhatsApp Number: </label>
          <input
            type="text"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            placeholder="whatsapp:+91XXXXXXXXXX"
            required
          />
        </div>

        <h3>Select Items</h3>
        {menu.map((item) => (
          <div key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedItems.some((sel) => sel.id === item.id)}
                onChange={(e) => handleItemChange(item.id, e.target.checked)}
              />
              {item.name} (₹{item.price})
            </label>
            {selectedItems.some((sel) => sel.id === item.id) && (
              <input
                type="number"
                min="1"
                value={
                  selectedItems.find((sel) => sel.id === item.id)?.quantity || 1
                }
                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                style={{ marginLeft: "10px", width: "60px" }}
              />
            )}
          </div>
        ))}

        <div>
          <strong>Total: ₹{total}</strong>
        </div>

        <button type="submit">Place Order</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default PlaceOrderForm;
