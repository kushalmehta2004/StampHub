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

  // Sample events data
  const sampleEvents = [
    {
      id: '1',
      title: 'National Philatelic Exhibition 2024',
      slug: 'national-philatelic-exhibition-2024',
      description: 'India\'s largest philatelic exhibition showcasing rare stamps and postal history.',
      type: 'exhibition',
      category: 'major',
      status: 'upcoming',
      startDate: '2024-03-15',
      endDate: '2024-03-20',
      startTime: '10:00',
      endTime: '18:00',
      venue: 'Pragati Maidan Exhibition Centre',
      address: 'Pragati Maidan, New Delhi, India',
      city: 'New Delhi',
      state: 'Delhi',
      country: 'India',
      latitude: 28.6139,
      longitude: 77.2090,
      organizer: 'India Post & Philatelic Society',
      contactEmail: 'info@nationalphilatelyexhibition.com',
      contactPhone: '+91-11-2345-6789',
      website: 'https://nationalphilatelyexhibition.com',
      registrationRequired: true,
      registrationFee: 500,
      capacity: 5000,
      registeredCount: 2340,
      waitlistCount: 45,
      featured: true,
      image: '/images/events/national-exhibition-2024.jpg',
      gallery: [
        '/images/events/exhibition-1.jpg',
        '/images/events/exhibition-2.jpg'
      ],
      tags: ['exhibition', 'national', 'stamps', 'postal-history'],
      agenda: [
        { time: '10:00', activity: 'Opening Ceremony' },
        { time: '11:00', activity: 'Rare Stamps Display' },
        { time: '14:00', activity: 'Expert Panel Discussion' },
        { time: '16:00', activity: 'Young Collectors Workshop' }
      ],
      speakers: [
        { name: 'Dr. Rajesh Kumar', title: 'Senior Philatelic Expert', bio: 'Expert in Indian postal history' },
        { name: 'Ms. Priya Sharma', title: 'Auction Specialist', bio: 'Leading stamp valuation expert' }
      ],
      sponsors: ['India Post', 'Philatelic Foundation', 'Heritage Stamps'],
      socialMedia: {
        facebook: 'https://facebook.com/event',
        twitter: 'https://twitter.com/event',
        instagram: 'https://instagram.com/event'
      },
      ticketTypes: [
        { name: 'General Entry', price: 100, available: true },
        { name: 'Premium Pass', price: 500, available: true },
        { name: 'Student Entry', price: 50, available: true }
      ],
      createdAt: '2024-01-10',
      updatedAt: '2024-01-22',
      publishedAt: '2024-01-15',
      isPublic: true,
      requiresApproval: false,
      views: 3200,
      bookmarks: 450,
      shares: 89
    },
    {
      id: '2',
      title: 'Mumbai Stamp Collectors Meetup',
      slug: 'mumbai-stamp-collectors-meetup',
      description: 'Monthly gathering of stamp collectors to share, trade, and discuss philatelic interests.',
      type: 'meetup',
      category: 'community',
      status: 'upcoming',
      startDate: '2024-02-10',
      endDate: '2024-02-10',
      startTime: '15:00',
      endTime: '18:00',
      venue: 'Mumbai Philatelic Society Hall',
      address: 'Fort, Mumbai, Maharashtra, India',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      latitude: 18.9320,
      longitude: 72.8310,
      organizer: 'Mumbai Philatelic Society',
      contactEmail: 'contact@mumbaiphilately.org',
      contactPhone: '+91-22-1234-5678',
      website: 'https://mumbaiphilately.org',
      registrationRequired: false,
      registrationFee: 0,
      capacity: 100,
      registeredCount: 67,
      waitlistCount: 0,
      featured: false,
      image: '/images/events/mumbai-meetup.jpg',
      gallery: [],
      tags: ['meetup', 'mumbai', 'collectors', 'trading'],
      agenda: [
        { time: '15:00', activity: 'Welcome & Introductions' },
        { time: '15:30', activity: 'Stamp Trading Session' },
        { time: '16:30', activity: 'Expert Talk: Valuation Tips' },
        { time: '17:30', activity: 'Group Discussion' }
      ],
      speakers: [
        { name: 'Anil Gupta', title: 'Local Expert', bio: 'Mumbai philatelic community leader' }
      ],
      sponsors: [],
      socialMedia: {},
      ticketTypes: [
        { name: 'Free Entry', price: 0, available: true }
      ],
      createdAt: '2024-01-08',
      updatedAt: '2024-01-20',
      publishedAt: '2024-01-12',
      isPublic: true,
      requiresApproval: false,
      views: 890,
      bookmarks: 125,
      shares: 23
    },
    {
      id: '3',
      title: 'Digital Philately Workshop',
      slug: 'digital-philately-workshop',
      description: 'Learn about digital cataloging, online trading, and modern philatelic tools.',
      type: 'workshop',
      category: 'educational',
      status: 'upcoming',
      startDate: '2024-02-25',
      endDate: '2024-02-25',
      startTime: '14:00',
      endTime: '17:00',
      venue: 'Online (Zoom)',
      address: 'Virtual Event',
      city: 'Online',
      state: 'Virtual',
      country: 'Global',
      latitude: null,
      longitude: null,
      organizer: 'Digital Philately Academy',
      contactEmail: 'workshops@digitalphilately.org',
      contactPhone: '+91-80-9876-5432',
      website: 'https://digitalphilately.org',
      registrationRequired: true,
      registrationFee: 299,
      capacity: 200,
      registeredCount: 156,
      waitlistCount: 12,
      featured: true,
      image: '/images/events/digital-workshop.jpg',
      gallery: [],
      tags: ['workshop', 'digital', 'online', 'technology'],
      agenda: [
        { time: '14:00', activity: 'Digital Cataloging Basics' },
        { time: '15:00', activity: 'Online Trading Platforms' },
        { time: '16:00', activity: 'Mobile Apps for Collectors' },
        { time: '16:30', activity: 'Q&A Session' }
      ],
      speakers: [
        { name: 'Tech Team Lead', title: 'Digital Platform Expert', bio: 'Specialist in philatelic technology' }
      ],
      sponsors: ['TechStamps', 'Digital Heritage'],
      socialMedia: {
        facebook: 'https://facebook.com/digitalworkshop',
        linkedin: 'https://linkedin.com/digitalworkshop'
      },
      ticketTypes: [
        { name: 'Workshop Access', price: 299, available: true },
        { name: 'Premium + Recording', price: 499, available: true }
      ],
      createdAt: '2024-01-12',
      updatedAt: '2024-01-21',
      publishedAt: '2024-01-16',
      isPublic: true,
      requiresApproval: false,
      views: 1560,
      bookmarks: 230,
      shares: 45
    },
    {
      id: '4',
      title: 'Bangalore Philatelic Conference 2024',
      slug: 'bangalore-philatelic-conference-2024',
      description: 'Annual conference featuring research presentations and networking opportunities.',
      type: 'conference',
      category: 'academic',
      status: 'draft',
      startDate: '2024-04-20',
      endDate: '2024-04-22',
      startTime: '09:00',
      endTime: '17:00',
      venue: 'IISc Campus Convention Center',
      address: 'Indian Institute of Science, Bangalore, Karnataka, India',
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      latitude: 13.0210,
      longitude: 77.5656,
      organizer: 'Karnataka Philatelic Association',
      contactEmail: 'conference@karnatakaphlilately.org',
      contactPhone: '+91-80-2345-6789',
      website: '',
      registrationRequired: true,
      registrationFee: 1500,
      capacity: 300,
      registeredCount: 0,
      waitlistCount: 0,
      featured: false,
      image: '/images/events/bangalore-conference.jpg',
      gallery: [],
      tags: ['conference', 'bangalore', 'research', 'academic'],
      agenda: [],
      speakers: [],
      sponsors: [],
      socialMedia: {},
      ticketTypes: [
        { name: 'Full Conference', price: 1500, available: false },
        { name: 'Single Day', price: 600, available: false },
        { name: 'Student Rate', price: 750, available: false }
      ],
      createdAt: '2024-01-18',
      updatedAt: '2024-01-22',
      publishedAt: null,
      isPublic: false,
      requiresApproval: true,
      views: 0,
      bookmarks: 0,
      shares: 0
    },
    {
      id: '5',
      title: 'Heritage Stamps Auction',
      slug: 'heritage-stamps-auction',
      description: 'Exclusive auction featuring rare Indian stamps and postal history items.',
      type: 'auction',
      category: 'commercial',
      status: 'completed',
      startDate: '2024-01-20',
      endDate: '2024-01-20',
      startTime: '11:00',
      endTime: '16:00',
      venue: 'Heritage Auction House',
      address: 'Connaught Place, New Delhi, India',
      city: 'New Delhi',
      state: 'Delhi',
      country: 'India',
      latitude: 28.6304,
      longitude: 77.2177,
      organizer: 'Heritage Auctions India',
      contactEmail: 'info@heritageauctions.in',
      contactPhone: '+91-11-4567-8901',
      website: 'https://heritageauctions.in',
      registrationRequired: true,
      registrationFee: 1000,
      capacity: 150,
      registeredCount: 145,
      waitlistCount: 8,
      featured: true,
      image: '/images/events/heritage-auction.jpg',
      gallery: [
        '/images/events/auction-1.jpg',
        '/images/events/auction-2.jpg',
        '/images/events/auction-3.jpg'
      ],
      tags: ['auction', 'heritage', 'rare-stamps', 'delhi'],
      agenda: [
        { time: '11:00', activity: 'Registration & Preview' },
        { time: '12:00', activity: 'Auction Begins' },
        { time: '15:00', activity: 'Payment & Collection' }
      ],
      speakers: [
        { name: 'Auction Expert', title: 'Chief Auctioneer', bio: 'Leading auction specialist' }
      ],
      sponsors: ['Heritage Foundation'],
      socialMedia: {
        facebook: 'https://facebook.com/heritageauction',
        instagram: 'https://instagram.com/heritageauction'
      },
      ticketTypes: [
        { name: 'Bidder Registration', price: 1000, available: false }
      ],
      createdAt: '2024-01-05',
      updatedAt: '2024-01-21',
      publishedAt: '2024-01-08',
      isPublic: true,
      requiresApproval: false,
      views: 4200,
      bookmarks: 320,
      shares: 156
    }
  ];

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
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = !selectedType || event.type === selectedType;
    const matchesStatus = !selectedStatus || event.status === selectedStatus;
    const matchesCity = !selectedCity || event.city === selectedCity;
    return matchesSearch && matchesType && matchesStatus && matchesCity;
  }).sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
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
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'upcoming':
        return <Calendar className="w-4 h-4" />;
      case 'ongoing':
        return <CheckCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      case 'draft':
        return <Edit className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const handleSelectAll = () => {
    if (selectedEvents.length === filteredEvents.length) {
      setSelectedEvents([]);
    } else {
      setSelectedEvents(filteredEvents.map(event => event.id));
    }
  };

  const handleSelectEvent = (eventId) => {
    if (selectedEvents.includes(eventId)) {
      setSelectedEvents(selectedEvents.filter(id => id !== eventId));
    } else {
      setSelectedEvents([...selectedEvents, eventId]);
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on events:`, selectedEvents);
    setSelectedEvents([]);
    setShowBulkActions(false);
  };

  const handleStatusChange = (eventId, newStatus) => {
    setEvents(events => 
      events.map(event => 
        event.id === eventId 
          ? { ...event, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] }
          : event
      )
    );
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events => events.filter(event => event.id !== eventId));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatDateRange = (startDate, endDate) => {
    if (startDate === endDate) {
      return formatDate(startDate);
    }
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  useEffect(() => {
    setShowBulkActions(selectedEvents.length > 0);
  }, [selectedEvents]);

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Events Management</h1>
            <p className="text-secondary-600 mt-1">Create and manage philatelic events and activities</p>
          </div>
          <div className="flex items-center space-x-3">
            <Link to="/admin/events/analytics" className="btn-outline btn-sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </Link>
            <Link to="/admin/events/calendar" className="btn-outline btn-sm">
              <Calendar className="w-4 h-4 mr-2" />
              Calendar View
            </Link>
            <Link to="/admin/events/new" className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Upcoming</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {events.filter(event => event.status === 'upcoming').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Ongoing</p>
                  <p className="text-2xl font-bold text-green-600">
                    {events.filter(event => event.status === 'ongoing').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Completed</p>
                  <p className="text-2xl font-bold text-gray-600">
                    {events.filter(event => event.status === 'completed').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-gray-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Draft</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {events.filter(event => event.status === 'draft').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Edit className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600 mb-1">Total Attendees</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {events.reduce((sum, event) => sum + event.registeredCount, 0).toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="card mb-6">
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="input pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <select 
                className="input"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {eventTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>

              <select 
                className="input"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {statusOptions.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>

              <select 
                className="input"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                {cities.map(city => (
                  <option key={city.value} value={city.value}>
                    {city.label}
                  </option>
                ))}
              </select>

              <select 
                className="input"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="startDate">Start Date</option>
                <option value="title">Title</option>
                <option value="registeredCount">Attendees</option>
                <option value="views">Views</option>
                <option value="createdAt">Created Date</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {showBulkActions && (
          <div className="card mb-6 bg-blue-50 border-blue-200">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-blue-900">
                    {selectedEvents.length} event(s) selected
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleBulkAction('publish')}
                    className="btn-outline btn-sm text-green-600 border-green-300 hover:bg-green-50"
                  >
                    Publish
                  </button>
                  <button 
                    onClick={() => handleBulkAction('draft')}
                    className="btn-outline btn-sm text-yellow-600 border-yellow-300 hover:bg-yellow-50"
                  >
                    Move to Draft
                  </button>
                  <button 
                    onClick={() => handleBulkAction('cancel')}
                    className="btn-outline btn-sm text-red-600 border-red-300 hover:bg-red-50"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => handleBulkAction('delete')}
                    className="btn-outline btn-sm text-red-600 border-red-300 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Events List */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-secondary-900">
                Events ({filteredEvents.length})
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="btn-outline btn-sm"
                >
                  {sortOrder === 'asc' ? '↑' : '↓'} Sort
                </button>
              </div>
            </div>
          </div>
          <div className="card-body p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : (
              <div className="space-y-4 p-6">
                {filteredEvents.map((event) => (
                  <div key={event.id} className="border border-secondary-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
                    <div className="flex items-start space-x-4">
                      <input
                        type="checkbox"
                        checked={selectedEvents.includes(event.id)}
                        onChange={() => handleSelectEvent(event.id)}
                        className="mt-1 rounded border-secondary-300"
                      />
                      
                      {/* Event Image */}
                      <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-8 h-8 text-primary-600" />
                      </div>

                      {/* Event Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              {event.featured && (
                                <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded-full font-medium">
                                  Featured
                                </span>
                              )}
                              <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(event.type)}`}>
                                {event.type}
                              </span>
                              <span className="text-xs text-secondary-500 capitalize">
                                {event.category}
                              </span>
                            </div>
                            
                            <h3 className="text-lg font-semibold text-secondary-900 mb-2 line-clamp-1">
                              {event.title}
                            </h3>
                            
                            <p className="text-sm text-secondary-600 mb-3 line-clamp-2">
                              {event.description}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-secondary-600">
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                  <Calendar className="w-4 h-4" />
                                  <span>{formatDateRange(event.startDate, event.endDate)}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Clock className="w-4 h-4" />
                                  <span>{event.startTime} - {event.endTime}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <MapPin className="w-4 h-4" />
                                  <span>{event.venue}, {event.city}</span>
                                </div>
                              </div>
                              
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                  <Users className="w-4 h-4" />
                                  <span>
                                    {event.registeredCount}/{event.capacity} registered
                                    {event.waitlistCount > 0 && ` (+${event.waitlistCount} waiting)`}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Ticket className="w-4 h-4" />
                                  <span>
                                    {event.registrationFee > 0 ? `₹${event.registrationFee}` : 'Free'}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Eye className="w-4 h-4" />
                                  <span>{event.views} views • {event.bookmarks} bookmarks</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Status and Actions */}
                          <div className="flex flex-col items-end space-y-2">
                            <select
                              value={event.status}
                              onChange={(e) => handleStatusChange(event.id, e.target.value)}
                              className={`text-xs px-2 py-1 rounded-full border-0 ${getStatusColor(event.status)}`}
                            >
                              <option value="upcoming">Upcoming</option>
                              <option value="ongoing">Ongoing</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                              <option value="draft">Draft</option>
                            </select>

                            <div className="flex items-center space-x-1">
                              <Link
                                to={`/admin/events/${event.id}/edit`}
                                className="p-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                              </Link>
                              <Link
                                to={`/events/${event.slug}`}
                                className="p-2 text-secondary-600 hover:text-secondary-700 hover:bg-secondary-50 rounded-lg transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                              <button
                                onClick={() => handleDeleteEvent(event.id)}
                                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEventsManagement;