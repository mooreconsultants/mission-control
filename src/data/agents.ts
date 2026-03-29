export type AgentStatus = 'online' | 'idle' | 'working' | 'offline';
export type AgentGroup = 'orchestrator' | 'operations' | 'content' | 'meta';

export interface Agent {
  id: string;
  name: string;
  role: string;
  group: AgentGroup;
  description: string;
  status: AgentStatus;
  currentTask?: string;
  lastActive?: string;
  avatar?: string;
}

export const agents: Agent[] = [
  // Orchestrator
  {
    id: 'henry',
    name: 'Henry',
    role: 'Chief of Staff',
    group: 'orchestrator',
    description: 'Orchestrator and team leader. Routes work, manages priorities, and coordinates across all teams.',
    status: 'online',
    currentTask: 'Coordinating content pipeline',
    lastActive: '2 minutes ago',
    avatar: '👔',
  },
  
  // Operations
  {
    id: 'charlie',
    name: 'Charlie',
    role: 'Infrastructure Engineer',
    group: 'operations',
    description: 'Manages deployments, infrastructure, and system reliability. Handles all ops and DevOps tasks.',
    status: 'idle',
    lastActive: '15 minutes ago',
    avatar: '⚙️',
  },
  {
    id: 'ralph',
    name: 'Ralph',
    role: 'Foreman / QA Manager',
    group: 'operations',
    description: 'Quality assurance, testing, and release coordination. Ensures quality gates are met.',
    status: 'working',
    currentTask: 'Running regression tests',
    lastActive: 'now',
    avatar: '✅',
  },
  
  // Content Pipeline
  {
    id: 'scout',
    name: 'Scout',
    role: 'Trend Analyst',
    group: 'content',
    description: 'Research and trend analysis. Identifies content opportunities and emerging trends.',
    status: 'working',
    currentTask: 'Researching AI trends',
    lastActive: 'now',
    avatar: '🔍',
  },
  {
    id: 'quill',
    name: 'Quill',
    role: 'Content Writer',
    group: 'content',
    description: 'Long-form and short-form content creation. Writes engaging content across all formats.',
    status: 'idle',
    lastActive: '5 minutes ago',
    avatar: '✍️',
  },
  {
    id: 'pixel',
    name: 'Pixel',
    role: 'Thumbnail Designer',
    group: 'content',
    description: 'Visual design and graphics. Creates eye-catching visuals and design assets.',
    status: 'offline',
    lastActive: '2 hours ago',
    avatar: '🎨',
  },
  {
    id: 'echo',
    name: 'Echo',
    role: 'Social Media Manager',
    group: 'content',
    description: 'Social media publishing and engagement. Manages presence across platforms.',
    status: 'working',
    currentTask: 'Scheduling weekly posts',
    lastActive: 'now',
    avatar: '📢',
  },
  
  // Meta Layer
  {
    id: 'codex',
    name: 'Codex',
    role: 'Lead Engineer',
    group: 'meta',
    description: 'Technical strategy and architecture. Solves complex problems and guides technical direction.',
    status: 'online',
    currentTask: 'Architecture review',
    lastActive: '3 minutes ago',
    avatar: '🏗️',
  },
  {
    id: 'violet',
    name: 'Violet',
    role: 'Research Analyst',
    group: 'meta',
    description: 'Deep research and strategic insights. Uncovers patterns and informs big decisions.',
    status: 'working',
    currentTask: 'Competitive analysis',
    lastActive: 'now',
    avatar: '🔬',
  },
];

export const groupNames: Record<AgentGroup, string> = {
  orchestrator: 'Orchestrator',
  operations: 'Operations',
  content: 'Content Pipeline',
  meta: 'Meta Layer',
};

export const groupDescriptions: Record<AgentGroup, string> = {
  orchestrator: 'Team leader and task orchestrator',
  operations: 'Infrastructure, deployment, and quality assurance',
  content: 'Content creation and social media management',
  meta: 'Strategic thinking and research',
};
