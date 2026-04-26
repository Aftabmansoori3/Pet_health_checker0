import { useEffect, useState } from "react";
import { getHistory } from "../services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState("all");

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    filterData();
  }, [history, days]);

  const fetchHistory = async () => {
    try {
      const res = await getHistory();
      setHistory(res.data || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  // 📅 Filter Logic
  const filterData = () => {
    if (days === "all") {
      setFiltered(history);
      return;
    }

    const now = new Date();
    const filteredData = history.filter((item) => {
      const itemDate = new Date(item.date || Date.now());
      const diff = (now - itemDate) / (1000 * 60 * 60 * 24);
      return diff <= Number(days);
    });

    setFiltered(filteredData);
  };

  // 🔢 Summary
  const total = filtered.length;

  const avgHeart =
    filtered.reduce((sum, i) => sum + Number(i.heart_rate || 0), 0) /
    (total || 1);

  const avgTemp =
    filtered.reduce((sum, i) => sum + Number(i.temperature || 0), 0) /
    (total || 1);

  // 🎯 Health Score
  const healthScore = Math.max(
    0,
    100 -
      (avgTemp > 39 ? 30 : 0) -
      (avgHeart > 120 ? 30 : 0) -
      (filtered.filter((i) =>
        i.activity?.toLowerCase().includes("low")
      ).length *
        10)
  );

  // 🧠 AI Summary
  const highTemp = filtered.filter((i) => i.temperature > 39).length;
  const highHeart = filtered.filter((i) => i.heart_rate > 120).length;
  const lowActivity = filtered.filter((i) =>
    i.activity?.toLowerCase().includes("low")
  ).length;

  const aiSummary = `
- ${highTemp} cases show high temperature (possible fever)
- ${highHeart} cases show high heart rate (stress/pain)
- ${lowActivity} cases show low activity (weakness)
- Overall condition: ${
    healthScore > 80
      ? "Healthy"
      : healthScore > 50
      ? "Moderate Risk"
      : "High Risk"
  }
`;

  // 📈 Chart Data
  const heartData = filtered.map((item, index) => ({
    name: `#${index + 1}`,
    heart: Number(item.heart_rate || 0),
  }));

  const tempData = filtered.map((item, index) => ({
    name: `#${index + 1}`,
    temp: Number(item.temperature || 0),
  }));

  return (
    <div className="p-4 md:p-6 text-white">
      <h1 className="text-xl md:text-2xl font-bold mb-4">
        📊 Pet Health Dashboard
      </h1>

      {/* 📅 Filter */}
      <div className="mb-4">
        <select
          value={days}
          onChange={(e) => setDays(e.target.value)}
          className="text-black p-2 rounded"
        >
          <option value="all">All Time</option>
          <option value="1">Last 1 Day</option>
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
        </select>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && filtered.length === 0 && (
        <p>🐾 No data available</p>
      )}

      {!loading && filtered.length > 0 && (
        <>
          {/* 🔢 Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="bg-green-600 p-3 rounded">
              <p>Total Cases</p>
              <h2>{total}</h2>
            </div>

            <div className="bg-blue-600 p-3 rounded">
              <p>Avg Heart</p>
              <h2>{avgHeart.toFixed(1)}</h2>
            </div>

            <div className="bg-purple-600 p-3 rounded">
              <p>Avg Temp</p>
              <h2>{avgTemp.toFixed(1)}°C</h2>
            </div>

            <div className="bg-yellow-600 p-3 rounded">
              <p>Health Score</p>
              <h2>{healthScore}</h2>
            </div>
          </div>

          {/* 🧠 AI Summary */}
          <div className="bg-indigo-700 p-4 rounded mb-6">
            <h2 className="font-semibold mb-2">🧠 AI Health Summary</h2>
            <pre className="whitespace-pre-line">{aiSummary}</pre>
          </div>

          {/* ❤️ Heart Graph */}
          <div className="bg-gray-800 p-4 rounded mb-6">
            <h2>❤️ Heart Rate Trend</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={heartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line dataKey="heart" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 🌡 Temp Graph */}
          <div className="bg-gray-800 p-4 rounded mb-6">
            <h2>🌡 Temperature Trend</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={tempData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line dataKey="temp" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 📝 Recent */}
          <div className="bg-gray-800 p-4 rounded">
            <h2 className="mb-2">📝 Recent Records</h2>

            {filtered.slice(-3).reverse().map((item, i) => (
              <div key={i} className="bg-gray-700 p-3 rounded mb-2">
                <p>🐾 {item.pet_type}</p>
                <p>Symptoms: {item.symptoms}</p>
                <p>
                  Status:{" "}
                  {item.temperature > 39
                    ? "🔥 Fever"
                    : item.heart_rate > 120
                    ? "❤️ Stress"
                    : "✅ Normal"}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}