import { createGlobalStyle } from "styled-components";

const GlobalStyle= createGlobalStyle`
  *{
    box-sizing:border-box;
   }

   body{
   margin:0;
   padding:0;
    font-family:Inter, sans-serif;
    background:${({theme}) => theme.bg};
    color: ${({theme}) => theme.text};

    transition: background 0.25s ease,
    color 0.25s ease;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
   }
    a{
       text-decoration:none;
       color:inherit;
    }
    button{

    font-family : inherit
    }

`

export default GlobalStyle