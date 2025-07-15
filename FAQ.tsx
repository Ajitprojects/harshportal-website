import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How do I get my account details after purchase?',
      answer: 'Account credentials are delivered instantly via email within 2-5 minutes of payment confirmation. You can also access them from your account dashboard.'
    },
    {
      question: 'Are these accounts genuine and legal?',
      answer: 'Yes, all accounts are 100% genuine and purchased through official channels. We provide warranty and replacement guarantee for any issues.'
    },
    {
      question: 'What if the account stops working?',
      answer: 'We provide warranty on all accounts. If any account stops working within the validity period, we offer free replacement or full refund.'
    },
    {
      question: 'How long do the accounts remain active?',
      answer: 'Account validity varies by product (3-12 months). Each product page clearly mentions the validity period. We also provide warranty for the entire duration.'
    },
    {
      question: 'Can I change account password?',
      answer: 'For security reasons, we recommend not changing passwords. If needed, contact our support team for guidance on safe account management.'
    },
    {
      question: 'Do you offer bulk discounts?',
      answer: 'Yes! We offer special discounts for bulk purchases. Contact our sales team for custom pricing on orders of 10+ accounts.'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Frequently Asked
            <span className="bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent">
              {" "}Questions
            </span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Get answers to common questions about our digital services and platform
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <h3 className="text-white font-semibold text-lg pr-8">{faq.question}</h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-accent-400" />
                  ) : (
                    <Plus className="w-5 h-5 text-accent-400" />
                  )}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6">
                      <p className="text-white/70 leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-white/60 mb-4">Still have questions?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-accent-500 to-primary-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
          >
            Contact Support
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;