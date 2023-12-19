import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Jan',
    cleaner: 4000,
    user: 2400,
    
  },
  {
    name: 'Feb',
    cleaner: 3000,
    user: 1398,
    
  },
  {
    name: 'Mar',
    cleaner: 2000,
    user: 9800,
    
  },
  {
    name: 'Apr',
    cleaner: 2780,
    user: 3908,
    
  },
  {
    name: 'May',
    cleaner: 1890,
    user: 4800,
    
  },
  {
    name: 'Jun',
    cleaner: 2390,
    user: 3800,
    
  },
  {
    name: 'Jul',
    cleaner: 3490,
    user: 4300,
    
  },
  {
    name: 'Aug',
    cleaner: 2000,
    user: 9800,
    
  },
  {
    name: 'Sep',
    cleaner: 2780,
    user: 3908,
    
  },
  {
    name: 'Oct',
    cleaner: 1890,
    user: 4800,
    
  },
  {
    name: 'Nov',
    cleaner: 2390,
    user: 3800,
  },
  {
    name: 'Dec',
    cleaner: 3490,
    user: 4300,
    
  },
];


const StatsGraph = () => {
    return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={700}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            {/* <YAxis /> */}
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cleaner" stroke="#3DA2FF" strokeWidth={2} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="user" stroke="#3FB743" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      );
}

export default StatsGraph