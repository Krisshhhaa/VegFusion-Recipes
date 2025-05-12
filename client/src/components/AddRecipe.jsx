import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from '../context/App_Context';

const AddRecipe = () => {
  const navigate = useNavigate();
  const { addRecipe } = useContext(AppContext);

  const [formData, setFormData] = useState({
    title: "",
    ist: "",
    ing1: "",
    ing2: "",
    ing3: "",
    ing4: "",
    qty1: "",
    qty2: "",
    qty3: "",
    qty4: "",
    imgurl: "",
    category: ""
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!formData.category) {
      toast.error("Please select a category", {
        position: "top-right",
        autoClose: 1000,
        theme: "colored",
      });
      return;
    }

    const result = await addRecipe({ ...formData });

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

    setTimeout(() => navigate('/'), 1500);
  };

  return (
    <>
      <ToastContainer />
      <div className="container my-5 p-5" style={{ maxWidth: "600px", border: "2px solid black", borderRadius: '10px', color: "black" }}>
        <h2 className="text-center mb-4">Add Recipe</h2>
        <form onSubmit={onSubmitHandler} style={{ width: "100%", margin: 'auto' }} className="p-3">
          
          {/* Recipe Title */}
          <label>Recipe Title</label>
          <input type="text" name="title" value={formData.title} onChange={onChangeHandler} className="form-control mb-3" placeholder="Enter recipe title" required />

          {/* Instructions */}
          <label>Instructions</label>
          <textarea name="ist" value={formData.ist} onChange={onChangeHandler} className="form-control mb-3" placeholder="Enter instructions" rows="3" required></textarea>

          {/* Ingredients & Quantities */}
          <div className="row">
            <div className="col-6">
              <label>Ingredient 1</label>
              <input type="text" name="ing1" value={formData.ing1} onChange={onChangeHandler} className="form-control mb-2" placeholder="Ingredient 1" />
            </div>
            <div className="col-6">
              <label>Quantity 1</label>
              <input type="text" name="qty1" value={formData.qty1} onChange={onChangeHandler} className="form-control mb-2" placeholder="Qty 1" />
            </div>
            <div className="col-6">
              <label>Ingredient 2</label>
              <input type="text" name="ing2" value={formData.ing2} onChange={onChangeHandler} className="form-control mb-2" placeholder="Ingredient 2" />
            </div>
            <div className="col-6">
              <label>Quantity 2</label>
              <input type="text" name="qty2" value={formData.qty2} onChange={onChangeHandler} className="form-control mb-2" placeholder="Qty 2" />
            </div>
            <div className="col-6">
              <label>Ingredient 3</label>
              <input type="text" name="ing3" value={formData.ing3} onChange={onChangeHandler} className="form-control mb-2" placeholder="Ingredient 3" />
            </div>
            <div className="col-6">
              <label>Quantity 3</label>
              <input type="text" name="qty3" value={formData.qty3} onChange={onChangeHandler} className="form-control mb-2" placeholder="Qty 3" />
            </div>
            <div className="col-6">
              <label>Ingredient 4</label>
              <input type="text" name="ing4" value={formData.ing4} onChange={onChangeHandler} className="form-control mb-2" placeholder="Ingredient 4" />
            </div>
            <div className="col-6">
              <label>Quantity 4</label>
              <input type="text" name="qty4" value={formData.qty4} onChange={onChangeHandler} className="form-control mb-2" placeholder="Qty 4" />
            </div>
          </div>

          {/* Image URL */}
          <label>Image URL</label>
          <input type="text" name="imgurl" value={formData.imgurl} onChange={onChangeHandler} className="form-control mb-3" placeholder="Enter image URL" required />

          {/* Category Selection */}
          <label>Category</label>
          <select name="category" value={formData.category} onChange={onChangeHandler} className="form-control mb-3" required>
            <option value="">Select Category</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Beverages">Beverages</option>
            <option value="Salad-Soup">Salad & Soup</option>
          </select>

          {/* Submit Button */}
          <button type="submit" className="btn btn-success w-100 mt-3">Add Recipe</button>
        </form>
      </div>
    </>
  );
};

export default AddRecipe;
