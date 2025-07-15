import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, Phone, Clock, HelpCircle, Shield } from 'lucide-react';

const Support = () => {
  const supportOptions = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      availability: '24/7 Available',
      action: 'Start Chat',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us your questions and get detailed responses',
      availability: 'Response within 2 hours',
      action: 'Send Email',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our technical experts',
      availability: 'Mon-Fri 9AM-6PM',
      action: 'Call Now',
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  const faqItems = [
    {
      question: 'How quickly will I receive my account?',
      answer: 'All accounts are delivered instantly within 2-5 minutes of payment confirmation via email.'
    },
    {
      question: 'What if my account stops working?',
      answer: 'We provide warranty on all accounts. Contact support for immediate replacement or refund.'
    },
    {
      question: 'Are the accounts genuine?',
      answer: 'Yes, all accounts are 100% genuine and purchased through official channels with proper documentation.'
    },
    {
      question: 'Can I get a refund?',
      answer: 'We offer full refunds within 24 hours if the account doesn\'t work as described.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-44">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Customer
            <span className="bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent">
              {" "}Support
            </span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Get help with your orders, accounts, and technical issues. We're here 24/7 to assist you.
          </p>
        </motion.div>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {supportOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 text-center"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${option.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                <option.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">{option.title}</h3>
              <p className="text-white/70 mb-4">{option.description}</p>
              <div className="text-accent-400 text-sm font-medium mb-6">{option.availability}</div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full bg-gradient-to-r ${option.color} text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300`}
              >
                {option.action}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-start space-x-3">
                  <HelpCircle className="w-6 h-6 text-accent-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-semibold mb-2">{item.question}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-accent-500/20 to-primary-500/20 backdrop-blur-sm rounded-3xl p-8 border border-white/20 text-center"
        >
          <Shield className="w-16 h-16 text-accent-400 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-white mb-4">Need Immediate Help?</h3>
          <p className="text-white/70 mb-6">
            Our support team is available 24/7 to help you with any issues or questions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center space-x-2 text-white/80">
              <Mail className="w-5 h-5" />
              <span>support@harshportal.com</span>
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <Phone className="w-5 h-5" />
              <span>+1 (555) 123-HARSH</span>
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <Clock className="w-5 h-5" />
              <span>24/7 Available</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Support;