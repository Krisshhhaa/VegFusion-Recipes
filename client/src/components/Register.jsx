import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from '../context/App_Context';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useContext(AppContext);
  const [name, setname] = useState("");
  const [gmail, setgmail] = useState("");
  const [password, setPassword] = useState("");

  const registerHandler = async (e) => {
    e.preventDefault();
  
    // Password validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!", { theme: "colored" });
      return;
    }
    if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      toast.error("Password must contain both letters and numbers!", { theme: "colored" });
      return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      toast.error("Password must contain at least one special character!", { theme: "colored" });
      return;
    }
  
    const result = await register(name, gmail, password);
  
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
  
    console.log(result.data);
    if (result.data.message !== 'User Already exist') {
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
  };
  

  return (
    <>
      <ToastContainer />
      <div className='container my-5 p-5' style={styles.container}>
        <h2 className='text-center' style={styles.heading}>Register</h2>
        <form onSubmit={registerHandler} style={styles.form} className='my-3 p-3'>

          <div className="mb-3">
            <label htmlFor="nameInput" className="form-label" style={styles.label}>Name</label>
            <input 
              value={name} 
              onChange={(e) => setname(e.target.value)} 
              required 
              type="text" 
              className="form-control" 
              id="nameInput" 
              style={styles.input}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label" style={styles.label}>Email</label>
            <input 
              value={gmail} 
              onChange={(e) => setgmail(e.target.value)} 
              required 
              type="email" 
              className="form-control" 
              id="emailInput" 
              style={styles.input}
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="passwordInput" className="form-label" style={styles.label}>Password</label>
            <input 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              type="password" 
              className="form-control" 
              id="passwordInput" 
              style={styles.input}
            />
          </div>

          <div className='container d-grid col-6'>
            <button type="submit" className="btn mt-3" style={styles.button}>
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

// Styling
const styles = {
  container: {
    width: "450px",
    background: "linear-gradient(135deg, #E8F5E9, #C8E6C9)", // Light green gradient
    borderRadius: "12px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)", // Soft shadow for modern look
    padding: "40px",
    textAlign: "center",
  },
  heading: {
    color: "#1B5E20", // Deep green heading
    fontSize: "28px",
    fontWeight: "bold",
  },
  form: {
    width: "100%",
    margin: "auto",
  },
  label: {
    fontWeight: "bold",
    color: "#1B5E20", // Deep Green
  },
  input: {
    borderRadius: "8px",
    padding: "10px",
    border: "1px solid #81C784", // Light green border
    outline: "none",
    transition: "0.3s",
  },
  button: {
    backgroundColor: "#388E3C", // Deep Green
    color: "white",
    borderRadius: "8px",
    padding: "10px",
    fontWeight: "bold",
    transition: "0.3s",
    border: "none",
    cursor: "pointer",
  },
};

// Hover Effect for Button
styles.button[":hover"] = {
  backgroundColor: "#2E7D32", // Darker Green
  transform: "scale(1.05)",
};

export default Register;
