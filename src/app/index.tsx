import {createRoot} from 'react-dom/client';
import './providers/bootstrap';
import AppRoutes from './routes';

createRoot(document.getElementById('root')!).render(<AppRoutes/>);