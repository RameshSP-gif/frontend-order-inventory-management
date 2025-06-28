import React, { useState, useEffect } from "react";
import axios from "axios";

const OrdersListPage = () => {
  const [orders, setOrders] = useState([]);
  const username = localStorage.getItem("username") || "";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/orders", {
          params: { customer_name: username },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        alert("Failed to fetch orders: " + err.message);
      }
    };

    if (username) {
      fetchOrders();
    } else {
      alert("Please log in to view your orders.");
    }
  }, [username]);

  return (
    <div className="page-content">
      <style>
        {`
          .page-content {
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
            font-family: Arial, sans-serif;
          }
          h2 {
            color: #333;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f4f4f4;
          }
        `}
      </style>

      <h2>📋 Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Txn ID</th>
              <th>Payment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer_name}</td>
                <td>{order.product_name}</td>
                <td>{order.quantity}</td>
                <td>₹{order.price}</td>
                <td>{order.transaction_id}</td>
                <td>{order.payment_method}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdersListPage;
