import { JiraSprintGaugeResponse } from '@/app/api/jira/sprint/gauge/types';
import { CHART_COLORS } from '@/lib/colors';
import { ChartContainer } from '@/lib/components/ui/chart';
import React, { FC } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';


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
              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Legend/>
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  </>;
};