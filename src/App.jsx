import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import Projects from "./pages/Projects";
import Sectors from "./components/Sectors";
import Career from "./pages/Career";
import Clients from "./pages/Clients";
import Blog from "./pages/Blog";
import Gallery from "./pages/Gallery";
import ContactUs from "./pages/ContactUs";


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
          <Route path="/service/peer-review-value-engineering" element={<PeerReviewValueEngineering/>}/>
          {/* projects components */}
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/sectors" element={<Sectors/>}/>
          <Route path="/career" element={<Career/>}/>
          <Route path="/clients" element={<Clients/>}/>
          <Route path="/blog" element={<Blog/>}/>
          <Route path="/gallery" element={<Gallery/>}/>
          <Route path="/contact-us" element={<ContactUs/>}/>
        </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;