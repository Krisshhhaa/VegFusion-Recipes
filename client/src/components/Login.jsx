import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../context/App_Context";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AppContext);
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // For button disable during request

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(gmail, password);

      if (result.data && result.data.message) {
        toast.success(result.data.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        throw new Error("Something went wrong. Please try again.");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Invalid email or password";
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="p-5 shadow-lg rounded-4"
          style={{
            width: "400px",
            background: "white",
          }}
        >
          <h2 className="text-center text-success fw-bold">Login 🍽</h2>
          <p className="text-center text-muted">Welcome back to VegFusion!</p>
          
          <form onSubmit={loginHandler} className="my-3">
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">Email</label>
              <input
                value={gmail}
                onChange={(e) => setGmail(e.target.value)}
                type="email"
                className="form-control rounded-3"
                id="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control rounded-3"
                id="password"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-success rounded-3 fw-semibold" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          <p className="text-center text-muted mt-3">
            Don't have an account? <a href="/register" className="text-decoration-none fw-bold" style={{ color: "#ff6347" }}>Sign up</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
