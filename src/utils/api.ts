import { SessionInfo, SessionDetail, ScenarioData } from '../types/api';

// API Configuration - Using CORS proxy for HTTP access
const API_BASE_URL = 'https://cors-anywhere.herokuapp.com/http://os3-389-27987.vs.sakura.ne.jp';

// Mock API data - used when API_BASE_URL is not configured
const mockSessionsData: Record<string, SessionInfo[]> = {
  'user123': [
    {
      sessionId: 9822,
      startDate: "2016-01-04",
      endDate: "2016-01-11",
      jpyBalance: 1000000,
      scenario: "TEST0",
      complete: false
    },
    {
      sessionId: 9490,
      startDate: "2016-01-04",
      endDate: "2016-01-11",
      jpyBalance: 999814.7663383546,
      scenario: "TEST0",
      complete: true
    },
    {
      sessionId: 9491,
      startDate: "2016-01-12",
      endDate: "2016-01-19",
      jpyBalance: 1001234.56,
      scenario: "TEST1",
      complete: true
    },
    {
      sessionId: 9492,
      startDate: "2016-01-20",
      endDate: "2016-01-27",
      jpyBalance: 998765.43,
      scenario: "TEST1",
      complete: true
    }
  ]
};

const mockSessionDetails: Record<number, SessionDetail> = {
  9822: {
    sessionId: 9822,
    startDate: "2016-01-04",
    endDate: "2016-01-11",
    jpyBalance: 1000000,
    scenario: "TEST0",
    dateToBalances: {
      "2016-01-04": { JPY: 1000000, EUR: 0, HKD: 0, USD: 0, AUD: 0 },
      "2016-01-05": { JPY: 998500, EUR: 0, HKD: 0, USD: 12.5, AUD: 8.2 },
      "2016-01-06": { JPY: 997000, EUR: 0, HKD: 0, USD: 25.1, AUD: 16.8 },
      "2016-01-07": { JPY: 995500, EUR: 0, HKD: 0, USD: 37.8, AUD: 25.5 },
      "2016-01-08": { JPY: 994000, EUR: 0, HKD: 0, USD: 50.2, AUD: 34.1 }
    },
    complete: false
  },
  9490: {
    sessionId: 9490,
    startDate: "2016-01-04",
    endDate: "2016-01-11",
    jpyBalance: 999814.7663383546,
    scenario: "TEST0",
    dateToBalances: {
      "2016-01-04": { JPY: 1000000, EUR: 0, HKD: 0, USD: 0, AUD: 0 },
      "2016-01-05": { JPY: 998000, EUR: 0, HKD: 0, USD: 8.30564784053156, AUD: 11.415525114155253 },
      "2016-01-06": { JPY: 996000, EUR: 0, HKD: 0, USD: 16.689985897042, AUD: 23.08277514332338 },
      "2016-01-07": { JPY: 994000, EUR: 0, HKD: 0, USD: 25.0905235314506, AUD: 34.79923677191155 },
      "2016-01-08": { JPY: 992000, EUR: 0, HKD: 0, USD: 33.517963275256434, AUD: 46.713927585684935 },
      "2016-01-11": { JPY: 990000, EUR: 0, HKD: 0, USD: 42.0026060717947, AUD: 58.78102062297225 }
    },
    complete: true
  },
  9491: {
    sessionId: 9491,
    startDate: "2016-01-12",
    endDate: "2016-01-19",
    jpyBalance: 1001234.56,
    scenario: "TEST1",
    dateToBalances: {
      "2016-01-12": { JPY: 1000000, EUR: 15.5, HKD: 0, USD: 0, AUD: 0 },
      "2016-01-13": { JPY: 998500, EUR: 31.2, HKD: 0, USD: 5.5, AUD: 0 },
      "2016-01-14": { JPY: 997000, EUR: 47.8, HKD: 0, USD: 11.2, AUD: 7.8 },
      "2016-01-15": { JPY: 995500, EUR: 64.1, HKD: 0, USD: 16.8, AUD: 15.6 },
      "2016-01-19": { JPY: 994000, EUR: 80.5, HKD: 0, USD: 22.4, AUD: 23.4 }
    },
    complete: true
  },
  9492: {
    sessionId: 9492,
    startDate: "2016-01-20",
    endDate: "2016-01-27",
    jpyBalance: 998765.43,
    scenario: "TEST1",
    dateToBalances: {
      "2016-01-20": { JPY: 1000000, EUR: 0, HKD: 12.5, USD: 0, AUD: 0 },
      "2016-01-21": { JPY: 998000, EUR: 8.2, HKD: 25.8, USD: 3.1, AUD: 0 },
      "2016-01-22": { JPY: 996000, EUR: 16.5, HKD: 39.2, USD: 6.3, AUD: 4.7 },
      "2016-01-25": { JPY: 994000, EUR: 24.8, HKD: 52.6, USD: 9.4, AUD: 9.4 },
      "2016-01-27": { JPY: 992000, EUR: 33.1, HKD: 66.0, USD: 12.6, AUD: 14.1 }
    },
    complete: true
  }
};

