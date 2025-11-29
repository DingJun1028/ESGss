import React from 'react';
import { getMockCourses, TRANSLATIONS } from '../constants';
import { PlayCircle, Award, Clock } from 'lucide-react';
import { Language } from '../types';

interface AcademyProps {
  language: Language;
}

export const Academy: React.FC<AcademyProps> = ({ language }) => {
  const t = TRANSLATIONS[language].academy;
  const courses = getMockCourses(language);

  return (
    <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
            <div>
            <h2 className="text-3xl font-bold text-white">{t.title}</h2>
            <p className="text-gray-400">{t.subtitle}</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-celestial-gold/10 border border-celestial-gold/20">
                <Award className="w-5 h-5 text-celestial-gold" />
                <span className="text-celestial-gold font-bold">{t.levelInfo}</span>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
                <div key={course.id} className="glass-panel rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-celestial-purple/20 transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                        <img 
                            src={course.thumbnail} 
                            alt={course.title} 
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                            <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider
                                ${course.level === 'Beginner' ? 'bg-emerald-500/80 text-white' : 
                                  course.level === 'Intermediate' ? 'bg-blue-500/80 text-white' : 'bg-purple-500/80 text-white'}`}>
                                {course.level}
                            </span>
                        </div>
                    </div>
                    <div className="p-5">
                        <div className="text-xs text-gray-400 mb-2">{course.category}</div>
                        <h3 className="text-lg font-bold text-white mb-4 line-clamp-2 group-hover:text-celestial-gold transition-colors">{course.title}</h3>
                        
                        <div className="mb-4">
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>{t.progress}</span>
                                <span>{course.progress}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-celestial-emerald to-celestial-purple" style={{ width: `${course.progress}%` }} />
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                                <Clock className="w-3 h-3" />
                                <span>2h 15m</span>
                            </div>
                            <button className="flex items-center gap-2 text-sm font-medium text-white hover:text-celestial-emerald transition-colors">
                                <PlayCircle className="w-5 h-5" />
                                {course.progress > 0 ? t.resume : t.start}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};