import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import MoviePage from "./pages/MoviePage";
import {ForcedNoRequireAuth, RequireAuth} from "./auth/Authentication";
import AdvanceSearchPage from "./pages/AdvanceSearchPage";
import MovieListPage from "./pages/MovieListPage";
import TVListPage from "./pages/TVListPage";

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
                <Route exact path="/advance-search"
                       element={
                           <RequireAuth>
                               <AdvanceSearchPage />
                           </RequireAuth>
                       }/>/>
                <Route exact path="/watched/movies"
                       element={
                           <RequireAuth>
                               <MovieListPage />
                           </RequireAuth>
                       }/>/>
                <Route exact path="/watched/tv"
                       element={
                           <RequireAuth>
                               <TVListPage />
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
