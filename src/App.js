import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import MoviePage from "./pages/MoviePage";
import {ForcedNoRequireAuth, RequireAuth} from "./auth/Authentication";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/"
                       element={ <HomePage /> }/>
                <Route exact path="/:type/:movieId"
                       element={
                           <RequireAuth>
                               <MoviePage />
                           </RequireAuth>
                       }/>/>
                <Route exact path="/signin"
                       element={
                           <ForcedNoRequireAuth>
                               <SigninPage />
                           </ForcedNoRequireAuth>
                       }/>/>
                <Route exact path="/signup"
                       element={
                           <ForcedNoRequireAuth>
                               <SignupPage />
                           </ForcedNoRequireAuth>
                       }/>/>
                />
            </Routes>
        </Router>
    );
}

export default App;
