import Hero from '../components/Hero';
import Projects from './Projects';
import Skills from './Skills';
import About from './About';
import Contact from './Contact';

const Home = () => {
    return (
        <div className="flex flex-col gap-12">
            <Hero />
            <Projects />
            <Skills />
            <About />
            <Contact />
        </div>
    );
};

export default Home;
