import Hero from '../components/Hero';
import Projects from './projects/page';
import Skills from './skills/page';
import About from './about/page';
import Contact from './contact/page';

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
