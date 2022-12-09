import React from 'react';
import classes from '../Button/FavoriteBtn.module.css';
import { EyeOutlined } from '@ant-design/icons';

const FavoriteBtn = (props) => {
    return (
        <button className={classes.btn} onClick={() => props.setModalShow(true)}>
            <EyeOutlined style={{ marginRight: '10px', fontSize: '1.2rem' }} />
            Favorite Movies
            <span className={classes.badge}>{props.favorite.length}</span>
        </button>
    );
};

export default FavoriteBtn;

