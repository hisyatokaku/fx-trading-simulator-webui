import React, { useState } from 'react';
import type { Data, Layout, Config } from 'plotly.js';
import Plot from './Plot';
import { ScenarioData } from '../types/api';
import { Check, ChevronDown } from 'lucide-react';
import { formatDateTimeUtc } from '../utils/datetime';

interface FXRatesChartProps {
  scenarioData: ScenarioData | null;
  loading: boolean;
  selectedScenario: string | null;
}

const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'];

const FXRatesChart: React.FC<FXRatesChartProps> = ({ scenarioData, loading, selectedScenario }) => {
  const [selectedPairs, setSelectedPairs] = useState<string[]>(['USD/JPY', 'EUR/JPY']);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  React.useEffect(() => {
    if (!selectedScenario || !scenarioData) {
      setIsDropdownOpen(false);
    }
  }, [selectedScenario, scenarioData]);

  // Check if current scenario should hide FX rates
  const hiddenScenarios = ['Feb_Apr_2017', 'Jun_Aug_2017'];
  const shouldHideRates = selectedScenario && hiddenScenarios.includes(selectedScenario);

  // Get all available currency pairs
  const availablePairs = React.useMemo(() => {
    if (!scenarioData || shouldHideRates) return [];

    const pairs = new Set<string>();
    Object.values(scenarioData.dateToCurrencyPairToRate).forEach(rates => {
      Object.keys(rates).forEach(pair => pairs.add(pair));
    });

    return Array.from(pairs).sort((a, b) => {
      const quoteCurrencyA = a.split('/')[1] || '';
      const quoteCurrencyB = b.split('/')[1] || '';

      if (quoteCurrencyA === 'JPY' && quoteCurrencyB !== 'JPY') return -1;
      if (quoteCurrencyA !== 'JPY' && quoteCurrencyB === 'JPY') return 1;

      if (quoteCurrencyA === quoteCurrencyB) {
        return a.localeCompare(b);
      }
      return quoteCurrencyA.localeCompare(quoteCurrencyB);
    });
  }, [scenarioData, shouldHideRates]);

  // Prepare chart data
  const chartData = React.useMemo(() => {
    if (!scenarioData || shouldHideRates) return [];

    const sortedDates = Object.keys(scenarioData.dateToCurrencyPairToRate).sort();

    return sortedDates.map(date => {
      const dataPoint: Record<string, string | number> = { date };
      const rates = scenarioData.dateToCurrencyPairToRate[date];

      selectedPairs.forEach(pair => {
        if (rates[pair] !== undefined) {
          dataPoint[pair] = rates[pair];
        }
      });

      return dataPoint;
    });
  }, [scenarioData, selectedPairs, shouldHideRates]);

  // Calculate Y-axis range with a rounded upper bound and zero start
  const yAxisRange = React.useMemo<[number, number] | null>(() => {
    if (chartData.length === 0 || selectedPairs.length === 0) {
      return null;
    }

    let min = Infinity;
    let max = -Infinity;

    chartData.forEach(dataPoint => {
      selectedPairs.forEach(pair => {
        const value = dataPoint[pair];
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
    const rangeMin = Math.floor(min - margin);
    const rangeMax = Math.ceil(max + margin);

    return [rangeMin, rangeMax];
  }, [chartData, selectedPairs]);

  const traces = React.useMemo<Data[]>(() => {
    const x = chartData.map(dataPoint => formatDateTimeUtc(String(dataPoint.date)));

    return selectedPairs.map((pair, index) => {
      const color = colors[index % colors.length];
      return {
        type: 'scatter',
        mode: 'lines+markers',
        name: pair,
        x,
        y: chartData.map(dataPoint => {
          const value = dataPoint[pair];
          return typeof value === 'number' ? value : null;
        }),
        line: { color, width: 2, shape: 'linear' },
        marker: { color, size: 6 },
        hovertemplate: '%{y:.4f}<extra>%{fullData.name}</extra>',
      };
    });
  }, [chartData, selectedPairs]);

  const layout = React.useMemo<Partial<Layout>>(() => ({
    autosize: true,
    margin: { l: 60, r: 30, t: 10, b: 60 },
    dragmode: 'zoom',
    hovermode: 'x unified',
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    font: { family: 'ui-sans-serif, system-ui, sans-serif', size: 12, color: '#64748b' },
    legend: { orientation: 'h', x: 0.5, xanchor: 'center', y: -0.25 },
    xaxis: { type: 'date', gridcolor: '#e2e8f0', griddash: 'dash', linecolor: '#64748b', zeroline: false },
    yaxis: {
      tickformat: '.4f',
      gridcolor: '#e2e8f0',
      griddash: 'dash',
      linecolor: '#64748b',
      zeroline: false,
      ...(yAxisRange ? { range: yAxisRange } : { autorange: true }),
    },
    // Keep the user's zoom when data updates for the same pairs
    uirevision: `${selectedScenario ?? ''}|${selectedPairs.join(',')}`,
  }), [yAxisRange, selectedScenario, selectedPairs]);

  const config: Partial<Config> = {
    responsive: true,
    displaylogo: false,
    scrollZoom: false,
    doubleClick: 'reset',
    modeBarButtonsToRemove: ['lasso2d', 'select2d', 'autoScale2d'],
  };

  const handlePairToggle = (pair: string) => {
    setSelectedPairs(prev => {
      if (prev.includes(pair)) {
        return prev.filter(p => p !== pair);
      } else {
        return [...prev, pair];
      }
    });
  };

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading FX rates...</p>
        </div>
      </div>
    );
  }

  if (!scenarioData || chartData.length === 0) {
    const message = shouldHideRates
      ? "No FX rates displayed for evaluation scenario"
      : "No FX rates data";
    const subMessage = shouldHideRates
      ? ""
      : "Select a scenario to view rates";

    return (
      <div className="h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
            <div className="w-8 h-8 border-2 border-slate-300 rounded"></div>
          </div>
          <p className="text-slate-600 mb-2">{message}</p>
          {subMessage && <p className="text-sm text-slate-500">{subMessage}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Currency Pair Selector */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center justify-between w-full px-4 py-2 text-left bg-white border border-slate-300 rounded-lg hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <span className="text-sm text-slate-700">
            {selectedPairs.length === 0
              ? 'Select currency pairs'
              : `${selectedPairs.length} pair${selectedPairs.length > 1 ? 's' : ''} selected`
            }
          </span>
          <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {isDropdownOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-slate-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            <div className="p-2">
              {availablePairs.map(pair => (
                <label
                  key={pair}
                  className="flex items-center space-x-3 p-2 hover:bg-slate-50 rounded cursor-pointer"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={selectedPairs.includes(pair)}
                      onChange={() => handlePairToggle(pair)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${selectedPairs.includes(pair)
                      ? 'bg-blue-600 border-blue-600'
                      : 'border-slate-300'
                      }`}>
                      {selectedPairs.includes(pair) && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-slate-700">{pair}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="h-80">
        {selectedPairs.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <p className="text-slate-600 mb-2">Select currency pairs to view rates</p>
              <p className="text-sm text-slate-500">Choose from the dropdown above</p>
            </div>
          </div>
        ) : (
          <Plot
            data={traces}
            layout={layout}
            config={config}
            useResizeHandler
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </div>
    </div>
  );
};

export default FXRatesChart;