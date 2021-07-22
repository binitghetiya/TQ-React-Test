import React, {  useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { Company, Employee } from '../types';

interface Props {
  company: Company;
}

const CompanyCard: React.FunctionComponent<Props> = ({ company: { name, url, address, employees } }) => {
  const [displayModal, setDisplayModal] = useState(false);

  const handleModal = () => {
    setDisplayModal((s) => !s);
  };

  const renderEmployees = (employees: Employee[], name: string) => {
    if (employees.length > 0) {
      return (
        <Modal show={displayModal}>
          <Modal.Body>
          <p style={{fontWeight: 'bold'}}>{name} Employee list </p>
          {employees.map((employee, key) => (
            <Card key={key}>
              <Card.Body className='mb-2' style={{display: 'flex', justifyContent:'space-between'}}>
                  <p>Name: <span style={{fontWeight:'bold'}}> {employee.name} </span></p>
                  <p>Age: <span style={{fontWeight:'bold'}}> {employee.age} </span></p>
              </Card.Body>
            </Card>
          ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant='outline-info' onClick={handleModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      );
    }
    return null;
  };

  return (
    <Card>
      <Card.Body>
        {name && <Card.Title>{name}</Card.Title>}
        {address && <Card.Text>{address}</Card.Text>}
        {url && (
          <Card.Link href={url} className='mb-2' style={{ display: 'block' }}>
            Link to Website
          </Card.Link>
        )}
        {employees.length > 0 && (
          <Button variant='outline-primary' onClick={handleModal}>
            View Employees ({employees.length})
          </Button>
        )}
      </Card.Body>
      {renderEmployees(employees, name || '')}
    </Card>
  );
};

export default CompanyCard;
