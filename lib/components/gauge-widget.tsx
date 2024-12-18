import { JiraSprintGaugeResponse } from '@/app/api/jira/sprint/gauge/types';
import { ChartContainer } from '@/lib/components/ui/chart';
import React, { FC } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042',
  '#A28ADC', '#FF6699', '#33CCCC', '#B6E880',
  '#FF8C00', '#C71585', '#4682B4', '#EE82EE'
];


export const GaugeWidget: FC<{
  data: JiraSprintGaugeResponse,
  categories: string[]
}> = ({ data = {}, categories }) => {

  const values = Object.entries(data).reduce((acc, [name, value]) => {
    acc.push({
      name,
      value
    });
    return acc;
  }, [] as {name: string, value: number}[]).filter((entry) => categories.includes(entry.name));

  return <>
    <ChartContainer
      config={categories.reduce((obj, cat, index) => {
        return {
          ...obj,
          [cat]: {
            label: cat,
            color: `hsl(var(--chart-${index}))`,
          }
        };
      }, {})}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={values} dataKey="value" innerRadius={30} paddingAngle={5} cornerRadius={5} outerRadius={60} fill="#8884d8" label>
            {values.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend/>
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  </>;
};