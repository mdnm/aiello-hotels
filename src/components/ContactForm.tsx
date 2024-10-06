import { useState } from 'react';
import * as m from '../paraglide/messages';

export const ContactForm = ({
  contactEmail,
  currentPath,
  lang
}: {
  contactEmail?: string;
  currentPath?: string;
  lang?: string;
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const body = `
      Nome: ${formData.name}
      Email: ${formData.email}
      Messaggio: ${formData.message}
    `;

    document.location = `mailto:${contactEmail}?subject=Message from website: ${currentPath}&body=${body}`;
  }

  return (
    <form className="flex flex-col gap-4 w-full max-w-[500px]" onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder={m.name()} className="w-full p-2 border border-gray-300 rounded-md" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
      <input type="email" name="email" placeholder={m.email()} className="w-full p-2 border border-gray-300 rounded-md" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
      <textarea name="message" placeholder={m.message()} className="w-full p-2 border border-gray-300 rounded-md" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>
      <button className="bg-primary text-white rounded-md py-2 px-4 uppercase font-semibold hover:bg-secondary transition-all duration-200">
        {m.send()}
      </button>
    </form>
  )
}