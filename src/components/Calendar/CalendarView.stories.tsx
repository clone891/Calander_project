import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CalendarView } from './CalendarView';
import type { CalendarEvent } from './CalendarView.types';

const sampleEvents: CalendarEvent[] = [
  {
    id: 'evt-1',
    title: 'Team Standup',
    description: 'Daily sync with the team',
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 9, 0),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 9, 30),
    color: '#d8b4a6',
    category: 'Meeting',
  },
  {
    id: 'evt-2',
    title: 'Design Review',
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1, 14, 0),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1, 15, 30),
    color: '#c8b6a6',
    category: 'Design',
  },
];

const meta: Meta<typeof CalendarView> = {
  title: 'Components/Calendar/CalendarView',
  component: CalendarView,
};

export default meta;
type Story = StoryObj<typeof CalendarView>;

export const Default: Story = {
  render: () => <CalendarView events={sampleEvents} onEventAdd={() => {}} onEventUpdate={() => {}} onEventDelete={() => {}} />,
};

export const Empty: Story = {
  render: () => <CalendarView events={[]} onEventAdd={() => {}} onEventUpdate={() => {}} onEventDelete={() => {}} />,
};

export const WeekView: Story = {
  render: () => <CalendarView events={sampleEvents} onEventAdd={() => {}} onEventUpdate={() => {}} onEventDelete={() => {}} initialView="week" />,
};

export const LargeDataset: Story = {
  render: () => {
    // generate 25 sample events across the current month
    const events: CalendarEvent[] = [];
    const today = new Date();
    for (let i = 0; i < 25; i++) {
      const day = Math.min(28, (i % 28) + 1);
      events.push({
        id: `bulk-${i}`,
        title: `Event ${i + 1}`,
        startDate: new Date(today.getFullYear(), today.getMonth(), day, 10 + (i % 6), 0),
        endDate: new Date(today.getFullYear(), today.getMonth(), day, 11 + (i % 6), 0),
        color: ['#d8b4a6', '#c8b6a6', '#f1e7de'][i % 3],
      });
    }
    return <CalendarView events={events} onEventAdd={() => {}} onEventUpdate={() => {}} onEventDelete={() => {}} />;
  },
};

export const Interactive: Story = {
  render: () => {
    const Wrapper: React.FC = () => {
      const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents);

      const handleAdd = (ev: CalendarEvent) => setEvents((s) => [...s, ev]);
      const handleUpdate = (id: string, updates: Partial<CalendarEvent>) =>
        setEvents((s) => s.map((e) => (e.id === id ? { ...e, ...updates } : e)));
      const handleDelete = (id: string) => setEvents((s) => s.filter((e) => e.id !== id));

      return <CalendarView events={events} onEventAdd={handleAdd} onEventUpdate={handleUpdate} onEventDelete={handleDelete} />;
    };

    return <Wrapper />;
  },
};
