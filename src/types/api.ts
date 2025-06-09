export interface SessionInfo {
  sessionId: number;
  startDate: string;
  endDate: string;
  jpyBalance: number;
  scenario: string;
  complete: boolean;
}

export interface SessionDetail {
  sessionId: number;
  startDate: string;
  endDate: string;
  jpyBalance: number;
  scenario: string;
  dateToBalances: Record<string, Record<string, number>>;
  complete: boolean;
}

export interface ScenarioData {
  startDate: string;
  endDate: string;
  dateToCurrencyPairToRate: Record<string, Record<string, number>>;
}

export interface BalanceData {
  date: string;
  JPY: number;
  EUR: number;
  HKD: number;
  USD: number;
  AUD: number;
}