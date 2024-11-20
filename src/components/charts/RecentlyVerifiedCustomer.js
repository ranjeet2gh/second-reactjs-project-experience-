import React, { useState, useEffect } from "react";
import "./RecentlyVerifiedCustomer.css";
import { fetchRecentlyVerifiedCustomers } from "../../services/APIs.js";

const RecentlyVerifiedCustomer = () => {
  const [recentlyVerifiedCustomers, setRecentlyVerifiedCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await fetchRecentlyVerifiedCustomers();
        const customers = response.data.data.recently_verified_customers;

        
        const transformedCustomers = customers.map((customer) => ({
          initials: customer.fname
            ? customer.fname.charAt(0).toUpperCase()
            : "N/A",
          name: `${customer.fname || "N/A"} ${customer.lname || ""}`,
          position: customer.position || "N/A", 
          company: customer.company || "N/A",  
          date: customer.date_last_verified || "N/A",
          color: generateColorFromName(customer.fname || "default"),
        }));

        setRecentlyVerifiedCustomers(transformedCustomers);
      } catch (error) {
        console.error("Error fetching recently verified customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, []);

 
  const generateColorFromName = (name) => {
    const colors = [
      "#FF5722",
      "#03A9F4",
      "#8BC34A",
      "#FF9800",
      "#9C27B0",
      "#4CAF50",
      "#F44336",
    ];
    const charCode = name.charCodeAt(0) || 0;
    return colors[charCode % colors.length];
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recently-verified">
      <h6 style={{ fontWeight: "600" }}>Recently Verified Customers</h6>
      <div className="customer-list">
        <div className="customer-window">
          {recentlyVerifiedCustomers.map((customer, index) => (
            <div className="customer-item" key={index}>
              <div
                className="customer-avatar"
                style={{
                  backgroundColor: customer.color,
                  width: "20px",
                  height: "20px",
                  fontSize: "small",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                {customer.initials}
              </div>
              <div className="customer-info">
                <div className="customer-name">{customer.name}</div>
                <div className="customer-position">{customer.position}</div>
                <div className="customer-company">{customer.company}</div>
              </div>
              <div className="customer-date">{customer.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentlyVerifiedCustomer;
