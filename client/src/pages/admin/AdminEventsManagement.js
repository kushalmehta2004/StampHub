import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  MapPin,
  Users,
  Clock,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  Camera,
  Ticket,
  Globe,
  Phone,
  Mail,
  Share2,
  Download,
  MoreVertical,
  Bookmark,
  TrendingUp
} from 'lucide-react';

const AdminEventsManagement = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [sortBy, setSortBy] = useState('startDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Events data - will be fetched from API
  const sampleEvents = [];

  const eventTypes = [
    { value: '', label: 'All Types' },
    { value: 'exhibition', label: 'Exhibition' },
    { value: 'meetup', label: 'Meetup' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'conference', label: 'Conference' },
    { value: 'auction', label: 'Auction' },
    { value: 'seminar', label: 'Seminar' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'draft', label: 'Draft' }
  ];

  const cities = [
    { value: '', label: 'All Cities' },
    { value: 'New Delhi', label: 'New Delhi' },
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Bangalore', label: 'Bangalore' },
    { value: 'Chennai', label: 'Chennai' },
    { value: 'Kolkata', label: 'Kolkata' },
    { value: 'Online', label: 'Online' }
  ];

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setEvents(sampleEvents);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter and sort events
  const filteredEvents = events.filter(event => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !selectedType || event.type === selectedType;
    const matchesStatus = !selectedStatus || event.status === selectedStatus;
    const matchesCity = !selectedCity || event.city === selectedCity;
    
    return matchesSearch && matchesType && matchesStatus && matchesCity;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (sortBy === 'startDate') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-600';
      case 'ongoing':
        return 'bg-green-100 text-green-600';
      case 'completed':
        return 'bg-gray-100 text-gray-600';
      case 'cancelled':
        return 'bg-red-100 text-red-600';
      case 'draft':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'exhibition':
        return 'bg-purple-100 text-purple-600';
      case 'meetup':
        return 'bg-green-100 text-green-600';
      case 'workshop':
        return 'bg-blue-100 text-blue-600';
      case 'conference':
        return 'bg-indigo-100 text-indigo-600';
      case 'auction':
        return 'bg-orange-100 text-orange-600';
      case 'seminar':
        return 'bg-teal-100 text-teal-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Events Management</h1>
            <p className="text-secondary-600 mt-1">Manage philatelic events and activities</p>
          </div>
          <div className="flex items-center space-x-3">
            <Link to="/admin/events/analytics" className="btn-outline btn-sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </Link>
            <Link to="/admin/events/new" className="btn-primary btn-sm">
              <Plus className="w-4 h-4 mr-2" />
              New Event
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Total Events</p>
                  <p className="text-2xl font-bold text-secondary-900">{events.length || 0}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Upcoming</p>
                  <p className="text-2xl font-bold text-secondary-900">
                    {events.filter(e => e.status === 'upcoming').length || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Total Registrations</p>
                  <p className="text-2xl font-bold text-secondary-900">
                    {events.reduce((sum, e) => sum + (e.registeredCount || 0), 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Featured Events</p>
                  <p className="text-2xl font-bold text-secondary-900">
                    {events.filter(e => e.featured).length || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="card mb-8">
          <div className="card-body">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-400" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="input-field min-w-[120px]"
                >
                  {eventTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="input-field min-w-[120px]"
                >
                  {statusOptions.map(status => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
                
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="input-field min-w-[120px]"
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

        {/* Events Table */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-secondary-200">
                  <th className="text-left py-4 px-6 font-semibold text-secondary-900">Event</th>
                  <th className="text-left py-4 px-6 font-semibold text-secondary-900">Type</th>
                  <th className="text-left py-4 px-6 font-semibold text-secondary-900">Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-secondary-900">Location</th>
                  <th className="text-left py-4 px-6 font-semibold text-secondary-900">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-secondary-900">Registrations</th>
                  <th className="text-left py-4 px-6 font-semibold text-secondary-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedEvents.length === 0 && !isLoading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-12">
                      <div className="flex flex-col items-center">
                        <Calendar className="w-12 h-12 text-secondary-400 mb-4" />
                        <h3 className="text-lg font-medium text-secondary-900 mb-2">No events found</h3>
                        <p className="text-secondary-600">Create your first event to get started.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  sortedEvents.map((event) => (
                    <tr key={event.id} className="border-b border-secondary-100 hover:bg-secondary-50">
                      <td className="py-4 px-6">
                        <div>
                          <h3 className="font-medium text-secondary-900 mb-1">{event.title}</h3>
                          <p className="text-sm text-secondary-600 line-clamp-2">{event.description}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(event.type)}`}>
                          {event.type}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="text-sm text-secondary-900">
                            {new Date(event.startDate).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-secondary-600">
                            {event.startTime} - {event.endTime}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="text-sm text-secondary-900">{event.venue}</p>
                          <p className="text-xs text-secondary-600">{event.city}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(event.status)}`}>
                          {event.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="text-sm text-secondary-900">
                            {event.registeredCount || 0} / {event.capacity || 0}
                          </p>
                          {event.waitlistCount > 0 && (
                            <p className="text-xs text-secondary-600">
                              +{event.waitlistCount} waitlist
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button className="btn-outline btn-xs">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </button>
                          <button className="btn-outline btn-xs">
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEventsManagement;