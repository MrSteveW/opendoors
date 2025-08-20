import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import BookingManager from "./components/BookingManager";
import PupilManager from "./components/PupilManager";
import UserLogin from "./components/UserLogin";
import AdminDashboard from "./components/AdminDashboard";

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
        const decoded = jwtDecode(token);

        // JWT exp is in seconds, Date.now() is in ms → multiply by 1000
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
    // data = { accessToken, username, role }
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("username", data.username);
    localStorage.setItem("role", data.role);

    setIsLoggedIn(true);
    setUser({
      token: data.accessToken,
      username: data.username,
      role: data.role,
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
      {!isLoggedIn ? (
        <UserLogin onLogin={handleLogin} />
      ) : (
        <>
          <h2>Welcome, {user?.username}</h2>
          <button onClick={handleLogout}>Logout</button>

          {user?.role === "admin" ? (
            <AdminDashboard />
          ) : (
            <div>
              {/*Standard User Dashboard */}
              <BookingManager />
            </div>
          )}
        </>
      )}
    </div>
  );
}
