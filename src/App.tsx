import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DiscoveryPage from './pages/DiscoveryPage';
import MoviePage from './pages/MoviePage';
import Page404 from './pages/Page404';
import classes from './App.module.css';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  return (
    <div className={classes.container}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<DiscoveryPage />} />
          <Route path="/:movieId" element={<MoviePage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
