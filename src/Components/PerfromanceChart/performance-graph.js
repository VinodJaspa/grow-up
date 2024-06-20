import React from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './performance.css';

function PerformanceGraph() {
  const plan = useSelector((state) => state.plan);

  const data = plan.map((day, index) => ({
    name: day.day,
    completed: day.tasks.filter(task => task.completed).length,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="completed" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default PerformanceGraph;
