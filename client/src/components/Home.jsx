import React, { useContext, useEffect, useState } from "react";
import { FaBacon, FaCarrot, FaCoffee, FaGlassMartini, FaPizzaSlice, FaUtensils } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../context/App_Context";

const categories = [
  { name: "All", icon: <FaUtensils /> },
  { name: "Lunch", icon: <FaPizzaSlice /> },
  { name: "Dinner", icon: <FaBacon /> },
  { name: "Breakfast", icon: <FaCoffee /> },
  { name: "Beverages", icon: <FaGlassMartini /> },
  { name: "Salad-Soup", icon: <FaCarrot /> },
];

const Home = () => {
  const navigate = useNavigate();
  const {
    recipe,
    savedRecipeById,
    filterRecipesByCategory,
    filteredRecipe,
    setFilteredRecipe,
  } = useContext(AppContext);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (recipe.length > 0) {
      setLoading(false);
      setFilteredRecipe(recipe);
    }
  }, [recipe, setFilteredRecipe]);

  const saved = async (id) => {
    const result = await savedRecipeById(id);
    toast.success(result.data.message, {
      position: "top-right",
      autoClose: 1000,
      theme: "colored",
      transition: Bounce,
    });
  };

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (category === "All") {
      setFilteredRecipe(recipe);
    } else {
      try {
        const filtered = await filterRecipesByCategory(category);
        setFilteredRecipe(filtered);
      } catch (error) {
        console.error("Error filtering recipes:", error);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container my-3">
        <div className="d-flex justify-content-center flex-wrap gap-2 my-3">
          {categories.map(({ name, icon }) => (
            <button
              key={name}
              className={`btn d-flex align-items-center gap-2 px-3 py-2 rounded-pill shadow-sm fw-bold text-uppercase ${
                selectedCategory === name ? "btn-danger text-light" : "btn-outline-success"
              }`}
              onClick={() => handleCategoryClick(name)}
            >
              {icon} {name}
            </button>
          ))}
        </div>
      </div>

      <div className="container my-5">
        <h2 className="text-center fw-bold" style={{ color: "#ff6347" }}>
          Delicious Recipes 🍽️
        </h2>
        <p className="text-center text-muted">
          Discover tasty vegetarian recipes curated for PG students!
        </p>

        {loading ? (
          <p className="text-center text-muted">Loading recipes...</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {filteredRecipe.length > 0 ? (
              filteredRecipe.map((data) => (
                <div key={data?._id} className="col">
                  <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
                    <div className="position-relative">
                      <img
                        src={data?.imgurl}
                        className="card-img-top"
                        alt={data?.title}
                        style={{ height: "220px", objectFit: "cover" }}
                      />
                      <div className="position-absolute top-0 end-0 p-2">
                        <button
                          className="btn btn-light btn-sm rounded-circle"
                          onClick={() => saved(data?._id)}
                        >
                          ❤️
                        </button>
                      </div>
                    </div>

                    <div className="card-body text-center">
                      <h5 className="card-title text-success fw-bold">
                        {data?.title}
                      </h5>
                      <p className="text-muted">{data?.category}</p>
                      <div className="d-flex justify-content-center mt-3 gap-3">
                        <button
                          className="btn btn-outline-primary rounded-pill px-3"
                          onClick={() => saved(data?._id)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-warning rounded-pill px-3"
                          onClick={() => navigate(`/${data?._id}`)}
                        >
                          View More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted">
                No recipes found for "{selectedCategory}".
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
