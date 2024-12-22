import React, { FC } from 'react';
import { Bar, BarChart, Brush, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


export const LineChartWidget: FC<{
  data: {[key: string | number]: string | number}[],
  categories: string[]
}> = ({ data = [] }) => {

  return <>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <Tooltip/>
        <Legend/>
        <XAxis dataKey="date"/>
        <YAxis/>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
        <Bar dataKey="add" fill="#00C49F"/>
        <Bar dataKey="remove" fill="#FF6699"/>
        <Brush dataKey="date" height={30} stroke="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  </>;
};