import React, { useState } from "react";

const AddCategory = () => {
  const [formData, setFormData] = useState({
    nom_categorie: "",
    description: "",
  });
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://2f98-196-117-24-244.ngrok-free.app/Argan_beauty/categorie.php', {
        method: "POST",
        headers: {
            'ngrok-skip-browser-warning': '1',
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error}`);
        return;
      }

      const result = await response.json();
      setMessage(result.message || "Category added successfully!");
    } catch (error) {
      setMessage("An unexpected error occurred.");
      console.error("Error adding category:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Add Category</h1>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Category Name</label>
          <input
            type="text"
            name="nom_categorie"
            value={formData.nom_categorie}
            onChange={handleChange}
            placeholder="Enter category name"
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter category description"
            className="w-full px-3 py-2 border rounded"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
