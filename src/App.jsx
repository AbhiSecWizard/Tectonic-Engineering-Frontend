import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import PageLoader from "./components/PageLoader";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <PageLoader />
      <Navbar />
      {/* Your Routes go here */}
      <Routes>
          <Route path="/" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;