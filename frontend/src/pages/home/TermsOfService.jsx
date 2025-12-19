import React from 'react';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Terms of Service</h1>
      
      <div className="space-y-6 text-gray-600">
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing and using Mrkuze BookStore, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">2. User Accounts</h2>
          <p>
            To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">3. Products and Pricing</h2>
          <p>
            We strive to display products and pricing accurately. However, errors may occur. We reserve the right to correct any errors and to change information at any time without prior notice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">4. Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, and images, is the property of Mrkuze BookStore or its content suppliers and is protected by copyright laws.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">5. Limitation of Liability</h2>
          <p>
            Mrkuze BookStore shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">6. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Your continued use of the website following any changes indicates your acceptance of the new terms.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;