import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Auth from './components/Auth';
import ProtectedRoute from './pages/ProtectedRoute';
import ProposedSkills from './pages/ProposedSkills';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<ProtectedRoute />} />
          <Route path="/proposed-skills" element={<ProposedSkills />} />
        </Route>
        <Route path="/auth" element={<Auth />}>
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/signin" element={<Signin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
