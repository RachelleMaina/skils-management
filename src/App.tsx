import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Employee from './pages/Employee';
import Layout from './components/Layout';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Auth from './components/Auth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Employee />} />
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
