import React from "react";
import "./HeaderStyles.css";

function PlayButton({ children, ...restProps }) {
    return (
        <button className="banner-button" type="button" {...restProps}>
            {children}
        </button>
    );
}

export default PlayButton;
