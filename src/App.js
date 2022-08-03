import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Create from "./pages/Create/Create";
import Search from "./pages/Search/Search";
import Recipe from "./pages/Recipe/Recipe";
import Navbar from "./components/Navbar";
import ThemeSelector from "./components/ThemeSelector";
import useTheme from "./hooks/useTheme";

function App() {
  const { mode } = useTheme();

  return (
    <div className={`App ${mode}`}>
      <Router>
        <Navbar />
        <ThemeSelector />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/search" element={<Search />} />
          <Route path="/recipes/:id" element={<Recipe />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
