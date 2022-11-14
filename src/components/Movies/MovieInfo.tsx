import classes from './MovieInfo.module.css';

type Props = {
  description: string;
  text: string;
};

const MovieInfo = ({ description, text }: Props) => {
  return (
    <div className={classes.container}>
      <h3 className={classes.description}>{description}</h3>
      <p className={classes.text}>{text}</p>
    </div>
  );
};

export default MovieInfo;
