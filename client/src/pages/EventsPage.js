import React, { useState, useEffect } from 'react';
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
  Info,
  CalendarX
} from 'lucide-react';

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Load events from localStorage (managed by admin)
    const storedEvents = localStorage.getItem('admin_events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  // Filter events based on tab, search, and city
  const filteredEvents = events.filter(event => {
    const matchesTab = activeTab === 'all' || event.status === activeTab;
    const matchesSearch = searchTerm === '' || 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === '' || event.city === selectedCity;
    return matchesTab && matchesSearch && matchesCity;
  });

  // Cities for filtering (can be made dynamic)
  const cities = [
    { value: '', label: 'All Cities' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Chennai', label: 'Chennai' },
    { value: 'Bangalore', label: 'Bangalore' },
    { value: 'Kolkata', label: 'Kolkata' }
  ];

  // Event types configuration
  const eventTypes = [
    { type: 'exhibition', icon: '🏛️', color: 'bg-blue-100 text-blue-600' },
    { type: 'meetup', icon: '🤝', color: 'bg-green-100 text-green-600' },
    { type: 'convention', icon: '🎪', color: 'bg-purple-100 text-purple-600' },
    { type: 'auction', icon: '🔨', color: 'bg-orange-100 text-orange-600' },
    { type: 'workshop', icon: '🎓', color: 'bg-indigo-100 text-indigo-600' }
  ];

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

  // Tab configuration
  const tabs = [
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'past', label: 'Past Events' },
    { id: 'all', label: 'All Events' }
  ];

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
              Discover philatelic events, exhibitions and meetups
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8">
          {tabs.map((tab) => (
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
          {filteredEvents.length > 0 ? filteredEvents.map((event) => {
            const typeInfo = getEventTypeInfo(event.type);
            const attendancePercentage = (event.currentAttendees / event.maxAttendees) * 100;
            
            return (
              <div key={event.id} className="card card-hover">
                <div className="p-6">
                  {/* Event Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${typeInfo.color}`}>
                        <span className="text-xl">{typeInfo.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-secondary-900 mb-1">
                          {event.title}
                        </h3>
                        <p className="text-sm text-secondary-600">
                          by {event.organizer}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-secondary-900">
                        {formatDate(event.date)}
                      </div>
                      <div className="text-xs text-secondary-500">
                        {getDaysUntilEvent(event.date)}
                      </div>
                    </div>
                  </div>

                  {/* Event Details */}
                  <p className="text-secondary-600 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Event Info */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center space-x-2 text-secondary-600">
                      <Calendar className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-secondary-600">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{event.venue}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-secondary-600">
                      <Users className="w-4 h-4" />
                      <span>{event.currentAttendees}/{event.maxAttendees} attending</span>
                    </div>
                    <div className="flex items-center space-x-2 text-secondary-600">
                      <MapPin className="w-4 h-4" />
                      <span>{event.city}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {event.features?.slice(0, 3).map((feature, index) => (
                        <span key={index} className="badge-secondary text-xs">
                          {feature}
                        </span>
                      ))}
                      {event.features?.length > 3 && (
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
          }) : (
            <div className="col-span-2">
              <div className="card">
                <div className="card-body text-center py-12">
                  <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CalendarX className="w-12 h-12 text-secondary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                    No events yet
                  </h3>
                  <p className="text-secondary-600">
                    Events will be published by the admin and appear here.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

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
                  {events.reduce((sum, e) => sum + (e.currentAttendees || 0), 0)}
                </p>
                <p className="text-sm text-secondary-600">Total Attendees</p>
              </div>
            </div>
            
            <div className="card">
              <div className="card-body text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-secondary-900">
                  {new Set(events.map(e => e.city)).size}
                </p>
                <p className="text-sm text-secondary-600">Cities</p>
              </div>
            </div>
            
            <div className="card">
              <div className="card-body text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-secondary-900">
                  {events.filter(e => e.status === 'past').length}
                </p>
                <p className="text-sm text-secondary-600">Past Events</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;