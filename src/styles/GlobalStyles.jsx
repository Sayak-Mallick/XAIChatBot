import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #4f46e5;
    --primary-light: #6366f1;
    --secondary-color: #0ea5e9;
    --text-color: #0f172a;
    --text-light: #64748b;
    --background-color: #f8fafc;
    --white: #ffffff;
    --gray-100: #f1f5f9;
    --gray-200: #e2e8f0;
    --gray-300: #cbd5e1;
    --gray-400: #94a3b8;
    --gray-500: #64748b;
    --success: #10b981;
    --warning: #f59e0b;
    --danger: #ef4444;
    --border-radius: 8px;
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.12);
    --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
    --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
    --transition: all 0.3s ease;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.5;
    font-size: 16px;
    min-height: 100vh;
    display: block;
    margin: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  a {
    text-decoration: none;
    color: var(--primary-color);
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  #root {
    max-width: 100%;
    margin: 0;
    padding: 0;
    text-align: left;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--gray-100);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--gray-300);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--gray-400);
  }

  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }
  }
`;

export default GlobalStyles;
