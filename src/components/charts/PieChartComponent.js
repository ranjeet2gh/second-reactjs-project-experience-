import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { fetchCallStatus } from "../../services/APIs.js";
import "./PieChart.css";

const PieChartComponent = () => {
  const [pieChartData, setPieChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = ["#80CA72", "#00796B", "#BA1A1A"];

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetchCallStatus();
        const callStatus = response.data.data.call_status;

        const totalCalls = callStatus.total_calls;

         
        const chartData = [
          {
            name: "In Progress",
            value: callStatus.in_progress_calls,
            percentage: ((callStatus.in_progress_calls / totalCalls) * 100).toFixed(2),
          },
          {
            name: "Completed",
            value: callStatus.successful_calls,
            percentage: ((callStatus.successful_calls / totalCalls) * 100).toFixed(2),
          },
          {
            name: "Failed",
            value: callStatus.failed_calls,
            percentage: ((callStatus.failed_calls / totalCalls) * 100).toFixed(2),
          },
        ];

        setPieChartData(chartData);
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const total = pieChartData.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="chart-container">
      <h3 className="chart-title">Call Status</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={pieChartData}
            dataKey="value"
            innerRadius="50%"
            outerRadius="80%"
            startAngle={90}
            endAngle={-270}
            paddingAngle={0}
            label={({ value, percentage }) => `(${value}) ${percentage}%`}
            labelLine={true}
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <text
            x="50%"
            y="55%"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontSize: "20px", fontWeight: "bold" }}
          >
            {total}
          </text>
          <Legend
            iconType="circle"
            layout="horizontal"
            align="center"
            verticalAlign="top"
            wrapperStyle={{ fontSize: "16px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
