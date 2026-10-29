import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import PageLoader from "./components/PageLoader";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AboutTeam from "./pages/AboutTeam";
import IntroductionAbout from "./pages/IntroductionAbout";
import About from "./pages/About";


function App() {
console.log(window.location.pathname);
  return (
    <BrowserRouter>
      <PageLoader />
      <Navbar />
      {/* Your Routes go here */}
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/about/about-team" element={<AboutTeam/>}/>
          <Route path="/about/about-introduction" element={<IntroductionAbout/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;