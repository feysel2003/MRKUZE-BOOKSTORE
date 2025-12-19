import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Privacy Policy</h1>
      
      <div className="space-y-6 text-gray-600">
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">1. Introduction</h2>
          <p>
            Welcome to Mrkuze BookStore. We value your privacy and are committed to protecting your personal information. 
            This policy explains how we collect, use, and safeguard your data when you visit our website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">2. Information We Collect</h2>
          <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or subscribe to our newsletter. This includes:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Name and contact information (email, phone number).</li>
            <li>Billing and shipping addresses.</li>
            <li>Payment details (processed securely by third-party providers).</li>
            <li>Order history and preferences.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">3. How We Use Your Information</h2>
          <p>We use your data to:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Process and fulfill your orders.</li>
            <li>Send order confirmations and shipping updates.</li>
            <li>Respond to your customer service requests.</li>
            <li>Send you newsletters and promotional offers (if subscribed).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">5. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at <strong>support@mrkuze-bookstore.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;