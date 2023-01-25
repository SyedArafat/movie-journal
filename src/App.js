import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import MoviePage from "./pages/MoviePage";
import {ForcedNoRequireAuth, RequireAuth} from "./auth/Authentication";
import AdvanceSearchPage from "./pages/AdvanceSearchPage";
import WatchedContentListPage from "./pages/WatchedContentListPage";
import WishListPage from "./pages/WishListPage";
import Profile from "./pages/Profile";

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
                <Route exact path="/watched/contents"
                       element={
                           <RequireAuth>
                               <WatchedContentListPage />
                           </RequireAuth>
                       }/>/>
                <Route exact path="/wishlist/contents"
                       element={
                           <RequireAuth>
                               <WishListPage />
                           </RequireAuth>
                       }/>/>
                <Route exact path="/profile"
                       element={
                           <RequireAuth>
                               <Profile />
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
