import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  User, 
  MessageCircle, 
  Send, 
  Facebook, 
  Instagram, 
  Twitter, 
  MapPin, 
  Clock, 
  Check 
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const socialLinks = [
    { icon: <Facebook className="w-6 h-6" />, url: "#", label: "Facebook" },
    { icon: <Instagram className="w-6 h-6" />, url: "#", label: "Instagram" },
    { icon: <Twitter className="w-6 h-6" />, url: "#", label: "Twitter" }
  ];

  const contactInfo = [
    { 
      icon: <MapPin className="w-5 h-5" />, 
      text: "123 Rue de la Beauté, Paris" 
    },
    { 
      icon: <Phone className="w-5 h-5" />, 
      text: "+33 1 23 45 67 89" 
    },
    { 
      icon: <Clock className="w-5 h-5" />, 
      text: "Lun-Sam: 9h-19h" 
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const InputWrapper = ({ icon, children }) => (
    <div className="relative">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600">
        {icon}
      </span>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8 mt-19">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-xl p-8 space-y-6">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-800">
                Contactez-nous
              </h2>
              <p className="mt-2 text-green-600">
                Argan Beauty Professional
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4 mt-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center space-x-3 text-gray-600">
                  <span className="text-green-600">{info.icon}</span>
                  <span>{info.text}</span>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className="pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Suivez-nous
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="p-3 bg-green-50 rounded-full text-green-600 hover:bg-green-600 hover:text-white transition-colors duration-300"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white shadow-xl rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputWrapper icon={<User className="w-5 h-5" />}>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  placeholder="Votre nom complet"
                />
              </InputWrapper>

              <InputWrapper icon={<Mail className="w-5 h-5" />}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  placeholder="votre@email.com"
                />
              </InputWrapper>

              <InputWrapper icon={<Phone className="w-5 h-5" />}>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  placeholder="06 00 00 00 00"
                />
              </InputWrapper>

              <InputWrapper icon={<MessageCircle className="w-5 h-5" />}>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  placeholder="Votre message..."
                />
              </InputWrapper>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  w-full py-3 px-4 rounded-lg text-white 
                  transition duration-300 ease-in-out transform 
                  flex items-center justify-center space-x-2
                  ${isSubmitted 
                    ? 'bg-green-500' 
                    : 'bg-green-600 hover:bg-green-700 hover:scale-105'
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                ) : isSubmitted ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Message envoyé !</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Envoyer le message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;