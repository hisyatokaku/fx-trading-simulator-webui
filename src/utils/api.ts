import { SessionInfo, SessionDetail, ScenarioData } from '../types/api';

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


export const fetchUserSessions = async (userId: string): Promise<SessionInfo[]> => {
  // Use mock data for user123
  if (userId === 'user123') {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockSessionsData[userId] || [];
  }

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  // Check if API base URL is configured (empty string means use relative path)
  if (apiBaseUrl !== undefined) {
    try {
      // Use API base URL (empty string = relative path for Netlify proxy)
      const response = await fetch(`${apiBaseUrl}/api/trade/sessions/userId/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.warn('Failed to fetch from backend, falling back to empty array:', error);
      return [];
    }
  }

  // No backend configured
  return [];
};

export const fetchSessionDetail = async (sessionId: number): Promise<SessionDetail> => {
  // Use mock data for specific session IDs (user123's sessions)
  if (mockSessionDetails[sessionId]) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockSessionDetails[sessionId];
  }

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  // Check if API base URL is configured (empty string means use relative path)
  if (apiBaseUrl !== undefined) {
    try {
      const response = await fetch(`${apiBaseUrl}/api/trade/session/sessionId/${sessionId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.warn('Failed to fetch from backend:', error);
      throw new Error(`Session ${sessionId} not found`);
    }
  }

  throw new Error(`Session ${sessionId} not found`);
};

export const fetchScenarioData = async (scenario: string): Promise<ScenarioData> => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  // Check if API base URL is configured (empty string means use relative path)
  if (apiBaseUrl !== undefined) {
    try {
      // Use API base URL (empty string = relative path for Netlify proxy)
      const response = await fetch(`${apiBaseUrl}/api/trade/scenario/${scenario}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.warn('Failed to fetch from backend:', error);
      throw new Error(`Scenario ${scenario} not found`);
    }
  }

  throw new Error(`Scenario ${scenario} not found`);
};