import React from 'react';
import MainNav from '@/components/MainNav';
import { Container } from 'react-bootstrap';

export default function Layout(props) {

    return (
        <>
            <MainNav />
            <div
                style={{
                backgroundImage: `url("/background.webp")`,
                backgroundRepeat: 'repeat-y', // repeat only vertically
                backgroundSize: 'cover',      // scale image to full width
                backgroundPosition: 'top center',
                minHeight: '100vh',
                }}
            >   
            <br />
            <Container>
                {props.children}
            </Container>
            <br />
            </div>
            
        </>
    )
}