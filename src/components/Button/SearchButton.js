import React from "react";
import routes from "../../routes";
import { Link } from 'react-router-dom';
import classes from '../SearchForm/SearchForm.module.css';

const SearchButton = (props) => {

    return (
        <button
            onClick={props.onSubmitHandler}
            className={classes.button}

        >
            <Link style={{ width: '100%', color: 'white' }} to={routes.details}>
                Search
            </Link>

        </button>
    )

}
export default SearchButton;

