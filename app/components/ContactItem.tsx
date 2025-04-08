// ContactItem.tsx
import React from 'react';

interface Phone {
    number: string;
    type: 'Mobile' | 'Home' | 'Office';
}

interface Contact {
    name: string;
    phones: Phone[];
    email: string;
}

interface ContactItemProps {
    contact: Contact;
    index: number;
    handleEdit: (index: number) => void;
    handleDelete: (index: number) => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact, index, handleEdit, handleDelete }) => {
    return (
        <tr>
            <td className="border border-gray-300 px-4 py-2">{contact.name}</td>
            <td className="border border-gray-300 px-4 py-2">
                {contact.phones.map(p => `${p.type}: ${p.number}`).join(' - ')}
            </td>
            <td className="border border-gray-300 px-4 py-2">{contact.email}</td>
            <td className="border border-gray-300 px-4 py-2">
                <div className='flex'>
                <button 
                    onClick={() => handleEdit(index)} 
                    className="bg-blue-500 text-white font-bold py-1 px-3 rounded mr-2"
                >
                    Edit
                </button>
                <button 
                    onClick={() => handleDelete(index)} 
                    className="bg-red-500 text-white font-bold py-1 px-3 rounded"
                >
                    Delete
                </button>
                </div>
            </td>
        </tr>
    );
};

export default ContactItem;
