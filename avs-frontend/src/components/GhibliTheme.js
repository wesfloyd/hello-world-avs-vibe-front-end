import { createGlobalStyle } from 'styled-components';

export const GhibliColors = {
  background: '#f5f5f5',
  primary: '#57A0D3',  // Ghibli blue
  secondary: '#8FC31F', // Ghibli green
  accent: '#EA5532',   // Ghibli red/orange
  text: '#494949',      // Dark gray
  lightText: '#f5f5f5', // Off-white
  border: '#E0E0E0',    // Light gray
  card: '#FFFFFF',      // White
  shadow: 'rgba(0, 0, 0, 0.1)',
};

export const GhibliTheme = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

  body {
    font-family: 'Quicksand', sans-serif;
    background-color: ${GhibliColors.background};
    color: ${GhibliColors.text};
    margin: 0;
    padding: 0;
    background-image: linear-gradient(to bottom, #f5f5f5, #e0f0ff);
    min-height: 100vh;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 500;
    color: ${GhibliColors.primary};
  }

  button {
    background-color: ${GhibliColors.primary};
    color: ${GhibliColors.lightText};
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 5px ${GhibliColors.shadow};

    &:hover {
      background-color: #4A8EBB;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px ${GhibliColors.shadow};
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 3px ${GhibliColors.shadow};
    }
  }

  input {
    border: 2px solid ${GhibliColors.border};
    border-radius: 20px;
    padding: 10px 15px;
    font-size: 16px;
    transition: all 0.3s ease;
    width: 100%;
    box-sizing: border-box;

    &:focus {
      border-color: ${GhibliColors.primary};
      outline: none;
      box-shadow: 0 0 5px rgba(87, 160, 211, 0.3);
    }
  }

  .card {
    background-color: ${GhibliColors.card};
    border-radius: 15px;
    box-shadow: 0 4px 15px ${GhibliColors.shadow};
    padding: 20px;
    margin: 20px 0;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px ${GhibliColors.shadow};
    }
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .header {
    text-align: center;
    padding: 40px 0;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 3px;
      background-color: ${GhibliColors.accent};
      border-radius: 3px;
    }
  }
`;