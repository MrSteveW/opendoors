import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import BookingManager from "./components/BookingManager";
import PupilManager from "./components/PupilManager";
import UserLogin from "./components/UserLogin";
import AdminDashboard from "./components/AdminDashboard";
import "./App.css";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    const classname = localStorage.getItem("classname");
    if (token && username) {
      try {
        const decoded = jwtDecode(token); // JWT exp is in seconds, Date.now() is in ms → multiply by 1000
        if (decoded.exp * 1000 > Date.now()) {
          // ✅ Token still valid
          setIsLoggedIn(true);
          setUser({ token, username, role, classname });
        } else {
          // ❌ Token expired
          handleLogout();
        }
      } catch (err) {
        console.error("Invalid token:", err);
        handleLogout();
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);
  const handleLogin = (data) => {
    const decoded = jwtDecode(data.accessToken);

    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("username", decoded.username);
    localStorage.setItem("role", decoded.role);
    localStorage.setItem("classname", decoded.classname);

    setIsLoggedIn(true);
    setUser({
      token: data.accessToken,
      username: decoded.username,
      role: decoded.role,
      classname: decoded.classname,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("classname");
    setIsLoggedIn(false);
    setUser(null);
  };
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      {" "}
      {!isLoggedIn ? (
        <UserLogin onLogin={handleLogin} />
      ) : (
        <>
          {" "}
          <h2>Welcome, {user?.username}</h2>{" "}
          <button onClick={handleLogout}>Logout</button>{" "}
          {user?.role === "admin" ? (
            <AdminDashboard />
          ) : (
            <div>
              {" "}
              {/*Standard User Dashboard */} <BookingManager />{" "}
            </div>
          )}{" "}
        </>
      )}{" "}
    </div>
  );
}
