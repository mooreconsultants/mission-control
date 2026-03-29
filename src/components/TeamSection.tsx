import { Agent, AgentGroup, groupNames, groupDescriptions } from '@/data/agents';
import { AgentCard } from './AgentCard';

interface TeamSectionProps {
  group: AgentGroup;
  agents: Agent[];
}

const groupColors: Record<AgentGroup, { border: string; text: string; bg: string }> = {
  orchestrator: {
    border: 'border-amber-500/50',
    text: 'text-amber-400',
    bg: 'from-amber-500/10 to-orange-500/10',
  },
  operations: {
    border: 'border-blue-500/50',
    text: 'text-blue-400',
    bg: 'from-blue-500/10 to-cyan-500/10',
  },
  content: {
    border: 'border-purple-500/50',
    text: 'text-purple-400',
    bg: 'from-purple-500/10 to-pink-500/10',
  },
  meta: {
    border: 'border-green-500/50',
    text: 'text-green-400',
    bg: 'from-green-500/10 to-emerald-500/10',
  },
};

export function TeamSection({ group, agents }: TeamSectionProps) {
  const colors = groupColors[group];

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className={`rounded-lg border ${colors.border} bg-gradient-to-r ${colors.bg} p-4`}>
        <h2 className={`text-xl font-bold ${colors.text}`}>{groupNames[group]}</h2>
        <p className="mt-1 text-sm text-slate-300">{groupDescriptions[group]}</p>
      </div>

      {/* Agent Cards Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </section>
  );
}
