import React from 'react'

import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Layout = () => {
    return (
        <>
            <Navbar />
            <section className="relative container mx-auto main-height flex items-center justify-center bg-[#171717] rounded">
                <Outlet />
            </section>
            <Footer />
        </>
    )
}

export default Layout;
