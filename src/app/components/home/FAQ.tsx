"use client";

import { useState } from "react";

const faqData = [
  {
    question: "Why use ConfidenCV for your job application?",
    answer:
      "ConfidenCV helps you create a clean, professional resume quickly without worrying about formatting. Our templates are designed to highlight your skills and experience clearly, helping you present yourself confidently to employers.",
  },
  {
    question: "Is ConfidenCV free to use?",
    answer:
      "ConfidenCV offers a 7-day free trial so you can explore all features. If you're not satisfied, you can request a refund.",
  },
  {
    question: "How long does it take to create a resume?",
    answer:
      "Most users complete their resume in under 10 minutes. Just enter your details, choose a template, and your resume will be formatted automatically.",
  },
  {
    question: "Can I edit my resume later?",
    answer:
      "Absolutely. You can return anytime to update your experience, skills, or education. Your resume stays saved so you can continuously improve it.",
  },
  {
    question: "Are the resume templates ATS-friendly?",
    answer:
      "Yes. Our templates are designed to be ATS-friendly so that your resume can be properly read by employer hiring systems.",
  },
  {
    question: "Can I download my resume as a PDF?",
    answer:
      "Yes. Once you're finished building your resume, you can export it as a clean, professional PDF ready to send to employers.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-7xl mx-auto px-5 py-20">
      
      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold leading-tight md:leading-snug">
          Frequently Asked Questions
        </h2>
      </div>

      {/* FAQ List */}
      <div className="max-w-3xl mx-auto space-y-6">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-6 shadow-sm"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full text-left flex justify-between items-center font-semibold text-lg"
            >
              {faq.question}

              <span className="text-cyan-400 text-2xl">
                {openIndex === index ? "-" : "+"}
              </span>
            </button>

            {openIndex === index && (
              <p className="mt-4 text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>

    </section>
  );
};

export default FAQ;