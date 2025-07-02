"use client";

import React, { useState } from 'react';
import { User, Calendar, Award, MapPin, Star, Clock, Search, Upload, Trophy } from 'lucide-react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Image from "next/image";
import '../styles/globals.css';

// TypeScript interfaces
interface ROA {
  name: string;
  completion: string;
  status: string;
}

interface Tour {
  appointment: string;
  posting: string;
  duration: string;
  unit: string;
}

interface Proficiency {
  courses: number;
  conferences: number;
  seminars: number;
  leadership: number;
  tactics: number;
  logistics: number;
}

interface UpcomingROA {
  name: string;
  date: string;
  type: string;
  time?: string;
}

interface Achievement {
  title: string;
  date: string;
  category: string;
  description?: string;
}

interface Profile {
  name: string;
  rank: string;
  career_track: string;
  currentAppointment: string;
  areasOfInterest: string[];
  profilePhoto: string;
  roas: ROA[];
  tours: Tour[];
  proficiency: Proficiency;
  upcomingROAs: UpcomingROA[];
  achievements: Achievement[];
}
const MilitaryProfileApp: React.FC = () => {
  // Search 
  const [searchQuery, setSearchQuery] = useState("");

  const [profile, setProfile] = useState<Profile>({
    name: "Goh Yu Sheng",
    rank: "ME4-1",
    career_track: "C4X", 
    currentAppointment: "Platoon Commander - 10C4I",
    areasOfInterest: ["Strategic Planning", "Cyber Security", "Joint Operations", "Leadership Development"],
    profilePhoto: "https://picsum.photos/200",
    achievements: [
      { title: "1st in DSTA Data Challenge", date: "2023-11-15", category: "Competition", description: "Won first place in national data analytics competition" },
      { title: "Excellence in Leadership Award", date: "2023-08-20", category: "Leadership", description: "Recognized for outstanding leadership during joint operations" },
      { title: "Cyber Security Certification", date: "2023-06-10", category: "Certification", description: "Advanced certification in cybersecurity protocols" },
      { title: "Outstanding Performance Medal", date: "2023-03-25", category: "Medal", description: "Awarded for exceptional service and dedication" },
      { title: "Innovation Award", date: "2022-12-05", category: "Innovation", description: "Developed new strategic planning methodology" }
    ],
    roas: [
      { name: "Advanced Leadership Course", completion: "2023-08-15", status: "Completed" },
      { name: "Strategic Planning ROA", completion: "2023-05-22", status: "Completed" },
      { name: "Cyber Security Fundamentals", completion: "2023-11-10", status: "Completed" },
      { name: "Joint Operations Training", completion: "2025-02-18", status: "Completed" }
    ],
    tours: [
      { appointment: "Battalion Commander", posting: "Fort Bragg, NC", duration: "2022-2025", unit: "3rd Infantry Division" },
      { appointment: "Operations Officer", posting: "Ramstein AB, Germany", duration: "2020-2022", unit: "EUCOM" },
      { appointment: "Company Commander", posting: "Fort Campbell, KY", duration: "2018-2020", unit: "101st Airborne" }
    ],
    proficiency: {
      courses: 85,
      conferences: 72,
      seminars: 90,
      leadership: 88,
      tactics: 78,
      logistics: 82
    },

    upcomingROAs: [
      // July 2025 Events
      { name: "Senior Staff Course", date: "2025-07-15", type: "Course", time: "09:00" },
      { name: "Leadership Assessment", date: "2025-07-18", type: "Assessment", time: "14:00" },
      { name: "Cyber Defense Workshop", date: "2025-07-22", type: "Workshop", time: "10:30" },
      { name: "Strategic Planning Seminar", date: "2025-07-25", type: "Seminar", time: "13:00" },
      { name: "Joint Training Exercise", date: "2025-07-28", type: "Course", time: "08:00" },

      // August 2025 Events
      { name: "NATO Leadership Summit", date: "2025-08-05", type: "Conference", time: "09:00" },
      { name: "Advanced Tactics Course", date: "2025-08-08", type: "Course", time: "08:30" },
      { name: "Intelligence Briefing", date: "2025-08-12", type: "Conference", time: "15:00" },
      { name: "Medical Readiness Check", date: "2025-08-15", type: "Assessment", time: "11:00" },
      { name: "Equipment Inspection", date: "2025-08-19", type: "Assessment", time: "09:30" },
      { name: "Communications Workshop", date: "2025-08-22", type: "Workshop", time: "14:00" },
      { name: "Physical Fitness Test", date: "2025-08-26", type: "Assessment", time: "06:00" },
      { name: "Leadership Development", date: "2025-08-29", type: "Seminar", time: "10:00" },

      // September 2025 Events
      { name: "Military Innovation Seminar", date: "2025-09-03", type: "Seminar", time: "13:30" },
      { name: "Weapons Qualification", date: "2025-09-06", type: "Assessment", time: "08:00" },
      { name: "International Relations Conference", date: "2025-09-10", type: "Conference", time: "09:00" },
      { name: "Logistics Management Course", date: "2025-09-13", type: "Course", time: "10:00" },
      { name: "Emergency Response Drill", date: "2025-09-17", type: "Workshop", time: "14:00" },
      { name: "Annual Performance Review", date: "2025-09-20", type: "Assessment", time: "11:00" },
      { name: "Ethics and Leadership Seminar", date: "2025-09-24", type: "Seminar", time: "13:00" },
      { name: "Technology Integration Workshop", date: "2025-09-27", type: "Workshop", time: "15:00" },

      // October 2025 Events
      { name: "Advanced Tactics ROA", date: "2025-10-02", type: "Course", time: "08:00" },
      { name: "Multi-National Exercise Planning", date: "2025-10-05", type: "Conference", time: "09:30" },
      { name: "Survival Training Course", date: "2025-10-08", type: "Course", time: "07:00" },
      { name: "Risk Management Seminar", date: "2025-10-12", type: "Seminar", time: "14:00" },
      { name: "Command Staff Meeting", date: "2025-10-15", type: "Conference", time: "10:00" },
      { name: "Field Exercise Preparation", date: "2025-10-18", type: "Workshop", time: "08:30" },
      { name: "Security Clearance Review", date: "2025-10-22", type: "Assessment", time: "13:00" },
      { name: "Mental Health Awareness", date: "2025-10-25", type: "Seminar", time: "11:00" },
      { name: "Promotion Board Preparation", date: "2025-10-29", type: "Workshop", time: "09:00" },

      // November 2025 Events
      { name: "Veterans Day Ceremony", date: "2025-11-11", type: "Conference", time: "10:00" },
      { name: "Winter Preparedness Training", date: "2025-11-14", type: "Course", time: "08:00" },
      { name: "Budget Planning Workshop", date: "2025-11-18", type: "Workshop", time: "13:00" },
      { name: "Unit Readiness Assessment", date: "2025-11-21", type: "Assessment", time: "09:00" },
      { name: "Family Readiness Seminar", date: "2025-11-25", type: "Seminar", time: "14:00" },

      // December 2025 Events
      { name: "Year-End Performance Review", date: "2025-12-03", type: "Assessment", time: "10:00" },
      { name: "Holiday Safety Briefing", date: "2025-12-06", type: "Seminar", time: "15:00" },
      { name: "Equipment Maintenance Workshop", date: "2025-12-10", type: "Workshop", time: "08:30" },
      { name: "Annual Training Summary", date: "2025-12-13", type: "Conference", time: "11:00" },
      { name: "New Year Planning Session", date: "2025-12-17", type: "Conference", time: "13:30" },
      { name: "Holiday Party", date: "2025-12-20", type: "Conference", time: "18:00" }
    ]
  });

  // Radar chart component
  const RadarChart: React.FC<{ data: Proficiency }> = ({ data }) => {
    const size = 350;
    const center = size / 2;
    const maxRadius = 120;
    const angles = [0, 60, 120, 180, 240, 300].map(a => (a * Math.PI) / 180);

    const points = [
      { label: 'Courses', value: data.courses, angle: angles[0] },
      { label: 'Leadership', value: data.leadership, angle: angles[1] },
      { label: 'Conferences', value: data.conferences, angle: angles[2] },
      { label: 'Tactics', value: data.tactics, angle: angles[3] },
      { label: 'Seminars', value: data.seminars, angle: angles[4] },
      { label: 'Logistics', value: data.logistics, angle: angles[5] }
    ];

    const getCoords = (angle, radius) => ({
      x: center + Math.cos(angle - Math.PI / 2) * radius,
      y: center + Math.sin(angle - Math.PI / 2) * radius
    });

    const dataPoints = points.map(p => getCoords(p.angle, (p.value / 100) * maxRadius));
    const pathData = `M ${dataPoints.map(p => `${p.x} ${p.y}`).join(' L ')} Z`;

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-center">Proficiency Overview</h3>
        <svg width={size} height={size} className="mx-auto">
          {/* Grid circles */}
          {[24, 48, 72, 96, 120].map(r => (
            <circle key={r} cx={center} cy={center} r={r} fill="none" stroke="#e5e7eb" strokeWidth="1" />
          ))}

          {/* Grid lines */}
          {angles.map((angle, i) => {
            const end = getCoords(angle, maxRadius);
            return (
              <line key={i} x1={center} y1={center} x2={end.x} y2={end.y} stroke="#e5e7eb" strokeWidth="1" />
            );
          })}

          {/* Data area */}
          <path d={pathData} fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2" />

          {/* Data points */}
          {dataPoints.map((point, i) => (
            <circle key={i} cx={point.x} cy={point.y} r="4" fill="#3b82f6" />
          ))}

          {/* Labels */}
          {points.map((point, i) => {
            const labelCoords = getCoords(point.angle, maxRadius + 30);
            return (
              <g key={i}>
                <text
                  x={labelCoords.x}
                  y={labelCoords.y}
                  textAnchor="middle"
                  className="text-xs font-medium fill-gray-700"
                >
                  {point.label}
                </text>
                <text
                  x={labelCoords.x}
                  y={labelCoords.y + 12}
                  textAnchor="middle"
                  className="text-xs fill-blue-600 font-semibold"
                >
                  {point.value}%
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  // FullCalendar component
  const FullCalendarComponent: React.FC<{ events: UpcomingROA[] }> = ({ events }) => {
    // Transform events to FullCalendar format
    const calendarEvents = events.map((event, index) => ({
      id: index.toString(),
      title: event.name,
      date: event.time ? `${event.date}T${event.time}:00` : event.date,
      backgroundColor: getEventColor(event.type),
      borderColor: getEventColor(event.type),
      extendedProps: {
        type: event.type
      }
    }));

    function getEventColor(type: string): string {
      switch (type.toLowerCase()) {
        case 'course': return '#3b82f6';
        case 'conference': return '#10b981';
        case 'seminar': return '#f59e0b';
        case 'workshop': return '#8b5cf6';
        case 'assessment': return '#ef4444';
        default: return '#6b7280';
      }
    }

    const handleEventClick = (clickInfo: any) => {
      alert(`Event: ${clickInfo.event.title}\nType: ${clickInfo.event.extendedProps.type}\nDate: ${clickInfo.event.start?.toLocaleDateString()}`);
    };

    const handleDateClick = (arg: any) => {
      console.log('Date clicked:', arg.dateStr);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        console.log('File uploaded:', file.name);
        // Handle file upload logic here
      }
    };

    const handleSearch = () => {
      console.log('Searching for:', searchQuery);
      // Handle search logic here
    };
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Upcoming ROAs Calendar</h3>
        <div className="h-96">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            events={calendarEvents}
            eventClick={handleEventClick}
            dateClick={handleDateClick}
            height="100%"
            eventDisplay="block"
            dayMaxEvents={3}
            moreLinkClick="popover"
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }}
            slotLabelFormat={{
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }}
          />
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-600">Course</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-600">Conference</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span className="text-sm text-gray-600">Seminar</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded"></div>
            <span className="text-sm text-gray-600">Workshop</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-sm text-gray-600">Assessment</span>
          </div>
        </div>
      </div>
    );
  };

  // Get achievement category styling
  const getAchievementStyle = (category: string) => {
    switch (category.toLowerCase()) {
      case 'competition': return { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-500' };
      case 'leadership': return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-500' };
      case 'certification': return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-500' };
      case 'medal': return { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-500' };
      case 'innovation': return { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-500' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-500' };
    }
  };

  // Sort upcoming ROAs by date
  const sortedUpcomingROAs = [...profile.upcomingROAs].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );



  // Get type-specific styling
  const getTypeStyle = (type: string) => {
    switch (type.toLowerCase()) {
      case 'course': return { border: 'border-blue-500', bg: 'bg-blue-100', text: 'text-blue-800' };
      case 'conference': return { border: 'border-green-500', bg: 'bg-green-100', text: 'text-green-800' };
      case 'seminar': return { border: 'border-yellow-500', bg: 'bg-yellow-100', text: 'text-yellow-800' };
      case 'workshop': return { border: 'border-purple-500', bg: 'bg-purple-100', text: 'text-purple-800' };
      case 'assessment': return { border: 'border-red-500', bg: 'bg-red-100', text: 'text-red-800' };
      default: return { border: 'border-gray-500', bg: 'bg-gray-100', text: 'text-gray-800' };
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('File uploaded:', file.name);
      // Handle file upload logic here
    }
  };

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    // Handle search logic here
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Search Bar and Upload */}
      <div className="sticky top-0 z-50 bg-blue-900 shadow-md">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center h-20 space-x-6">

            {/* Big Main Logo */}

            <div className="relative font-bold h-full w-20">
              <Image
                src="/ems-high-resolution-logo-transparent.png"
                alt="Logo"
                fill={true}
                objectFit='contain'
                
              //style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Tabs */}
            <div className="flex h-full">
              <a
                rel="noreferrer"
                href="/profile"
                className="text-white hover:text-gray-300 transition-colors flex justify-center items-center navbar active-tab"
              >
                Profile
              </a>
              <a
                rel="noreferrer"
                href="/upload"
                className="text-white hover:text-gray-300 transition-colors flex justify-center items-center navbar"
              >
                Upload
              </a>
            </div>

            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search Profiles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              {/* <button
                onClick={handleSearch}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
              >
                Search
              </button> */}
            </div>

            {/* Logout Button */}
            <button
              onClick={() => {
                localStorage.removeItem('isAuthenticated');
                localStorage.removeItem('user');
                window.location.href = '/login';
              }}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm ml-auto"
            >
              Logout
            </button>
          </div>
        </div>
      </div>


      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className=" flex-col items-center space-y-4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">

            <div className="flex items-center space-x-6">

              <div className="">
                <div className="flex items-center space-x-6">

                  <img
                    src={profile.profilePhoto}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
                  />

                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h1 className="text-3xl font-bold text-gray-800">{profile.name}</h1>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <span className="text-xl font-semibold text-blue-600">{profile.rank} {profile.career_track}</span>
                    </div>
                    <div className="text-lg text-gray-600 mb-3">{profile.currentAppointment}</div>
                    <div className="mb-3">
                      <div className="text-sm font-medium text-gray-700 mb-2">Areas of Interest:</div>
                      <div className="flex flex-wrap gap-2">
                        {profile.areasOfInterest.map((area, i) => (
                          <span key={i} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center space-x-1">
                        <Award className="w-4 h-4" />
                        <span>{profile.roas.length} ROAs Completed</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{profile.tours.length} Tours Served</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Trophy className="w-4 h-4" />
                        <span>{profile.achievements.length} Achievements</span>
                      </span>
                    </div>
                  </div>


                </div>

                {/* Awards Container */}
                <div className="w-128 bg-gray-50 rounded-lg p-2 m-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <h3 className="text-sm font-semibold text-gray-700">Recent Achievements</h3>
                  </div>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {profile.achievements.slice(0, 3).map((achievement, i) => {
                      const style = getAchievementStyle(achievement.category);
                      return (
                        <div key={i} className={`border-l-3 ${style.border} pl-2 py-1`}>
                          <div className="text-xs font-medium text-gray-800">{achievement.title}</div>
                          <div className="text-xs text-gray-500">{new Date(achievement.date).toLocaleDateString()}</div>
                          <span className={`inline-block mt-1 px-2 py-0.5 text-xs ${style.bg} ${style.text} rounded`}>
                            {achievement.category}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  {/* {profile.achievements.length > 3 && (
                    <div className="text-xs text-blue-600 mt-2 cursor-pointer hover:underline">
                      View all {profile.achievements.length} achievements
                    </div>
                  )} */}
                </div>
              </div>




              {/* Radar Chart in Header */}
              <div className="flex-shrink-0">
                <RadarChart data={profile.proficiency} />
              </div>

            </div>


          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* ROAs Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center space-x-2">
                <Award className="w-5 h-5 text-blue-500" />
                <span>Completed ROAs</span>
              </h2>

            </div>
            <div className="space-y-3">
              {profile.roas.map((roa, i) => (
                <div key={i} className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="font-medium text-gray-800">{roa.name}</div>
                  <div className="text-sm text-gray-600">
                    Completed: {new Date(roa.completion).toLocaleDateString()}
                  </div>
                  <span className="inline-block mt-1 px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                    {roa.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tours Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-blue-500" />
                <span>Posting and Appointments</span>
              </h2>

            </div>
            <div className="space-y-4">
              {profile.tours.map((tour, i) => (
                <div key={i} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="font-medium text-gray-800">{tour.appointment}</div>
                  <div className="text-sm text-gray-600">{tour.unit}</div>
                  <div className="text-sm text-gray-500">{tour.posting}</div>
                  <div className="text-xs text-gray-400 mt-1">{tour.duration}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section - Full Width Calendar */}
        <div className="w-full mb-6">
          {/* FullCalendar */}
          <FullCalendarComponent events={profile.upcomingROAs} />
        </div>

        {/* Upcoming ROAs List */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <span>Upcoming ROAs & Events</span>
            </h2>

          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {sortedUpcomingROAs.map((roa, i) => {
              const typeStyle = getTypeStyle(roa.type);
              return (
                <div key={i} className={`border-l-4 ${typeStyle.border} pl-4 py-2`}>
                  <div className="font-medium text-gray-800">{roa.name}</div>
                  <div className="text-sm text-gray-600">
                    Scheduled: {new Date(roa.date).toLocaleDateString()}
                    {roa.time && ` at ${roa.time}`}
                  </div>
                  <span className={`inline-block mt-1 px-2 py-1 text-xs ${typeStyle.bg} ${typeStyle.text} rounded`}>
                    {roa.type}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilitaryProfileApp;