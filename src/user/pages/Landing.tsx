import { useNavigate } from "react-router-dom"; // Import useNavigate

const Landing = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGetStarted = () => {
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Simple Header */}
      <header className="bg-white p-4 rounded-lg text-center shadow-sm mb-6">
        <h1 className="text-2xl font-bold text-blue-600">
          Student Management System
        </h1>
      </header>

      {/* Main Content */}
      <main className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome to Student Management
          </h2>
          <p className="text-gray-600 mb-6">
            Manage your students and courses efficiently
          </p>
          <button
            onClick={handleGetStarted} // Handle button click
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Get Started
          </button>
        </div>
      </main>
    </div>
  );
};

export default Landing;
