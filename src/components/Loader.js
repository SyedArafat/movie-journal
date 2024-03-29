import {Backdrop, CircularProgress} from "@mui/material";
import React from "react";

function Loader({loading}) {
    return (
        <>
        {
            loading && <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        }
        </>
    );
}

export default Loader;
