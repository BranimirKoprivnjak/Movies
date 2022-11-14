import { Link } from 'react-router-dom';
import Button from '../components/UI/Button';
import classes from './Page404.module.css';

const Page404 = () => {
  return (
    <>
      <div className={classes.container}>
        <h2 className={classes.message}>Error 404. This page doesn't exist.</h2>
        <Button className={classes.button}>
          <Link to="/" className={classes.link}>
            Go to Discovery Page
          </Link>
        </Button>
      </div>
    </>
  );
};

export default Page404;
