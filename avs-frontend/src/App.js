import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GhibliTheme, GhibliColors } from './components/GhibliTheme';
import TaskForm from './components/TaskForm';
import EventsList from './components/EventsList';
import { listenForEvents } from './utils/ethereum';

const AppContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  color: ${GhibliColors.primary};
  font-size: 2.5rem;
  margin-bottom: 10px;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    height: 3px;
    background: linear-gradient(to right, ${GhibliColors.primary}, ${GhibliColors.secondary}, ${GhibliColors.accent});
    border-radius: 3px;
  }
`;

const Subtitle = styled.p`
  color: ${GhibliColors.text};
  font-size: 1.2rem;
  max-width: 600px;
  margin: 20px auto;
  line-height: 1.6;
`;

const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 50px;
  padding: 20px;
  color: ${GhibliColors.text};
  font-size: 0.9rem;
  
  a {
    color: ${GhibliColors.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const StatusBanner = styled.div`
  padding: 12px 20px;
  border-radius: 10px;
  margin-top: 20px;
  font-weight: 500;
  text-align: center;
  background-color: ${props => 
    props.type === 'error' 
      ? 'rgba(234, 85, 50, 0.1)' 
      : props.type === 'success'
        ? 'rgba(143, 195, 31, 0.1)'
        : 'rgba(87, 160, 211, 0.1)'
  };
  color: ${props => 
    props.type === 'error' 
      ? GhibliColors.accent 
      : props.type === 'success'
        ? GhibliColors.secondary
        : GhibliColors.primary
  };
`;

function App() {
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading', 'connected', 'error'
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const connectToContract = async () => {
      try {
        setStatus('loading');
        
        const cleanup = await listenForEvents((event) => {
          setEvents(prevEvents => [
            { ...event, timestamp: Date.now() },
            ...prevEvents
          ]);
        });
        
        setStatus('connected');
        setError(null);
        
        return cleanup;
      } catch (error) {
        console.error('Failed to connect to contract:', error);
        setStatus('error');
        
        if (error.message.includes('Failed to fetch deployment file')) {
          setError('Could not find contract deployment file. Make sure you have deployed the Hello World AVS contracts.');
        } else if (error.message.includes('Contract address not found')) {
          setError('Contract address not found in deployment file. Check the format of your deployment JSON.');
        } else {
          setError('Failed to connect to the Ethereum network. Make sure Anvil is running and contracts are deployed.');
        }
      }
    };
    
    const cleanupListener = connectToContract();
    
    return () => {
      if (cleanupListener) {
        cleanupListener.then(cleanup => {
          if (cleanup) cleanup();
        });
      }
    };
  }, []);
  
  const renderStatusBanner = () => {
    if (status === 'loading') {
      return (
        <StatusBanner type="info">
          Connecting to Ethereum network and loading contract...
        </StatusBanner>
      );
    } else if (status === 'error') {
      return (
        <StatusBanner type="error">
          {error}
        </StatusBanner>
      );
    } else if (status === 'connected') {
      return (
        <StatusBanner type="success">
          Connected to Ethereum network and Hello World AVS contract
        </StatusBanner>
      );
    }
    return null;
  };
  
  return (
    <>
      <GhibliTheme />
      <AppContainer>
        <Header>
          <Title>Hello World AVS</Title>
          <Subtitle>
            A simple interface to interact with the Hello World AVS. Create tasks and watch events in real-time.
          </Subtitle>
          {renderStatusBanner()}
        </Header>
        
        <ContentLayout>
          <TaskForm disabled={status !== 'connected'} />
          <EventsList events={events} />
        </ContentLayout>
        
        <Footer>
          <p>
            Built with <span role="img" aria-label="heart">❤️</span> for Hello World AVS
          </p>
        </Footer>
      </AppContainer>
    </>
  );
}

export default App;