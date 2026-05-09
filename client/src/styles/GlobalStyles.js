import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  /* ---------- Reset ---------- */

  *{
    margin:0;
    padding:0;

    box-sizing:border-box;
  }

  html{
    scroll-behavior:smooth;
  }

  body{
    font-family: "Inter", sans-serif;

    background:${({ theme }) => theme.bg};

    color:${({ theme }) => theme.text};

    transition:
      background 0.25s ease,
      color 0.25s ease;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    overflow-x:hidden;
  }

  /* ---------- Root ---------- */

  #root{
    min-height:100vh;
  }

  /* ---------- Links ---------- */

  a{
    text-decoration:none;
    color:inherit;
  }

  /* ---------- Buttons ---------- */

  button{
    font-family:inherit;
  }

  /* ---------- Inputs ---------- */

  input,
  textarea,
  select,
  button{
    outline:none;
  }

  /* ---------- Images ---------- */

  img{
    max-width:100%;
    display:block;
  }

  /* ---------- Scrollbar ---------- */

  ::-webkit-scrollbar{
    width:8px;
    height:8px;
  }

  ::-webkit-scrollbar-track{
    background:${({ theme }) => theme.bg};
  }

  ::-webkit-scrollbar-thumb{
    background:${({ theme }) => theme.border};
    border-radius:999px;
  }

  ::-webkit-scrollbar-thumb:hover{
    background:#6366f1;
  }

`;

export default GlobalStyle;