import React from "react";

const ContactMap = () => {
  return (
    <section className="w-full h-[400px] md:h-[550px] overflow-hidden">
      <iframe
        title="Google Map Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19816.75341774568!2d-0.1280490488751!3d51.50329721110248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604bf2cae6ea5%3A0x24a712b5c0c9f0cc!2sLondon%20Eye!5e0!3m2!1sen!2sin!4v1709500000000!5m2!1sen!2sin"
        className="w-full h-full border-0"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>
  );
};

export default ContactMap;
