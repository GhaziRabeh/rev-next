'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Contact, ContactFormData } from '../../types';

export default function ContactForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: ContactFormData) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newContact: Contact = {
      ...formData,
      id: Date.now()
    };
    
    const existingContacts = JSON.parse(localStorage.getItem('contact') || '[]');
    const updatedContacts = [...existingContacts, newContact];
    localStorage.setItem('contact', JSON.stringify(updatedContacts));
    
    router.push('/contact');
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Ajouter un contact</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Nom:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Téléphone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}