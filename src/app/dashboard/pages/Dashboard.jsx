import React from 'react';
import { FcLeave } from 'react-icons/fc';
import { GiTakeMyMoney } from 'react-icons/gi';
import { BsPeopleFill } from 'react-icons/bs';
import { ResponsiveContainer, PieChart, Pie, CartesianGrid, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from 'recharts';

function Home() {
  const data = [
    { name: 'Page A', value: 4000 },
    { name: 'Page B', value: 3000 },
    { name: 'Page C', value: 2000 },
    { name: 'Page D', value: 2780 },
    { name: 'Page E', value: 1890 },
    { name: 'Page F', value: 2390 },
    { name: 'Page G', value: 3490 },
  ];
  return (
    <main className="main-container bg-gray-100 p-4 sm:p-6">
      <div className="main-title mb-4 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-bold">DASHBOARD</h3>
      </div>

      <div className="main-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 justify-end">
  {/* Cards */}
  <div className="card bg-white rounded-lg shadow-md p-4 ml-10 sm:p-6 flex items-center justify-between">
    <div className="card-icon bg-blue-500 text-white rounded-full p-3 transition-all duration-300 ease-in-out hover:bg-blue-600 hover:scale-110">
      <GiTakeMyMoney size={20} sm:size={24} />
    </div>
    <div className="card-content">
      <h4 className="text-lg sm:text-xl font-bold">Salary</h4>
      <p className="text-gray-500 text-sm sm:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
  </div>

  <div className="card bg-white rounded-lg shadow-md p-4 ml-10 sm:p-6 flex items-center justify-between mt-4 sm:mt-0">
    <div className="card-icon bg-green-500 text-white rounded-full p-3 transition-all duration-300 ease-in-out hover:bg-green-600 hover:scale-110">
      <FcLeave size={20} sm:size={24} />
    </div>
    <div className="card-content">
      <h4 className="text-lg sm:text-xl font-bold">Leave</h4>
      <p className="text-gray-500 text-sm sm:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
  </div>

  <div className="card bg-white rounded-lg shadow-md p-4 sm:p-6 flex items-center justify-between mt-4 ml-10 md:mt-0">
    <div className="card-icon bg-yellow-500 text-white rounded-full p-3 transition-all duration-300 ease-in-out hover:bg-yellow-600 hover:scale-110">
      <BsPeopleFill size={20} sm:size={24} />
    </div>
    <div className="card-content">
      <h4 className="text-lg sm:text-xl font-bold">Employee</h4>
      <p className="text-gray-500 text-sm sm:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
  </div>
</div>


      <div className="charts mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              color="#000000"
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
            />
            <Tooltip />
            <Legend />
            <text x="50%" y="7%" textAnchor="middle" dominantBaseline="middle" className="text-xl sm:text-2xl font-bold shadow-md">
              TOTAL EMPLOYEE
            </text>
          </PieChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            <text x="50%" y="4%" textAnchor="middle" dominantBaseline="middle" className="text-xl sm:text-2xl font-bold shadow-md">
              TOTAL SALARY
            </text>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Home;