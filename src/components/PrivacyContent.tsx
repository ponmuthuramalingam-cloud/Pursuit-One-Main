import React from 'react';

const PrivacyContent = () => {
  return (
    <div className="space-y-8 text-white/60 leading-relaxed">
      <section>
        <p>Pursuit-One provides a customer relationship management (CRM) platform that helps businesses manage their social media marketing and customer interactions.</p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white mb-4">Information We Collect</h3>
        <p className="mb-4">When businesses connect their accounts to Pursuit-One, we may access certain information from third-party platforms such as Facebook, Instagram, WhatsApp, LinkedIn, or Google. This may include:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Public profile information used for login authentication</li>
          <li>Facebook Page information and posts</li>
          <li>Comments and engagement data from posts</li>
          <li>Advertising campaign performance and insights</li>
          <li>Lead information submitted through lead generation forms</li>
          <li>Messages received through connected business messaging services such as WhatsApp</li>
        </ul>
        <p className="mt-4">This information is only accessed after the user or business administrator explicitly grants permission.</p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white mb-4">How We Use the Information</h3>
        <p className="mb-4">The information collected is used to provide the following services within the Pursuit-One platform:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Display social media posts, comments, and engagement activity</li>
          <li>Allow businesses to respond to customer comments and messages</li>
          <li>Show advertising performance and insights</li>
          <li>Retrieve leads generated from advertisements</li>
          <li>Help businesses follow up with potential customers</li>
          <li>Provide insights and recommendations to improve marketing performance</li>
        </ul>
        <p className="mt-4">We only use the data to provide services requested by the business using the platform.</p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white mb-4">Data Sharing</h3>
        <p>Pursuit-One does not sell or share personal data with third parties. Data obtained through third-party platforms is used only to provide services to the business that authorized the connection.</p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white mb-4">Data Security</h3>
        <p>We take reasonable technical and organizational measures to protect the information processed through our platform.</p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white mb-4">Data Retention</h3>
        <p>Data is retained only as long as necessary to provide services to the business using the platform or until the user disconnects their account.</p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white mb-4">User Data Deletion</h3>
        <p className="mb-4">If a user wishes to request deletion of their data, they can contact us at:</p>
        <p className="font-bold text-indigo-400">Email: support@pursuit-one.com</p>
        <p className="mt-4">Once a request is received, we will delete the user's data from our systems within a reasonable timeframe.</p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
        <p className="mb-4">If you have questions about this Privacy Policy, you can contact us at:</p>
        <p className="font-bold text-indigo-400">Email: support@pursuit-one.com</p>
      </section>
    </div>
  );
};

export default PrivacyContent;
