import Main from './pages/Main';
import Login from './pages/Login';
import Signup from './pages/Signup';
import New from './pages/New';
import Question from './pages/Question';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ConfirmProvider } from 'material-ui-confirm';
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
    <ConfirmProvider>
      <BrowserRouter>
        <div className="App">
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/new" element={<New />} />
            <Route path="/question/:id" element={<Question />} />
          </Routes>
          <ToastContainer
            style={{ zIndex: 20 }}
            position="top-right"
            hideProgressBar={false}
            autoClose={3000}
            closeOnClick
            pauseOnFocusLoss
            theme="light"
          />
        </div>
      </BrowserRouter>
    </ConfirmProvider>
  );
}

export default App;
