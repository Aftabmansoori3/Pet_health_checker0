import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PetProfile() {
  const navigate = useNavigate();

  const [pet, setPet] = useState({
    name: "",
    age: "",
    breed: "",
    weight: ""
  });

  const handleSave = () => {
    if (!pet.name || !pet.age) {
      alert("Please fill required fields");
      return;
    }

    localStorage.setItem("petProfile", JSON.stringify(pet));

    // 👉 Go to HOME after saving
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 to-green-400">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">

        <h1 className="text-2xl font-bold text-center mb-4">
          🐾 Add Pet Profile
        </h1>

        <input
          type="text"
          placeholder="Pet Name"
          className="w-full p-3 mb-3 border rounded-lg"
          onChange={(e) => setPet({ ...pet, name: e.target.value })}
        />

        <input
          type="text"
          placeholder="Age"
          className="w-full p-3 mb-3 border rounded-lg"
          onChange={(e) => setPet({ ...pet, age: e.target.value })}
        />

        <input
          type="text"
          placeholder="Breed"
          className="w-full p-3 mb-3 border rounded-lg"
          onChange={(e) => setPet({ ...pet, breed: e.target.value })}
        />

        <input
          type="text"
          placeholder="Weight"
          className="w-full p-3 mb-4 border rounded-lg"
          onChange={(e) => setPet({ ...pet, weight: e.target.value })}
        />

        <button
          onClick={handleSave}
          className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700"
        >
          Save & Continue
        </button>

      </div>
    </div>
  );
}

export default PetProfile;