import Navbar from './components/Navbar.jsx';
import Preloader from './components/Preloader.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Footer from './components/Footer.jsx';
import useSmoothScroll from './lib/useSmoothScroll.js';
import useSpotlight from './lib/useSpotlight.js';

export default function App() {
  useSmoothScroll();
  useSpotlight();

  return (
    <>
      <Preloader />
      <Navbar />
      <main className="container">
        <Home />
        <About />
        <Projects />
        <Footer />
      </main>
    </>
  );
}
