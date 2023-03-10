import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function SuccessAlert() {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="success" onClose={() => setShow(false)} dismissible>
        {/* <Alert.Heading>Oh snap! You got an error!</Alert.Heading> */}
        <p>
          Review Created Successfully!
        </p>
      </Alert>
    );
  }
  return <Button onClick={() => setShow(true)}>Show Alert</Button>;
}

export default SuccessAlert
