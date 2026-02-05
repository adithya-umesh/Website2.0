/**
 * Domain Data
 * 
 * Centralized content for all club domains.
 * Edit this file to update domain information without touching UI components.
 */

export type DomainData = {
  id: string;
  title: string;
  description: string;
};

export const domains: DomainData[] = [
  {
    id: 'coding',
    title: 'Coding',
    description:
      'The backbone of everything we build. From embedded systems and automotive software to autonomous robotics code, internal tools, and full-stack websites — we code it all.',
  },
  {
    id: 'automotives',
    title: 'Automotives',
    description:
      'Where ideas turn into machines. We design, build, and fabricate vehicles — from simulations to hands-on assembly.',
  },
  {
    id: 'sponsorship-finance',
    title: 'Sponsorship & Finance',
    description:
      'Powering innovation through partnerships. This domain handles budgeting, sponsor relations, and industry collaborations.',
  },
  {
    id: 'robotics',
    title: 'Robotics',
    description:
      'Designing intelligence in motion. We build robots combining mechanics, electronics, and software.',
  },
  {
    id: 'operations',
    title: 'Operations',
    description:
      'The engine that keeps the club running — permissions, LORs, members, events, and internal workflows.',
  },
  {
    id: 'social-media',
    title: 'Social Media',
    description:
      'Telling our story to the world. Marketing, content creation, outreach, and showcasing everything Vegavath builds.',
  },
];
