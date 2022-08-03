import React, { useEffect, useRef, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import "./create.css";
import { projectFirestore } from "../../firebase/config";

const Create = () => {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const navigate = useNavigate();

  const ingredientInput = useRef(null);

  // const { postData, data, error } = useFetch(
  //   "http://localhost:3000/recipes",
  //   "POST"
  // );

  //? redirect the user when we get data response
  // useEffect(() => {
  //   if (data) {
  //     navigate("/");
  //   }
  // }, [data, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(title, method, cookingTime, ingredients);

    // postData({
    //   title,
    //   ingredients,
    //   method,
    //   cookingTime: cookingTime + " minutes",
    // });

    const doc = {
      title,
      ingredients,
      method,
      cookingTime: cookingTime + " minutes",
    };

    try {
      await projectFirestore.collection("recipes").add(doc);
      navigate("/");
    } catch (err) {
      console.log(err);
    }

    setTitle("");
    setMethod("");
    setCookingTime("");
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();
    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIng) => [...prevIng, ing]);
    }
    setNewIngredient("");
    ingredientInput.current.focus();
  };

  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Recipe ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button onClick={handleAdd}>add</button>
          </div>
        </label>

        <p>
          Current Ingredients:
          {ingredients.map((i) => (
            <em key={i}>{i}, </em>
          ))}
        </p>

        <label>
          <span>Recipe method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>
        <label>
          <span>Cooking time (minutes):</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>

        <button>Submit</button>
      </form>
    </div>
  );
};

export default Create;
