import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, {useState} from 'react';
import {useRouter} from 'next/router';

export default function MainNav() {

    const [searchField, setSearchField] = useState('');
    const router = useRouter();

    const handleSearch = (e) => {

        e.preventDefault();
        router.push(`/artwork?title=true&q=${searchField}`);
    }
  return (
    <>
        <Navbar expand="lg" className="bg-body-tertiary fixed-top">
        <Container>
            <Navbar.Brand>Rong Gang Xu</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/search">Advanced Search</Nav.Link>
            </Nav>
            <Form className="d-flex" onSubmit={handleSearch}>
                <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchField}
                onChange={(e)=>setSearchField(e.target.value)}
                />
                <Button variant="outline-success" type="submit">Search</Button>
            </Form>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        <br/>
        <br/>
    </>
  );
}