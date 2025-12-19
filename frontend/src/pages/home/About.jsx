import React from 'react';

const About = () => {
  return (
    <div className="bg-white">
      {/* Header Banner */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-800">About Mrkuze BookStore</h1>
          <p className="text-gray-600 mt-2">Connecting readers with their next favorite adventure.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Story Section */}
          <section className="text-center md:text-left flex flex-col md:flex-row items-center gap-8">
             {/* You can replace this placeholder div with an <img> tag later */}
            <div className="w-full md:w-1/2 h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
               <span className="text-sm">Image Placeholder (e.g., Bookstore Interior)</span>
            </div>
            
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
              <p className="text-gray-600 leading-relaxed">
                Founded in 2025, <strong>Mrkuze BookStore</strong> began with a simple mission: to make books accessible to everyone. 
                What started as a small passion project has grown into a vibrant community of book lovers.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                We believe that books have the power to change lives, open minds, and transport us to new worlds. 
                Whether you are looking for the latest bestseller, a rare classic, or educational resources, we are here to serve you.
              </p>
            </div>
          </section>

          <hr className="border-gray-200"/>

          {/* Mission & Values */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-purple-50 rounded-lg border border-purple-100">
              <h3 className="text-xl font-bold text-purple-700 mb-2">Our Mission</h3>
              <p className="text-gray-600 text-sm">
                To inspire a culture of reading by providing a diverse selection of books at affordable prices.
              </p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="text-xl font-bold text-blue-700 mb-2">Community</h3>
              <p className="text-gray-600 text-sm">
                We support local authors and host events to bring readers together.
              </p>
            </div>
            <div className="p-6 bg-green-50 rounded-lg border border-green-100">
              <h3 className="text-xl font-bold text-green-700 mb-2">Quality</h3>
              <p className="text-gray-600 text-sm">
                We carefully curate our collection to ensure every book is worth your time.
              </p>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Join Our Journey</h2>
            <p className="text-gray-600 mb-6">
              Follow us on social media or subscribe to our newsletter to stay updated on new arrivals and exclusive offers.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default About;