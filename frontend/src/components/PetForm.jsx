import { useState } from "react";
import { analyzePet } from "../services/api";

export default function PetForm() {
  const [form, setForm] = useState({
    pet_type: "",
    age: "",
    symptoms: "",
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await analyzePet(form);
      setResult(res.data.result);
    } catch (err) {
      console.error(err);
      alert("Error connecting backend");
    }
  };

  return (
    <div>
      <h2>Pet Health Analysis</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="pet_type"
          placeholder="Dog/Cat"
          onChange={handleChange}
        />
        <input
          name="age"
          placeholder="Age"
          onChange={handleChange}
        />
        <input
          name="symptoms"
          placeholder="Symptoms"
          onChange={handleChange}
        />

        <button type="submit">Analyze</button>
      </form>

      <p>{result}</p>
    </div>
  );
}