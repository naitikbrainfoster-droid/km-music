import React from "react";
import ContactHero from "../components/contact/contacthero";
import ContactSection from "../components/contact/contactform";
import ContactMap from "../components/contact/contactmap";

const Contact = () => {
  return (
    <div className="bg-black">
      <ContactHero />
      <ContactSection />
      <ContactMap />
    </div>
  );
};

export default Contact;
