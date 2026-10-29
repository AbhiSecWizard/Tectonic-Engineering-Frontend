import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import PageLoader from "./components/PageLoader";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AboutTeam from "./pages/AboutTeam";
import IntroductionAbout from "./pages/IntroductionAbout";
import About from "./pages/About";
import StructuralSteelDetailing from "./components/StructuralSteelDetailing";
import StructuralDesignDrafting from "./components/StructuralDesignDrafting";
import StructuralAuditRepair from "./components/StructuralAuditRepair";
import PeerReviewValueEngineering from "./components/PeerReviewValueEngineering";


function App() {
console.log(window.location.pathname);
  return (
    <BrowserRouter>
      <PageLoader />
      <Navbar />
      {/* Your Routes go here */}
      <Routes>
          <Route path="/" element={<Home/>}/>
          {/* About routes */}
          <Route path="/about" element={<About/>}/>         
          <Route path="/about/about-team" element={<AboutTeam/>}/>
          <Route path="/about/about-introduction" element={<IntroductionAbout/>}/>
          {/* services wala */}
          <Route path="/service/structural-steel-detailing" element={<StructuralSteelDetailing/>}/>
          <Route path="/service/structural-designing-drafting" element={<StructuralDesignDrafting/>}/>
          <Route path="/service/structural-audit-repair" element={<StructuralAuditRepair/>} />
          <Route path="/service/peerreview-value-engineering" element={<PeerReviewValueEngineering/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;