import Questions from './pages/Questions';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
`;

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Questions />
    </div>
  );
}

export default App;
