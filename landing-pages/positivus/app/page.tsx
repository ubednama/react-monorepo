"use client";
import React from 'react';
import NavBar from '../src/components/NavBar';
import Hero from '../src/components/Hero';
import CompanyStrap from '../src/components/CompanyStrap';
import Services from '../src/components/Services';
import OWP from '../src/components/OWP';
import CaseStudies from '../src/components/CaseStudies';
import ContactUs from '../src/components/ContactUs';
import Footer from '../src/components/Footer';

export default function Home() {
    return (
        <div className="bg-white min-h-screen mx-28 space-y-24 max-w-screen">
            <NavBar />
            <Hero />
            <div className="w-screen relative -left-28">
                <CompanyStrap />
            </div>
            <Services />
            <OWP />
            <CaseStudies />
            <div className="w-screen relative -left-28">
                <div className="mx-28">
                    <ContactUs />
                </div>
                <div className="mt-24">
                    <Footer />
                </div>
            </div>
        </div>
    );
}
