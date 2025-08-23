import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ScenarioData } from '../types/api';
import { Check, ChevronDown } from 'lucide-react';

interface FXRatesChartProps {
  scenarioData: ScenarioData | null;
  loading: boolean;
  selectedScenario: string | null;
}

const FXRatesChart: React.FC<FXRatesChartProps> = ({ scenarioData, loading, selectedScenario }) => {
  const [selectedPairs, setSelectedPairs] = useState<string[]>(['USD/JPY', 'EUR/JPY']);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'];

  // Check if current scenario should hide FX rates
  const hiddenScenarios = ['Feb_Apr_2017', 'Jun_Aug_2017', 'Feb_Apr_2017_wit_commission'];
  const shouldHideRates = selectedScenario && hiddenScenarios.includes(selectedScenario);

  // Get all available currency pairs
  const availablePairs = React.useMemo(() => {
    if (!scenarioData || shouldHideRates) return [];
    
    const pairs = new Set<string>();
    Object.values(scenarioData.dateToCurrencyPairToRate).forEach(rates => {
      Object.keys(rates).forEach(pair => pairs.add(pair));
    });
    
    return Array.from(pairs).sort();
  }, [scenarioData, shouldHideRates]);

  // Prepare chart data
  const chartData = React.useMemo(() => {
    if (!scenarioData || shouldHideRates) return [];

    const sortedDates = Object.keys(scenarioData.dateToCurrencyPairToRate).sort();

    return sortedDates.map(date => {
      const dataPoint: any = { date };
      const rates = scenarioData.dateToCurrencyPairToRate[date];
      
      selectedPairs.forEach(pair => {
        if (rates[pair] !== undefined) {
          dataPoint[pair] = rates[pair];
        }
      });

      return dataPoint;
    });
  }, [scenarioData, selectedPairs, shouldHideRates]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const formatRate = (value: number) => {
    return value.toFixed(4);
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
                    <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                      selectedPairs.includes(pair) 
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
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                stroke="#64748b"
                fontSize={12}
              />
              <YAxis 
                tickFormatter={formatRate}
                stroke="#64748b"
                fontSize={12}
              />
              <Tooltip
                formatter={(value: number, name: string) => [
                  formatRate(value),
                  name
                ]}
                labelFormatter={(label) => `Date: ${formatDate(label)}`}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              {selectedPairs.map((pair, index) => (
                <Line
                  key={pair}
                  type="monotone"
                  dataKey={pair}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={{ fill: colors[index % colors.length], strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5, stroke: colors[index % colors.length], strokeWidth: 2 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default FXRatesChart;