import Hero from '../components/Hero';
import Projects from './projects/page';
import Skills from './skills/page';
import About from './about/page';
import Contact from './contact/page';

const Home = () => {
  return (
    <div className="flex flex-col gap-16 lg:gap-24 w-full">
      <Hero />
      <div id="projects">
        <Projects />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
};

export default Home;
