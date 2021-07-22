import React, { useEffect } from 'react';
import { Alert, Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { RootState } from '../store';
import { getApplicationDetails } from '../store/applications/thunk';
import RequestStatus from '../store/RequestStatus';
import CompanyCard from '../views/CompanyCard';

const Companies = () => {
  const dispatch = useDispatch();
  const { companies , setApplicationsState} = useSelector((state: RootState) => state.applications);

  useEffect(() => {
    const authKey = localStorage.getItem('authKey') || '';
    dispatch(getApplicationDetails(authKey as string));
  }, [dispatch]);

  if(setApplicationsState === RequestStatus.Requested) {
    return (
      <Container className='mt-2'>
        <Alert variant={'info'}>Loading companies details</Alert>
      </Container>
    );
  }

  if(setApplicationsState === RequestStatus.Failed) {
    return (
      <Container className='mt-2'>
        <Alert variant={'danger'}>Ooops! Something went wrong please try again!</Alert>
      </Container>
    );
  }

  if (!companies || companies.length === 0) {
    return (
      <Container className='mt-2'>
        <Alert variant={'danger'}>No companies found!</Alert>
      </Container>
    );
  }

  return (
    <Container className='mt-2 mb-2'>
      <LinkContainer to='/create' className='mt-2 mb-2'>
        <Button variant="outline-success">Create company</Button>
      </LinkContainer>
      <Row lg={2} xs={1} sm={2}>
        {companies?.length > 0 &&
          companies.map((company, key) => (
            <Col key={key} className='mt-2'>
              <CompanyCard company={company} />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Companies;
