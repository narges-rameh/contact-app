// ContactList.tsx
import React from 'react';
import ContactItem from './ContactItem';

interface Phone {
    number: string;
    type: 'Mobile' | 'Home' | 'Office';
}

interface Contact {
    name: string;
    phones: Phone[];
    email: string;
}

interface ContactListProps {
    contacts: Contact[];
    handleEdit: (index: number) => void;
    handleDelete: (index: number) => void;
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, handleEdit, handleDelete, searchTerm, setSearchTerm }) => {
    // Filter contacts based on the search term
    const filteredContacts = contacts.filter(contact => {
        const fullContactString = `${contact.name} ${contact.phones.map(phone => phone.number).join(' ')} ${contact.email}`.toLowerCase();
        return fullContactString.includes(searchTerm.toLowerCase());
    });

    return (
        <div>
            <h2 className="flex items-center justify-center text-xl font-bold mb-2 text-gray-600">Submitted Contacts</h2>
            <input
                type="text"
                placeholder="Search by name, number, or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded w-full py-2 px-3 mb-4"
            />
            <table className="min-w-full border-collapse border rounded-md border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Phone</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredContacts.map((contact, index) => (
                        <ContactItem 
                            key={index} 
                            contact={contact} 
                            index={index} 
                            handleEdit={handleEdit} 
                            handleDelete={handleDelete} 
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ContactList;
