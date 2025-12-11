import React from "react";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";

const ContactSection = () => {
  return (
    <section className="w-full bg-black text-white px-6 lg:px-16 py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* LEFT SIDE CONTENT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Have Something In Mind? <br /> Let’s Talk.
          </h1>

          <p className="text-gray-300 mb-10 text-lg">
            Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim.
          </p>

          {/* Contact Info */}
          <div className="space-y-6">

            {/* Address */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#1f1f1f] rounded-md flex items-center justify-center">
                <FiMapPin className="text-blue-400 text-xl" />
              </div>
              <p className="text-gray-300">
                785 15h Street, Office 478 Berlin
              </p>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#1f1f1f] rounded-md flex items-center justify-center">
                <FiPhone className="text-blue-400 text-xl" />
              </div>
              <p className="text-gray-300">
                +1 800 555 45 65
              </p>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#1f1f1f] rounded-md flex items-center justify-center">
                <FiMail className="text-blue-400 text-xl" />
              </div>
              <p className="text-gray-300">
                info.gana@company.com
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="bg-[#0e0e0e] rounded-xl p-8 space-y-8">

          <div className="space-y-8">
            <input
              type="text"
              placeholder="Votre nom complet"
              className="w-full bg-transparent border-b border-gray-600 py-3 text-gray-300 focus:outline-none"
            />

            <input
              type="email"
              placeholder="Votre e-mail"
              className="w-full bg-transparent border-b border-gray-600 py-3 text-gray-300 focus:outline-none"
            />

            <input
              type="text"
              placeholder="Votre numéro de téléphone"
              className="w-full bg-transparent border-b border-gray-600 py-3 text-gray-300 focus:outline-none"
            />

            <select
              className="w-full bg-transparent border-b border-gray-600 py-3 text-gray-300 focus:outline-none"
            >
              <option className="text-black">Objet</option>
              <option className="text-black">Support</option>
              <option className="text-black">Billing</option>
              <option className="text-black">General Inquiry</option>
            </select>

            <textarea
              rows={4}
              placeholder="Écrivez votre message"
              className="w-full bg-transparent border-b border-gray-600 py-3 text-gray-300 focus:outline-none"
            ></textarea>
          </div>

          <button className="mt-4 bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-4 rounded-lg text-lg font-medium">
            Envoyer message
          </button>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;
