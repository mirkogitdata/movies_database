import React from "react";
import { Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import classes from '../FavoriteCard/FavoriteCard.module.css';


function FavoriteCard(props) {

    const card = props.removeFromFavoriteList && (
        <Card
            style={{ width: '100%', background: 'rgba(51, 56, 61, 1)' }}
            actions={[
                <DeleteOutlined style={{ fontSize: '1.3rem' }}

                    onClick={() => props.removeFromFavoriteList(props.movie.Title)}
                />
            ]}
        >
            <ul className={classes.dropDetails} >
                <img alt="ups" src={props.movie.Poster} />
                <li>
                    <p>{props.movie.Title}</p>
                    <p>year: {props.movie.Year}</p>
                    <p>genre: {props.movie.Genre}</p>
                </li>
            </ul>
        </Card>
    )

    return (
        <>{card}</>
    )
}

export default FavoriteCard;

