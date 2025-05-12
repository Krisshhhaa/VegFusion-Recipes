import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/App_Context';

const FetchRecipeById = ({ id }) => {
  const { getRecipeById } = useContext(AppContext);
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const result = await getRecipeById(id);
        if (result.data.recipe) {
          setRecipe(result.data.recipe);
        } else {
          setError("Recipe not found");
        }
      } catch (err) {
        setError("Error fetching recipe");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRecipe();
  }, [id, getRecipeById]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div className="card p-4 shadow-lg" style={{
        width: "80%",
        maxWidth: "600px",
        borderRadius: "15px",
        background: "#fff",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        textAlign: "center"
      }}>
        <div className="d-flex justify-content-center align-items-center p-3">
          <img 
            src={recipe?.imgurl || "https://via.placeholder.com/200"} 
            className="card-img-top" 
            alt="Recipe"
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "10px",
              border: "2px solid yellow"
            }} 
          />
        </div>
        <h3 style={{ color: "black", fontWeight: "bold" }}>{recipe?.title}</h3>
        <div className="container my-3"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "left"
          }}
        >
          <div className="left" style={{ color: 'black' }}>
            <h5>{recipe?.ing1} - {recipe?.qty1}</h5>
            <h5>{recipe?.ing2} - {recipe?.qty2}</h5>
            <h5>{recipe?.ing3} - {recipe?.qty3}</h5>
            <h5>{recipe?.ing4} - {recipe?.qty4}</h5>
          </div>
        </div>
        <div className="right" style={{
          color: 'black',
          fontSize: "16px",
          background: "#f8f9fa",
          padding: "10px",
          borderRadius: "10px",
          textAlign:"left",
        }}>
          {recipe?.ist}
        </div>
        <Link to={'/'} className="btn btn-warning my-4" style={{
          fontSize: "18px",
          fontWeight: "bold",
          padding: "10px 20px",
          borderRadius: "8px"
        }}>Back to Home</Link>
      </div>
    </div>
  );
};

export default FetchRecipeById;
