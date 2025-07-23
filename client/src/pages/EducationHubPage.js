import React, { useState, useEffect } from 'react';
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
  Lightbulb,
  GraduationCap
} from 'lucide-react';

const EducationHubPage = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [courses, setCourses] = useState([]);
  const [resources, setResources] = useState([]);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    // Load educational content from localStorage (managed by admin)
    const storedCourses = localStorage.getItem('admin_courses');
    if (storedCourses) {
      setCourses(JSON.parse(storedCourses));
    }

    const storedResources = localStorage.getItem('admin_resources');
    if (storedResources) {
      setResources(JSON.parse(storedResources));
    }

    // Load user achievements
    const storedAchievements = localStorage.getItem('user_achievements');
    if (storedAchievements) {
      setAchievements(JSON.parse(storedAchievements));
    }
  }, []);

  // Filter courses based on search and level
  const filteredCourses = courses.filter(course => {
    const matchesSearch = searchTerm === '' || 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLevel = selectedLevel === '' || course.level === selectedLevel;
    
    return matchesSearch && matchesLevel;
  });

  // Filter resources based on search
  const filteredResources = resources.filter(resource => {
    return searchTerm === '' || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const tabs = [
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'resources', label: 'Resources', icon: FileText },
    { id: 'achievements', label: 'Achievements', icon: Award }
  ];

  const levels = ['beginner', 'intermediate', 'advanced'];

  const enrollInCourse = (courseId) => {
    const updatedCourses = courses.map(course => 
      course.id === courseId 
        ? { ...course, isEnrolled: true, progress: 0 }
        : course
    );
    setCourses(updatedCourses);
    localStorage.setItem('admin_courses', JSON.stringify(updatedCourses));
    alert('Successfully enrolled in course!');
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
            Learn philatelic techniques, history, and expertise from certified professionals
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

        {activeTab === 'courses' && (
          <>
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
                      <option value="">All Levels</option>
                      {levels.map(level => (
                        <option key={level} value={level}>
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourses.length > 0 ? filteredCourses.map((course) => (
                <div key={course.id} className="card card-hover">
                  <div className="aspect-video bg-gradient-to-br from-primary-100 to-accent-100 rounded-t-xl flex items-center justify-center">
                    <span className="text-4xl">{course.image}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`badge text-xs ${
                        course.level === 'beginner' ? 'badge-secondary' : 
                        course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {course.level}
                      </span>
                      <div className="flex items-center space-x-1 text-sm text-secondary-600">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{course.rating}</span>
                        <span>({course.reviews})</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-secondary-900 mb-2 line-clamp-2">
                      {course.title}
                    </h3>
                    
                    <p className="text-secondary-600 text-sm mb-4 line-clamp-3">
                      {course.description}
                    </p>

                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center text-sm">
                        {course.instructorAvatar}
                      </div>
                      <span className="text-sm text-secondary-700">{course.instructor}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4 text-center text-sm">
                      <div>
                        <div className="text-secondary-900 font-medium">{course.lessons}</div>
                        <div className="text-secondary-600 text-xs">Lessons</div>
                      </div>
                      <div>
                        <div className="text-secondary-900 font-medium">{course.duration}</div>
                        <div className="text-secondary-600 text-xs">Duration</div>
                      </div>
                      <div>
                        <div className="text-secondary-900 font-medium">{course.students}</div>
                        <div className="text-secondary-600 text-xs">Students</div>
                      </div>
                    </div>

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

                    <div className="flex items-center justify-between">
                      <div className="text-xl font-bold text-primary-600">
                        ₹{course.price}
                      </div>
                      {course.isEnrolled ? (
                        <button className="btn-primary">
                          <Play className="w-4 h-4 mr-1" />
                          Continue
                        </button>
                      ) : (
                        <button 
                          className="btn-primary"
                          onClick={() => enrollInCourse(course.id)}
                        >
                          <BookOpen className="w-4 h-4 mr-1" />
                          Enroll Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )) : (
                <div className="col-span-3">
                  <div className="card">
                    <div className="card-body text-center py-12">
                      <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <GraduationCap className="w-12 h-12 text-secondary-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                        No courses available yet
                      </h3>
                      <p className="text-secondary-600">
                        Educational courses will be added by the admin and appear here.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'resources' && (
          <>
            {/* Search for Resources */}
            <div className="card mb-6">
              <div className="card-body">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search resources..."
                    className="input pl-10 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Resources Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.length > 0 ? filteredResources.map((resource) => (
                <div key={resource.id} className="card card-hover">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        resource.type === 'pdf' ? 'bg-red-100 text-red-600' :
                        resource.type === 'video' ? 'bg-blue-100 text-blue-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {resource.type === 'pdf' ? <FileText className="w-6 h-6" /> :
                         resource.type === 'video' ? <Video className="w-6 h-6" /> :
                         <BookOpen className="w-6 h-6" />}
                      </div>
                      <span className="badge-secondary text-xs">{resource.category}</span>
                    </div>

                    <h3 className="text-lg font-semibold text-secondary-900 mb-2 line-clamp-2">
                      {resource.title}
                    </h3>
                    
                    <p className="text-secondary-600 text-sm mb-4 line-clamp-3">
                      {resource.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-sm text-secondary-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{resource.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Download className="w-4 h-4" />
                          <span>{resource.downloads}</span>
                        </div>
                      </div>
                      <button className="btn-primary btn-sm">
                        <Download className="w-4 h-4 mr-1" />
                        Access
                      </button>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="col-span-3">
                  <div className="card">
                    <div className="card-body text-center py-12">
                      <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-12 h-12 text-secondary-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                        No resources available yet
                      </h3>
                      <p className="text-secondary-600">
                        Educational resources will be added by the admin and appear here.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-6">
            {achievements.length > 0 ? achievements.map((achievement) => (
              <div key={achievement.id} className="card">
                <div className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      achievement.type === 'course' ? 'bg-blue-100 text-blue-600' :
                      achievement.type === 'quiz' ? 'bg-green-100 text-green-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {achievement.type === 'course' ? <GraduationCap className="w-8 h-8" /> :
                       achievement.type === 'quiz' ? <Trophy className="w-8 h-8" /> :
                       <Award className="w-8 h-8" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-secondary-900 mb-1">
                        {achievement.title}
                      </h3>
                      <p className="text-secondary-600 mb-2">
                        {achievement.description}
                      </p>
                      <div className="text-sm text-secondary-500">
                        Earned on {new Date(achievement.earnedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary-600">
                        {achievement.points}
                      </div>
                      <div className="text-sm text-secondary-600">Points</div>
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="card">
                <div className="card-body text-center py-12">
                  <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-12 h-12 text-secondary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                    No achievements yet
                  </h3>
                  <p className="text-secondary-600 mb-4">
                    Complete courses and quizzes to earn your first achievement!
                  </p>
                  <button 
                    className="btn-primary"
                    onClick={() => setActiveTab('courses')}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Start Learning
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

export default EducationHubPage;