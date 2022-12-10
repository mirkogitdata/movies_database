import React from "react";
import { Card } from 'antd';

const DetailsMovie = (props) => {
    return (
        <li>
            <Card
                hoverable
                style={{ width: 340 }}
                cover={
                    props.poster !== 'N/A' && <img alt='movie' src={props.poster} />
                }
            >
                <img style={{ width: '300px' }} src={props.poster} alt="ups" />
                <h2>{props.title}</h2>
                <h3>Year: {props.year}</h3>
                <h3>Country: {props.country}</h3>
            </Card>
        </li>
    )
}

export default DetailsMovie;