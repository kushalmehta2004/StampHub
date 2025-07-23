import React, { useState } from 'react';
import { 
  BookOpen, 
  Video, 
  FileText, 
  Award,
  Play,
  Download,
  Clock,
  Users,
  Star,
  Search,
  Filter,
  CheckCircle,
  Trophy,
  Target,
  Lightbulb
} from 'lucide-react';

const EducationHubPage = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  // Sample educational content
  const courses = [
    {
      id: '1',
      title: 'Introduction to Philately',
      description: 'Complete beginner\'s guide to stamp collecting and philatelic terminology',
      instructor: 'Dr. Rajesh Kumar',
      instructorAvatar: '👨‍🏫',
      level: 'beginner',
      duration: '4 weeks',
      lessons: 16,
      students: 1247,
      rating: 4.8,
      reviews: 89,
      price: 2499,
      image: '📚',
      tags: ['basics', 'terminology', 'history'],
      progress: 0,
      isEnrolled: false,
      syllabus: [
        'History of Postal Systems',
        'Types of Stamps and Postal Items',
        'Basic Collecting Techniques',
        'Philatelic Terminology'
      ]
    },
    {
      id: '2',
      title: 'Stamp Authentication Techniques',
      description: 'Learn professional methods to authenticate rare and valuable stamps',
      instructor: 'Prof. Anil Gupta',
      instructorAvatar: '👨‍🔬',
      level: 'advanced',
      duration: '6 weeks',
      lessons: 24,
      students: 456,
      rating: 4.9,
      reviews: 67,
      price: 4999,
      image: '🔍',
      tags: ['authentication', 'expertise', 'valuation'],
      progress: 65,
      isEnrolled: true,
      syllabus: [
        'Watermark Analysis',
        'Perforation Measurement',
        'Paper and Gum Analysis',
        'Printing Techniques Recognition'
      ]
    },
    {
      id: '3',
      title: 'Indian Postal History',
      description: 'Comprehensive study of Indian postal systems from ancient times to modern era',
      instructor: 'Ms. Priya Sharma',
      instructorAvatar: '👩‍🏫',
      level: 'intermediate',
      duration: '8 weeks',
      lessons: 32,
      students: 789,
      rating: 4.7,
      reviews: 123,
      price: 3499,
      image: '🏛️',
      tags: ['history', 'indian-post', 'heritage'],
      progress: 0,
      isEnrolled: false,
      syllabus: [
        'Ancient Communication Systems',
        'British Colonial Postal System',
        'Post-Independence Developments',
        'Modern Digital Integration'
      ]
    }
  ];

  const tutorials = [
    {
      id: '1',
      title: 'How to Properly Store Rare Stamps',
      type: 'video',
      duration: '12:45',
      views: 15623,
      difficulty: 'beginner',
      thumbnail: '📦',
      author: 'Storage Expert',
      publishedAt: '2024-01-10'
    },
    {
      id: '2',
      title: 'Identifying Watermarks in Indian Stamps',
      type: 'video',
      duration: '18:30',
      views: 8934,
      difficulty: 'intermediate',
      thumbnail: '💧',
      author: 'Authentication Pro',
      publishedAt: '2024-01-08'
    },
    {
      id: '3',
      title: 'Complete Guide to First Day Covers',
      type: 'article',
      readTime: '8 min read',
      views: 12456,
      difficulty: 'beginner',
      thumbnail: '📮',
      author: 'FDC Specialist',
      publishedAt: '2024-01-05'
    }
  ];

  const guides = [
    {
      id: '1',
      title: 'Beginner\'s Stamp Collecting Checklist',
      description: 'Essential items and steps to start your philatelic journey',
      downloadCount: 2456,
      fileSize: '2.3 MB',
      type: 'PDF',
      icon: '📋'
    },
    {
      id: '2',
      title: 'Indian Stamp Catalog Reference',
      description: 'Comprehensive reference guide for Indian stamps 1947-2024',
      downloadCount: 1789,
      fileSize: '45.7 MB',
      type: 'PDF',
      icon: '📖'
    },
    {
      id: '3',
      title: 'Philatelic Terminology Dictionary',
      description: 'Complete glossary of philatelic terms and definitions',
      downloadCount: 3421,
      fileSize: '5.1 MB',
      type: 'PDF',
      icon: '📚'
    }
  ];

  const achievements = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first course',
      icon: '🏅',
      progress: 0,
      unlocked: false
    },
    {
      id: '2',
      title: 'Knowledge Seeker',
      description: 'Complete 5 tutorials',
      icon: '🎯',
      progress: 60,
      unlocked: false
    },
    {
      id: '3',
      title: 'Expert Learner',
      description: 'Complete an advanced course',
      icon: '🏆',
      progress: 100,
      unlocked: true
    }
  ];

  const levelOptions = [
    { value: '', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLevel = !selectedLevel || course.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  const getLevelColor = (level) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-600';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-600';
      case 'advanced':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-secondary-100 text-secondary-600';
    }
  };

  const getDifficultyColor = (difficulty) => {
    return getLevelColor(difficulty);
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            Education Hub
          </h1>
          <p className="text-secondary-600">
            Learn philately from beginner basics to expert techniques
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-1 bg-white rounded-lg p-1 mb-6 w-fit">
          {[
            { id: 'courses', label: 'Courses', icon: BookOpen },
            { id: 'tutorials', label: 'Tutorials', icon: Video },
            { id: 'guides', label: 'Guides', icon: FileText },
            { id: 'achievements', label: 'Achievements', icon: Award }
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

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div>
            {/* Search and Filters */}
            <div className="card mb-6">
              <div className="card-body">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search courses..."
                      className="input pl-10 w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="w-full md:w-48">
                    <select
                      className="input w-full"
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                    >
                      {levelOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {filteredCourses.map((course) => (
                <div key={course.id} className="card card-hover">
                  <div className="aspect-video bg-gradient-to-br from-primary-100 to-accent-100 rounded-t-xl flex items-center justify-center">
                    <span className="text-4xl">{course.image}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                          {course.level}
                        </span>
                        {course.isEnrolled && (
                          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
                            Enrolled
                          </span>
                        )}
                      </div>
                      <span className="text-lg font-bold text-primary-600">
                        ₹{course.price}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-secondary-600 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    {/* Instructor */}
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-lg">{course.instructorAvatar}</span>
                      <span className="text-sm font-medium text-secondary-900">
                        {course.instructor}
                      </span>
                    </div>

                    {/* Course Stats */}
                    <div className="flex items-center justify-between text-sm text-secondary-600 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{course.lessons} lessons</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{course.students}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{course.rating}</span>
                      </div>
                    </div>

                    {/* Progress Bar (if enrolled) */}
                    {course.isEnrolled && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-secondary-600">Progress</span>
                          <span className="text-secondary-900 font-medium">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-secondary-200 rounded-full h-2">
                          <div 
                            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {course.tags.map((tag, index) => (
                        <span key={index} className="badge-secondary text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Button */}
                    <button className={`w-full ${course.isEnrolled ? 'btn-primary' : 'btn-outline'}`}>
                      {course.isEnrolled ? 'Continue Learning' : 'Enroll Now'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tutorials Tab */}
        {activeTab === 'tutorials' && (
          <div className="space-y-4">
            {tutorials.map((tutorial) => (
              <div key={tutorial.id} className="card">
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                      {tutorial.thumbnail}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-secondary-900 hover:text-primary-600 cursor-pointer">
                          {tutorial.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tutorial.difficulty)}`}>
                          {tutorial.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-secondary-600 mb-3">
                        <span>{tutorial.author}</span>
                        <div className="flex items-center space-x-1">
                          {tutorial.type === 'video' ? (
                            <>
                              <Play className="w-4 h-4" />
                              <span>{tutorial.duration}</span>
                            </>
                          ) : (
                            <>
                              <Clock className="w-4 h-4" />
                              <span>{tutorial.readTime}</span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{tutorial.views} views</span>
                        </div>
                        <span>{new Date(tutorial.publishedAt).toLocaleDateString()}</span>
                      </div>
                      <button className="btn-primary btn-sm">
                        {tutorial.type === 'video' ? (
                          <>
                            <Play className="w-4 h-4 mr-1" />
                            Watch Now
                          </>
                        ) : (
                          <>
                            <BookOpen className="w-4 h-4 mr-1" />
                            Read Article
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Guides Tab */}
        {activeTab === 'guides' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <div key={guide.id} className="card card-hover">
                <div className="p-6">
                  <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center text-3xl mx-auto mb-4">
                    {guide.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2 text-center">
                    {guide.title}
                  </h3>
                  <p className="text-secondary-600 text-sm mb-4 text-center line-clamp-2">
                    {guide.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-secondary-600 mb-4">
                    <span>{guide.downloadCount} downloads</span>
                    <span>{guide.fileSize} • {guide.type}</span>
                  </div>
                  <button className="btn-primary w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Guide
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <div key={achievement.id} className={`card ${achievement.unlocked ? 'bg-green-50 border-green-200' : ''}`}>
                  <div className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 ${
                      achievement.unlocked ? 'bg-green-100' : 'bg-secondary-100'
                    }`}>
                      {achievement.icon}
                    </div>
                    <h3 className={`text-lg font-semibold mb-2 ${
                      achievement.unlocked ? 'text-green-900' : 'text-secondary-900'
                    }`}>
                      {achievement.title}
                    </h3>
                    <p className={`text-sm mb-4 ${
                      achievement.unlocked ? 'text-green-700' : 'text-secondary-600'
                    }`}>
                      {achievement.description}
                    </p>
                    
                    {!achievement.unlocked && achievement.progress > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-secondary-600">Progress</span>
                          <span className="text-secondary-900 font-medium">{achievement.progress}%</span>
                        </div>
                        <div className="w-full bg-secondary-200 rounded-full h-2">
                          <div 
                            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${achievement.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {achievement.unlocked && (
                      <div className="flex items-center justify-center space-x-1 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Unlocked!</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Learning Path */}
            <div className="card mt-8">
              <div className="card-header">
                <h2 className="text-xl font-semibold text-secondary-900">Recommended Learning Path</h2>
              </div>
              <div className="card-body">
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-secondary-900 mb-2">1. Basics</h3>
                    <p className="text-sm text-secondary-600">Start with introduction course</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Lightbulb className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h3 className="font-semibold text-secondary-900 mb-2">2. Practice</h3>
                    <p className="text-sm text-secondary-600">Follow tutorials and guides</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-secondary-900 mb-2">3. Specialize</h3>
                    <p className="text-sm text-secondary-600">Take advanced specialized courses</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Trophy className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-secondary-900 mb-2">4. Expert</h3>
                    <p className="text-sm text-secondary-600">Become a certified expert</p>
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

export default EducationHubPage;