import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { analyzePet } from "../services/api";
import Chatbox from "../components/Chatbox";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const pet = localStorage.getItem("petProfile");

    if (!user) navigate("/");
    else if (!pet) navigate("/profile");
  }, [navigate]);

  const [petType, setPetType] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [temperature, setTemperature] = useState("");
  const [activity, setActivity] = useState("");

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(null);
  const [imageAnalysis, setImageAnalysis] = useState("");

  const analyzePetHandler = async () => {
    const petData = localStorage.getItem("petProfile");

    if (!petData) {
      setResult("❌ Please create pet profile first");
      return;
    }

    setLoading(true);
    setResult("");
    setImageAnalysis("");

    try {
      const formData = new FormData();

      formData.append("pet_type", petType || "dog");
      formData.append("symptoms", symptoms || "none");
      formData.append("pet_profile", petData);
      formData.append("heart_rate", heartRate || "");
      formData.append("temperature", temperature || "");
      formData.append("activity", activity || "");

      if (image) {
        formData.append("image", image);
      }

      //console.log("📤 Sending request to /analyze/");
      console.log("📤 Sending request to /api/analyze/");
      const res = await analyzePet(formData);

      console.log("✅ RESPONSE:", res.data);

      let text = res.data?.result;

      if (typeof text === "object") {
        text = JSON.stringify(text, null, 2);
      }

      setResult(text || "No result received");
      setImageAnalysis(res.data?.image_analysis || "");

    } catch (err) {
      console.error("❌ ERROR:", err);

      if (err.response) {
        setResult(`❌ ${JSON.stringify(err.response.data)}`);
      } else {
        setResult("❌ Cannot connect to backend");
      }
    }

    setLoading(false);
  };

  const petData = JSON.parse(localStorage.getItem("petProfile"));

  return (
    <div className="flex h-screen">

      {/* SIDEBAR */}
      <div className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-teal-600 mb-4">
            🐾 PetCare AI
          </h2>

          {petData && (
            <div className="bg-teal-50 p-3 rounded-lg text-sm">
              <p><b>Name:</b> {petData.name}</p>
              <p><b>Age:</b> {petData.age}</p>
              <p><b>Breed:</b> {petData.breed}</p>
            </div>
          )}
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/");
          }}
          className="w-full bg-red-500 text-white py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">

        <h1 className="text-2xl font-bold mb-6">
          🩺 Pet Health Analyzer
        </h1>

        <div className="bg-white p-6 rounded-xl shadow-md mb-6">

          <h2 className="text-lg font-semibold mb-4">
            Enter Pet Details
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Pet Type"
              value={petType}
              onChange={(e) => setPetType(e.target.value)}
              className="p-3 border rounded-lg"
            />

            <input
              type="text"
              placeholder="Symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="p-3 border rounded-lg"
            />

            <input
              type="number"
              placeholder="Heart Rate"
              value={heartRate}
              onChange={(e) => setHeartRate(e.target.value)}
              className="p-3 border rounded-lg"
            />

            <input
              type="number"
              placeholder="Temperature"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              className="p-3 border rounded-lg"
            />

            <input
              type="text"
              placeholder="Activity"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="p-3 border rounded-lg col-span-2"
            />
          </div>

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="mb-4"
          />

          <button
            onClick={analyzePetHandler}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg"
          >
            Analyze
          </button>

          {loading && (
            <div className="mt-4 p-4 bg-gray-200 rounded-lg">
              🧠 AI is analyzing...
            </div>
          )}

          {imageAnalysis && (
            <div className="mt-4 p-4 bg-purple-50 rounded-lg">
              <h3>🔍 Image Analysis</h3>
              <p>{imageAnalysis}</p>
            </div>
          )}

          {result && !loading && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg whitespace-pre-line">
              {result}
            </div>
          )}

        </div>

        <Chatbox />
      </div>
    </div>
  );
}

export default Home;