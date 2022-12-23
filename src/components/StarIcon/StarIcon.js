import React, { useState, useContext } from "react";
import AuthContext from "../../context/auth-context";
import { Link } from 'react-router-dom';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import routes from '../../routes';

const StarIcon = () => {

    const [click, setClick] = useState(false);

    const context = useContext(AuthContext);

    const scrollTop = () => {
        const element = document.querySelector('body');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const clickedStar = () => {
        setClick(true);
        context.addToFavoriteList(context.movie);
        scrollTop();
    }

    return (
        <span>
            {
                !click ? (<StarOutlined
                    style={{ color: '#00e36a', fontSize: '24px' }}
                    onClick={clickedStar}
                />) : (<Link to={routes.home}>
                    <StarFilled
                        style={{ color: '#00e36a', fontSize: '24px' }}
                    />
                </Link>)
            }
        </span>
    )
}

export default StarIcon;

