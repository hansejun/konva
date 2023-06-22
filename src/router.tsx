import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Draw from './pages/draw';
import DrawPage from './pages/DrawPage';
import NewLine from './pages/newLine';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/draw" element={<Draw />} />
        <Route path="/line" element={<DrawPage />} />
        <Route path="/newLine" element={<NewLine />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
