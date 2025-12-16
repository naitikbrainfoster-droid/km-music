const stats = [
    { title: "Total Users", value: 1240 },
    { title: "Total Songs", value: 320 },
    { title: "Total Artists", value: 58 },
    { title: "Active Users", value: 410 },
  ];
  
  const DashboardStats = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-[#111] border border-[#222] rounded-xl p-6"
          >
            <p className="text-gray-400 text-sm">{item.title}</p>
            <h2 className="text-3xl font-bold text-white mt-2">
              {item.value}
            </h2>
          </div>
        ))}
      </div>
    );
  };
  
  export default DashboardStats;
  