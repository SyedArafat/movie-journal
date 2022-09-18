import Nav from "../components/navbar/Nav";
import Loader from "../components/Loader";
import React, {useState} from "react";
import {BACKEND_EXTERNAL_SEARCH} from "../config/config";
import {GetApi} from "../api/MediaContentClient";
import Footer from "../compounds/FooterCompound";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {
    Button,
    Divider,
    FormControl, Grid,
    IconButton,
    InputBase,
    InputLabel,
    MenuItem,
    NativeSelect,
    Paper,
    Select
} from "@mui/material";
import * as PropTypes from "prop-types";
import AdvanceSearch from "../components/AdvanceSearch/AdvanceSearch";
import Banner from "../components/banner/Banner";

function AdvanceSearchPage() {
    const [loading, setLoading] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [movies, setMovies] = useState([]);
    const searchItems = async (searchTerm) => {
        searchTerm = searchTerm.trim();
        setLoading(true);
        let exception = false;
        if (searchTerm !== "" && searchTerm.length > 2) {
            let uri = `${BACKEND_EXTERNAL_SEARCH}?query=${searchTerm}`;
            let request = await GetApi(uri).catch((error) => {
                setLoading(false);
                exception = true;
            });
            if (!exception) {
                setMovies(request.data.results);
                setShowSearch(true);
            }
        } else {
            setShowSearch(false);
        }
        setLoading(false);
    }

    return (
        <>
            <Nav callback={searchItems} dynamicClass={"single-page-nav"} setLoading={setLoading}/>
            <Loader loading={loading}/>
            <AdvanceSearch />
            {/*<Banner setLoading={setLoading}/>*/}
            <Footer/>

        </>
    );
}

export default AdvanceSearchPage;
