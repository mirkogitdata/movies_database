import classes from '../Container/Container.module.css';

const Container = (props) => {
    return <div className={classes.container}>{props.children}</div>
};

export default Container;