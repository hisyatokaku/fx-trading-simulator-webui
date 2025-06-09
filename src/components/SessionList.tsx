import React from 'react';
import { SessionInfo } from '../types/api';
import { Calendar, TrendingUp, TrendingDown, CheckCircle, Clock } from 'lucide-react';

interface SessionListProps {
  sessions: SessionInfo[];
  selectedSessions: number[];
  selectedScenario: string | null;
  onSessionSelect: (sessionId: number) => void;
  onScenarioChange: (scenario: string) => void;
  loading: boolean;
}

const SessionList: React.FC<SessionListProps> = ({
  sessions,
  selectedSessions,
  selectedScenario,
  onSessionSelect,
  onScenarioChange,
  loading
}) => {
  // Group sessions by scenario
  const sessionsByScenario = sessions.reduce((acc, session) => {
    if (!acc[session.scenario]) {
      acc[session.scenario] = [];
    }
    acc[session.scenario].push(session);
    return acc;
  }, {} as Record<string, SessionInfo[]>);

  const scenarios = Object.keys(sessionsByScenario);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading sessions...</p>
        </div>
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <TrendingUp className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600 mb-2">No trading sessions found</p>
          <p className="text-sm text-slate-500">Try a different user ID</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Trading Sessions</h2>
        
        {/* Scenario Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Scenario</label>
          <select
            value={selectedScenario || ''}
            onChange={(e) => onScenarioChange(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a scenario</option>
            {scenarios.map(scenario => (
              <option key={scenario} value={scenario}>
                {scenario} ({sessionsByScenario[scenario].length} sessions)
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {selectedScenario && (
          <div className="p-6">
            <div className="space-y-3">
              {sessionsByScenario[selectedScenario].map(session => {
                const isSelected = selectedSessions.includes(session.sessionId);
                const profit = session.jpyBalance - 1000000;
                const isProfit = profit > 0;

                return (
                  <div
                    key={session.sessionId}
                    onClick={() => onSessionSelect(session.sessionId)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:shadow-md ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-slate-900">
                            Session {session.sessionId}
                          </span>
                          {session.complete ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Clock className="h-4 w-4 text-amber-500" />
                          )}
                        </div>
                        <div className="flex items-center text-sm text-slate-600 space-x-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(session.startDate)} - {formatDate(session.endDate)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-slate-900">
                          {formatCurrency(session.jpyBalance)}
                        </div>
                        <div className={`flex items-center text-sm ${
                          isProfit ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {isProfit ? (
                            <TrendingUp className="h-3 w-3 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 mr-1" />
                          )}
                          <span>{isProfit ? '+' : ''}{formatCurrency(profit)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {!selectedScenario && (
          <div className="p-6 text-center text-slate-500">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-slate-400" />
            <p>Select a scenario to view sessions</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionList;