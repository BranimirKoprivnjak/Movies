import Dropdown from '../UI/Dropdown';
import Button from '../UI/Button';
import MaterialIcon from '../UI/MaterialIcon';
import Input from '../UI/Input';
import classes from './Filter.module.css';
import { GenreType } from '../../models/models';

type Props = {
  genres: GenreType[];
  filters: string[];
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
};

const Filter = ({ genres, filters, setFilters }: Props) => {
  const onFilterChange = (genre: string) => {
    if (filters.includes(genre)) {
      const idxToRemove = filters.indexOf(genre);
      setFilters(prev => prev.filter((_, idx) => idx !== idxToRemove));
    } else {
      setFilters(prev => [genre, ...prev]);
    }
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Filters</h2>
      <Dropdown
        trigger={
          <Button className={classes.button}>
            Genres
            <MaterialIcon type="arrow_drop_down"></MaterialIcon>
          </Button>
        }
        items={genres.map(genre => (
          <div className={classes.option}>
            <Input
              type="checkbox"
              defaultChecked={filters.includes(genre.name)}
              onChange={onFilterChange.bind(null, genre.name)}
            />
            <h3 className={classes.text}>{genre.name}</h3>
          </div>
        ))}
      />
    </div>
  );
};

export default Filter;
