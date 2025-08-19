import { useEffect, useState } from "react";
import BookingManager from "./components/BookingManager";
import PupilManager from "./components/PupilManager";
import UserLogin from "./components/UserLogin";
import AdminDashboard from "./components/AdminDashboard";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount: check localStorage + validate with server
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    if (token && username) {
      fetch("http://localhost:3001/api/v1/users/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.valid) {
            setIsLoggedIn(true);
            setUser({ token, username, role });
          } else {
            handleLogout();
          }
        })
        .catch(() => handleLogout())
        .finally(() => setLoading(false));
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
              <h3>Standard User Dashboard</h3>
              <BookingManager />
            </div>
          )}
        </>
      )}
    </div>
  );
}
