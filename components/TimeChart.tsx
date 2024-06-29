// components/TimeChart.tsx
"use client"
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {oc} from "../data/oc"

const data = [
  { time: '00:00', name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { time: '00:01', name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { time: '00:02', name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { time: '00:03', name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { time: '00:04', name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { time: '00:05', name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { time: '00:06', name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

const TimeChart: React.FC = () => {
    const filteredData = oc.filter(item => item.expiryDate === "20-Jun-2024");
    console.log("oc", filteredData)
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" dataKey="time" domain={['auto', 'auto']} tickFormatter={(tick) => `${tick} min`} />
        <YAxis type="category" dataKey="name" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
        <Line type="monotone" dataKey="amt" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TimeChart;
