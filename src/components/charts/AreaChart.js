import React, { useState, useEffect } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';
import './AreaChart.css';
import { fetchNewCustomersMonthly } from '../../services/APIs.js';

const AreaChartComponent = () => {
    const [year, setYear] = useState("");  
    const [areaChartData, setAreaChartData] = useState({});
    const [loading, setLoading] = useState(true);

     
    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await fetchNewCustomersMonthly();
                const data = response.data.data.new_customers_monthly;
                const formattedData = formatChartData(data);
                setAreaChartData(formattedData);

                
                const years = Object.keys(formattedData).sort((a, b) => b - a);
                if (years.length) {
                    setYear(years[0]);
                }
            } catch (error) {
                console.error('Error fetching area chart data:', error);
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
        
        return data.reduce((acc, { year, month, count }) => {
            if (!acc[year]) acc[year] = [];
            acc[year].push({
                month: monthNames[month - 1],  
                count,
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

    if (!areaChartData[year]) {
        return <div>No data available for the selected year.</div>;
    }

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: "space-between" }}>
                <Legend />
                <h6 style={{ fontWeight: "600" }}>New Customers</h6>
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
                    {Object.keys(areaChartData).map((y) => (
                        <option key={y} value={y}>
                            {y === String(new Date().getFullYear()) ? "This Year" : y}
                        </option>
                    ))}
                </select>
            </div>
            <ResponsiveContainer width="100%" height={250}>
                <AreaChart
                    data={areaChartData[year]}
                    margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    
                    <YAxis 
    domain={[0, 'auto']}  
    tickCount={7}         
    allowDecimals={false}  
    tickFormatter={(value) => Math.floor(value)}  
/>
                    <Tooltip
                        formatter={(value) => [`${value}`]}
                        labelFormatter={(month) => `Month: ${month}`}
                    />
                    <Area
                        type="monotone"
                        dataKey="count"
                        stroke="#4CAF50"
                        fill="rgba(76, 175, 80, 0.2)"
                        activeDot={{ r: 8 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AreaChartComponent;
