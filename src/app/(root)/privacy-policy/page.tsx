export default function PrivacyPolicy() {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-4xl px-5 py-20">
        {/* Title */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Privacy Policy
          </h1>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Last updated: {new Date().toLocaleDateString("en-US")}
          </p>
        </header>

        {/* Content */}
        <div className="space-y-10 text-gray-700 leading-relaxed">
          <p>
            ConfidenCV respects and protects user privacy. This Privacy Policy
            explains how we collect, use, and safeguard your personal information
            when you use ConfidenCV’s services.
          </p>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              1. Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Account information (name, email, password)</li>
              <li>Resume/CV data that you enter into the platform</li>
              <li>
                Payment information processed by third-party providers (such as
                payment gateways)
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              2. Use of Information
            </h2>
            <p>The information we collect is used to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and manage ConfidenCV services</li>
              <li>Improve service quality and features</li>
              <li>Process payment transactions</li>
              <li>Provide customer support and assistance</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              3. Data Security
            </h2>
            <p>
              We implement reasonable technical and organizational security
              measures to protect your personal data from unauthorized access,
              use, or disclosure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              4. Information Sharing
            </h2>
            <p>
              ConfidenCV does not sell or rent your personal data to third parties.
              Information may only be shared with trusted partners for
              operational purposes, such as payment processing or technical
              service providers.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              5. User Rights
            </h2>
            <p>
              You have the right to access, update, or delete your personal data
              through your account settings or by contacting the ConfidenCV team.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              6. Changes to This Privacy Policy
            </h2>
            <p>
              This Privacy Policy may be updated from time to time. Any changes
              will be announced on the ConfidenCV website and will take effect as
              of the updated date.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              7. Contact Us
            </h2>
            <p>
              If you have any questions regarding this Privacy Policy, please
              contact us via ConfidenCV’s official email.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
