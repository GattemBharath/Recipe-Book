import React from "react";
import "./recipelist.css";
import { Link } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import TrashCan from "../assets/trash.svg";
import { projectFirestore } from "../firebase/config";

const RecipeList = ({ recipes }) => {
  const { color, mode } = useTheme();

  const handleClick = (id) => {
    projectFirestore.collection("recipes").doc(id).delete();
  };

  if (recipes.length === 0) {
    return <div className="error">No recipes to load...</div>;
  }
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div className={`card ${mode}`} key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>
            <b>{recipe.cookingTime}</b> to make.
          </p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`} style={{ background: color }}>
            Cook This
          </Link>
          <img
            src={TrashCan}
            alt="trash"
            className="delete"
            onClick={() => handleClick(recipe.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
