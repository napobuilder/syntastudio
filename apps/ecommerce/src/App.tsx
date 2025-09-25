import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EcommercePage } from './EcommercePage';
import { WebAppsPage } from '../../web-apps/src/WebAppsPage';
import { AppSwitcher } from './components/AppSwitcher';

const apps = [
    { name: 'E-Commerce', url: '/', description: 'Soluciones para productos y servicios.' },
    { name: 'Web Apps & IA', url: '/web-apps', description: 'Desarrollo de aplicaciones a medida.' },
];

export default function App() {
    const currentPath = window.location.pathname;

    return (
        <Router>
            <div className="fixed top-6 right-24 z-[999]">
                <AppSwitcher apps={apps} currentAppUrl={currentPath} />
            </div>
            <Routes>
                <Route path="/" element={<EcommercePage />} />
                <Route path="/web-apps" element={<WebAppsPage />} />
            </Routes>
        </Router>
    );
}