import React from "react";
import "./RibonStyle.css";

function WatchRibbon({dynamic_class, position="left", title}) {
    return (
        <div  className={`stack-top ${position} ${dynamic_class}`}>{title}</div>
    );
}

export default WatchRibbon;
