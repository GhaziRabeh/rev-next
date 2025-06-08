'use client';
import { useState, useEffect } from 'react';
import ContactCard from '../components/ContactCard';
import { Contact } from '../types';

export default function ContactList() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const storedContacts = localStorage.getItem('contact');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    } else {
    
      const initialContacts: Contact[] = [
        { id: 1, name: "Jean Dupont", email: "jean.dupont@example.com", phone: "0123456789" },
        { id: 2, name: "Marie Martin", email: "marie.martin@example.com", phone: "0987654321" }
      ];
      setContacts(initialContacts);
      localStorage.setItem('contact', JSON.stringify(initialContacts));
    }
  }, []);

  const handleDelete = (id: number) => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
    localStorage.setItem('contact', JSON.stringify(updatedContacts));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Liste des contacts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map(contact => (
          <ContactCard 
            key={contact.id} 
            contact={contact} 
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}