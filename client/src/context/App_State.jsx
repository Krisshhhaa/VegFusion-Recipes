import axios from "axios";
import React, { useEffect, useState } from "react";
import { AppContext } from "./App_Context";

const App_State = (props) => {
  const url = "http://localhost:3000/api";

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [recipe, setRecipe] = useState([]);
  const [filteredRecipe, setFilteredRecipe] = useState([]);
  const [savedRecipe, setSavedRecipe] = useState([]);
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState("");
  const [userRecipe, setUserRecipe] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    fetchRecipe();
    profile();
  }, [token, reload]);

  useEffect(() => {
    setFilteredRecipe(recipe); // ✅ Update filtered recipes when all recipes change
  }, [recipe]);

  const fetchRecipe = async () => {
    try {
      const response = await axios.get(`${url}/`, { withCredentials: true });
      setRecipe(response.data.recipe);
      setFilteredRecipe(response.data.recipe); // ✅ Sync filtered recipes initially
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const profile = async () => {
    try {
      const response = await axios.get(`${url}/user`, {
        headers: { Auth: token },
        withCredentials: true,
      });

      if (response.data?.user) {
        setUser(response.data.user);
        setUserId(response.data.user._id);
        getSavedRecipeById();
        recipeByUser(response.data.user._id);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const getSavedRecipeById = async () => {
    try {
      const response = await axios.get(`${url}/saved`, { withCredentials: true });
      setSavedRecipe(response.data.recipe);
    } catch (error) {
      console.error("Error fetching saved recipes:", error);
    }
  };

  const recipeByUser = async (id) => {
    if (!id) return;
    try {
      const response = await axios.get(`${url}/user/${id}`, { withCredentials: true });
      setUserRecipe(response.data.recipe);
    } catch (error) {
      console.error("Error fetching user recipes:", error);
    }
  };

  const filterRecipesByCategory = (category) => {
    const filtered = category === "All" ? recipe : recipe.filter((item) => item.category === category);
    setFilteredRecipe(filtered); // ✅ Update state
    return filtered; // ✅ Ensure `Home.jsx` gets filtered data
  };

  const register = async (name, gmail, password) => {
    // Password validation
    if (password.length < 6) {
      return Promise.reject({ response: { data: { message: "Password must be at least 6 characters long!" } } });
    }
    if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      return Promise.reject({ response: { data: { message: "Password must contain both letters and numbers!" } } });
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return Promise.reject({ response: { data: { message: "Password must contain at least one special character!" } } });
    }
  
    return axios.post(`${url}/register`, { name, gmail, password }, { withCredentials: true });
  };
  

  const login = async (gmail, password) => {
    const response = await axios.post(`${url}/login`, { gmail, password }, { withCredentials: true });
    setToken(response.data.token);
    setIsAuthenticated(true);
    return response;
  };

  const addRecipe = async ({title, ist, ing1, ing2, ing3, ing4, qty1, qty2, qty3, qty4, imgurl, category}) => {
    const response = await axios.post(
      `${url}/add`,
      { title, ist, ing1, ing2, ing3, ing4, qty1, qty2, qty3, qty4, imgurl, category },
      {
          headers: { Auth: token, "Content-Type": "application/json" }, 
          withCredentials: true,
      }
    );
    setReload(!reload);
    return response;
  };

  const getRecipeById = async (id) => {
    return axios.get(`${url}/${id}`, { withCredentials: true });
  };

  const savedRecipeById = async (id) => {
    const response = await axios.post(`${url}/${id}`, {}, { headers: { Auth: token }, withCredentials: true });
    setReload(!reload);
    return response;
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    setIsAuthenticated(false);
  };

  return (
    <AppContext.Provider
      value={{
        login,
        register,
        addRecipe,
        recipe,
        filteredRecipe,
        setFilteredRecipe, 
        filterRecipesByCategory,
        getRecipeById,
        savedRecipeById,
        savedRecipe,
        userRecipe,
        user,
        logOut,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default App_State;
