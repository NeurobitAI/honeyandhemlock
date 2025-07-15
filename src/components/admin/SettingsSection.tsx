
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Settings, DollarSign, Mail, Globe, Shield, FileText } from 'lucide-react';

const SettingsSection = () => {
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');
      
      if (error) throw error;
      
      const settingsMap = {};
      data.forEach(setting => {
        settingsMap[setting.setting_key] = setting.setting_value;
      });
      
      setSettings(settingsMap);
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: "Error",
        description: "Failed to fetch settings",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key: string, value: any) => {
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          setting_key: key,
          setting_value: value,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      setSettings(prev => ({
        ...prev,
        [key]: value
      }));

      toast({
        title: "Success",
        description: "Setting updated successfully",
      });
    } catch (error) {
      console.error('Error updating setting:', error);
      toast({
        title: "Error",
        description: "Failed to update setting",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div className="text-white">Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-[#282828] border-none">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            System Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pricing" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="site">Site</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="general">General</TabsTrigger>
            </TabsList>

            <TabsContent value="pricing" className="space-y-4">
              <Card className="bg-[#232323] border-gray-600">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Tier Pricing Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-white">Tier 1 Price ($)</Label>
                      <Input
                        type="number"
                        value={settings.tier_1_price || ''}
                        onChange={(e) => updateSetting('tier_1_price', e.target.value)}
                        className="bg-[#282828] text-white border-gray-600"
                      />
                    </div>
                    <div>
                      <Label className="text-white">Tier 2 Price ($)</Label>
                      <Input
                        type="number"
                        value={settings.tier_2_price || ''}
                        onChange={(e) => updateSetting('tier_2_price', e.target.value)}
                        className="bg-[#282828] text-white border-gray-600"
                      />
                    </div>
                    <div>
                      <Label className="text-white">Tier 3 Price ($)</Label>
                      <Input
                        type="number"
                        value={settings.tier_3_price || ''}
                        onChange={(e) => updateSetting('tier_3_price', e.target.value)}
                        className="bg-[#282828] text-white border-gray-600"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-white">Additional Page Fee ($)</Label>
                    <Input
                      type="number"
                      value={settings.additional_page_fee || ''}
                      onChange={(e) => updateSetting('additional_page_fee', e.target.value)}
                      className="bg-[#282828] text-white border-gray-600"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Tier 1 Description</Label>
                    <Textarea
                      value={settings.tier_1_description || ''}
                      onChange={(e) => updateSetting('tier_1_description', e.target.value)}
                      className="bg-[#282828] text-white border-gray-600"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label className="text-white">Tier 2 Description</Label>
                    <Textarea
                      value={settings.tier_2_description || ''}
                      onChange={(e) => updateSetting('tier_2_description', e.target.value)}
                      className="bg-[#282828] text-white border-gray-600"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label className="text-white">Tier 3 Description</Label>
                    <Textarea
                      value={settings.tier_3_description || ''}
                      onChange={(e) => updateSetting('tier_3_description', e.target.value)}
                      className="bg-[#282828] text-white border-gray-600"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments" className="space-y-4">
              <Card className="bg-[#232323] border-gray-600">
                <CardHeader>
                  <CardTitle className="text-white">Payment Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-white">Processing Fee (%)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={settings.processing_fee || ''}
                      onChange={(e) => updateSetting('processing_fee', e.target.value)}
                      className="bg-[#282828] text-white border-gray-600"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Tax Rate (%)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={settings.tax_rate || ''}
                      onChange={(e) => updateSetting('tax_rate', e.target.value)}
                      className="bg-[#282828] text-white border-gray-600"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Default Currency</Label>
                    <Input
                      value={settings.default_currency || 'USD'}
                      onChange={(e) => updateSetting('default_currency', e.target.value)}
                      className="bg-[#282828] text-white border-gray-600"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="email" className="space-y-4">
              <Card className="bg-[#232323] border-gray-600">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-white">Support Email</Label>
                    <Input
                      type="email"
                      value={settings.support_email || ''}
                      onChange={(e) => updateSetting('support_email', e.target.value)}
                      className="bg-[#282828] text-white border-gray-600"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={settings.email_notifications_enabled}
                      onCheckedChange={(checked) => updateSetting('email_notifications_enabled', checked)}
                    />
                    <Label className="text-white">Enable Email Notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={settings.judge_assignment_emails}
                      onCheckedChange={(checked) => updateSetting('judge_assignment_emails', checked)}
                    />
                    <Label className="text-white">Judge Assignment Emails</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={settings.review_completion_emails}
                      onCheckedChange={(checked) => updateSetting('review_completion_emails', checked)}
                    />
                    <Label className="text-white">Review Completion Emails</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="site" className="space-y-4">
              <Card className="bg-[#232323] border-gray-600">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    Site Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-white">Site Title</Label>
                    <Input
                      value={settings.site_title || ''}
                      onChange={(e) => updateSetting('site_title', e.target.value)}
                      className="bg-[#282828] text-white border-gray-600"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={settings.maintenance_mode}
                      onCheckedChange={(checked) => updateSetting('maintenance_mode', checked)}
                    />
                    <Label className="text-white">Maintenance Mode</Label>
                  </div>
                  <div>
                    <Label className="text-white">Max File Size (MB)</Label>
                    <Input
                      type="number"
                      value={settings.max_file_size || '10'}
                      onChange={(e) => updateSetting('max_file_size', e.target.value)}
                      className="bg-[#282828] text-white border-gray-600"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="permissions" className="space-y-4">
              <Card className="bg-[#232323] border-gray-600">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    User Permissions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={settings.public_judge_signup}
                      onCheckedChange={(checked) => updateSetting('public_judge_signup', checked)}
                    />
                    <Label className="text-white">Allow Public Judge Signup</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={settings.auto_judge_approval}
                      onCheckedChange={(checked) => updateSetting('auto_judge_approval', checked)}
                    />
                    <Label className="text-white">Auto-approve Judge Applications</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="general" className="space-y-4">
              <Card className="bg-[#232323] border-gray-600">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    General Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-white">Terms of Service URL</Label>
                    <Input
                      value={settings.terms_url || ''}
                      onChange={(e) => updateSetting('terms_url', e.target.value)}
                      className="bg-[#282828] text-white border-gray-600"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Privacy Policy URL</Label>
                    <Input
                      value={settings.privacy_url || ''}
                      onChange={(e) => updateSetting('privacy_url', e.target.value)}
                      className="bg-[#282828] text-white border-gray-600"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Contact Phone</Label>
                    <Input
                      value={settings.contact_phone || ''}
                      onChange={(e) => updateSetting('contact_phone', e.target.value)}
                      className="bg-[#282828] text-white border-gray-600"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsSection;
