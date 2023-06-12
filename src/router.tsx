import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import DragDraw from "./pages/dragDraw";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/draw" element={<DragDraw />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
