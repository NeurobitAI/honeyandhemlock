
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Script {
  id: number;
  title: string;
  uploadedBy: string;
  status: 'pending' | 'assigned' | 'approved' | 'declined';
  assignedJudge?: string;
  dateSubmitted: string;
  feedback?: string;
  paymentStatus: 'paid' | 'pending';
}

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: 'new' | 'read';
}

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [scripts, setScripts] = useState<Script[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [activeTab, setActiveTab] = useState<'scripts' | 'contacts'>('scripts');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/admin');
      return;
    }

    // Load scripts and contacts from localStorage
    const savedScripts = JSON.parse(localStorage.getItem('scripts') || '[]');
    const savedContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    setScripts(savedScripts);
    setContacts(savedContacts);
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const updateScriptStatus = (scriptId: number, status: Script['status'], feedback?: string) => {
    const updatedScripts = scripts.map(script => 
      script.id === scriptId 
        ? { ...script, status, feedback }
        : script
    );
    setScripts(updatedScripts);
    localStorage.setItem('scripts', JSON.stringify(updatedScripts));
    
    toast({
      title: "Script updated",
      description: `Script status changed to ${status}`,
    });
  };

  const markContactAsRead = (contactId: number) => {
    const updatedContacts = contacts.map(contact =>
      contact.id === contactId
        ? { ...contact, status: 'read' as const }
        : contact
    );
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'assigned': return 'bg-blue-500';
      case 'approved': return 'bg-green-500';
      case 'declined': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-portfolio-black text-white p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-playfair text-portfolio-gold">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline" className="border-portfolio-gold text-portfolio-gold">
            Logout
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-6">
          <Button
            onClick={() => setActiveTab('scripts')}
            variant={activeTab === 'scripts' ? 'default' : 'outline'}
            className={activeTab === 'scripts' ? 'bg-portfolio-gold text-black' : 'border-portfolio-gold text-portfolio-gold'}
          >
            Scripts ({scripts.length})
          </Button>
          <Button
            onClick={() => setActiveTab('contacts')}
            variant={activeTab === 'contacts' ? 'default' : 'outline'}
            className={activeTab === 'contacts' ? 'bg-portfolio-gold text-black' : 'border-portfolio-gold text-portfolio-gold'}
          >
            Contacts ({contacts.filter(c => c.status === 'new').length} new)
          </Button>
        </div>

        {/* Scripts Tab */}
        {activeTab === 'scripts' && (
          <Card className="bg-portfolio-dark border-portfolio-gold">
            <CardHeader>
              <CardTitle className="text-portfolio-gold">Script Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              {scripts.length === 0 ? (
                <p className="text-white/80">No scripts submitted yet.</p>
              ) : (
                <div className="space-y-4">
                  {scripts.map((script) => (
                    <div key={script.id} className="bg-portfolio-black p-4 rounded-lg border border-gray-700">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{script.title}</h3>
                        <Badge className={getStatusColor(script.status)}>
                          {script.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-white/70 mb-2">
                        Submitted: {new Date(script.dateSubmitted).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-white/70 mb-4">
                        Payment: {script.paymentStatus}
                      </p>
                      
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => updateScriptStatus(script.id, 'approved')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => updateScriptStatus(script.id, 'declined', 'Needs revision')}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Decline
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <Card className="bg-portfolio-dark border-portfolio-gold">
            <CardHeader>
              <CardTitle className="text-portfolio-gold">Contact Messages</CardTitle>
            </CardHeader>
            <CardContent>
              {contacts.length === 0 ? (
                <p className="text-white/80">No contact messages yet.</p>
              ) : (
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <div key={contact.id} className="bg-portfolio-black p-4 rounded-lg border border-gray-700">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{contact.name}</h3>
                        {contact.status === 'new' && (
                          <Badge className="bg-blue-500">New</Badge>
                        )}
                      </div>
                      <p className="text-sm text-white/70 mb-2">
                        <strong>Email:</strong> {contact.email}
                      </p>
                      {contact.phone && (
                        <p className="text-sm text-white/70 mb-2">
                          <strong>Phone:</strong> {contact.phone}
                        </p>
                      )}
                      <p className="text-sm text-white/70 mb-2">
                        <strong>Subject:</strong> {contact.subject}
                      </p>
                      <p className="text-sm text-white/70 mb-2">
                        <strong>Date:</strong> {new Date(contact.date).toLocaleDateString()}
                      </p>
                      <p className="text-white mb-4">{contact.message}</p>
                      
                      {contact.status === 'new' && (
                        <Button
                          size="sm"
                          onClick={() => markContactAsRead(contact.id)}
                          className="bg-portfolio-gold text-black hover:bg-portfolio-gold/90"
                        >
                          Mark as Read
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
