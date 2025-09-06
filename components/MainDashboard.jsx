import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../App";
import { useSearchParams } from "react-router-dom";
import {
  FiPackage,
  FiMapPin,
  FiPlus,
  FiTruck,
  FiBox,
  FiCheckCircle,
} from "react-icons/fi";
import AddProductForm from "./AddProductForm";

function MainDashboard({ defaultTab }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(defaultTab || "dashboard");

  // Sync tab with URL params
  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl && tabs[tabFromUrl]) {
      setActiveTab(tabFromUrl);
    } else if (!defaultTab) {
      setActiveTab("dashboard");
    }
  }, [defaultTab, searchParams]);

  // Update URL when tab changes
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    tabId === "dashboard"
      ? setSearchParams({})
      : setSearchParams({ tab: tabId });
  };

  // Available tabs mapped to components
  const tabs = {
    dashboard: <DashboardTab />,
    "add-products": <AddProductForm />,
    "add-checkpoints": <AddCheckpointsTab />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {tabs[activeTab] || tabs.dashboard}
      </div>
    </div>
  );
}

// Dashboard Tab Component
function DashboardTab() {
  const [products] = useState([
    {
      id: "PROD001",
      name: "Organic Coffee Beans",
      status: "In Transit",
      location: "Warehouse B",
      lastUpdate: "2 hours ago",
      progress: 75,
      checkpoints: [
        { name: "Farm", status: "Completed", timestamp: "2024-01-15 08:00" },
        {
          name: "Processing Plant",
          status: "Completed",
          timestamp: "2024-01-16 14:30",
        },
        {
          name: "Warehouse A",
          status: "Completed",
          timestamp: "2024-01-17 09:15",
        },
        {
          name: "Warehouse B",
          status: "In Progress",
          timestamp: "2024-01-18 11:00",
        },
        { name: "Retail Store", status: "Pending", timestamp: null },
      ],
    },
    {
      id: "PROD002",
      name: "Fresh Vegetables",
      status: "At Checkpoint",
      location: "Processing Plant",
      lastUpdate: "1 hour ago",
      progress: 40,
      checkpoints: [
        { name: "Farm", status: "Completed", timestamp: "2024-01-18 06:00" },
        {
          name: "Processing Plant",
          status: "In Progress",
          timestamp: "2024-01-18 10:00",
        },
        { name: "Distribution Center", status: "Pending", timestamp: null },
        { name: "Retail Store", status: "Pending", timestamp: null },
      ],
    },
  ]);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome to Your Supply Chain Dashboard
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Monitor and manage your products across the entire supply chain
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
              <FiPackage className="w-8 h-8 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Products
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {products.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl">
              <FiCheckCircle className="w-8 h-8 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                In Transit
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {products.filter((p) => p.status === "In Transit").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl">
              <FiMapPin className="w-8 h-8 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                At Checkpoint
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {products.filter((p) => p.status === "At Checkpoint").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <FiTruck className="w-8 h-8 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Delivered
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {products.filter((p) => p.status === "Delivered").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <FiBox className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
            Active Products
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your products through the supply chain
          </p>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {products.map((product) => (
            <div
              key={product.id}
              className="p-8 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {product.name}
                    </h3>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        product.status === "In Transit"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : product.status === "At Checkpoint"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    ID: {product.id}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    📍 Currently at:{" "}
                    <span className="font-medium">{product.location}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Last updated
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {product.lastUpdate}
                  </p>
                </div>
              </div>

              {/* Enhanced Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <span className="font-medium">Supply Chain Progress</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {product.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out shadow-lg"
                    style={{ width: `${product.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Enhanced Checkpoints */}
              <div>
                <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center">
                  <FiMapPin className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                  Checkpoints
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {product.checkpoints.map((checkpoint, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                    >
                      <div
                        className={`w-4 h-4 rounded-full flex-shrink-0 ${
                          checkpoint.status === "Completed"
                            ? "bg-green-500 shadow-lg shadow-green-200"
                            : checkpoint.status === "In Progress"
                            ? "bg-yellow-500 shadow-lg shadow-yellow-200"
                            : "bg-gray-300 dark:bg-gray-600"
                        }`}
                      ></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {checkpoint.name}
                        </p>
                        {checkpoint.timestamp && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {checkpoint.timestamp}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Add Products Tab Component
function AddProductsTab() {
  return <AddProductForm />;
}

// Add Checkpoints Tab Component
function AddCheckpointsTab() {
  const [formData, setFormData] = useState({
    checkpointName: "",
    location: "",
    description: "",
    type: "",
    coordinates: "",
    contactPerson: "",
    contactPhone: "",
    estimatedTime: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle checkpoint creation logic here
    console.log("Checkpoint data:", formData);
    alert("Checkpoint added successfully!");
    setFormData({
      checkpointName: "",
      location: "",
      description: "",
      type: "",
      coordinates: "",
      contactPerson: "",
      contactPhone: "",
      estimatedTime: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
          Add New Checkpoint
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Checkpoint Name *
              </label>
              <input
                type="text"
                name="checkpointName"
                value={formData.checkpointName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                placeholder="e.g., Warehouse A"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                placeholder="e.g., New York, NY"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
              placeholder="Checkpoint description..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Checkpoint Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Type</option>
                <option value="farm">Farm/Origin</option>
                <option value="processing">Processing Plant</option>
                <option value="warehouse">Warehouse</option>
                <option value="distribution">Distribution Center</option>
                <option value="retail">Retail Store</option>
                <option value="customs">Customs Checkpoint</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Coordinates (Optional)
              </label>
              <input
                type="text"
                name="coordinates"
                value={formData.coordinates}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                placeholder="e.g., 40.7128, -74.0060"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Contact Person
              </label>
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                placeholder="e.g., John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Contact Phone
              </label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                placeholder="e.g., +1-555-123-4567"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Estimated Processing Time
            </label>
            <input
              type="text"
              name="estimatedTime"
              value={formData.estimatedTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
              placeholder="e.g., 2-3 hours"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() =>
                setFormData({
                  checkpointName: "",
                  location: "",
                  description: "",
                  type: "",
                  coordinates: "",
                  contactPerson: "",
                  contactPhone: "",
                  estimatedTime: "",
                })
              }
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Add Checkpoint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MainDashboard;
