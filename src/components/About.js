import React from 'react';

const SectionTitle = ({ children }) => (
  <h2 className="text-2xl font-bold text-blue-800 mb-4">{children}</h2>
);

const Paragraph = ({ children }) => (
  <p className="text-gray-700 mb-6 leading-relaxed">{children}</p>
);

const About = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12 bg-white p-8 rounded-lg shadow-lg transform -rotate-1">
          <h1 className="text-4xl font-extrabold text-blue-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            About Impeccable Writers
          </h1>
          <p className="mt-5 text-xl text-blue-600">
            Empowering academic excellence through exceptional writing
          </p>
        </header>

        <div className="bg-white shadow-lg overflow-hidden sm:rounded-lg border-t-4 border-blue-500">
          <div className="px-4 py-5 sm:p-6">
            <SectionTitle>Our Mission</SectionTitle>
            <Paragraph>
              Impeccable Writers was founded with a singular mission: to help students, researchers, and academics unlock their true potential through the power of exceptional writing. Our journey began with a small group of dedicated professionals who recognized the immense pressure and challenges students face in meeting the rigorous standards of academia.
            </Paragraph>

            <SectionTitle>Our Expertise</SectionTitle>
            <Paragraph>
              Over the years, we have grown into a trusted academic writing service, supported by a team of highly qualified experts, each holding advanced degrees in their respective fields. Whether it's crafting compelling essays, conducting thorough research, or polishing dissertations, we are committed to delivering the highest standards of academic excellence.
            </Paragraph>

            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <SectionTitle>What Sets Us Apart</SectionTitle>
              <Paragraph>
                What sets Impeccable Writers apart is our dedication to both quality and integrity. Every paper is crafted from scratch, tailored to the specific needs of our clients, and meticulously checked to ensure originality and adherence to academic guidelines. We understand that academic success is not just about grades but about fostering a deeper understanding and mastery of the subject matter.
              </Paragraph>
            </div>

            <SectionTitle>Our Commitment</SectionTitle>
            <Paragraph>
              At the heart of our work is a passion for learning and a commitment to helping others succeed. We don't just see ourselves as a writing service — we see ourselves as partners in your academic journey. From the first draft to the final submission, Impeccable Writers stands by your side, guiding you every step of the way.
            </Paragraph>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;