
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage for admin to see
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    const newContact = {
      ...formData,
      id: Date.now(),
      date: new Date().toISOString(),
      status: 'new'
    };
    contacts.push(newContact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    
    // Reset form and close
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    onClose();
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-portfolio-dark border-portfolio-gold">
        <CardHeader className="relative">
          <CardTitle className="text-portfolio-gold font-playfair text-2xl text-center">
            Contact Us
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 text-white hover:text-portfolio-gold"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-portfolio-black border-gray-600 text-white placeholder-gray-400"
            />
            <Input
              name="email"
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-portfolio-black border-gray-600 text-white placeholder-gray-400"
            />
            <Input
              name="phone"
              placeholder="Your Phone"
              value={formData.phone}
              onChange={handleChange}
              className="bg-portfolio-black border-gray-600 text-white placeholder-gray-400"
            />
            <Input
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="bg-portfolio-black border-gray-600 text-white placeholder-gray-400"
            />
            <Textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="bg-portfolio-black border-gray-600 text-white placeholder-gray-400"
            />
            <Button 
              type="submit" 
              className="w-full bg-portfolio-gold text-black hover:bg-portfolio-gold/90"
            >
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactForm;
