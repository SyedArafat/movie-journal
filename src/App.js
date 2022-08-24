import './App.css';
import {BrowserRouter as Router, Routes, Route, useNavigate, Navigate} from "react-router-dom";

import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import MoviePage from "./pages/MoviePage";
import AuthContext from "./context/AuthContext";

function App() {
    // const navigate = useNavigate();
    function RequireAuth({ children }) {
        // const { authed } = AuthContext();
        const  authed = !!(localStorage.getItem("movie_journal_user_token") !== null ||  localStorage.getItem("movie_journal_user_token") !== "")
        // console.log(authed);

        return authed === true ? children : <Navigate to="/signin" replace />;
    }

    function ForcedNoRequireAuth({ children }) {
        // const { authed } = AuthContext();
        const  authed = !!(localStorage.getItem("movie_journal_user_token") !== null ||  localStorage.getItem("movie_journal_user_token") !== "")
        // console.log(authed);

        return authed === false ? children : <Navigate to="/" replace />;
    }
    return (
        <Router>
            <Routes>
                <Route  path="/"
                       element={
                           <RequireAuth>
                               <HomePage />
                           </RequireAuth>
                       }/>
                <Route exact path="/:type/:movieId" element={<MoviePage/>}/>
                <Route exact path="/signin"
                       element={
                           <ForcedNoRequireAuth>
                               <SigninPage />
                           </ForcedNoRequireAuth>
                       }/>/>
                <Route exact path="/signup" element={<SignupPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
