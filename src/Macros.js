import React, { useState } from 'react';
import './App.css';
import { Button, Form, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Macros = () => {
  const [macros, setMacros] = useState([]);
  const navigate = useNavigate();

  const handleCreateMacro = (event) => {
    event.preventDefault();
    const macroName = event.target.elements.macroName.value;
    const macroMessage = event.target.elements.macroMessage.value;

    if (macroName && macroMessage) {
      setMacros([...macros, { name: macroName, message: macroMessage }]);
      event.target.reset();
    }
  };

  return (
    <div className="form-container" style={{ display: 'flex', gap: '20px' }}>
      <div className="macro-list" style={{ flex: '1', maxHeight: '500px', overflowY: 'scroll' }}>
        <h2 className="text-center">Macros List 📜</h2>
        <ListGroup>
          {macros.map((macro, index) => (
            <ListGroup.Item key={index} className="text-start">
              <strong>{macro.name}</strong>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="macro-form" style={{ flex: '2' }}>
        <h1 className="text-center" style={{ marginBottom: '20px', color: 'inherit' }}>
          Manage Macros 📋
        </h1>

        <Form onSubmit={handleCreateMacro}>

          {/* Name */}
          <Form.Group className="mb-3 text-start" controlId="macroName">
            <Form.Label>Macro Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the name of the macro"
              required
            />
          </Form.Group>

          {/* Message */}
          <Form.Group className="mb-3 text-start" controlId="macroMessage">
            <Form.Label>Message:</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              style={{ resize: 'both', minHeight: '150px' }}
              placeholder="Enter the message for the macro"
              required
            />
          </Form.Group>

          {/* Submit */}
          <Button variant="primary" type="submit" style={{ width: '100%' }}>
            Create Macro
          </Button>
        </Form>
      </div>

      {/* Create Macro */}
      <Button
        variant="secondary"
        onClick={() => navigate('/outreach')}
        style={{ position: 'fixed', bottom: '20px', right: '20px' }}
      >
        +
      </Button>
    </div>
  );
};

export default Macros;
