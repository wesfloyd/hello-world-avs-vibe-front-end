import React from 'react';
import styled from 'styled-components';
import { GhibliColors } from './GhibliTheme';

const EventsContainer = styled.div`
  background-color: ${GhibliColors.card};
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 6px 20px ${GhibliColors.shadow};
  border: 1px solid ${GhibliColors.border};
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(to right, ${GhibliColors.secondary}, ${GhibliColors.accent});
  }
`;

const EventsTitle = styled.h2`
  color: ${GhibliColors.primary};
  margin-top: 5px;
  font-size: 1.8rem;
  font-weight: 600;
`;

const EventsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-height: 500px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${GhibliColors.primary};
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #4A8EBB;
  }
`;

const EventItem = styled.li`
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 12px;
  background-color: ${props => 
    props.type === 'NewTaskCreated' 
      ? 'rgba(87, 160, 211, 0.1)' 
      : 'rgba(143, 195, 31, 0.1)'
  };
  border: 1px solid ${props => 
    props.type === 'NewTaskCreated' 
      ? 'rgba(87, 160, 211, 0.3)' 
      : 'rgba(143, 195, 31, 0.3)'
  };
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px ${GhibliColors.shadow};
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const EventHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const EventType = styled.span`
  font-weight: 600;
  font-size: 1.1rem;
  color: ${props => 
    props.type === 'NewTaskCreated' 
      ? GhibliColors.primary 
      : GhibliColors.secondary
  };
`;

const EventTime = styled.span`
  font-size: 0.9rem;
  color: #888;
`;

const EventDetails = styled.div`
  margin-top: 10px;
`;

const DetailRow = styled.div`
  display: flex;
  margin-bottom: 5px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.span`
  font-weight: 500;
  margin-right: 10px;
  min-width: 120px;
  color: ${GhibliColors.text};
`;

const DetailValue = styled.span`
  color: #555;
  word-break: break-all;
`;

const NoEventsMessage = styled.p`
  text-align: center;
  color: #888;
  font-style: italic;
  padding: 20px;
`;

const EventsListComponent = ({ events }) => {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };
  
  return (
    <EventsContainer>
      <EventsTitle>AVS Events</EventsTitle>
      <EventsList>
        {events.length === 0 ? (
          <NoEventsMessage>No events yet. Events will appear here when they are emitted.</NoEventsMessage>
        ) : (
          events.map((event, index) => (
            <EventItem key={index} type={event.type}>
              <EventHeader>
                <EventType type={event.type}>
                  {event.type === 'NewTaskCreated' ? '✨ New Task' : '✅ Task Response'}
                </EventType>
                <EventTime>{formatTimestamp(event.timestamp)}</EventTime>
              </EventHeader>
              
              <EventDetails>
                <DetailRow>
                  <DetailLabel>Task Index:</DetailLabel>
                  <DetailValue>{event.taskIndex.toString()}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Name:</DetailLabel>
                  <DetailValue>{event.name}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Created Block:</DetailLabel>
                  <DetailValue>{event.taskCreatedBlock.toString()}</DetailValue>
                </DetailRow>
                {event.type === 'TaskResponded' && (
                  <DetailRow>
                    <DetailLabel>Operator:</DetailLabel>
                    <DetailValue>{event.operator}</DetailValue>
                  </DetailRow>
                )}
              </EventDetails>
            </EventItem>
          ))
        )}
      </EventsList>
    </EventsContainer>
  );
};

export default EventsListComponent;