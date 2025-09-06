
import React, { useState, useContext } from "react";
import { AuthContext } from "../App";
import mockApi from "../services/api";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    productName: "",
    productId: "",
    description: "",
    category: "",
    origin: "",
    quantity: "",
    unit: "kg",
  });
  const [batchNumber, setBatchNumber] = useState("");
  const [productionDate, setProductionDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState(null);

  const { isConnected, userAddress } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResponse(null);

    // Validation
    if (
      !formData.productName ||
      !formData.category ||
      !batchNumber ||
      !productionDate
    ) {
      setError(
        "Product name, category, batch number, and production date are required."
      );
      return;
    }

    const qty = Number(formData.quantity);
    if (isNaN(qty) || qty < 0) {
      setError("Quantity must be a non-negative number.");
      return;
    }

    try {
      const product = await mockApi.addProduct({
        name: formData.productName,
        category: formData.category,
        quantity: qty,
        manufacturer: formData.origin,
        description: formData.description,
        batchNumber,
        productionDate,
        expiryDate, // optional
      });
      setResponse(product);

      // Reset Form
      setFormData({
        productName: "",
        productId: "",
        description: "",
        category: "",
        origin: "",
        quantity: "",
        unit: "kg",
      });
      setBatchNumber("");
      setProductionDate("");
      setExpiryDate("");
    } catch (err) {
      setError(err.message || "Failed to add product.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
          Add New Product
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {response && (
          <p className="text-green-600 mb-4">
            ✅ Product added: {response.name}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name + ID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                placeholder="e.g., Organic Coffee Beans"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Product ID *
              </label>
              <input
                type="text"
                name="productId"
                value={formData.productId}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                placeholder="e.g., PROD001"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
              placeholder="Product description..."
            />
          </div>

          {/* Category + Origin */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Category</option>
                <option value="agriculture">Agriculture</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="electronics">Electronics</option>
                <option value="textiles">Textiles</option>
                <option value="food">Food & Beverage</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Origin</label>
              <input
                type="text"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                placeholder="e.g., Colombia"
              />
            </div>
          </div>

          {/* Quantity + Unit */}
          <div>
            <label className="block text-sm font-medium mb-2">Quantity</label>
            <div className="flex max-w-xs">
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="flex-1 px-3 py-2 border rounded-l-md shadow-sm dark:bg-gray-700 dark:text-white"
                placeholder="100"
              />
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="px-3 py-2 border border-l-0 rounded-r-md shadow-sm dark:bg-gray-700 dark:text-white"
              >
                <option value="kg">kg</option>
                <option value="tons">tons</option>
                <option value="pieces">pieces</option>
                <option value="liters">liters</option>
              </select>
            </div>
          </div>

          {/* Batch Number */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Batch Number *
            </label>
            <input
              type="text"
              value={batchNumber}
              onChange={(e) => setBatchNumber(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
              placeholder="e.g., BATCH-001"
            />
          </div>

          {/* Production + Expiry Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Production Date *
              </label>
              <input
                type="date"
                value={productionDate}
                onChange={(e) => setProductionDate(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Expiry Date
              </label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() =>
                setFormData({
                  productName: "",
                  productId: "",
                  description: "",
                  category: "",
                  origin: "",
                  quantity: "",
                  unit: "kg",
                })
              }
              className="px-4 py-2 border rounded-md shadow-sm bg-white dark:bg-gray-700"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
