
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert } from '@/integrations/supabase/types';

type Script = Tables<'scripts'>;
type ScriptInsert = TablesInsert<'scripts'>;

export const useSupabaseScripts = () => {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  const addScript = async (script: Omit<ScriptInsert, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('scripts')
        .insert([script])
        .select()
        .single();
      
      if (error) throw error;
      
      await fetchScripts(); // Refresh the list
      return data;
    } catch (error) {
      console.error('Error adding script:', error);
      throw error;
    }
  };

  const updateScript = async (id: string, updates: Partial<Script>) => {
    try {
      const { error } = await supabase
        .from('scripts')
        .update(updates)
        .eq('id', id);
      
      if (error) throw error;
      
      await fetchScripts(); // Refresh the list
    } catch (error) {
      console.error('Error updating script:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchScripts();
  }, []);

  return {
    scripts,
    loading,
    addScript,
    updateScript,
    refetch: fetchScripts
  };
};
