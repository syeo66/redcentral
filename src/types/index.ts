export type WidgetTypes = 'BitconPrice' | 'HtmlContent' | 'CryptoCharts' | 'ImageViewer';

export interface Panel {
  uuid: string;
  size: { columns: number; rows: number };
  component: WidgetTypes;
  position: number;
  settings: Record<string, string>;
}

export interface Dashboard {
  uuid: string;
  panels: Panel[];
}

export interface DashboardUser {
  dashboards: Dashboard[];
}
