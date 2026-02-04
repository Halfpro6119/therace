import { motion } from 'framer-motion';
import { PlayCircle, Clock, Trophy, ChevronRight } from 'lucide-react';
import { Playlist } from '../types';

interface PlaylistCardProps {
  playlist: Playlist;
  quizCount: number;
  estimatedMinutes: number;
  onClick: () => void;
  variant?: 'featured' | 'default';
}

export function PlaylistCard({ playlist, quizCount, estimatedMinutes, onClick, variant = 'default' }: PlaylistCardProps) {
  const isFeatured = variant === 'featured';

  const getGradient = () => {
    if (playlist.coverStyle === 'minimal') {
      return 'var(--gradient-subtle)';
    }
    return 'var(--gradient-primary)';
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`cursor-pointer card-elevated overflow-hidden ${isFeatured ? 'col-span-full md:col-span-1' : ''}`}
    >
      <div
        className={`${isFeatured ? 'h-32' : 'h-24'} flex items-center justify-center relative overflow-hidden`}
        style={{ background: getGradient() }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />
        </div>
        <PlayCircle size={isFeatured ? 48 : 32} className="text-white relative z-10" />
      </div>

      <div className="p-4">
        {playlist.themeTag && (
          <div className="mb-2">
            <span
              className="text-xs font-bold px-2 py-1 rounded-full"
              style={{
                background: 'rgb(var(--accent) / 0.1)',
                color: 'rgb(var(--accent))'
              }}
            >
              {playlist.themeTag}
            </span>
          </div>
        )}

        <h3
          className={`font-bold mb-2 ${isFeatured ? 'text-xl' : 'text-lg'}`}
          style={{ color: 'rgb(var(--text))' }}
        >
          {playlist.title}
        </h3>

        {playlist.description && (
          <p className="text-sm mb-3 line-clamp-2" style={{ color: 'rgb(var(--text-secondary))' }}>
            {playlist.description}
          </p>
        )}

        <div className="flex items-center gap-4 mb-3 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
          <div className="flex items-center gap-1">
            <Trophy size={14} />
            <span>{quizCount} quizzes</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{estimatedMinutes}m</span>
          </div>
        </div>

        <button className="btn-primary w-full flex items-center justify-center gap-2">
          <PlayCircle size={18} />
          <span>Start Run</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </motion.div>
  );
}
