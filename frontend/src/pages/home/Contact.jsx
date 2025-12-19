import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios'; 
import { useAuth } from '../../context/AuthContext';


const Contact = () => {
  const { currentUser } = useAuth(); // Get the logged-in user

  // --- FORM HANDLING ---
  const onSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Get the URL from your .env file
    const formEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

    if (!formEndpoint) {
        console.error("VITE_FORMSPREE_ENDPOINT is missing in .env file");
        Swal.fire({
            title: "Configuration Error",
            text: "Contact form is not configured properly. Please email us directly.",
            icon: "error",
        });
        return;
    }
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post(formEndpoint, data);

      if (response.status === 200) {
        Swal.fire({
          title: "Message Sent!",
          text: "Thank you for contacting us. We will get back to you shortly.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
        e.target.reset(); 
      }
    } catch (error) {
      console.error("Error sending message", error);
      Swal.fire({
        title: "Error",
        text: "Failed to send message. Please try again or email us directly.",
        icon: "error",
      });
    }
  };

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
          <p className="text-gray-600 mt-2">We'd love to hear from you! Reach out for any queries or support.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Left Side: Contact Information */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800">Get in Touch</h2>
            <p className="text-gray-600">
              Have a question about an order, a book, or just want to say hello? 
              Our team is here to help you.
            </p>

            <div className="space-y-4">
              <a 
                href="mailto:mrkuzebookstore@gmail.com" 
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-purple-50 transition-colors group cursor-pointer"
              >
                <div className="p-3 bg-purple-100 text-purple-600 rounded-full group-hover:bg-purple-200">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email Us</h3>
                  <span className="text-purple-600 font-medium">mrkuzebookstore@gmail.com</span>
                  <p className="text-gray-500 text-sm">info@mrkuze.com</p>
                </div>
              </a>

              <a 
                href="tel:+251712498712"
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-blue-50 transition-colors group cursor-pointer"
              >
                <div className="p-3 bg-blue-100 text-blue-600 rounded-full group-hover:bg-blue-200">
                  <FaPhoneAlt size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Call Us</h3>
                  <span className="text-blue-600 font-medium">+251 712 498 712</span>
                </div>
              </a>

              <div className="flex items-start gap-4 p-4">
                <div className="p-3 bg-orange-100 text-orange-600 rounded-full">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Visit Us</h3>
                  <p className="text-gray-600">
                    Addis Ababa,<br/>
                    Ethiopia
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send a Message</h2>
            
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input 
                  name="name"
                  required
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full border-gray-300 rounded-md px-4 py-2 border focus:outline-none focus:border-purple-500" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  name="email"
                  required
                  type="email" 
                  defaultValue={currentUser?.email} // <--- AUTO-FILLS EMAIL HERE
                  placeholder="john@example.com" 
                  className="w-full border-gray-300 rounded-md px-4 py-2 border focus:outline-none focus:border-purple-500" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input 
                  name="subject"
                  required
                  type="text" 
                  placeholder="Order Inquiry" 
                  className="w-full border-gray-300 rounded-md px-4 py-2 border focus:outline-none focus:border-purple-500" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  name="message"
                  required
                  rows="4" 
                  placeholder="How can we help you?" 
                  className="w-full border-gray-300 rounded-md px-4 py-2 border focus:outline-none focus:border-purple-500"
                ></textarea>
              </div>

              <button type="submit" className="w-full bg-purple-600 text-white font-bold py-3 rounded-md hover:bg-purple-700 transition duration-300">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;