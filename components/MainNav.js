import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, {useState} from 'react';
import {useRouter} from 'next/router';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';
import {useAtom} from 'jotai';
import {searchHistoryAtom} from '@/store';

export default function MainNav() {

    const [searchField, setSearchField] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();

    const handleSearch = (e) => {

        e.preventDefault();
        setIsExpanded(false);
        const queryString = `title=true&q=${searchField}`;
        setSearchHistory(current => [...current, queryString]);
        router.push(`/artwork?title=true&q=${searchField}`);
    }
    const handleNavigation = (url) => {
        setIsExpanded(false);
        router.push(url);
    };

  return (
    <>
        <Navbar expanded={isExpanded} expand="lg" className="bg-dark navbar-dark fixed-top">
            <Container>
                <Navbar.Brand>Rong Gang Xu</Navbar.Brand>
                <Navbar.Toggle onClick={() => setIsExpanded((someBoolean) => {return !someBoolean;})} aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link active={router.pathname === "/"} onClick={() => handleNavigation('/')}>Home</Nav.Link>
                        <Nav.Link active={router.pathname === "/search"} onClick={() => handleNavigation('/search')}>Advanced Search</Nav.Link>
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
                        <Button variant="success" type="submit">Search</Button>
                    </Form>
                    <Nav>
                        <NavDropdown title="User Name" id="basic-nav-dropdown">
                            <Link href="/favourites" passHref legacyBehavior>
                                <NavDropdown.Item active={router.pathname === "/favourites"} onClick={() => setIsExpanded(false)}>Favourites</NavDropdown.Item>
                            </Link>
                            <Link href="/history" passHref legacyBehavior>
                                <NavDropdown.Item active={router.pathname === "/history"} onClick={() => setIsExpanded(false)}>History</NavDropdown.Item>
                            </Link>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <br/>
        <br/>
    </>
  );
}