'use client'
// ContactForm.tsx
import React, { useState } from 'react';
import ContactList from './ContactList';

interface Phone {
    number: string;
    type: 'Mobile' | 'Home' | 'Office';
}

interface Contact {
    name: string;
    phones: Phone[];
    email: string;
}

const ContactForm: React.FC = () => {
    const [name, setName] = useState('');
    const [phones, setPhones] = useState<Phone[]>([{ number: '', type: 'Mobile' }]);
    const [email, setEmail] = useState('');
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newContact = { name, phones, email };

        if (editIndex !== null) {
            const updatedContacts = [...contacts];
            updatedContacts[editIndex] = newContact;
            setContacts(updatedContacts);
            setEditIndex(null);
        } else {
            setContacts([...contacts, newContact]);
        }

        resetForm();
    };

    const resetForm = () => {
        setName('');
        setPhones([{ number: '', type: 'Mobile' }]);
        setEmail('');
    };

    const handleAddPhone = () => {
        setPhones([...phones, { number: '', type: 'Mobile' }]);
    };

    const handleEdit = (index: number) => {
        const contactToEdit = contacts[index];
        setName(contactToEdit.name);
        setPhones(contactToEdit.phones);
        setEmail(contactToEdit.email);
        setEditIndex(index);
    };

    const handleDelete = (index: number) => {
        const updatedContacts = contacts.filter((_, i) => i !== index);
        setContacts(updatedContacts);
    };

    return (
        <div className="max-w-xl mx-auto p-4 pt-8">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border border-gray-300 rounded w-full py-2 px-3 mb-4"
                />

                {phones.map((phone, index) => (
                    <div key={index} className="flex mb-4">
                        <select
                            value={phone.type}
                            onChange={(e) => {
                                const updatedPhones = [...phones];
                                updatedPhones[index].type = e.target.value as 'Mobile' | 'Home' | 'Office';
                                setPhones(updatedPhones);
                            }}
                            className="border border-gray-300 rounded w-1/3 py-2 px-3 mb-2 mr-2"
                        >
                            <option value="Mobile">Mobile</option>
                            <option value="Home">Home</option>
                            <option value="Office">Office</option>
                        </select>
                        <input
                            type="text"
                            placeholder={`Phone ${index + 1}`}
                            value={phone.number}
                            onChange={(e) => {
                                const updatedPhones = [...phones];
                                updatedPhones[index].number = e.target.value;
                                setPhones(updatedPhones);
                            }}
                            className="border border-gray-300 rounded w-2/3 py-2 px-3"
                        />
                    </div>
                ))}

                <button type="button" onClick={handleAddPhone} className="text-blue-500 mb-4">
                    + Add another phone
                </button>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border border-gray-300 rounded w-full py-2 px-3 mb-4"
                />

                <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
                    {editIndex !== null ? 'Update' : 'Add'}
                </button>
            </form>

            <ContactList 
                contacts={contacts} 
                handleEdit={handleEdit} 
                handleDelete={handleDelete} 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
        </div>
    );
};

export default ContactForm;
