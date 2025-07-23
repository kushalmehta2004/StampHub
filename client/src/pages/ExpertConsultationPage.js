import React, { useState, useEffect } from 'react';
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
  Plus,
  UserCheck
} from 'lucide-react';

const ExpertConsultationPage = () => {
  const [activeTab, setActiveTab] = useState('experts');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('');
  const [experts, setExperts] = useState([]);
  const [consultations, setConsultations] = useState([]);

  useEffect(() => {
    // Load experts from localStorage (managed by admin)
    const storedExperts = localStorage.getItem('admin_experts');
    if (storedExperts) {
      setExperts(JSON.parse(storedExperts));
    }

    // Load consultations from localStorage
    const storedConsultations = localStorage.getItem('user_consultations');
    if (storedConsultations) {
      setConsultations(JSON.parse(storedConsultations));
    }
  }, []);

  // Filter experts based on search and expertise
  const filteredExperts = experts.filter(expert => {
    const matchesSearch = searchTerm === '' || 
      expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesExpertise = selectedExpertise === '' || 
      expert.expertise.includes(selectedExpertise);
    
    return matchesSearch && matchesExpertise;
  });

  // Get unique expertise areas for filter
  const expertiseAreas = [...new Set(experts.flatMap(expert => expert.expertise))];

  const tabs = [
    { id: 'experts', label: 'Find Experts', icon: User },
    { id: 'consultations', label: 'My Consultations', icon: MessageSquare }
  ];

  const bookConsultation = (expertId) => {
    const expert = experts.find(e => e.id === expertId);
    if (expert) {
      const newConsultation = {
        id: Date.now().toString(),
        expertId: expertId,
        expertName: expert.name,
        expertAvatar: expert.avatar,
        status: 'scheduled',
        scheduledDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        type: 'video',
        topic: 'General Consultation',
        amount: expert.hourlyRate,
        createdAt: new Date().toISOString()
      };

      const updatedConsultations = [...consultations, newConsultation];
      setConsultations(updatedConsultations);
      localStorage.setItem('user_consultations', JSON.stringify(updatedConsultations));
      
      alert('Consultation booked successfully!');
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
            Connect with certified philatelic experts for authentication, valuation, and guidance
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
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
                <IconComponent className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {activeTab === 'experts' && (
          <>
            {/* Search and Filters */}
            <div className="card mb-6">
              <div className="card-body">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search experts by name, title, or expertise..."
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
                      <option value="">All Expertise</option>
                      {expertiseAreas.map(area => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Experts Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {filteredExperts.length > 0 ? filteredExperts.map((expert) => (
                <div key={expert.id} className="card card-hover">
                  <div className="p-6">
                    {/* Expert Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center text-2xl">
                            {expert.avatar}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                            expert.status === 'online' ? 'bg-green-500' : 
                            expert.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-400'
                          }`}></div>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-secondary-900 mb-1">
                            {expert.name}
                          </h3>
                          <p className="text-secondary-600 text-sm mb-2">
                            {expert.title}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-secondary-600">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="font-medium">{expert.rating}</span>
                              <span>({expert.reviewCount} reviews)</span>
                            </div>
                            <span>{expert.experience} years exp.</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary-600">
                          ₹{expert.hourlyRate}/hr
                        </div>
                        <div className="text-sm text-secondary-600">
                          {expert.availability}
                        </div>
                      </div>
                    </div>

                    {/* Expertise */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-secondary-900 mb-2">Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {expert.expertise.map((skill, index) => (
                          <span key={index} className="badge-secondary text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="mb-4">
                      <p className="text-secondary-600 text-sm line-clamp-2">
                        {expert.bio}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-secondary-900">
                          {expert.consultations}
                        </div>
                        <div className="text-xs text-secondary-600">Consultations</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-secondary-900">
                          {expert.rating}
                        </div>
                        <div className="text-xs text-secondary-600">Rating</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-secondary-900">
                          {expert.experience}
                        </div>
                        <div className="text-xs text-secondary-600">Years</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-secondary-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{expert.languages.join(', ')}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="btn-outline btn-sm">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Message
                        </button>
                        <button 
                          className="btn-primary btn-sm"
                          onClick={() => bookConsultation(expert.id)}
                        >
                          <Video className="w-4 h-4 mr-1" />
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="col-span-2">
                  <div className="card">
                    <div className="card-body text-center py-12">
                      <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <UserCheck className="w-12 h-12 text-secondary-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                        No experts available yet
                      </h3>
                      <p className="text-secondary-600">
                        Expert profiles will be added by the admin and appear here.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'consultations' && (
          <div className="space-y-6">
            {consultations.length > 0 ? consultations.map((consultation) => (
              <div key={consultation.id} className="card">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center text-xl">
                        {consultation.expertAvatar}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-secondary-900">
                          {consultation.expertName}
                        </h3>
                        <p className="text-secondary-600 text-sm">
                          {consultation.topic}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        consultation.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                        consultation.status === 'completed' ? 'bg-green-100 text-green-800' :
                        consultation.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {consultation.status}
                      </div>
                      <div className="text-sm text-secondary-600 mt-1">
                        {new Date(consultation.scheduledDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-secondary-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(consultation.scheduledDate).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Video className="w-4 h-4" />
                        <span className="capitalize">{consultation.type}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-primary-600">
                        ₹{consultation.amount}
                      </span>
                      {consultation.status === 'scheduled' && (
                        <button className="btn-primary btn-sm">
                          <Video className="w-4 h-4 mr-1" />
                          Join
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="card">
                <div className="card-body text-center py-12">
                  <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-12 h-12 text-secondary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                    No consultations yet
                  </h3>
                  <p className="text-secondary-600 mb-4">
                    Book your first expert consultation to get started.
                  </p>
                  <button 
                    className="btn-primary"
                    onClick={() => setActiveTab('experts')}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Find Experts
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpertConsultationPage;