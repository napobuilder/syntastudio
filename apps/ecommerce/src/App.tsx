import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import EcommercePage from './EcommercePage';
import WebAppsPage from '../../web-apps/src/WebAppsPage';
import { Header } from './components/layout/Header';

const apps = [
    { name: 'E-Commerce', url: '/', description: 'Soluciones para productos y servicios.' },
    { name: 'Web Apps & IA', url: '/web-apps', description: 'Desarrollo de aplicaciones a medida.' },
];

const AppContent = () => {
    const location = useLocation();

    return (
        <>
            <Header apps={apps} currentAppUrl={location.pathname} />
            <Routes>
                <Route path="/" element={<EcommercePage />} />
                <Route path="/web-apps" element={<WebAppsPage />} />
            </Routes>
        </>
    );
}

export default function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}