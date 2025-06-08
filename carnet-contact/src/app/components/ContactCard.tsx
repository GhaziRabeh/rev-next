import Link from "next/link";
import { Contact } from "../types";

interface ContactCardProps {
  contact: Contact;
  onDelete: (id: number) => void;
}

export default function ContactCard({ contact, onDelete }: ContactCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-800">{contact.name}</h3>
      <p className="text-gray-600 mt-2">
        <span className="font-medium">Email:</span> {contact.email}
      </p>
      <p className="text-gray-600">
        <span className="font-medium">Téléphone:</span> {contact.phone}
      </p>
      <div className="mt-4 flex space-x-2">
        <Link
          href={`/contact/edit/${contact.id}`}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
        >
          Éditer
        </Link>
        <button
          onClick={() => {
            if (confirm("Êtes-vous sûr de vouloir supprimer ce contact ?")) {
              onDelete(contact.id);
            }
          }}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}
