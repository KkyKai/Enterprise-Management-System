"use client";

import React, { useState } from 'react';
import { User, Calendar, Award, MapPin, Star, Plus, Edit3, Clock} from 'lucide-react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// TypeScript interfaces
interface ROA {
  name: string;
  completion: string;
  status: string;
}

interface Tour {
  position: string;
  location: string;
  duration: string;
  unit: string;
}

interface Proficiency {
  courses: number;
  conferences: number;
  seminars: number;
}

interface UpcomingROA {
  name: string;
  date: string;
  type: string;
  time?: string;
}

interface Profile {
  name: string;
  rank: string;
  profilePhoto: string;
  roas: ROA[];
  tours: Tour[];
  proficiency: Proficiency;
  upcomingROAs: UpcomingROA[];
}

const MilitaryProfileApp: React.FC = () => {
  const [profile, setProfile] = useState<Profile>({
    name: "Colonel Sarah Mitchell",
    rank: "Colonel",
    profilePhoto: "https://picsum.photos/200",
    roas: [
      { name: "Advanced Leadership Course", completion: "2023-08-15", status: "Completed" },
      { name: "Strategic Planning ROA", completion: "2023-05-22", status: "Completed" },
      { name: "Cyber Security Fundamentals", completion: "2023-11-10", status: "Completed" },
      { name: "Joint Operations Training", completion: "2025-02-18", status: "Completed" }
    ],
    tours: [
      { position: "Battalion Commander", location: "Fort Bragg, NC", duration: "2022-2025", unit: "3rd Infantry Division" },
      { position: "Operations Officer", location: "Ramstein AB, Germany", duration: "2020-2022", unit: "EUCOM" },
      { position: "Company Commander", location: "Fort Campbell, KY", duration: "2018-2020", unit: "101st Airborne" }
    ],
    proficiency: {
      courses: 85,
      conferences: 72,
      seminars: 90
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
    const size = 200;
    const center = size / 2;
    const maxRadius = 80;
    const angles = [0, 120, 240].map(a => (a * Math.PI) / 180);
    
    const points = [
      { label: 'Courses', value: data.courses, angle: angles[0] },
      { label: 'Conferences', value: data.conferences, angle: angles[1] },
      { label: 'Seminars', value: data.seminars, angle: angles[2] }
    ];

    const getCoords = (angle, radius) => ({
      x: center + Math.cos(angle - Math.PI/2) * radius,
      y: center + Math.sin(angle - Math.PI/2) * radius
    });

    const dataPoints = points.map(p => getCoords(p.angle, (p.value / 100) * maxRadius));
    const pathData = `M ${dataPoints[0].x} ${dataPoints[0].y} L ${dataPoints[1].x} ${dataPoints[1].y} L ${dataPoints[2].x} ${dataPoints[2].y} Z`;

    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-center">Proficiency Overview</h3>
        <svg width={size} height={size} className="mx-auto">
          {/* Grid circles */}
          {[20, 40, 60, 80].map(r => (
            <circle key={r} cx={center} cy={center} r={r} fill="none" stroke="#e5e7eb" strokeWidth="1"/>
          ))}
          
          {/* Grid lines */}
          {angles.map((angle, i) => {
            const end = getCoords(angle, maxRadius);
            return (
              <line key={i} x1={center} y1={center} x2={end.x} y2={end.y} stroke="#e5e7eb" strokeWidth="1"/>
            );
          })}
          
          {/* Data area */}
          <path d={pathData} fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
          
          {/* Data points */}
          {dataPoints.map((point, i) => (
            <circle key={i} cx={point.x} cy={point.y} r="4" fill="#3b82f6"/>
          ))}
          
          {/* Labels */}
          {points.map((point, i) => {
            const labelCoords = getCoords(point.angle, maxRadius + 20);
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center space-x-6">
            <img 
              src={profile.profilePhoto} 
              alt="Profile" 
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-800">{profile.name}</h1>
                <Edit3 className="w-5 h-5 text-gray-400 cursor-pointer hover:text-blue-500" />
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-xl font-semibold text-blue-600">{profile.rank}</span>
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
              </div>
            </div>
            
            {/* Radar Chart in Header */}
            <div className="flex-shrink-0">
              <RadarChart data={profile.proficiency} />
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
              <Plus className="w-5 h-5 text-gray-400 cursor-pointer hover:text-blue-500" />
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
                <span>Military Tours</span>
              </h2>
              <Plus className="w-5 h-5 text-gray-400 cursor-pointer hover:text-blue-500" />
            </div>
            <div className="space-y-4">
              {profile.tours.map((tour, i) => (
                <div key={i} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="font-medium text-gray-800">{tour.position}</div>
                  <div className="text-sm text-gray-600">{tour.unit}</div>
                  <div className="text-sm text-gray-500">{tour.location}</div>
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
            <Plus className="w-5 h-5 text-gray-400 cursor-pointer hover:text-blue-500" />
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