import React from "react";
import { Modal, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { message } from 'antd';

export const warning = (messageToShow, type) => {
    switch (type) {
      case 'success':
        return message.success({
          content: messageToShow,
        });
      case 'error':
        return message.error(messageToShow);
    }
  };

  
  const WarningModal = ({ isOpen, onClose }) => {
    return (
      <Modal open={isOpen} onClose={onClose}>
        <div style={{ 
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white", 
          padding: "20px", 
        }}>
          <h2>Warning</h2>
          <p>You need to log in to perform this action. Please log in to continue.</p>
          <Button component={Link} to="/login" variant="contained" color="primary" onClick={onClose}>
            Login
          </Button>
          <Button variant="contained" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Modal>
    );
  };
  
  export default WarningModal;
  
