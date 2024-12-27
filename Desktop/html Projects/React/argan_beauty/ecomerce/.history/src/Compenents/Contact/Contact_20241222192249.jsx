import React, { useState } from 'react';

// Contact Component
export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,

      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
    // Example: Send data to backend
    alert('Message envoyé ! Nous vous recontacterons bientôt.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gold-100 to-gold-200 flex items-center justify-center p-6 my-20
    ">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gold-700">Contactez-nous</h2>
          <p className="text-gold-500">Argan Beauty Professional</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gold-600 mb-2">Nom Complet</label>
            <input 
              type="text" 
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gold-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
              placeholder="Votre nom"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gold-600 mb-2">Email</label>
            <input 
              type="email" 
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gold-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
              placeholder="votre@email.com"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-gold-600 mb-2">Téléphone</label>
            <input 
              type="tel" 
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gold-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
              placeholder="06 00 00 00 00"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gold-600 mb-2">Message</label>
            <textarea 
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 border border-gold-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
              placeholder="Votre message..."
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-gold-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Envoyer le Message
          </button>
        </form>
      </div>
    </div>
  );
}
export default Contact