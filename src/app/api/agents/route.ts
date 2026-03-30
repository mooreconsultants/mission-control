import { NextRequest, NextResponse } from 'next/server';

interface AgentData {
  id: string;
  name: string;
  role: string;
  group: 'orchestrator' | 'operations' | 'content' | 'meta';
  description: string;
  status: 'online' | 'idle' | 'working' | 'offline';
  currentTask?: string;
  lastActive?: string;
  avatar?: string;
}

// Map of known agents and their metadata
const agentMetadata: Record<string, Omit<AgentData, 'status' | 'currentTask' | 'lastActive'>> = {
  henry: {
    id: 'henry',
    name: 'Henry',
    role: 'Chief of Staff',
    group: 'orchestrator',
    description: 'Orchestrator and team leader. Routes work, manages priorities, and coordinates across all teams.',
    avatar: '👔',
  },
  charlie: {
    id: 'charlie',
    name: 'Charlie',
    role: 'Infrastructure Engineer',
    group: 'operations',
    description: 'Manages deployments, infrastructure, and system reliability. Handles all ops and DevOps tasks.',
    avatar: '⚙️',
  },
  ralph: {
    id: 'ralph',
    name: 'Ralph',
    role: 'Foreman / QA Manager',
    group: 'operations',
    description: 'Quality assurance, testing, and release coordination. Ensures quality gates are met.',
    avatar: '✅',
  },
  scout: {
    id: 'scout',
    name: 'Scout',
    role: 'Trend Analyst',
    group: 'content',
    description: 'Research and trend analysis. Identifies content opportunities and emerging trends.',
    avatar: '🔍',
  },
  quill: {
    id: 'quill',
    name: 'Quill',
    role: 'Content Writer',
    group: 'content',
    description: 'Long-form and short-form content creation. Writes engaging content across all formats.',
    avatar: '✍️',
  },
  pixel: {
    id: 'pixel',
    name: 'Pixel',
    role: 'Thumbnail Designer',
    group: 'content',
    description: 'Visual design and graphics. Creates eye-catching visuals and design assets.',
    avatar: '🎨',
  },
  echo: {
    id: 'echo',
    name: 'Echo',
    role: 'Social Media Manager',
    group: 'content',
    description: 'Social media publishing and engagement. Manages presence across platforms.',
    avatar: '📢',
  },
  codex: {
    id: 'codex',
    name: 'Codex',
    role: 'Lead Engineer',
    group: 'meta',
    description: 'Technical strategy and architecture. Solves complex problems and guides technical direction.',
    avatar: '🏗️',
  },
  violet: {
    id: 'violet',
    name: 'Violet',
    role: 'Research Analyst',
    group: 'meta',
    description: 'Deep research and strategic insights. Uncovers patterns and informs big decisions.',
    avatar: '🔬',
  },
};

// Helper to determine agent status based on session activity
function getAgentStatus(lastMessageTime?: number): 'online' | 'idle' | 'working' | 'offline' {
  if (!lastMessageTime) return 'offline';
  
  const now = Date.now();
  const msSinceLastMessage = now - lastMessageTime;
  const minsSinceLastMessage = msSinceLastMessage / (1000 * 60);

  // Working: active within last 2 minutes
  if (minsSinceLastMessage < 2) return 'working';
  
  // Online/Idle: active within last 30 minutes
  if (minsSinceLastMessage < 30) return 'idle';
  
  // Offline: no activity in 30+ minutes
  return 'offline';
}

function formatLastActive(lastMessageTime?: number): string {
  if (!lastMessageTime) return 'Never';

  const now = Date.now();
  const msSince = now - lastMessageTime;
  const minsSince = Math.floor(msSince / (1000 * 60));
  const hrsSince = Math.floor(minsSince / 60);
  const daysSince = Math.floor(hrsSince / 24);

  if (minsSince < 1) return 'Just now';
  if (minsSince < 60) return `${minsSince}m ago`;
  if (hrsSince < 24) return `${hrsSince}h ago`;
  return `${daysSince}d ago`;
}

export async function GET(request: NextRequest) {
  try {
    // Fetch real session data from OpenClaw Gateway
    const gatewayUrl = process.env.OPENCLAW_GATEWAY_URL || 'http://localhost:3001';
    const gatewayToken = process.env.OPENCLAW_GATEWAY_TOKEN;

    let sessionsData: any[] = [];

    try {
      // Try to fetch sessions from the local gateway
      const headers: HeadersInit = {};
      if (gatewayToken) {
        headers['Authorization'] = `Bearer ${gatewayToken}`;
      }

      const sessionsResponse = await fetch(`${gatewayUrl}/api/sessions`, {
        headers,
        cache: 'no-store',
      });

      if (sessionsResponse.ok) {
        const data = await sessionsResponse.json();
        sessionsData = Array.isArray(data) ? data : data.sessions || [];
      }
    } catch (err) {
      console.warn('Could not fetch sessions from Gateway:', err);
      // Fall back to empty sessions array
    }

    // Build agent list with real status
    const agents: AgentData[] = Object.entries(agentMetadata).map(([agentId, metadata]) => {
      // Find sessions for this agent
      const agentSessions = sessionsData.filter(
        (s: any) => s.agentId === agentId || s.label?.includes(metadata.name)
      );

      // Get most recent activity
      const mostRecentSession = agentSessions.sort(
        (a: any, b: any) => (b.lastActivityTime || 0) - (a.lastActivityTime || 0)
      )[0];

      const lastActivityTime = mostRecentSession?.lastActivityTime;
      const status = getAgentStatus(lastActivityTime);
      const lastActive = formatLastActive(lastActivityTime);

      return {
        ...metadata,
        status,
        lastActive,
        currentTask: mostRecentSession?.currentTask || undefined,
      };
    });

    return NextResponse.json(agents);
  } catch (error) {
    console.error('Error fetching agents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch agent data' },
      { status: 500 }
    );
  }
}
