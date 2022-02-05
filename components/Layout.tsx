import { Container } from '@mui/material';
import React from 'react';
import Footer from './Footer';
import NavBar from './NavBar';

const Layout = (props: any) => {
    const { children } = props;
    return (
        <div className='layout'>
            <NavBar />
            <main>
                <Container>
                    {children}
                </Container>
            </main>
            <Footer />
        </div>
    )
}

export default Layout;