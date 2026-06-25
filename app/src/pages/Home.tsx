import React, { memo } from 'react';
import SEO from "@/components/system/SEO";
import Hero from "@/sections/Hero";
import Welcome from "@/sections/Welcome";
import SalonInterior from "@/sections/SalonInterior";
import Services from "@/sections/Services";
import Stylers from "@/sections/Stylers";
import Testimonials from "@/sections/Testimonials";
import Booking from "@/sections/Booking";
import Footer from "@/sections/Footer";

// Memoize heavy sections to prevent render chains
const MemoizedWelcome = memo(Welcome);
const MemoizedSalonInterior = memo(SalonInterior);
const MemoizedServices = memo(Services);
const MemoizedStylers = memo(Stylers);
const MemoizedTestimonials = memo(Testimonials);
const MemoizedBooking = memo(Booking);
const MemoizedFooter = memo(Footer);

const Home = memo(function Home() {
  return (
    <main className="min-h-screen">
      <SEO title="Home" description="Experience luxury AI beauty analysis at Pune Beauty Salon." />
      <div>
        <Hero />
        <MemoizedWelcome />
        <MemoizedSalonInterior />
        <MemoizedServices />
        <MemoizedStylers />
        <MemoizedTestimonials />
        <MemoizedBooking />
        <MemoizedFooter />
      </div>
    </main>
  );
});

export default Home;
