import React, { useState } from "react";
import axios from "axios";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";

const ContactSection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async () => {
    try {
      await axios.post("/api/enquiry", form);
      alert("Message sent successfully");

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch {
      alert("Something went wrong");
    }
  };

  return (
    <section className="w-full bg-black text-white px-6 lg:px-16 py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* LEFT SIDE */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Have Something In Mind? <br /> Let’s Talk.
          </h1>

          <p className="text-gray-300 mb-10 text-lg">
            Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#1f1f1f] rounded-md flex items-center justify-center">
                <FiMapPin className="text-blue-400 text-xl" />
              </div>
              <p>785 15h Street, Office 478 Berlin</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#1f1f1f] rounded-md flex items-center justify-center">
                <FiPhone className="text-blue-400 text-xl" />
              </div>
              <p>+1 800 555 45 65</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#1f1f1f] rounded-md flex items-center justify-center">
                <FiMail className="text-blue-400 text-xl" />
              </div>
              <p>info.gana@company.com</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="bg-[#0e0e0e] rounded-xl p-8 space-y-8">
          <input
            type="text"
            placeholder="Your full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-transparent border-b border-gray-600 py-3"
            required
          />

          <input
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-transparent border-b border-gray-600 py-3"
            required
          />

          <input
            type="text"
            placeholder="Phone number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full bg-transparent border-b border-gray-600 py-3"
            required
          />

          <select
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="w-full bg-transparent border-b border-gray-600 py-3"
            required
          >
            <option value="">Select Subject</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Support">Support</option>
            <option value="Billing">Billing</option>
          </select>

          <textarea
            rows={4}
            placeholder="Write your message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full bg-transparent border-b border-gray-600 py-3"
            required
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg"
          >
            Send Message
          </button>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
