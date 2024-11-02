import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Form from "./pages/Form";
import Login from "./pages/Login";
import Solicitudes from "./pages/Solicitudes";
import Ordenes from "./pages/Ordenes";
import MisOrdenes from "./pages/MisOrdenes";

function App() {
  return (
    <Router>
      {/* rutas */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/form" element={<Form />} /> */}
        <Route path="/form/:id?" element={<Form />} />
        <Route path="/login" element={<Login />} />
        <Route path="/solicitudes" element={<Solicitudes />} />
        <Route path="/ordenes" element={<Ordenes />} />
        <Route path="/mis-ordenes" element={<MisOrdenes />} />
      </Routes>
    </Router>
  );
}

export default App;
