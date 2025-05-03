import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'SUIT';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'SUIT';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Medium.woff2') format('woff2');
    font-weight: 500;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'SUIT';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
  }

  /* 실제 화면 높이 CSS 변수 */
  :root {
    --vh: 1vh;
    --app-height: 100vh;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    /* 스크롤 방지 */
    overflow: hidden;
    position: fixed;
    width: 100%;
    height: var(--app-height, 90vh);
    /* iOS 모멘텀 스크롤 방지 */
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: none;
    touch-action: none;
  }

  #root {
    height: var(--app-height, 90vh);
    max-height: var(--app-height, 90vh);
    overflow: hidden;
    position: relative;
  }

  body {
    font-family: 'SUIT', 'Noto Sans KR', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color:rgb(255, 255, 255);
    color: #333;  
    /* 터치 하이라이트 방지 */
    -webkit-tap-highlight-color: transparent;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

 button {
  color: #28041d;
  -webkit-appearance: none;
  background: none;
  border: none;
}
`;

export default GlobalStyle;
