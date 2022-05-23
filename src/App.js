import './App.scss';
import { Navbar, Sidebar } from './components';
import RoutesContainer from './routes/RoutesContainer';
import { useTheme } from './context';
function App() {
  const { theme } = useTheme();
  return (
    <div className={`App theme-${theme}`}>
      <Navbar />
      <div className='app-body'>
        <Sidebar />
        <RoutesContainer />
      </div>
    </div>
  );
}

export default App;
