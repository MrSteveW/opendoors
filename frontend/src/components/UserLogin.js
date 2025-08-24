import { useState } from "react";

export default function LoginForm({ onLogin }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // {type: "error"|"success", text: string}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("http://localhost:3001/api/v1/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.message || "Login failed" });
        setLoading(false);
        return;
      }

      // Save token + userId
      localStorage.setItem("token", data.accessToken);
      if (data.userId) {
        localStorage.setItem("userId", data.userId);
      }

      setMessage({ type: "success", text: "Login successful!" });
      setLoading(false);
      if (onLogin) {
        onLogin(data);
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error" });
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4 mt-5">
          <h2 className="mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-100"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            {message && (
              <p
                className={`mt-3 text-center ${
                  message.type === "error" ? "text-danger" : "text-success"
                }`}
              >
                {message.text}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
