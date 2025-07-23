import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Save, 
  RefreshCw,
  Globe,
  Mail,
  CreditCard,
  Shield,
  Bell,
  Database,
  Server,
  Lock,
  Eye,
  EyeOff,
  Upload,
  Download,
  Trash2,
  Plus,
  Edit,
  Check,
  X,
  AlertTriangle,
  Info,
  Users,
  Package,
  DollarSign,
  Truck,
  FileText,
  Image,
  Key,
  Zap,
  BarChart3,
  MessageSquare,
  HelpCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPasswords, setShowPasswords] = useState({});

  // Sample settings data
  const defaultSettings = {
    general: {
      siteName: 'National Web Community of Philatelists',
      siteDescription: 'India\'s premier platform for philatelic enthusiasts and stamp collectors',
      siteUrl: 'https://philately.gov.in',
      adminEmail: 'admin@philately.gov.in',
      supportEmail: 'support@philately.gov.in',
      phone: '+91-11-2345-6789',
      address: 'Ministry of Communications, New Delhi, India',
      timezone: 'Asia/Kolkata',
      dateFormat: 'DD/MM/YYYY',
      currency: 'INR',
      language: 'en',
      maintenanceMode: false,
      registrationEnabled: true,
      guestCheckout: false,
      autoOrderConfirmation: true,
      requireEmailVerification: true,
      requirePhoneVerification: false,
      maxOrderItems: 50,
      sessionTimeout: 30
    },
    payment: {
      razorpayEnabled: true,
      razorpayKeyId: 'rzp_test_1234567890',
      razorpayKeySecret: '••••••••••••••••',
      paypalEnabled: false,
      paypalClientId: '',
      paypalClientSecret: '••••••••••••••••',
      upiEnabled: true,
      codEnabled: true,
      codCharges: 25,
      minOrderForFreeShipping: 500,
      taxRate: 18,
      autoRefund: true,
      refundProcessingDays: 7,
      paymentTimeout: 15,
      currency: 'INR',
      webhookUrl: 'https://philately.gov.in/webhooks/payment'
    },
    shipping: {
      domesticShipping: {
        enabled: true,
        freeShippingThreshold: 500,
        standardRate: 50,
        expressRate: 100,
        standardDeliveryDays: '5-7',
        expressDeliveryDays: '2-3'
      },
      internationalShipping: {
        enabled: true,
        baseRate: 200,
        ratePerKg: 500,
        deliveryDays: '10-15',
        restrictedCountries: ['Pakistan']
      },
      handlingFee: 10,
      packageWeight: 0.1,
      dimensionUnit: 'cm',
      weightUnit: 'kg',
      trackingEnabled: true,
      insuranceEnabled: true,
      signatureRequired: false
    },
    email: {
      provider: 'smtp',
      smtpHost: 'smtp.gov.in',
      smtpPort: 587,
      smtpUsername: 'noreply@philately.gov.in',
      smtpPassword: '••••••••••••••••',
      smtpEncryption: 'tls',
      fromName: 'Philately India',
      fromEmail: 'noreply@philately.gov.in',
      replyToEmail: 'support@philately.gov.in',
      emailTemplates: {
        welcome: 'Welcome to Philately India',
        orderConfirmation: 'Your order has been confirmed',
        shipping: 'Your order has been shipped',
        delivery: 'Your order has been delivered',
        newsletter: 'Philately Newsletter'
      },
      newsletter: {
        enabled: true,
        frequency: 'weekly',
        autoSubscribe: false
      }
    },
    security: {
      twoFactorAuth: false,
      sessionSecurity: 'high',
      passwordMinLength: 8,
      passwordRequireSpecial: true,
      passwordRequireNumbers: true,
      passwordRequireUppercase: true,
      loginAttempts: 5,
      lockoutDuration: 30,
      ipWhitelist: ['127.0.0.1'],
      apiRateLimit: 1000,
      sslRequired: true,
      dataEncryption: true,
      auditLogging: true,
      securityHeaders: true,
      contentSecurityPolicy: true,
      dataRetentionDays: 365,
      anonymizeData: true
    },
    notifications: {
      emailNotifications: {
        newOrder: true,
        orderCancellation: true,
        lowStock: true,
        newUser: true,
        systemAlerts: true,
        backupReports: true
      },
      smsNotifications: {
        enabled: false,
        provider: 'twilio',
        accountSid: '',
        authToken: '••••••••••••••••',
        fromNumber: ''
      },
      pushNotifications: {
        enabled: true,
        vapidPublicKey: '',
        vapidPrivateKey: '••••••••••••••••'
      },
      slackIntegration: {
        enabled: false,
        webhookUrl: '',
        channel: '#admin'
      }
    },
    analytics: {
      googleAnalytics: {
        enabled: true,
        trackingId: 'GA-123456789',
        ecommerceTracking: true
      },
      facebookPixel: {
        enabled: false,
        pixelId: ''
      },
      heatmapTracking: {
        enabled: false,
        provider: 'hotjar',
        siteId: ''
      },
      customEvents: true,
      dataRetention: 12,
      anonymizeIp: true,
      trackDownloads: true,
      trackOutboundLinks: true
    },
    backup: {
      automaticBackup: true,
      backupFrequency: 'daily',
      backupTime: '02:00',
      retentionDays: 30,
      backupLocation: 'cloud',
      cloudProvider: 'aws',
      encryptBackups: true,
      backupDatabase: true,
      backupFiles: true,
      backupNotifications: true,
      lastBackup: '2024-01-22T02:00:00Z',
      backupSize: '2.5 GB'
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'shipping', label: 'Shipping', icon: Truck },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'backup', label: 'Backup', icon: Database }
  ];

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setSettings(defaultSettings);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSettingChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleNestedSettingChange = (section, subsection, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [key]: value
        }
      }
    }));
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold">Site Information</h3>
        </div>
        <div className="card-body space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Site Name</label>
              <input
                type="text"
                className="input w-full"
                value={settings.general?.siteName || ''}
                onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Site URL</label>
              <input
                type="url"
                className="input w-full"
                value={settings.general?.siteUrl || ''}
                onChange={(e) => handleSettingChange('general', 'siteUrl', e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Site Description</label>
            <textarea
              className="input w-full h-20"
              value={settings.general?.siteDescription || ''}
              onChange={(e) => handleSettingChange('general', 'siteDescription', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Admin Email</label>
              <input
                type="email"
                className="input w-full"
                value={settings.general?.adminEmail || ''}
                onChange={(e) => handleSettingChange('general', 'adminEmail', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Support Email</label>
              <input
                type="email"
                className="input w-full"
                value={settings.general?.supportEmail || ''}
                onChange={(e) => handleSettingChange('general', 'supportEmail', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Timezone</label>
              <select
                className="input w-full"
                value={settings.general?.timezone || ''}
                onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
              >
                <option value="Asia/Kolkata">Asia/Kolkata</option>
                <option value="UTC">UTC</option>
                <option value="America/New_York">America/New_York</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Currency</label>
              <select
                className="input w-full"
                value={settings.general?.currency || ''}
                onChange={(e) => handleSettingChange('general', 'currency', e.target.value)}
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Language</label>
              <select
                className="input w-full"
                value={settings.general?.language || ''}
                onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="bn">Bengali</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold">Features & Permissions</h3>
        </div>
        <div className="card-body space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-secondary-700">User Registration</label>
                <input
                  type="checkbox"
                  className="toggle"
                  checked={settings.general?.registrationEnabled || false}
                  onChange={(e) => handleSettingChange('general', 'registrationEnabled', e.target.checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-secondary-700">Guest Checkout</label>
                <input
                  type="checkbox"
                  className="toggle"
                  checked={settings.general?.guestCheckout || false}
                  onChange={(e) => handleSettingChange('general', 'guestCheckout', e.target.checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-secondary-700">Maintenance Mode</label>
                <input
                  type="checkbox"
                  className="toggle"
                  checked={settings.general?.maintenanceMode || false}
                  onChange={(e) => handleSettingChange('general', 'maintenanceMode', e.target.checked)}
                />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-secondary-700">Email Verification Required</label>
                <input
                  type="checkbox"
                  className="toggle"
                  checked={settings.general?.requireEmailVerification || false}
                  onChange={(e) => handleSettingChange('general', 'requireEmailVerification', e.target.checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-secondary-700">Phone Verification Required</label>
                <input
                  type="checkbox"
                  className="toggle"
                  checked={settings.general?.requirePhoneVerification || false}
                  onChange={(e) => handleSettingChange('general', 'requirePhoneVerification', e.target.checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-secondary-700">Auto Order Confirmation</label>
                <input
                  type="checkbox"
                  className="toggle"
                  checked={settings.general?.autoOrderConfirmation || false}
                  onChange={(e) => handleSettingChange('general', 'autoOrderConfirmation', e.target.checked)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold">Payment Gateways</h3>
        </div>
        <div className="card-body space-y-6">
          {/* Razorpay */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">Razorpay</h4>
                  <p className="text-sm text-secondary-600">Accept payments via cards, UPI, wallets</p>
                </div>
              </div>
              <input
                type="checkbox"
                className="toggle"
                checked={settings.payment?.razorpayEnabled || false}
                onChange={(e) => handleSettingChange('payment', 'razorpayEnabled', e.target.checked)}
              />
            </div>
            {settings.payment?.razorpayEnabled && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Key ID</label>
                  <input
                    type="text"
                    className="input w-full"
                    value={settings.payment?.razorpayKeyId || ''}
                    onChange={(e) => handleSettingChange('payment', 'razorpayKeyId', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Key Secret</label>
                  <div className="relative">
                    <input
                      type={showPasswords.razorpaySecret ? 'text' : 'password'}
                      className="input w-full pr-10"
                      value={settings.payment?.razorpayKeySecret || ''}
                      onChange={(e) => handleSettingChange('payment', 'razorpayKeySecret', e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('razorpaySecret')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPasswords.razorpaySecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* PayPal */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">PayPal</h4>
                  <p className="text-sm text-secondary-600">International payments via PayPal</p>
                </div>
              </div>
              <input
                type="checkbox"
                className="toggle"
                checked={settings.payment?.paypalEnabled || false}
                onChange={(e) => handleSettingChange('payment', 'paypalEnabled', e.target.checked)}
              />
            </div>
          </div>

          {/* Cash on Delivery */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Cash on Delivery</h4>
                  <p className="text-sm text-secondary-600">Pay when you receive the order</p>
                </div>
              </div>
              <input
                type="checkbox"
                className="toggle"
                checked={settings.payment?.codEnabled || false}
                onChange={(e) => handleSettingChange('payment', 'codEnabled', e.target.checked)}
              />
            </div>
            {settings.payment?.codEnabled && (
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">COD Charges (₹)</label>
                <input
                  type="number"
                  className="input w-32"
                  value={settings.payment?.codCharges || 0}
                  onChange={(e) => handleSettingChange('payment', 'codCharges', parseInt(e.target.value))}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold">Payment Configuration</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Tax Rate (%)</label>
              <input
                type="number"
                className="input w-full"
                value={settings.payment?.taxRate || 0}
                onChange={(e) => handleSettingChange('payment', 'taxRate', parseFloat(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Free Shipping Threshold (₹)</label>
              <input
                type="number"
                className="input w-full"
                value={settings.payment?.minOrderForFreeShipping || 0}
                onChange={(e) => handleSettingChange('payment', 'minOrderForFreeShipping', parseInt(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Payment Timeout (minutes)</label>
              <input
                type="number"
                className="input w-full"
                value={settings.payment?.paymentTimeout || 15}
                onChange={(e) => handleSettingChange('payment', 'paymentTimeout', parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold">SMTP Configuration</h3>
        </div>
        <div className="card-body space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">SMTP Host</label>
              <input
                type="text"
                className="input w-full"
                value={settings.email?.smtpHost || ''}
                onChange={(e) => handleSettingChange('email', 'smtpHost', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">SMTP Port</label>
              <input
                type="number"
                className="input w-full"
                value={settings.email?.smtpPort || 587}
                onChange={(e) => handleSettingChange('email', 'smtpPort', parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Username</label>
              <input
                type="text"
                className="input w-full"
                value={settings.email?.smtpUsername || ''}
                onChange={(e) => handleSettingChange('email', 'smtpUsername', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPasswords.smtpPassword ? 'text' : 'password'}
                  className="input w-full pr-10"
                  value={settings.email?.smtpPassword || ''}
                  onChange={(e) => handleSettingChange('email', 'smtpPassword', e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('smtpPassword')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPasswords.smtpPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">From Name</label>
              <input
                type="text"
                className="input w-full"
                value={settings.email?.fromName || ''}
                onChange={(e) => handleSettingChange('email', 'fromName', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">From Email</label>
              <input
                type="email"
                className="input w-full"
                value={settings.email?.fromEmail || ''}
                onChange={(e) => handleSettingChange('email', 'fromEmail', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Encryption</label>
              <select
                className="input w-full"
                value={settings.email?.smtpEncryption || 'tls'}
                onChange={(e) => handleSettingChange('email', 'smtpEncryption', e.target.value)}
              >
                <option value="tls">TLS</option>
                <option value="ssl">SSL</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="btn-outline btn-sm">
              <Mail className="w-4 h-4 mr-2" />
              Test Email
            </button>
            <span className="text-sm text-secondary-600">Send a test email to verify configuration</span>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold">Newsletter Settings</h3>
        </div>
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-medium">Enable Newsletter</h4>
              <p className="text-sm text-secondary-600">Allow users to subscribe to newsletters</p>
            </div>
            <input
              type="checkbox"
              className="toggle"
              checked={settings.email?.newsletter?.enabled || false}
              onChange={(e) => handleNestedSettingChange('email', 'newsletter', 'enabled', e.target.checked)}
            />
          </div>

          {settings.email?.newsletter?.enabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Frequency</label>
                <select
                  className="input w-full"
                  value={settings.email?.newsletter?.frequency || 'weekly'}
                  onChange={(e) => handleNestedSettingChange('email', 'newsletter', 'frequency', e.target.value)}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={settings.email?.newsletter?.autoSubscribe || false}
                  onChange={(e) => handleNestedSettingChange('email', 'newsletter', 'autoSubscribe', e.target.checked)}
                />
                <label className="text-sm font-medium text-secondary-700">Auto-subscribe new users</label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">System Settings</h1>
            <p className="text-secondary-600 mt-1">Configure and manage all system settings</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="btn-outline btn-sm">
              <Download className="w-4 h-4 mr-2" />
              Export Config
            </button>
            <button 
              onClick={handleSaveSettings}
              disabled={isSaving}
              className="btn-primary"
            >
              {isSaving ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {isSaving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="card">
              <div className="card-body p-0">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500'
                          : 'text-secondary-600 hover:bg-secondary-50'
                      }`}
                    >
                      <tab.icon className="w-5 h-5 mr-3" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'general' && renderGeneralSettings()}
            {activeTab === 'payment' && renderPaymentSettings()}
            {activeTab === 'email' && renderEmailSettings()}
            {/* Add other tab renderers here */}
            
            {!['general', 'payment', 'email'].includes(activeTab) && (
              <div className="card">
                <div className="card-body text-center py-12">
                  <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-secondary-400" />
                  </div>
                  <h3 className="text-lg font-medium text-secondary-900 mb-2">
                    {tabs.find(tab => tab.id === activeTab)?.label} Settings
                  </h3>
                  <p className="text-secondary-600">
                    Settings for this section are coming soon.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;