const mockScenarioData: Record<string, ScenarioData> = {
  'TEST0': {
    startDate: "2016-01-04",
    endDate: "2016-01-11",
    dateToCurrencyPairToRate: {
      "2016-01-04": {
        "EUR/JPY": 130.0, "USD/JPY": 120.0, "AUD/JPY": 85.0, "HKD/JPY": 15.5,
        "JPY/EUR": 0.0077, "JPY/USD": 0.0083, "JPY/AUD": 0.0118, "JPY/HKD": 0.0645,
        "EUR/USD": 1.08, "USD/EUR": 0.925, "EUR/AUD": 1.53, "AUD/EUR": 0.654,
        "USD/AUD": 1.41, "AUD/USD": 0.709, "EUR/HKD": 8.39, "HKD/EUR": 0.119,
        "USD/HKD": 7.75, "HKD/USD": 0.129, "AUD/HKD": 5.49, "HKD/AUD": 0.182
      },
      "2016-01-05": {
        "EUR/JPY": 129.17, "USD/JPY": 119.27, "AUD/JPY": 85.71, "HKD/JPY": 15.39,
        "JPY/EUR": 0.0077, "JPY/USD": 0.0084, "JPY/AUD": 0.0117, "JPY/HKD": 0.065,
        "EUR/USD": 1.083, "USD/EUR": 0.923, "EUR/AUD": 1.507, "AUD/EUR": 0.664,
        "USD/AUD": 1.392, "AUD/USD": 0.719, "EUR/HKD": 8.393, "HKD/EUR": 0.119,
        "USD/HKD": 7.75, "HKD/USD": 0.129, "AUD/HKD": 5.569, "HKD/AUD": 0.180
      },
      "2016-01-06": {
        "EUR/JPY": 128.5, "USD/JPY": 118.5, "AUD/JPY": 84.2, "HKD/JPY": 15.2,
        "JPY/EUR": 0.0078, "JPY/USD": 0.0084, "JPY/AUD": 0.0119, "JPY/HKD": 0.066,
        "EUR/USD": 1.085, "USD/EUR": 0.922, "EUR/AUD": 1.526, "AUD/EUR": 0.655,
        "USD/AUD": 1.407, "AUD/USD": 0.711, "EUR/HKD": 8.46, "HKD/EUR": 0.118,
        "USD/HKD": 7.80, "HKD/USD": 0.128, "AUD/HKD": 5.54, "HKD/AUD": 0.181
      },
      "2016-01-07": {
        "EUR/JPY": 127.8, "USD/JPY": 117.8, "AUD/JPY": 83.5, "HKD/JPY": 15.0,
        "JPY/EUR": 0.0078, "JPY/USD": 0.0085, "JPY/AUD": 0.0120, "JPY/HKD": 0.067,
        "EUR/USD": 1.085, "USD/EUR": 0.922, "EUR/AUD": 1.530, "AUD/EUR": 0.654,
        "USD/AUD": 1.410, "AUD/USD": 0.709, "EUR/HKD": 8.52, "HKD/EUR": 0.117,
        "USD/HKD": 7.85, "HKD/USD": 0.127, "AUD/HKD": 5.57, "HKD/AUD": 0.180
      },
      "2016-01-08": {
        "EUR/JPY": 127.2, "USD/JPY": 117.2, "AUD/JPY": 82.8, "HKD/JPY": 14.8,
        "JPY/EUR": 0.0079, "JPY/USD": 0.0085, "JPY/AUD": 0.0121, "JPY/HKD": 0.068,
        "EUR/USD": 1.085, "USD/EUR": 0.922, "EUR/AUD": 1.536, "AUD/EUR": 0.651,
        "USD/AUD": 1.415, "AUD/USD": 0.707, "EUR/HKD": 8.60, "HKD/EUR": 0.116,
        "USD/HKD": 7.92, "HKD/USD": 0.126, "AUD/HKD": 5.60, "HKD/AUD": 0.179
      },
      "2016-01-11": {
        "EUR/JPY": 128.42, "USD/JPY": 117.85, "AUD/JPY": 82.76, "HKD/JPY": 15.19,
        "JPY/EUR": 0.0078, "JPY/USD": 0.0085, "JPY/AUD": 0.0121, "JPY/HKD": 0.066,
        "EUR/USD": 1.090, "USD/EUR": 0.918, "EUR/AUD": 1.552, "AUD/EUR": 0.644,
        "USD/AUD": 1.424, "AUD/USD": 0.702, "EUR/HKD": 8.451, "HKD/EUR": 0.118,
        "USD/HKD": 7.756, "HKD/USD": 0.129, "AUD/HKD": 5.447, "HKD/AUD": 0.184
      }
    }
  },
  'TEST1': {
    startDate: "2016-01-12",
    endDate: "2016-01-27",
    dateToCurrencyPairToRate: {
      "2016-01-12": {
        "EUR/JPY": 128.0, "USD/JPY": 118.0, "AUD/JPY": 83.0, "HKD/JPY": 15.1,
        "JPY/EUR": 0.0078, "JPY/USD": 0.0085, "JPY/AUD": 0.0120, "JPY/HKD": 0.066,
        "EUR/USD": 1.085, "USD/EUR": 0.922, "EUR/AUD": 1.542, "AUD/EUR": 0.649,
        "USD/AUD": 1.422, "AUD/USD": 0.704, "EUR/HKD": 8.48, "HKD/EUR": 0.118,
        "USD/HKD": 7.82, "HKD/USD": 0.128, "AUD/HKD": 5.50, "HKD/AUD": 0.182
      },
      "2016-01-13": {
        "EUR/JPY": 127.5, "USD/JPY": 117.5, "AUD/JPY": 82.5, "HKD/JPY": 15.0,
        "JPY/EUR": 0.0078, "JPY/USD": 0.0085, "JPY/AUD": 0.0121, "JPY/HKD": 0.067,
        "EUR/USD": 1.085, "USD/EUR": 0.922, "EUR/AUD": 1.546, "AUD/EUR": 0.647,
        "USD/AUD": 1.424, "AUD/USD": 0.702, "EUR/HKD": 8.50, "HKD/EUR": 0.118,
        "USD/HKD": 7.83, "HKD/USD": 0.128, "AUD/HKD": 5.50, "HKD/AUD": 0.182
      },
      "2016-01-14": {
        "EUR/JPY": 127.0, "USD/JPY": 117.0, "AUD/JPY": 82.0, "HKD/JPY": 14.9,
        "JPY/EUR": 0.0079, "JPY/USD": 0.0085, "JPY/AUD": 0.0122, "JPY/HKD": 0.067,
        "EUR/USD": 1.085, "USD/EUR": 0.922, "EUR/AUD": 1.549, "AUD/EUR": 0.646,
        "USD/AUD": 1.427, "AUD/USD": 0.701, "EUR/HKD": 8.53, "HKD/EUR": 0.117,
        "USD/HKD": 7.86, "HKD/USD": 0.127, "AUD/HKD": 5.51, "HKD/AUD": 0.181
      },
      "2016-01-15": {
        "EUR/JPY": 126.5, "USD/JPY": 116.5, "AUD/JPY": 81.5, "HKD/JPY": 14.8,
        "JPY/EUR": 0.0079, "JPY/USD": 0.0086, "JPY/AUD": 0.0123, "JPY/HKD": 0.068,
        "EUR/USD": 1.086, "USD/EUR": 0.921, "EUR/AUD": 1.552, "AUD/EUR": 0.644,
        "USD/AUD": 1.429, "AUD/USD": 0.700, "EUR/HKD": 8.55, "HKD/EUR": 0.117,
        "USD/HKD": 7.87, "HKD/USD": 0.127, "AUD/HKD": 5.51, "HKD/AUD": 0.181
      },
      "2016-01-19": {
        "EUR/JPY": 126.0, "USD/JPY": 116.0, "AUD/JPY": 81.0, "HKD/JPY": 14.7,
        "JPY/EUR": 0.0079, "JPY/USD": 0.0086, "JPY/AUD": 0.0123, "JPY/HKD": 0.068,
        "EUR/USD": 1.086, "USD/EUR": 0.921, "EUR/AUD": 1.556, "AUD/EUR": 0.643,
        "USD/AUD": 1.432, "AUD/USD": 0.698, "EUR/HKD": 8.57, "HKD/EUR": 0.117,
        "USD/HKD": 7.89, "HKD/USD": 0.127, "AUD/HKD": 5.51, "HKD/AUD": 0.181
      },
      "2016-01-20": {
        "EUR/JPY": 125.5, "USD/JPY": 115.5, "AUD/JPY": 80.5, "HKD/JPY": 14.6,
        "JPY/EUR": 0.0080, "JPY/USD": 0.0087, "JPY/AUD": 0.0124, "JPY/HKD": 0.068,
        "EUR/USD": 1.087, "USD/EUR": 0.920, "EUR/AUD": 1.559, "AUD/EUR": 0.641,
        "USD/AUD": 1.434, "AUD/USD": 0.697, "EUR/HKD": 8.60, "HKD/EUR": 0.116,
        "USD/HKD": 7.91, "HKD/USD": 0.126, "AUD/HKD": 5.52, "HKD/AUD": 0.181
      },
      "2016-01-21": {
        "EUR/JPY": 125.0, "USD/JPY": 115.0, "AUD/JPY": 80.0, "HKD/JPY": 14.5,
        "JPY/EUR": 0.0080, "JPY/USD": 0.0087, "JPY/AUD": 0.0125, "JPY/HKD": 0.069,
        "EUR/USD": 1.087, "USD/EUR": 0.920, "EUR/AUD": 1.563, "AUD/EUR": 0.640,
        "USD/AUD": 1.438, "AUD/USD": 0.696, "EUR/HKD": 8.62, "HKD/EUR": 0.116,
        "USD/HKD": 7.93, "HKD/USD": 0.126, "AUD/HKD": 5.52, "HKD/AUD": 0.181
      },
      "2016-01-22": {
        "EUR/JPY": 124.5, "USD/JPY": 114.5, "AUD/JPY": 79.5, "HKD/JPY": 14.4,
        "JPY/EUR": 0.0080, "JPY/USD": 0.0087, "JPY/AUD": 0.0126, "JPY/HKD": 0.069,
        "EUR/USD": 1.087, "USD/EUR": 0.920, "EUR/AUD": 1.566, "AUD/EUR": 0.638,
        "USD/AUD": 1.440, "AUD/USD": 0.694, "EUR/HKD": 8.65, "HKD/EUR": 0.116,
        "USD/HKD": 7.95, "HKD/USD": 0.126, "AUD/HKD": 5.52, "HKD/AUD": 0.181
      },
      "2016-01-25": {
        "EUR/JPY": 124.0, "USD/JPY": 114.0, "AUD/JPY": 79.0, "HKD/JPY": 14.3,
        "JPY/EUR": 0.0081, "JPY/USD": 0.0088, "JPY/AUD": 0.0127, "JPY/HKD": 0.070,
        "EUR/USD": 1.088, "USD/EUR": 0.919, "EUR/AUD": 1.570, "AUD/EUR": 0.637,
        "USD/AUD": 1.443, "AUD/USD": 0.693, "EUR/HKD": 8.67, "HKD/EUR": 0.115,
        "USD/HKD": 7.97, "HKD/USD": 0.125, "AUD/HKD": 5.52, "HKD/AUD": 0.181
      },
      "2016-01-27": {
        "EUR/JPY": 123.5, "USD/JPY": 113.5, "AUD/JPY": 78.5, "HKD/JPY": 14.2,
        "JPY/EUR": 0.0081, "JPY/USD": 0.0088, "JPY/AUD": 0.0127, "JPY/HKD": 0.070,
        "EUR/USD": 1.088, "USD/EUR": 0.919, "EUR/AUD": 1.573, "AUD/EUR": 0.636,
        "USD/AUD": 1.446, "AUD/USD": 0.692, "EUR/HKD": 8.70, "HKD/EUR": 0.115,
        "USD/HKD": 7.99, "HKD/USD": 0.125, "AUD/HKD": 5.53, "HKD/AUD": 0.181
      }
    }
  }
};

