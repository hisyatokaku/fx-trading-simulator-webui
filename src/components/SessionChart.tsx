import React from 'react';
import type { Data, Layout, Config } from 'plotly.js';
import Plot from './Plot';
import { SessionDetail, ScenarioData } from '../types/api';
import { calculateJPYEquivalent } from '../utils/currency';
import { formatDateTimeUtc } from '../utils/datetime';

interface SessionChartProps {
  sessions: SessionDetail[];
  scenarioData: ScenarioData | null;
  loading: boolean;
}

const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const SessionChart: React.FC<SessionChartProps> = ({ sessions, scenarioData, loading }) => {
  // Prepare chart data
  const chartData = React.useMemo(() => {
    if (sessions.length === 0 || !scenarioData) return [];

    // Get all unique dates from all sessions
    const allDates = new Set<string>();
    sessions.forEach(session => {
      Object.keys(session.dateToBalances).forEach(date => allDates.add(date));
    });

    // Sort dates
    const sortedDates = Array.from(allDates).sort();

    // Create data points for each date
    return sortedDates.map(date => {
      const dataPoint: Record<string, string | number> = { date };
      
      sessions.forEach(session => {
        const balances = session.dateToBalances[date];
        const rates = scenarioData.dateToCurrencyPairToRate[date];
        
        if (balances && rates) {
          const jpyEquivalent = calculateJPYEquivalent(balances, rates);
          dataPoint[`Session ${session.sessionId}`] = jpyEquivalent;
        }
      });

      return dataPoint;
    });
  }, [sessions, scenarioData]);

  // Calculate Y-axis range with a rounded upper bound and zero start
  const yAxisRange = React.useMemo<[number, number] | null>(() => {
    if (chartData.length === 0 || sessions.length === 0) {
      return null;
    }

    let min = Infinity;
    let max = -Infinity;

    chartData.forEach(dataPoint => {
      sessions.forEach(session => {
        const value = dataPoint[`Session ${session.sessionId}`];
        if (typeof value === 'number') {
          min = Math.min(min, value);
          max = Math.max(max, value);
        }
      });
    });

    if (min === Infinity || max === -Infinity) {
      return null;
    }

    const range = max - min;
    const margin = range * 0.1;
    const rangeMin = Math.floor((min - margin) / 1000) * 1000;
    const rangeMax = Math.ceil((max + margin) / 1000) * 1000;

    return [rangeMin, rangeMax];
  }, [chartData, sessions]);

  const traces = React.useMemo<Data[]>(() => {
    const x = chartData.map(dataPoint => formatDateTimeUtc(String(dataPoint.date)));

    return sessions.map((session, index) => {
      const key = `Session ${session.sessionId}`;
      const color = colors[index % colors.length];
      return {
        type: 'scatter',
        mode: 'lines+markers',
        name: key,
        x,
        y: chartData.map(dataPoint => {
          const value = dataPoint[key];
          return typeof value === 'number' ? value : null;
        }),
        connectgaps: true,
        line: { color, width: 2, shape: 'linear' },
        marker: { color, size: 8 },
        hovertemplate: '¥%{y:,.0f}<extra>%{fullData.name}</extra>',
      };
    });
  }, [chartData, sessions]);

  const layout = React.useMemo<Partial<Layout>>(() => ({
    autosize: true,
    margin: { l: 70, r: 30, t: 10, b: 60 },
    dragmode: 'zoom',
    hovermode: 'x unified',
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    font: { family: 'ui-sans-serif, system-ui, sans-serif', size: 12, color: '#64748b' },
    legend: { orientation: 'h', x: 0.5, xanchor: 'center', y: -0.2 },
    xaxis: { type: 'date', gridcolor: '#e2e8f0', griddash: 'dash', linecolor: '#64748b', zeroline: false },
    yaxis: {
      tickprefix: '¥',
      tickformat: ',.0f',
      gridcolor: '#e2e8f0',
      griddash: 'dash',
      linecolor: '#64748b',
      zeroline: false,
      ...(yAxisRange ? { range: yAxisRange } : { autorange: true }),
    },
    // Keep the user's zoom when data updates for the same set of sessions
    uirevision: sessions.map(session => session.sessionId).join(','),
  }), [yAxisRange, sessions]);

  const config: Partial<Config> = {
    responsive: true,
    displaylogo: false,
    scrollZoom: false,
    doubleClick: 'reset',
    modeBarButtonsToRemove: ['lasso2d', 'select2d', 'autoScale2d'],
  };

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading chart data...</p>
        </div>
      </div>
    );
  }

  if (sessions.length === 0 || chartData.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
            <div className="w-8 h-8 border-2 border-slate-300 rounded"></div>
          </div>
          <p className="text-slate-600 mb-2">No data to display</p>
          <p className="text-sm text-slate-500">Select sessions to view chart</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-96">
      <Plot
        data={traces}
        layout={layout}
        config={config}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default SessionChart;
