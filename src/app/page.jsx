import Hero from '../components/Hero';
import Projects from './projects/page';
import Skills from './skills/page';
import About from './about/page';
import Contact from './contact/page';
import EngineeringPhilosophy from '../components/EngineeringPhilosophy';
import Services from '../components/Services';
import ExperienceTimeline from '../components/ExperienceTimeline';

const Home = () => {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <EngineeringPhilosophy />
      <div id="projects">
        <Projects />
      </div>
      <Services />
      <div id="skills">
        <Skills />
      </div>
      <ExperienceTimeline />
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