// Helper function to make API requests
const makeApiRequest = async (endpoint: string) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    }
  });
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};

export const fetchUserSessions = async (userId: string): Promise<SessionInfo[]> => {
  if (API_BASE_URL) {
    // Use real API
    try {
      console.log(`Making API request to: ${API_BASE_URL}/sessions/userId/${userId}`);
      return await makeApiRequest(`/sessions/userId/${userId}`);
    } catch (error) {
      console.error('API request failed, falling back to mock data:', error);
      // Fall back to mock data if API fails
    }
  }
  
  // Use mock data
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockSessionsData[userId] || [];
};

export const fetchSessionDetail = async (sessionId: number): Promise<SessionDetail> => {
  if (API_BASE_URL) {
    // Use real API
    try {
      console.log(`Making API request to: ${API_BASE_URL}/session/sessionId/${sessionId}`);
      return await makeApiRequest(`/session/sessionId/${sessionId}`);
    } catch (error) {
      console.error('API request failed, falling back to mock data:', error);
      // Fall back to mock data if API fails
    }
  }
  
  // Use mock data
  await new Promise(resolve => setTimeout(resolve, 200));
  const detail = mockSessionDetails[sessionId];
  if (!detail) {
    throw new Error(`Session ${sessionId} not found`);
  }
  return detail;
};

export const fetchScenarioData = async (scenario: string): Promise<ScenarioData> => {
  if (API_BASE_URL) {
    // Use real API
    try {
      console.log(`Making API request to: ${API_BASE_URL}/scenario/${scenario}`);
      return await makeApiRequest(`/scenario/${scenario}`);
    } catch (error) {
      console.error('API request failed, falling back to mock data:', error);
      // Fall back to mock data if API fails
    }
  }
  
  // Use mock data
  await new Promise(resolve => setTimeout(resolve, 200));
  const data = mockScenarioData[scenario];
  if (!data) {
    throw new Error(`Scenario ${scenario} not found`);
  }
  return data;
};