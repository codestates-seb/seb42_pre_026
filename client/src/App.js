import GlobalStyle from './GlobalStyle';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup text="sign up" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
