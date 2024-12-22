import { CHART_COLORS } from '@/lib/colors';
import React, { FC } from 'react';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts';


export const RadarChartWidget: FC<{
  data: {[key: string | number]: string | number}[],
  categories: string[]
}> = ({ data = {}, categories = [] }) => {

  return <>
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <Tooltip/>
        <PolarGrid/>
        <PolarAngleAxis dataKey="name"/>
        <PolarRadiusAxis/>
        {categories.map((category, index) => <Radar
          key={category}
          name={category}
          dataKey={category}
          stroke={CHART_COLORS[index % CHART_COLORS.length]} fill={CHART_COLORS[index % CHART_COLORS.length]}
          fillOpacity={0.6}/>)}
      </RadarChart>
    </ResponsiveContainer>
  </>;
};