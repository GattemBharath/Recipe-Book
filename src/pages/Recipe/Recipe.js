import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import "./recipe.css";
import useTheme from "../../hooks/useTheme";
import { projectFirestore } from "../../firebase/config";

const Recipe = () => {
  const { mode } = useTheme();
  const { id } = useParams();

  // const url = "http://localhost:3000/recipes/" + id;
  // const { data: recipe, isPending, error } = useFetch(url);

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore
      .collection("recipes")
      .doc(id)
      .onSnapshot((doc) => {
        // console.log(doc);
        if (doc.exists) {
          setIsPending(false);
          setRecipe(doc.data());
        } else {
          setIsPending(false);
          setError("Could not find the recipe");
        }
      });

    return () => unsub();
  }, [id]);

  // const handleClick = () => {
  //   projectFirestore.collection("recipes").doc(id).update({
  //     title: "Banana Cake",
  //   });
  // };

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
          {/* <button onClick={handleClick}>Update me</button> */}
        </>
      )}
    </div>
  );
};

export default Recipe;
