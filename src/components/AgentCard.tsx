import { Agent } from '@/data/agents';

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  const statusColors: Record<string, string> = {
    online: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50',
    idle: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
    working: 'bg-amber-500/20 text-amber-400 border-amber-500/50',
    offline: 'bg-slate-500/20 text-slate-400 border-slate-500/50',
  };

  const statusDots: Record<string, string> = {
    online: 'bg-emerald-500',
    idle: 'bg-blue-500',
    working: 'bg-amber-500',
    offline: 'bg-slate-500',
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border border-slate-700 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 transition-all duration-300 hover:border-slate-600 hover:shadow-lg hover:shadow-blue-500/10">
      {/* Gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 transition-all duration-300 group-hover:from-blue-500/5 group-hover:to-purple-500/5" />
      
      <div className="relative z-10 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="text-3xl">{agent.avatar}</div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
              <p className="text-sm text-slate-400">{agent.role}</p>
            </div>
          </div>
          <div className={`rounded border px-2.5 py-1 text-xs font-medium capitalize ${statusColors[agent.status]}`}>
            <div className="flex items-center gap-1.5">
              <div className={`h-2 w-2 rounded-full ${statusDots[agent.status]}`} />
              {agent.status}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-slate-300">
          {agent.description}
        </p>

        {/* Current Task */}
        {agent.currentTask && (
          <div className="rounded bg-slate-900/50 p-3 text-sm">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Current Task
            </p>
            <p className="text-slate-200">{agent.currentTask}</p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-700/50 pt-3 text-xs text-slate-400">
          <span>
            {agent.lastActive && `Last active: ${agent.lastActive}`}
          </span>
        </div>
      </div>
    </div>
  );
}
