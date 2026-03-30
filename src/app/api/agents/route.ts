import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

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

async function getSessionsFromOpenClaw(): Promise<any[]> {
  try {
    // Call sessions_list via openclaw CLI to get real session data
    const { stdout } = await execAsync('openclaw sessions list --json 2>/dev/null || echo "[]"', {
      timeout: 5000,
    });
    
    try {
      return JSON.parse(stdout);
    } catch {
      return [];
    }
  } catch (err) {
    console.warn('Could not fetch sessions from OpenClaw CLI:', err);
    return [];
  }
}

export async function GET(request: NextRequest) {
  try {
    // Fetch real session data from OpenClaw
    const sessionsData = await getSessionsFromOpenClaw();

    // Build agent list with real status
    const agents: AgentData[] = Object.entries(agentMetadata).map(([agentId, metadata]) => {
      // Find sessions for this agent (match by agentId or label containing agent name)
      const agentSessions = sessionsData.filter((s: any) => {
        const matches =
          s.agentId === agentId ||
          s.label?.toLowerCase().includes(metadata.name.toLowerCase()) ||
          s.kind === agentId;
        return matches;
      });

      // Get most recent activity
      const mostRecentSession = agentSessions.sort(
        (a: any, b: any) => {
          const aTime = new Date(a.updated || a.created || 0).getTime();
          const bTime = new Date(b.updated || b.created || 0).getTime();
          return bTime - aTime;
        }
      )[0];

      const lastActivityTime = mostRecentSession
        ? new Date(mostRecentSession.updated || mostRecentSession.created || 0).getTime()
        : undefined;

      const status = getAgentStatus(lastActivityTime);
      const lastActive = formatLastActive(lastActivityTime);

      return {
        ...metadata,
        status,
        lastActive,
        currentTask: mostRecentSession?.label || undefined,
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
