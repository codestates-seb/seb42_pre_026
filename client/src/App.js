import Questions from './pages/Questions';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
	background-color: #F1F2F3
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
