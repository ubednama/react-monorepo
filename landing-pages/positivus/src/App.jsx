import CaseStudies from "./components/CaseStudies";
import CompanyStrap from "./components/CompanyStrap";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import OWP from "./components/OWP";
import Services from "./components/Services";

function App() {
  return (
    <div className="bg-white min-h-screen mx-28 space-y-24 max-w-screen">
      <NavBar />
      <Hero />
      <div className="w-screen relative left-[-7rem]">
        <CompanyStrap />
      </div>
      <Services />
      <CaseStudies />
      <OWP />
      <ContactUs />
      <Footer />
    </div>
  );
}

export default App;
