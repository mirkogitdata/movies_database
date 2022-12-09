import React from "react";

const DetailsMovie = (props) => {
    return (
        <li>
            <img src={props.poster} alt="ups" />
            <h2>{props.title}</h2>
            <h3>{props.year}</h3>
        </li>
    )
}

export default DetailsMovie;