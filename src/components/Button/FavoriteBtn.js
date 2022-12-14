import React, { useContext } from 'react';
import classes from '../Button/FavoriteBtn.module.css';
import { EyeOutlined } from '@ant-design/icons';
import AuthContext from '../../context/auth-context';
const FavoriteBtn = () => {

    const context = useContext(AuthContext);
    return (
        <button className={classes.btn} onClick={() => context.setModalShow(true)}>
            <EyeOutlined style={{ marginRight: '10px', fontSize: '1.2rem' }} />
            Favorite Movies
            <span className={classes.badge}>{context.favorite.length}</span>
        </button>
    );
};

export default FavoriteBtn;

