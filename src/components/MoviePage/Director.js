import React from "react";

function Director({directors}) {
    return (
        <div>
            {directors.length > 1 ? <h3>DIRECTORS</h3> : <h3>DIRECTOR</h3>}
            {directors.map( (element, i) => {
                return <p key={i} className="rmdb-director">{element.name}</p>
            })}
        </div>
    );
}

export default Director;
