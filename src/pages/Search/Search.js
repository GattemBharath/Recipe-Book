import React, { useEffect, useState } from "react";
import "./search.css";
import { useLocation } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import RecipeList from "../../components/RecipeList";
import { projectFirestore } from "../../firebase/config";

const Search = () => {
  const queryString = useLocation();
  const queryParams = new URLSearchParams(queryString.search);
  const query = queryParams.get("q");

  // const url = "http://localhost:3000/recipes?q=" + query;

  // const { data: recipes, error, isPending } = useFetch(url);

  const [recipes, setRecipes] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore.collection("recipes").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError("No recipes to load");
          setIsPending(false);
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });
          setRecipes(() => {
            let filteredRecipes = results.filter((recipe) =>
              recipe.title.toLowerCase().includes(query.toLowerCase())
            );
            return filteredRecipes;
          });
          setIsPending(false);
        }
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );

    return () => unsub();
  }, [query]);

  return (
    <div>
      <h2 className="page-title">Recipes including "{query}"</h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipes && <RecipeList recipes={recipes} />}
    </div>
  );
};

export default Search;
