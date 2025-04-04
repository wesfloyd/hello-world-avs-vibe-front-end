import React, { useState } from 'react';
import styled from 'styled-components';
import { GhibliColors } from './GhibliTheme';
import { submitTask } from '../utils/ethereum';

const FormContainer = styled.div`
  background-color: ${GhibliColors.card};
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 6px 20px ${GhibliColors.shadow};
  margin-bottom: 30px;
  border: 1px solid ${GhibliColors.border};
  position: relative;
  overflow: hidden;
  opacity: ${props => (props.disabled ? 0.7 : 1)};
  transition: opacity 0.3s ease;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(to right, ${GhibliColors.primary}, ${GhibliColors.secondary});
  }
`;

const FormTitle = styled.h2`
  color: ${GhibliColors.primary};
  margin-top: 5px;
  font-size: 1.8rem;
  font-weight: 600;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: ${GhibliColors.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 2px solid ${GhibliColors.border};
  border-radius: 25px;
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: ${GhibliColors.primary};
    box-shadow: 0 0 8px rgba(87, 160, 211, 0.4);
    outline: none;
  }
  
  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(to right, ${GhibliColors.primary}, ${GhibliColors.secondary});
  color: white;
  border: none;
  border-radius: 25px;
  padding: 12px 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(87, 160, 211, 0.5);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const StatusMessage = styled.div`
  margin-top: 15px;
  padding: 10px;
  border-radius: 10px;
  font-weight: 500;
  text-align: center;
  
  ${({ status }) => {
    if (status === 'success') {
      return `
        background-color: rgba(143, 195, 31, 0.2);
        color: #5a8200;
        border: 1px solid rgba(143, 195, 31, 0.5);
      `;
    } else if (status === 'error') {
      return `
        background-color: rgba(234, 85, 50, 0.2);
        color: #c53d2e;
        border: 1px solid rgba(234, 85, 50, 0.5);
      `;
    } else if (status === 'pending') {
      return `
        background-color: rgba(87, 160, 211, 0.2);
        color: #3d7ba9;
        border: 1px solid rgba(87, 160, 211, 0.5);
      `;
    }
    return '';
  }}
`;

const DisabledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(245, 245, 245, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  z-index: 10;
`;

const DisabledMessage = styled.div`
  background-color: ${GhibliColors.primary};
  color: white;
  padding: 15px 25px;
  border-radius: 10px;
  font-weight: 500;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  max-width: 80%;
`;

const TaskForm = ({ disabled }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (disabled) {
      return;
    }
    
    if (!name.trim()) {
      setStatus('error');
      setMessage('Please enter a name');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setStatus('pending');
      setMessage('Submitting task to the blockchain...');
      
      await submitTask(name);
      
      setStatus('success');
      setMessage('Task submitted successfully!');
      setName('');
    } catch (error) {
      console.error('Error submitting task:', error);
      setStatus('error');
      setMessage('Failed to submit task. Check console for details.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <FormContainer disabled={disabled}>
      {disabled && (
        <DisabledOverlay>
          <DisabledMessage>
            Connect to Ethereum network to create tasks
          </DisabledMessage>
        </DisabledOverlay>
      )}
      
      <FormTitle>Create New Task</FormTitle>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="name">Name for Hello World Message</Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name"
            disabled={disabled || isSubmitting}
          />
        </InputGroup>
        
        <SubmitButton type="submit" disabled={disabled || isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Create Task'}
        </SubmitButton>
        
        {status && (
          <StatusMessage status={status}>
            {message}
          </StatusMessage>
        )}
      </form>
    </FormContainer>
  );
};

export default TaskForm;