import Questions from './pages/Questions';
import Login from './pages/Login';
import Signup from './pages/Signup';
import New from './pages/New';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
button {
	cursor: pointer;
}
`;

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Questions />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/new" element={<New />} />
        </Routes>
        <ToastContainer
          style={{ zIndex: 20 }}
          position="top-right"
          hideProgressBar={false}
          // autoClose={3000}
          // closeOnClick
          // pauseOnFocusLoss
          // theme="light"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
