import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { Portfolio } from './components/sections/Portfolio';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';

export default function App() {
    return (
        <div className="bg-gradient-to-b from-black via-[#050505] to-black antialiased">
            <Header />
            <main>
                <Hero />
                <Services />
                <Portfolio />
                <About />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}