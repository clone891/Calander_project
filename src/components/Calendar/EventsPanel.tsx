import React from 'react';
import type { CalendarEvent } from './CalendarView.types';
import { formatDate, formatTime, isSameDay } from '@/utils/date.utils';
interface EventsPanelProps {
  events: CalendarEvent[];
}

const isPast = (e: CalendarEvent) => new Date(e.endDate) < new Date();
const isTodayEvent = (e: CalendarEvent) => isSameDay(new Date(e.startDate), new Date());

export const EventsPanel: React.FC<EventsPanelProps> = ({ events }) => {
  const sorted = [...events].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  const today = sorted.filter(isTodayEvent);
  const upcoming = sorted.filter(e => !isTodayEvent(e) && !isPast(e));
  const past = sorted.filter(isPast);

  const renderEvent = (e: CalendarEvent) => {
    const start = new Date(e.startDate);
    const end = new Date(e.endDate);
    return (
      <div key={e.id} className="flex items-start gap-3 p-2 rounded-md hover:bg-primary-50/40 transition-colors">
        <div className="flex-shrink-0 mt-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: e.color || '#cbbf80' }} />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-medium text-neutral-900 truncate">{e.title}</div>
          <div className="text-xs text-neutral-600">{formatDate(start)} · {formatTime(start)} - {formatTime(end)}</div>
          {e.category && <div className="text-xs text-neutral-500 mt-1">{e.category}</div>}
        </div>
      </div>
    );
  };

  return (
    <aside className="w-full sm:w-80 lg:w-96 p-4 bg-transparent">
      <div className="bg-white rounded-lg shadow-card p-4 sticky top-6">
        <h3 className="text-lg font-semibold text-primary-800 mb-3">Events</h3>

        <section className="mb-3">
          <h4 className="text-sm font-semibold text-neutral-700 mb-2">Today</h4>
          {today.length ? today.map(renderEvent) : <div className="text-sm text-neutral-500">No events today</div>}
        </section>

        <section className="mb-3">
          <h4 className="text-sm font-semibold text-neutral-700 mb-2">Upcoming</h4>
          {upcoming.length ? upcoming.slice(0, 6).map(renderEvent) : <div className="text-sm text-neutral-500">No upcoming events</div>}
        </section>

        <section>
          <h4 className="text-sm font-semibold text-neutral-700 mb-2">Past</h4>
          {past.length ? past.slice(0, 6).map(renderEvent) : <div className="text-sm text-neutral-500">No past events</div>}
        </section>
      </div>
    </aside>
  );
};
