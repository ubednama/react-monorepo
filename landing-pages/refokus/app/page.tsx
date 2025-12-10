"use client";

"use client";
import React, { useEffect } from 'react';
import Navbar from '../src/components/common/Navbar';
import Work from '../src/components/Work';
import Stripes from '../src/components/Stripes';
import Products from '../src/components/Products';
import Marquees from '../src/components/Marquees';
import Cards from '../src/components/Cards';
import Footer from '../src/components/common/Footer';

export default function Home() {
    useEffect(() => {
        (async () => {
            const LocomotiveScroll = (await import('locomotive-scroll')).default;
            const locomotiveScroll = new LocomotiveScroll();
        })();
    }, []);
    return (
        <div className='w-full min-h-screen bg-zinc-900 text-white font-["satoshi"]'>
            <Navbar />
            <Work />
            <Stripes />
            <Products />
            <Marquees />
            <Cards />
            <Footer />
        </div>
    );
}
