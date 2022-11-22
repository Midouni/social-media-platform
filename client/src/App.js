import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home } from './pages'
import { HomeProvider } from './context';

function App() {
  return (
    <Router >
      <Routes>
        <Route path='/' element={<HomeProvider> <Home /></HomeProvider>} />
        <Route path='*' element={<h1>route does not exist</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
