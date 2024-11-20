import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './AreaChart.css';
import { fetchVerifiedVsUnverified } from '../../services/APIs.js';

const BarChartComponent = () => {
  const [year, setYear] = useState("");  
  const [barChartData, setBarChartData] = useState({});
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetchVerifiedVsUnverified();
        const data = response.data.data.verified_vs_unverified_customers;
        const formattedData = formatChartData(data);
        setBarChartData(formattedData);

        
        const years = Object.keys(formattedData).sort((a, b) => b - a);
        if (years.length) setYear(years[0]);
      } catch (error) {
        console.error("Error fetching bar chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

   
  const formatChartData = (data) => {
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    return data.reduce((acc, { year, month, verified, unverified }) => {
      if (!acc[year]) acc[year] = [];
      acc[year].push({
        month: monthNames[month - 1],  
        verified,
        unverified,
      });
      return acc;
    }, {});
  };

  
  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  
  if (loading) {
    return <div>Loading...</div>;
  }

  
  if (!barChartData[year]) {
    return <div>No data available for the selected year.</div>;
  }

  return (
    <div>
      
      <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "space-between" }}>
        <Legend />
        <h6 style={{ fontWeight: "600" }}>Verified & Unverified Customers</h6>
        <select
          style={{
            padding: "5px 5px 5px 10px",
            color: "#00796B",
            borderColor: "#00796B",
            borderRadius: "5px",
            textAlign: "center",
          }}
          value={year}
          onChange={handleYearChange}
        >
          {Object.keys(barChartData).map((y) => (
            <option key={y} value={y}>
              {y === String(new Date().getFullYear()) ? "This Year" : y}
            </option>
          ))}
        </select>
      </div>

      
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          barSize={13}
          data={barChartData[year]}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={[0, "auto"]} allowDecimals={false} />
          <Tooltip />
          <Legend verticalAlign="top" height={20} />
          <Bar dataKey="verified" fill="#00796B" name="Verified" radius={[10, 10, 0, 0]} />
          <Bar dataKey="unverified" fill="#FF6F61" name="Unverified" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
