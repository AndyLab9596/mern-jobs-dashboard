import React from 'react'
import { IMonthlyApp } from '../../models/jobModel';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts'

interface IAreaChart {
    data: IMonthlyApp[]
}
const AreaChartComponent: React.FC<IAreaChart> = ({ data }) => {
    return (
        <ResponsiveContainer width='100%' height={300}>
            <AreaChart
                data={data}
                margin={{
                    top: 50,
                }}
            >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date' />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Area type='monotone' dataKey='count' stroke='#2cb1bc' fill='#bef8fd' />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default AreaChartComponent