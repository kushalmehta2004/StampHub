import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  MapPin,
  ArrowRight,
  Check
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  const { register: registerUser, loading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    setError
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      // Remove confirmPassword from data before sending
      const { confirmPassword, ...userData } = data;
      
      await registerUser(userData);
      navigate('/dashboard');
    } catch (error) {
      if (error.response?.status === 409) {
        setError('email', { 
          type: 'manual', 
          message: 'Email already exists' 
        });
      }
    }
  };

  const nextStep = async () => {
    const fieldsToValidate = step === 1 
      ? ['firstName', 'lastName', 'email', 'phone']
      : ['password', 'confirmPassword'];
    
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-secondary-900">
            Join National Philately
          </h2>
          <p className="mt-2 text-secondary-600">
            Create your account to start collecting
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-4">
          <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-primary-600' : 'text-secondary-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary-600 text-white' : 'bg-secondary-200'}`}>
              {step > 1 ? <Check className="w-4 h-4" /> : '1'}
            </div>
            <span className="text-sm font-medium">Personal Info</span>
          </div>
          <div className={`w-8 h-0.5 ${step >= 2 ? 'bg-primary-600' : 'bg-secondary-200'}`}></div>
          <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-primary-600' : 'text-secondary-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary-600 text-white' : 'bg-secondary-200'}`}>
              {step > 2 ? <Check className="w-4 h-4" /> : '2'}
            </div>
            <span className="text-sm font-medium">Security</span>
          </div>
          <div className={`w-8 h-0.5 ${step >= 3 ? 'bg-primary-600' : 'bg-secondary-200'}`}></div>
          <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-primary-600' : 'text-secondary-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary-600 text-white' : 'bg-secondary-200'}`}>
              {step > 3 ? <Check className="w-4 h-4" /> : '3'}
            </div>
            <span className="text-sm font-medium">Address</span>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-2xl shadow-custom-lg p-8">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-secondary-900">Personal Information</h3>
                  <p className="text-sm text-secondary-600">Tell us about yourself</p>
                </div>

                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="label">
                    First Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-secondary-400" />
                    </div>
                    <input
                      id="firstName"
                      type="text"
                      className={`input pl-10 ${errors.firstName ? 'input-error' : ''}`}
                      placeholder="Enter your first name"
                      {...register('firstName', {
                        required: 'First name is required',
                        minLength: {
                          value: 2,
                          message: 'First name must be at least 2 characters'
                        }
                      })}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="error-text">{errors.firstName.message}</p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="label">
                    Last Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-secondary-400" />
                    </div>
                    <input
                      id="lastName"
                      type="text"
                      className={`input pl-10 ${errors.lastName ? 'input-error' : ''}`}
                      placeholder="Enter your last name"
                      {...register('lastName', {
                        required: 'Last name is required',
                        minLength: {
                          value: 2,
                          message: 'Last name must be at least 2 characters'
                        }
                      })}
                    />
                  </div>
                  {errors.lastName && (
                    <p className="error-text">{errors.lastName.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="label">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-secondary-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      className={`input pl-10 ${errors.email ? 'input-error' : ''}`}
                      placeholder="Enter your email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Please enter a valid email address'
                        }
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="error-text">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="label">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-secondary-400" />
                    </div>
                    <input
                      id="phone"
                      type="tel"
                      className={`input pl-10 ${errors.phone ? 'input-error' : ''}`}
                      placeholder="Enter your phone number"
                      {...register('phone', {
                        required: 'Phone number is required',
                        pattern: {
                          value: /^[6-9]\d{9}$/,
                          message: 'Please enter a valid 10-digit phone number'
                        }
                      })}
                    />
                  </div>
                  {errors.phone && (
                    <p className="error-text">{errors.phone.message}</p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-primary w-full"
                >
                  Continue
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            )}

            {/* Step 2: Security */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-secondary-900">Account Security</h3>
                  <p className="text-sm text-secondary-600">Create a secure password</p>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="label">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-secondary-400" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      className={`input pl-10 pr-10 ${errors.password ? 'input-error' : ''}`}
                      placeholder="Create a password"
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters'
                        },
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                          message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
                        }
                      })}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-secondary-400 hover:text-secondary-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-secondary-400 hover:text-secondary-600" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="error-text">{errors.password.message}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="label">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-secondary-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      className={`input pl-10 pr-10 ${errors.confirmPassword ? 'input-error' : ''}`}
                      placeholder="Confirm your password"
                      {...register('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: value =>
                          value === password || 'Passwords do not match'
                      })}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-secondary-400 hover:text-secondary-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-secondary-400 hover:text-secondary-600" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="error-text">{errors.confirmPassword.message}</p>
                  )}
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="btn-outline flex-1"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn-primary flex-1"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Address */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-secondary-900">Delivery Address</h3>
                  <p className="text-sm text-secondary-600">Where should we deliver your orders?</p>
                </div>

                {/* Street Address */}
                <div>
                  <label htmlFor="street" className="label">
                    Street Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-secondary-400" />
                    </div>
                    <input
                      id="street"
                      type="text"
                      className={`input pl-10 ${errors['address.street'] ? 'input-error' : ''}`}
                      placeholder="Enter your street address"
                      {...register('address.street', {
                        required: 'Street address is required'
                      })}
                    />
                  </div>
                  {errors['address.street'] && (
                    <p className="error-text">{errors['address.street'].message}</p>
                  )}
                </div>

                {/* City and State */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="label">
                      City
                    </label>
                    <input
                      id="city"
                      type="text"
                      className={`input ${errors['address.city'] ? 'input-error' : ''}`}
                      placeholder="City"
                      {...register('address.city', {
                        required: 'City is required'
                      })}
                    />
                    {errors['address.city'] && (
                      <p className="error-text">{errors['address.city'].message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="state" className="label">
                      State
                    </label>
                    <input
                      id="state"
                      type="text"
                      className={`input ${errors['address.state'] ? 'input-error' : ''}`}
                      placeholder="State"
                      {...register('address.state', {
                        required: 'State is required'
                      })}
                    />
                    {errors['address.state'] && (
                      <p className="error-text">{errors['address.state'].message}</p>
                    )}
                  </div>
                </div>

                {/* Pincode and Country */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="pincode" className="label">
                      Pincode
                    </label>
                    <input
                      id="pincode"
                      type="text"
                      className={`input ${errors['address.pincode'] ? 'input-error' : ''}`}
                      placeholder="Pincode"
                      {...register('address.pincode', {
                        required: 'Pincode is required',
                        pattern: {
                          value: /^[1-9][0-9]{5}$/,
                          message: 'Please enter a valid 6-digit pincode'
                        }
                      })}
                    />
                    {errors['address.pincode'] && (
                      <p className="error-text">{errors['address.pincode'].message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="country" className="label">
                      Country
                    </label>
                    <input
                      id="country"
                      type="text"
                      className="input"
                      value="India"
                      readOnly
                      {...register('address.country')}
                    />
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-3">
                  <input
                    id="terms"
                    type="checkbox"
                    className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                    {...register('acceptTerms', {
                      required: 'You must accept the terms and conditions'
                    })}
                  />
                  <label htmlFor="terms" className="text-sm text-secondary-700">
                    I agree to the{' '}
                    <Link to="/terms" className="text-primary-600 hover:text-primary-500 font-medium">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-primary-600 hover:text-primary-500 font-medium">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                {errors.acceptTerms && (
                  <p className="error-text">{errors.acceptTerms.message}</p>
                )}

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="btn-outline flex-1"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary flex-1"
                  >
                    {loading ? (
                      <LoadingSpinner size="sm" color="white" />
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Login Link */}
          {step === 1 && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-secondary-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-secondary-500">
                    Already have an account?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to="/login"
                  className="btn-outline w-full"
                >
                  Sign In Instead
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;