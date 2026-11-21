
import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const response = await axios.post(
          `${API_URL}/api/auth/login`,
          {
            email: formData.email,
            password: formData.password
          }
        );

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        alert("Login successful!");

      } else {
        const response = await axios.post(
          `${API_URL}/api/auth/register`,
          formData
        );

        alert(response.data.message);
      }

      setFormData({
        name: "",
        email: "",
        password: ""
      });

    } catch (error) {
      alert(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>{isLogin ? "User Login" : "User Registration"}</h2>

        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {isLogin ? "Login" : "Register"}
        </button>

        <p>
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setFormData({
                name: "",
                email: "",
                password: ""
              });
            }}
            style={{
              color: "blue",
              cursor: "pointer",
              marginLeft: "5px"
            }}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default App;
