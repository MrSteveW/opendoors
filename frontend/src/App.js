import { useEffect, useState } from "react";
import BookingManager from "./components/BookingManager";
import PupilManager from "./components/PupilManager";
import UserLogin from "./components/UserLogin";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount: check localStorage + validate with server
  useEffect(() => {
    const token = localStorage.getItem("token"); // 👈 unified key
    const username = localStorage.getItem("username");

    if (token && username) {
      fetch("http://localhost:3001/api/v1/users/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 👈 token is enough
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.valid) {
            setIsLoggedIn(true);
            setUser({ token, username });
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
    // data = { accessToken, username }
    localStorage.setItem("token", data.accessToken); // 👈 consistent key
    localStorage.setItem("username", data.username);

    setIsLoggedIn(true);
    setUser({ token: data.accessToken, username: data.username });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
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
          <BookingManager />
          <PupilManager /> {/* 👈 this will now use the correct token */}
        </>
      )}
    </div>
  );
}
