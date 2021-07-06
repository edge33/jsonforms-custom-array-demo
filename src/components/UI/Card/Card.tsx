import classes from "./Card.module.css";

const Card = (props: any) => {
  return <div className={classes.Card}>{props.children}</div>;
};

export default Card;
