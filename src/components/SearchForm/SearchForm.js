import React, { useState, useContext } from "react";
import AuthContext from "../../context/auth-context";
import { SearchOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import classes from '../SearchForm/SearchForm.module.css';
import routes from "../../routes";
import { Link } from 'react-router-dom';
const SearchForm = () => {

    const context = useContext(AuthContext);

    const [input, setInput] = useState('');
    const [searchInputTimeout, setSearchAInputTimeout] = useState(0);

    const changeHandler = (event) => {
        setInput(event.target.value);
    }

    const handleSmooth = () => {
        const element = document.getElementById('detailsMovie');
        element.style.height = '100vh';
        element.style.padding = '4rem';
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const submitHandler = (event) => {
        event.preventDefault();
        context.setLoading(true);
        if (searchInputTimeout) {
            clearTimeout(searchInputTimeout);
        }

        setSearchAInputTimeout(
            setTimeout(() => {
                handleSmooth()
            }, 0),
            setTimeout(() => {

                context.onFetchmovie(input);
                context.setLoading(false);
            }, 1500),
        );

    }


    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <h1>Movie Database</h1>
            <SearchOutlined
                style={{ fontSize: '2rem', color: 'white', display: 'none' }}
            />
            <input
                type='search'
                placeholder='Enter movie title'
                onChange={changeHandler}
            />
            <Divider
                style={{ border: 'none', marginTop: '1rem' }}
            />
            <button
                onClick={submitHandler}
                className={classes.button}

            >
                <Link style={{ width: '100%' }} to={routes.details}>
                    Search
                </Link>

            </button>
            {context.loading}
        </form>

    );
};

export default SearchForm;