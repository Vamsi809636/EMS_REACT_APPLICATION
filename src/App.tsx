import Navbar from './components/layout/Navbar';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';

const App = () => (
  <AuthProvider>
    <Navbar />
    <AppRoutes />
  </AuthProvider>
);

export default App;
