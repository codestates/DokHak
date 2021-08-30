import { createGlobalStyle } from 'styled-components';
import { color } from './Theme';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Noto Sans Kr';
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    
  }

  ::-webkit-scrollbar { 
    display: none; 
  }

  html {
    font-family: 'Noto Sans Kr';
  }

  body {
    font-family: 'Noto Sans Kr';
    color: ${color.primary};
  }

  h1 {
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: inherit;
  }

  button,
  input,
  select,
  textarea {
    background-color: transparent;
    border: 0;

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }

  a,
  button {
    cursor: pointer;
  }

  ul,
  ol {
    padding-left: 0;
    list-style: none;
  }
`;
