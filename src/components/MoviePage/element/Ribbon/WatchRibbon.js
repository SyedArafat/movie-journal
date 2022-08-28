import React from "react";
import "./RibonStyle.css";

function WatchRibbon({dynamic_class, title}) {
    return (
        <div  className={`stack-top left ${dynamic_class}`}>{title}</div>
    );
}

export default WatchRibbon;
