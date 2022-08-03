import React, { useEffect, useState } from "react";
import "./home.css";
import { projectFirestore } from "../../firebase/config";

import { useFetch } from "../../hooks/useFetch";
import RecipeList from "../../components/RecipeList";

const Home = () => {
  // const {
  //   data: recipes,
  //   isPending,
  //   error,
  // } = useFetch("http://localhost:3000/recipes");

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore.collection("recipes").onSnapshot(
      (snapshot) => {
        // console.log(snapshot);
        if (snapshot.empty) {
          setError("No recipes to load");
          setIsPending(false);
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            // console.log(doc);
            results.push({ id: doc.id, ...doc.data() });
          });
          setData(results);
          setIsPending(false);
        }
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );
    // .catch((err) => {
    //   setError(err.message);
    //   setIsPending(false);
    // });

    return () => unsub();
  }, []);

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
};

export default Home;
