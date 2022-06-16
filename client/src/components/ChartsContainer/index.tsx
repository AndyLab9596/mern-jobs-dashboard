import React, { useState } from 'react';
import { useAppContext } from '../../context/appContext';
import AreaChartComponent from '../AreaChart';
import BarChartComponent from '../BarChart';
import Wrapper from './ChartContainer.style';

const ChartContainer = () => {
  const [barChart, setBarChart] = useState<boolean>(true);
  const { monthlyApplications: data } = useAppContext();
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type='button' onClick={() => setBarChart(prev => !prev)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? <BarChartComponent data={data} /> : <AreaChartComponent data={data} />}
    </Wrapper>
  )
}

export default ChartContainer