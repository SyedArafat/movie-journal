import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import MoviePage from "./pages/MoviePage";

function App() {
  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/:type/:movieId" element={<MoviePage />} />
          <Route exact path="/signin" element={<SigninPage />} />
          <Route exact path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>
  );
}

export default App;
