import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  
  const data = [
    { day: "Mon", users: 120 },
    { day: "Tue", users: 200 },
    { day: "Wed", users: 150 },
    { day: "Thu", users: 280 },
    { day: "Fri", users: 220 },
    { day: "Sat", users: 300 },
    { day: "Sun", users: 260 },
  ];
  
  const ActiveUsersChart = () => {
    return (
      <div className="bg-[#111] border border-[#222] rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Active Users (Weekly)
        </h3>
  
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="day" stroke="#777" />
              <YAxis stroke="#777" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#8b5cf6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };
  
  export default ActiveUsersChart;
  