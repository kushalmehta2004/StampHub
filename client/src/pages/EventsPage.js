import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users,
  Ticket,
  Star,
  Search,
  Filter,
  Plus,
  Share2,
  Bookmark,
  ExternalLink,
  Award,
  Info
} from 'lucide-react';

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Sample events data
  const events = [
    {
      id: '1',
      title: 'National Philatelic Exhibition 2024',
      description: 'The largest philatelic exhibition in India featuring rare stamps, first day covers, and postal history.',
      type: 'exhibition',
      date: '2024-03-15',
      endDate: '2024-03-17',
      time: '10:00 AM - 6:00 PM',
      venue: 'Pragati Maidan, New Delhi',
      city: 'Delhi',
      organizer: 'India Post & Philatelic Society of India',
      registrationFee: 500,
      maxAttendees: 5000,
      currentAttendees: 2847,
      status: 'upcoming',
      image: '🏛️',
      features: ['Rare stamp displays', 'Expert talks', 'Trading floor', 'Workshops'],
      tags: ['exhibition', 'national', 'delhi', 'rare-stamps']
    },
    {
      id: '2',
      title: 'Collectors\' Meet & Swap - Mumbai',
      description: 'Monthly collectors meet where enthusiasts can trade, share knowledge, and discover new additions.',
      type: 'meetup',
      date: '2024-02-10',
      time: '3:00 PM - 7:00 PM',
      venue: 'Mumbai Philatelic Society Hall',
      city: 'Mumbai',
      organizer: 'Mumbai Collectors Club',
      registrationFee: 100,
      maxAttendees: 150,
      currentAttendees: 89,
      status: 'upcoming',
      image: '🤝',
      features: ['Stamp trading', 'Expert guidance', 'Networking', 'Refreshments'],
      tags: ['meetup', 'mumbai', 'trading', 'networking']
    },
    {
      id: '3',
      title: 'Gandhi Commemorative Stamps Symposium',
      description: 'Special symposium focusing on Gandhi commemorative stamps and their historical significance.',
      type: 'conference',
      date: '2024-02-25',
      time: '9:00 AM - 5:00 PM',
      venue: 'Indian Institute of Technology, Chennai',
      city: 'Chennai',
      organizer: 'Gandhi Memorial Philatelic Society',
      registrationFee: 750,
      maxAttendees: 300,
      currentAttendees: 156,
      status: 'upcoming',
      image: '🕊️',
      features: ['Expert lectures', 'Research presentations', 'Q&A sessions', 'Certificate'],
      tags: ['conference', 'gandhi', 'chennai', 'educational']
    },
    {
      id: '4',
      title: 'South India Philatelic Convention',
      description: 'Annual convention bringing together collectors from across South India.',
      type: 'convention',
      date: '2024-01-20',
      endDate: '2024-01-21',
      time: '9:00 AM - 6:00 PM',
      venue: 'Bangalore International Exhibition Centre',
      city: 'Bangalore',
      organizer: 'South India Philatelic Federation',
      registrationFee: 600,
      maxAttendees: 800,
      currentAttendees: 672,
      status: 'past',
      image: '🎪',
      features: ['Regional displays', 'Cultural programs', 'Awards ceremony', 'Food court'],
      tags: ['convention', 'south-india', 'bangalore', 'awards']
    }
  ];

  const cities = [
    { value: '', label: 'All Cities' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Chennai', label: 'Chennai' },
    { value: 'Bangalore', label: 'Bangalore' },
    { value: 'Kolkata', label: 'Kolkata' }
  ];

  const eventTypes = [
    { type: 'exhibition', icon: '🏛️', color: 'bg-blue-100 text-blue-600' },
    { type: 'meetup', icon: '🤝', color: 'bg-green-100 text-green-600' },
    { type: 'conference', icon: '🎓', color: 'bg-purple-100 text-purple-600' },
    { type: 'convention', icon: '🎪', color: 'bg-orange-100 text-orange-600' }
  ];

  const filteredEvents = events.filter(event => {
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'upcoming' && event.status === 'upcoming') ||
                      (activeTab === 'past' && event.status === 'past');
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = !selectedCity || event.city === selectedCity;
    return matchesTab && matchesSearch && matchesCity;
  });

  const getEventTypeInfo = (type) => {
    return eventTypes.find(t => t.type === type) || eventTypes[0];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysUntilEvent = (dateString) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Past event';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `${diffDays} days away`;
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">
              Events & Exhibitions
            </h1>
            <p className="text-secondary-600">
              Discover philatelic events, exhibitions, and meetups near you
            </p>
          </div>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-1 bg-white rounded-lg p-1 mb-6 w-fit">
          {[
            { id: 'upcoming', label: 'Upcoming Events' },
            { id: 'past', label: 'Past Events' },
            { id: 'all', label: 'All Events' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white'
                  : 'text-secondary-600 hover:text-secondary-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="card mb-6">
          <div className="card-body">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search events, venues, or cities..."
                  className="input pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full md:w-48">
                <select
                  className="input w-full"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  {cities.map(city => (
                    <option key={city.value} value={city.value}>
                      {city.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredEvents.map((event) => {
            const typeInfo = getEventTypeInfo(event.type);
            const attendancePercentage = (event.currentAttendees / event.maxAttendees) * 100;
            
            return (
              <div key={event.id} className="card card-hover">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-accent-100 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">{event.image}</span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}>
                            {event.type}
                          </span>
                          {event.status === 'upcoming' && (
                            <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">
                              {getDaysUntilEvent(event.date)}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-secondary-900 hover:text-primary-600 cursor-pointer">
                          {event.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button className="p-1 text-secondary-600 hover:text-primary-600">
                        <Bookmark className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-secondary-600 hover:text-primary-600">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-secondary-600 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-secondary-600">
                      <Calendar className="w-4 h-4 mr-2 text-primary-600" />
                      <span>
                        {formatDate(event.date)}
                        {event.endDate && ` - ${formatDate(event.endDate)}`}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-secondary-600">
                      <Clock className="w-4 h-4 mr-2 text-primary-600" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-secondary-600">
                      <MapPin className="w-4 h-4 mr-2 text-primary-600" />
                      <span>{event.venue}, {event.city}</span>
                    </div>
                    <div className="flex items-center text-sm text-secondary-600">
                      <Users className="w-4 h-4 mr-2 text-primary-600" />
                      <span>{event.organizer}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {event.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="badge-secondary text-xs">
                          {feature}
                        </span>
                      ))}
                      {event.features.length > 3 && (
                        <span className="badge-secondary text-xs">
                          +{event.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Attendance & Registration */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-secondary-600">Attendance</span>
                        <span className="text-secondary-900 font-medium">
                          {event.currentAttendees} / {event.maxAttendees}
                        </span>
                      </div>
                      <div className="w-full bg-secondary-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(attendancePercentage, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-sm text-secondary-600">
                        <Ticket className="w-4 h-4" />
                        <span>₹{event.registrationFee}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="btn-outline btn-sm">
                          <Info className="w-4 h-4 mr-1" />
                          Details
                        </button>
                        {event.status === 'upcoming' && (
                          <button className="btn-primary btn-sm">
                            <Ticket className="w-4 h-4 mr-1" />
                            Register
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredEvents.length === 0 && (
          <div className="card">
            <div className="card-body text-center py-12">
              <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-12 h-12 text-secondary-400" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                No events found
              </h3>
              <p className="text-secondary-600 mb-4">
                {searchTerm || selectedCity 
                  ? 'Try adjusting your search criteria.'
                  : `No ${activeTab} events at the moment. Check back later for updates.`
                }
              </p>
              <button className="btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Create New Event
              </button>
            </div>
          </div>
        )}

        {/* Event Statistics */}
        {filteredEvents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            <div className="card">
              <div className="card-body text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-secondary-900">
                  {events.filter(e => e.status === 'upcoming').length}
                </p>
                <p className="text-sm text-secondary-600">Upcoming Events</p>
              </div>
            </div>
            <div className="card">
              <div className="card-body text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-secondary-900">
                  {events.reduce((sum, event) => sum + event.currentAttendees, 0)}
                </p>
                <p className="text-sm text-secondary-600">Total Attendees</p>
              </div>
            </div>
            <div className="card">
              <div className="card-body text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-secondary-900">
                  {new Set(events.map(e => e.city)).size}
                </p>
                <p className="text-sm text-secondary-600">Cities</p>
              </div>
            </div>
            <div className="card">
              <div className="card-body text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-secondary-900">
                  {eventTypes.length}
                </p>
                <p className="text-sm text-secondary-600">Event Types</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;