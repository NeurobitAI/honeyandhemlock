
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Script {
  id: string;
  title: string;
  author_name: string;
  author_email: string;
  author_phone?: string;
  file_url?: string;
  file_name?: string;
  status: 'pending' | 'assigned' | 'approved' | 'declined';
  assigned_judge_id?: string;
  stripe_payment_intent_id?: string;
  payment_status: 'pending' | 'paid' | 'failed';
  amount?: number;
  submitted_at: string;
  reviewed_at?: string;
  created_at: string;
  updated_at: string;
}

export const useSupabaseScripts = () => {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchScripts = async () => {
    try {
      const { data, error } = await supabase
        .from('scripts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setScripts(data || []);
    } catch (error) {
      console.error('Error fetching scripts:', error);
      toast({
        title: "Error",
        description: "Failed to fetch scripts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const submitScript = async (scriptData: {
    title: string;
    author_name: string;
    author_email: string;
    author_phone?: string;
    file?: File;
  }) => {
    try {
      let fileUrl = null;
      let fileName = null;

      // Upload file if provided
      if (scriptData.file) {
        const fileExt = scriptData.file.name.split('.').pop();
        fileName = `${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('scripts')
          .upload(fileName, scriptData.file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('scripts')
          .getPublicUrl(fileName);
        
        fileUrl = publicUrl;
      }

      const { data, error } = await supabase
        .from('scripts')
        .insert({
          title: scriptData.title,
          author_name: scriptData.author_name,
          author_email: scriptData.author_email,
          author_phone: scriptData.author_phone,
          file_url: fileUrl,
          file_name: fileName,
          amount: 5000, // $50.00
        })
        .select()
        .single();

      if (error) throw error;
      
      await fetchScripts();
      return data;
    } catch (error) {
      console.error('Error submitting script:', error);
      toast({
        title: "Error",
        description: "Failed to submit script",
        variant: "destructive"
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchScripts();
  }, []);

  return { scripts, loading, fetchScripts, submitScript };
};
