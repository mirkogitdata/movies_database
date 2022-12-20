import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import classes from '../Button/FavoriteBtn.module.css';
import { EyeOutlined } from '@ant-design/icons';
import AuthContext from '../../context/auth-context';
import routes from '../../routes';
const FavoriteBtn = () => {

    const context = useContext(AuthContext);
    return (
        <Link to={routes.favorite}>
            <button className={classes.btn} onClick={() => context.setModalShow(true)}>

                <EyeOutlined style={{ marginRight: '10px', fontSize: '1.2rem' }} />
                Favorite Movies
                <span className={classes.badge}>{context.favorite.length}</span>
            </button>
        </Link>

    );
};

export default FavoriteBtn;

