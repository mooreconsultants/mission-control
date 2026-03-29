'use client';

import { useMemo } from 'react';
import { agents } from '@/data/agents';
import { TeamSection } from '@/components/TeamSection';

export default function Home() {
  const groupedAgents = useMemo(() => {
    return {
      orchestrator: agents.filter((a) => a.group === 'orchestrator'),
      operations: agents.filter((a) => a.group === 'operations'),
      content: agents.filter((a) => a.group === 'content'),
      meta: agents.filter((a) => a.group === 'meta'),
    };
  }, []);

  const totalAgents = agents.length;
  const onlineAgents = agents.filter((a) => a.status === 'online').length;
  const workingAgents = agents.filter((a) => a.status === 'working').length;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-6 text-center">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
              Mission Control
            </h1>
            <p className="text-xl text-slate-300">
              Your Autonomous Multi-Agent Team Dashboard
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400">{totalAgents}</div>
              <div className="text-sm text-slate-400">Total Agents</div>
            </div>
            <div className="h-12 w-px bg-slate-700" />
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-400">{onlineAgents}</div>
              <div className="text-sm text-slate-400">Online</div>
            </div>
            <div className="h-12 w-px bg-slate-700" />
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-400">{workingAgents}</div>
              <div className="text-sm text-slate-400">Working</div>
            </div>
          </div>

          {/* Description */}
          <p className="mx-auto max-w-2xl text-slate-400">
            Meet your autonomous team working 24/7 to execute your vision. Each agent specializes in their role,
            working independently yet coordinated through Henry, your Chief of Staff.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

        {/* Orchestrator */}
        <div>
          <TeamSection group="orchestrator" agents={agents.filter((a) => a.group === 'orchestrator')} />
        </div>

        {/* Content Pipeline Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-slate-200">
              The Autonomous Organization
            </h2>
            <p className="mt-2 text-slate-400">
              Three specialized teams working in harmony
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Operations */}
            <div>
              <TeamSection group="operations" agents={agents.filter((a) => a.group === 'operations')} />
            </div>

            {/* Content Pipeline */}
            <div>
              <TeamSection group="content" agents={agents.filter((a) => a.group === 'content')} />
            </div>

            {/* Meta Layer */}
            <div>
              <TeamSection group="meta" agents={agents.filter((a) => a.group === 'meta')} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-700/50 pt-8 text-center">
          <p className="text-sm text-slate-500">
            Powered by <span className="font-semibold text-slate-400">OpenClaw</span>
          </p>
          <p className="mt-2 text-xs text-slate-600">
            This dashboard is powered by an autonomous multi-agent system. Each agent is an AI that specializes in
            their role and works independently while coordinated through a central orchestrator.
          </p>
        </div>
      </div>
    </main>
  );
}
