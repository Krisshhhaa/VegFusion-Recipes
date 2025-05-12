//saved

import React, { useContext } from "react";
import { AppContext } from "../context/App_Context";
import FetchRecipeById from "./FetchRecipeById";

const Saved = () => {
  const { savedRecipe } = useContext(AppContext);

  return (
    <div className="container text-center my-4">
      <h2 className="fw-bold mb-4 text-warning">Saved Recipes</h2>

      {savedRecipe?.length > 0 ? (
        <div className="d-flex flex-wrap justify-content-center gap-4">
          {savedRecipe?.map((data) => (
            <FetchRecipeById key={data?.recipe} id={data?.recipe} />
          ))}
        </div>
      ) : (
        <p className="text-muted fs-5">No saved recipes yet! Start adding your favorite dishes. 🍽️</p>
      )}
    </div>
  );
};

export default Saved;

