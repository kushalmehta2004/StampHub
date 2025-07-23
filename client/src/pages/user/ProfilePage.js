import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Lock, 
  Wallet,
  Plus,
  Eye,
  EyeOff,
  Save
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { user, updateProfile, changePassword } = useAuth();

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors }
  } = useForm({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      pincode: user?.address?.pincode || '',
      country: user?.address?.country || 'India'
    }
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    watch,
    reset: resetPasswordForm
  } = useForm();

  const newPassword = watch('newPassword');

  const onProfileSubmit = async (data) => {
    setLoading(true);
    try {
      await updateProfile(data);
    } catch (error) {
      console.error('Profile update failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const onPasswordSubmit = async (data) => {
    setLoading(true);
    try {
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      });
      resetPasswordForm();
    } catch (error) {
      console.error('Password change failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile Information', icon: User },
    { id: 'password', label: 'Change Password', icon: Lock },
    { id: 'account', label: 'Deposit Account', icon: Wallet }
  ];

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            Profile Settings
          </h1>
          <p className="text-secondary-600">
            Manage your account information and preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="card-body">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-900">
                    {user?.firstName} {user?.lastName}
                  </h3>
                  <p className="text-sm text-secondary-600">{user?.email}</p>
                </div>

                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-primary-50 text-primary-600 border border-primary-200'
                            : 'text-secondary-600 hover:bg-secondary-50'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Information Tab */}
            {activeTab === 'profile' && (
              <div className="card">
                <div className="card-header">
                  <h2 className="text-xl font-semibold text-secondary-900">
                    Profile Information
                  </h2>
                </div>
                <div className="card-body">
                  <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-lg font-medium text-secondary-900 mb-4">
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="label">First Name</label>
                          <input
                            type="text"
                            className={`input ${profileErrors.firstName ? 'input-error' : ''}`}
                            {...registerProfile('firstName', {
                              required: 'First name is required'
                            })}
                          />
                          {profileErrors.firstName && (
                            <p className="error-text">{profileErrors.firstName.message}</p>
                          )}
                        </div>
                        <div>
                          <label className="label">Last Name</label>
                          <input
                            type="text"
                            className={`input ${profileErrors.lastName ? 'input-error' : ''}`}
                            {...registerProfile('lastName', {
                              required: 'Last name is required'
                            })}
                          />
                          {profileErrors.lastName && (
                            <p className="error-text">{profileErrors.lastName.message}</p>
                          )}
                        </div>
                        <div>
                          <label className="label">Email</label>
                          <input
                            type="email"
                            className={`input ${profileErrors.email ? 'input-error' : ''}`}
                            {...registerProfile('email', {
                              required: 'Email is required',
                              pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Invalid email address'
                              }
                            })}
                          />
                          {profileErrors.email && (
                            <p className="error-text">{profileErrors.email.message}</p>
                          )}
                        </div>
                        <div>
                          <label className="label">Phone</label>
                          <input
                            type="tel"
                            className={`input ${profileErrors.phone ? 'input-error' : ''}`}
                            {...registerProfile('phone', {
                              required: 'Phone is required',
                              pattern: {
                                value: /^[6-9]\d{9}$/,
                                message: 'Invalid phone number'
                              }
                            })}
                          />
                          {profileErrors.phone && (
                            <p className="error-text">{profileErrors.phone.message}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Address Information */}
                    <div>
                      <h3 className="text-lg font-medium text-secondary-900 mb-4">
                        Address Information
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="label">Street Address</label>
                          <input
                            type="text"
                            className={`input ${profileErrors.street ? 'input-error' : ''}`}
                            {...registerProfile('street', {
                              required: 'Street address is required'
                            })}
                          />
                          {profileErrors.street && (
                            <p className="error-text">{profileErrors.street.message}</p>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="label">City</label>
                            <input
                              type="text"
                              className={`input ${profileErrors.city ? 'input-error' : ''}`}
                              {...registerProfile('city', {
                                required: 'City is required'
                              })}
                            />
                            {profileErrors.city && (
                              <p className="error-text">{profileErrors.city.message}</p>
                            )}
                          </div>
                          <div>
                            <label className="label">State</label>
                            <input
                              type="text"
                              className={`input ${profileErrors.state ? 'input-error' : ''}`}
                              {...registerProfile('state', {
                                required: 'State is required'
                              })}
                            />
                            {profileErrors.state && (
                              <p className="error-text">{profileErrors.state.message}</p>
                            )}
                          </div>
                          <div>
                            <label className="label">Pincode</label>
                            <input
                              type="text"
                              className={`input ${profileErrors.pincode ? 'input-error' : ''}`}
                              {...registerProfile('pincode', {
                                required: 'Pincode is required',
                                pattern: {
                                  value: /^[1-9][0-9]{5}$/,
                                  message: 'Invalid pincode'
                                }
                              })}
                            />
                            {profileErrors.pincode && (
                              <p className="error-text">{profileErrors.pincode.message}</p>
                            )}
                          </div>
                          <div>
                            <label className="label">Country</label>
                            <input
                              type="text"
                              className="input"
                              value="India"
                              readOnly
                              {...registerProfile('country')}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary"
                      >
                        {loading ? (
                          <LoadingSpinner size="sm" color="white" />
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Change Password Tab */}
            {activeTab === 'password' && (
              <div className="card">
                <div className="card-header">
                  <h2 className="text-xl font-semibold text-secondary-900">
                    Change Password
                  </h2>
                </div>
                <div className="card-body">
                  <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-6">
                    <div>
                      <label className="label">Current Password</label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? 'text' : 'password'}
                          className={`input pr-10 ${passwordErrors.currentPassword ? 'input-error' : ''}`}
                          {...registerPassword('currentPassword', {
                            required: 'Current password is required'
                          })}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-5 w-5 text-secondary-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-secondary-400" />
                          )}
                        </button>
                      </div>
                      {passwordErrors.currentPassword && (
                        <p className="error-text">{passwordErrors.currentPassword.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="label">New Password</label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          className={`input pr-10 ${passwordErrors.newPassword ? 'input-error' : ''}`}
                          {...registerPassword('newPassword', {
                            required: 'New password is required',
                            minLength: {
                              value: 8,
                              message: 'Password must be at least 8 characters'
                            }
                          })}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-5 w-5 text-secondary-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-secondary-400" />
                          )}
                        </button>
                      </div>
                      {passwordErrors.newPassword && (
                        <p className="error-text">{passwordErrors.newPassword.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="label">Confirm New Password</label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          className={`input pr-10 ${passwordErrors.confirmPassword ? 'input-error' : ''}`}
                          {...registerPassword('confirmPassword', {
                            required: 'Please confirm your new password',
                            validate: value =>
                              value === newPassword || 'Passwords do not match'
                          })}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5 text-secondary-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-secondary-400" />
                          )}
                        </button>
                      </div>
                      {passwordErrors.confirmPassword && (
                        <p className="error-text">{passwordErrors.confirmPassword.message}</p>
                      )}
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary"
                      >
                        {loading ? (
                          <LoadingSpinner size="sm" color="white" />
                        ) : (
                          <>
                            <Lock className="w-4 h-4 mr-2" />
                            Change Password
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Deposit Account Tab */}
            {activeTab === 'account' && (
              <div className="space-y-6">
                {/* Account Balance */}
                <div className="card">
                  <div className="card-header">
                    <h2 className="text-xl font-semibold text-secondary-900">
                      Account Balance
                    </h2>
                  </div>
                  <div className="card-body">
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Wallet className="w-8 h-8 text-primary-600" />
                      </div>
                      <p className="text-3xl font-bold text-primary-600 mb-2">
                        ₹{user?.depositAccount?.balance?.toFixed(2) || '0.00'}
                      </p>
                      <p className="text-secondary-600 mb-6">Available Balance</p>
                      <button className="btn-primary">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Funds
                      </button>
                    </div>
                  </div>
                </div>

                {/* Recent Transactions */}
                <div className="card">
                  <div className="card-header">
                    <h2 className="text-xl font-semibold text-secondary-900">
                      Recent Transactions
                    </h2>
                  </div>
                  <div className="card-body">
                    <div className="space-y-4">
                      {user?.depositAccount?.transactions?.slice(0, 5).map((transaction, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                            }`}>
                              {transaction.type === 'credit' ? (
                                <Plus className="w-4 h-4 text-green-600" />
                              ) : (
                                <Wallet className="w-4 h-4 text-red-600" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-secondary-900">
                                {transaction.description}
                              </p>
                              <p className="text-sm text-secondary-600">
                                {new Date(transaction.timestamp).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <span className={`font-semibold ${
                            transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                          </span>
                        </div>
                      )) || (
                        <div className="text-center py-8">
                          <p className="text-secondary-600">No transactions yet</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;