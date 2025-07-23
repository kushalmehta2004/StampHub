import React, { useState } from 'react';
import { 
  MessageSquare, 
  Star, 
  Clock, 
  CheckCircle,
  Calendar,
  Video,
  Phone,
  User,
  Award,
  BookOpen,
  Search,
  Filter,
  Plus
} from 'lucide-react';

const ExpertConsultationPage = () => {
  const [activeTab, setActiveTab] = useState('experts');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('');

  // Sample experts data
  const experts = [
    {
      id: '1',
      name: 'Dr. Rajesh Kumar',
      title: 'Senior Philatelic Expert',
      avatar: '👨‍🏫',
      expertise: ['Authentication', 'Valuation', 'Indian Postal History'],
      experience: 25,
      rating: 4.9,
      reviewCount: 127,
      consultations: 450,
      hourlyRate: 1500,
      languages: ['English', 'Hindi'],
      availability: 'Available today',
      status: 'online',
      specialties: [
        'Rare stamp authentication',
        'Historical postal documentation',
        'Market valuation',
        'Collection appraisal'
      ],
      bio: 'With over 25 years in philatelic research, Dr. Kumar specializes in Indian postal history and rare stamp authentication.',
      certifications: ['Certified Philatelic Expert', 'APS Member', 'Research Scholar - Postal History']
    },
    {
      id: '2',
      name: 'Ms. Priya Sharma',
      title: 'Stamp Valuation Specialist',
      avatar: '👩‍💼',
      expertise: ['Market Analysis', 'Investment Advisory', 'First Day Covers'],
      experience: 15,
      rating: 4.8,
      reviewCount: 89,
      consultations: 320,
      hourlyRate: 1200,
      languages: ['English', 'Hindi', 'Marathi'],
      availability: 'Available tomorrow',
      status: 'busy',
      specialties: [
        'Investment guidance',
        'Market trend analysis',
        'Portfolio optimization',
        'FDC expertise'
      ],
      bio: 'Market analyst with extensive experience in philatelic investments and first day cover collections.',
      certifications: ['Market Research Certified', 'Investment Advisory License']
    },
    {
      id: '3',
      name: 'Prof. Anil Gupta',
      title: 'Heritage & Conservation Expert',
      avatar: '👨‍🔬',
      expertise: ['Conservation', 'Heritage Documentation', 'Research'],
      experience: 30,
      rating: 5.0,
      reviewCount: 156,
      consultations: 280,
      hourlyRate: 2000,
      languages: ['English', 'Hindi', 'Bengali'],
      availability: 'Available in 3 days',
      status: 'offline',
      specialties: [
        'Stamp preservation',
        'Heritage documentation',
        'Academic research',
        'Conservation techniques'
      ],
      bio: 'Professor of Postal History with expertise in conservation and heritage documentation of philatelic materials.',
      certifications: ['PhD in Postal History', 'Conservation Specialist', 'UNESCO Heritage Consultant']
    }
  ];

  const consultationTypes = [
    {
      type: 'authentication',
      title: 'Stamp Authentication',
      description: 'Verify authenticity of rare or valuable stamps',
      icon: '🔍',
      duration: '30-60 mins',
      priceRange: '₹1,000 - ₹2,500'
    },
    {
      type: 'valuation',
      title: 'Collection Valuation',
      description: 'Professional appraisal of your stamp collection',
      icon: '💰',
      duration: '45-90 mins',
      priceRange: '₹1,500 - ₹3,000'
    },
    {
      type: 'investment',
      title: 'Investment Advisory',
      description: 'Expert guidance on philatelic investments',
      icon: '📈',
      duration: '60 mins',
      priceRange: '₹1,200 - ₹2,000'
    },
    {
      type: 'research',
      title: 'Research Assistance',
      description: 'Help with philatelic research and documentation',
      icon: '📚',
      duration: '60-120 mins',
      priceRange: '₹1,500 - ₹4,000'
    }
  ];

  const myConsultations = [
    {
      id: '1',
      expertName: 'Dr. Rajesh Kumar',
      expertAvatar: '👨‍🏫',
      type: 'Authentication',
      scheduledDate: '2024-01-20',
      scheduledTime: '3:00 PM',
      status: 'upcoming',
      topic: 'Gandhi Commemorative Stamp Authentication',
      sessionType: 'video'
    },
    {
      id: '2',
      expertName: 'Ms. Priya Sharma',
      expertAvatar: '👩‍💼',
      type: 'Valuation',
      scheduledDate: '2024-01-15',
      scheduledTime: '2:00 PM',
      status: 'completed',
      topic: 'Wildlife Collection Appraisal',
      sessionType: 'chat',
      rating: 5,
      feedback: 'Excellent consultation. Very detailed analysis.'
    }
  ];

  const expertiseOptions = [
    { value: '', label: 'All Expertise' },
    { value: 'Authentication', label: 'Authentication' },
    { value: 'Valuation', label: 'Valuation' },
    { value: 'Market Analysis', label: 'Market Analysis' },
    { value: 'Conservation', label: 'Conservation' },
    { value: 'Research', label: 'Research' }
  ];

  const filteredExperts = experts.filter(expert => {
    const matchesSearch = expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesExpertise = !selectedExpertise || expert.expertise.includes(selectedExpertise);
    return matchesSearch && matchesExpertise;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-600';
      case 'busy':
        return 'bg-yellow-100 text-yellow-600';
      case 'offline':
        return 'bg-secondary-100 text-secondary-600';
      default:
        return 'bg-secondary-100 text-secondary-600';
    }
  };

  const getConsultationStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-600';
      case 'completed':
        return 'bg-green-100 text-green-600';
      case 'cancelled':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-secondary-100 text-secondary-600';
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            Expert Consultation
          </h1>
          <p className="text-secondary-600">
            Get professional advice from verified philatelic experts
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-1 bg-white rounded-lg p-1 mb-6 w-fit">
          {[
            { id: 'experts', label: 'Find Experts', icon: User },
            { id: 'consultations', label: 'My Consultations', icon: Calendar },
            { id: 'services', label: 'Services', icon: BookOpen }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white'
                    : 'text-secondary-600 hover:text-secondary-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Experts Tab */}
        {activeTab === 'experts' && (
          <div>
            {/* Search and Filters */}
            <div className="card mb-6">
              <div className="card-body">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search experts by name, expertise, or specialization..."
                      className="input pl-10 w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="w-full md:w-48">
                    <select
                      className="input w-full"
                      value={selectedExpertise}
                      onChange={(e) => setSelectedExpertise(e.target.value)}
                    >
                      {expertiseOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Experts Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {filteredExperts.map((expert) => (
                <div key={expert.id} className="card card-hover">
                  <div className="p-6">
                    {/* Expert Header */}
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                        {expert.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-lg font-semibold text-secondary-900">
                            {expert.name}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(expert.status)}`}>
                            {expert.status}
                          </span>
                        </div>
                        <p className="text-secondary-600 text-sm mb-2">{expert.title}</p>
                        <div className="flex items-center space-x-4 text-sm text-secondary-600">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span>{expert.rating} ({expert.reviewCount})</span>
                          </div>
                          <span>{expert.experience}+ years</span>
                          <span>{expert.consultations} consultations</span>
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-secondary-600 text-sm mb-4 line-clamp-2">
                      {expert.bio}
                    </p>

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {expert.expertise.map((skill, index) => (
                        <span key={index} className="badge-primary text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Specialties */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-secondary-900 mb-2">Specialties:</h4>
                      <ul className="text-sm text-secondary-600 space-y-1">
                        {expert.specialties.slice(0, 3).map((specialty, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span>{specialty}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Pricing and Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-secondary-200">
                      <div>
                        <p className="text-lg font-semibold text-secondary-900">
                          ₹{expert.hourlyRate}/hour
                        </p>
                        <p className="text-xs text-secondary-600">{expert.availability}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="btn-outline btn-sm">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Chat
                        </button>
                        <button className="btn-primary btn-sm">
                          <Calendar className="w-4 h-4 mr-1" />
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* My Consultations Tab */}
        {activeTab === 'consultations' && (
          <div>
            <div className="space-y-4">
              {myConsultations.map((consultation) => (
                <div key={consultation.id} className="card">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-lg">
                          {consultation.expertAvatar}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-secondary-900">
                            {consultation.topic}
                          </h3>
                          <p className="text-secondary-600 text-sm">
                            with {consultation.expertName} • {consultation.type}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConsultationStatusColor(consultation.status)}`}>
                        {consultation.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-sm text-secondary-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(consultation.scheduledDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{consultation.scheduledTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {consultation.sessionType === 'video' ? (
                            <Video className="w-4 h-4" />
                          ) : (
                            <MessageSquare className="w-4 h-4" />
                          )}
                          <span className="capitalize">{consultation.sessionType}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {consultation.status === 'upcoming' && (
                          <>
                            <button className="btn-outline btn-sm">Reschedule</button>
                            <button className="btn-primary btn-sm">Join Session</button>
                          </>
                        )}
                        {consultation.status === 'completed' && (
                          <button className="btn-outline btn-sm">View Details</button>
                        )}
                      </div>
                    </div>

                    {consultation.feedback && (
                      <div className="mt-4 p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">Rating: {consultation.rating}/5</span>
                        </div>
                        <p className="text-sm text-secondary-700">{consultation.feedback}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {myConsultations.length === 0 && (
              <div className="card">
                <div className="card-body text-center py-12">
                  <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-12 h-12 text-secondary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                    No consultations yet
                  </h3>
                  <p className="text-secondary-600 mb-4">
                    Book your first consultation with our expert philatelists.
                  </p>
                  <button 
                    onClick={() => setActiveTab('experts')}
                    className="btn-primary"
                  >
                    Find Experts
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div>
            <div className="grid md:grid-cols-2 gap-6">
              {consultationTypes.map((service) => (
                <div key={service.type} className="card card-hover">
                  <div className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-2xl">
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                          {service.title}
                        </h3>
                        <p className="text-secondary-600 mb-4">
                          {service.description}
                        </p>
                        <div className="flex items-center justify-between text-sm text-secondary-600 mb-4">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{service.duration}</span>
                          </div>
                          <span className="font-medium">{service.priceRange}</span>
                        </div>
                        <button className="btn-primary w-full">
                          Book Consultation
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* How it works */}
            <div className="card mt-8">
              <div className="card-header">
                <h2 className="text-xl font-semibold text-secondary-900">How Expert Consultation Works</h2>
              </div>
              <div className="card-body">
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Search className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="font-semibold text-secondary-900 mb-2">1. Find Expert</h3>
                    <p className="text-sm text-secondary-600">Browse and select from our verified experts</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Calendar className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="font-semibold text-secondary-900 mb-2">2. Book Session</h3>
                    <p className="text-sm text-secondary-600">Schedule at your convenient time</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Video className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="font-semibold text-secondary-900 mb-2">3. Get Consultation</h3>
                    <p className="text-sm text-secondary-600">Connect via video, audio, or chat</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="font-semibold text-secondary-900 mb-2">4. Get Report</h3>
                    <p className="text-sm text-secondary-600">Receive detailed consultation report</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpertConsultationPage;