import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, createContext, useContext, useEffect } from "react";
import { ethers } from "ethers";
import Login from "./components/Login";
import Register from "./components/Register";
import IndividualRegister from "./components/IndividualRegister";
import OrganizationRegister from "./components/OrganizationRegister";
import MainDashboard from "./components/MainDashboard";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { ThemeProvider } from "./contexts/ThemeContext";

// Create Authentication Context
export const AuthContext = createContext(null);

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isConnected, setIsConnected] = useState(
    localStorage.getItem("walletConnected") === "true"
  );
  const [userAddress, setUserAddress] = useState(
    localStorage.getItem("userAddress")
  );
  const [userType, setUserType] = useState(localStorage.getItem("userType"));
  const [username, setUsername] = useState(localStorage.getItem("username"));

  useEffect(() => {
    // Don't auto-check wallet connection on app mount
    // Let users explicitly connect when they want to

    // Clear any existing wallet connection state to ensure clean start
    setIsConnected(false);
    setUserAddress(null);
    localStorage.setItem("walletConnected", "false");
    localStorage.removeItem("userAddress");

    // const checkWalletConnection = async () => {
    //   try {
    //     if (window.ethereum) {
    //       const accounts = await window.ethereum.request({
    //         method: "eth_accounts",
    //       });
    //       const isConnected = accounts.length > 0;
    //       setIsConnected(isConnected);
    //       localStorage.setItem("walletConnected", isConnected);

    //       if (isConnected && accounts[0]) {
    //         setUserAddress(accounts[0]);
    //         localStorage.setItem("userAddress", accounts[0]);
    //       } else {
    //         setUserAddress(null);
    //         localStorage.removeItem("userAddress");
    //       }
    //     }
    //   } catch (error) {
    //     console.error("Error checking wallet connection:", error);
    //     setIsConnected(false);
    //     setUserAddress(null);
    //     localStorage.setItem("walletConnected", "false");
    //     localStorage.removeItem("userAddress");
    //   }
    // };

    // checkWalletConnection();

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        const isConnected = accounts.length > 0;
        setIsConnected(isConnected);
        localStorage.setItem("walletConnected", isConnected);

        if (isConnected && accounts[0]) {
          setUserAddress(accounts[0]);
          localStorage.setItem("userAddress", accounts[0]);
        } else {
          setUserAddress(null);
          localStorage.removeItem("userAddress");
        }
      });

      window.ethereum.on("disconnect", () => {
        setIsConnected(false);
        setUserAddress(null);
        localStorage.setItem("walletConnected", "false");
        localStorage.removeItem("userAddress");
      });
    }
  }, []);

  const login = async (newToken, newUserType, newUsername) => {
    setToken(newToken);
    setUserType(newUserType);
    setUsername(newUsername);
    localStorage.setItem("token", newToken);
    localStorage.setItem("userType", newUserType);
    localStorage.setItem("username", newUsername);

    // Check wallet connection on login
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        const isConnected = accounts.length > 0;
        setIsConnected(isConnected);
        localStorage.setItem("walletConnected", isConnected);

        if (isConnected && accounts[0]) {
          setUserAddress(accounts[0]);
          localStorage.setItem("userAddress", accounts[0]);
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    }
  };

  const logout = () => {
    setToken(null);
    setIsConnected(false);
    setUserAddress(null);
    setUserType(null);
    setUsername(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userAddress");
    localStorage.removeItem("userType");
    localStorage.removeItem("username");
  };

  return (
    <ThemeProvider>
      <AuthContext.Provider
        value={{
          token,
          login,
          logout,
          isConnected,
          setIsConnected,
          userAddress,
          userType,
          username,
        }}
      >
        <Router>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/login"
                element={
                  !token ? <Login /> : <Navigate to="/dashboard" replace />
                }
              />
              <Route
                path="/register"
                element={
                  !token ? <Register /> : <Navigate to="/dashboard" replace />
                }
              />
              <Route
                path="/register/individual"
                element={
                  !token ? (
                    <IndividualRegister />
                  ) : (
                    <Navigate to="/dashboard" replace />
                  )
                }
              />
              <Route
                path="/register/organization"
                element={
                  !token ? (
                    <OrganizationRegister />
                  ) : (
                    <Navigate to="/dashboard" replace />
                  )
                }
              />
              <Route
                path="/dashboard"
                element={<MainDashboard />} // Main Dashboard - Supply Chain Traceability
              />
              <Route
                path="/profile"
                element={token ? <Profile /> : <Navigate to="/login" replace />}
              />
            </Routes>
          </div>
        </Router>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
