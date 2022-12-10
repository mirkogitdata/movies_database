import React, { useState } from "react";
import { SearchOutlined } from '@ant-design/icons';
//import { Input } from 'antd';
import classes from '../SearchForm/SearchForm.module.css';

const SearchForm = (props) => {

    const [input, setInput] = useState('');
    const [searchInputTimeout, setSearchAInputTimeout] = useState(0);

    const changeHandler = (event) => {
        setInput(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.setLoading(true);
        if (searchInputTimeout) {
            clearTimeout(searchInputTimeout);
        }
        setSearchAInputTimeout(
            setTimeout(() => {
                props.onFetchmovie(input);
                props.setLoading(false);
            }, 1500)
        );
        event.target.reset();
    }
    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <SearchOutlined
                style={{ fontSize: '2rem', color: 'white', marginRight: '1.2rem' }}
            />
            <input
                type='search'
                placeholder='Enter movie title'
                onChange={changeHandler}
            />
            <button>Search</button>
            {props.loading}
        </form>
    );
};

export default SearchForm;