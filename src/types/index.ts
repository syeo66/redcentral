export interface BasePanel {
  uuid: string;
  size: { columns: number; rows: number };
  position: number;
  settings: Record<string, string>;
}

export interface BitcoinPricePanel extends BasePanel {
  component: 'BitcoinPrice';
}

export interface HtmlContentPanel extends BasePanel {
  component: 'HtmlContent';
  settings: { content: string };
}

export interface CryptoChartsPanel extends BasePanel {
  component: 'CryptoCharts';
}

export interface ImageViewerPanel extends BasePanel {
  component: 'ImageViewer';
}

export type PanelType<T> = T extends 'BitcoinPrice'
  ? BitcoinPricePanel
  : T extends 'HtmlContent'
  ? HtmlContentPanel
  : T extends 'CryptoCharts'
  ? CryptoChartsPanel
  : T extends 'ImageViewer'
  ? ImageViewerPanel
  : never;
export type Panel = BitcoinPricePanel | HtmlContentPanel | CryptoChartsPanel | ImageViewerPanel;
export type WidgetType = Panel['component'];

export interface Dashboard {
  uuid: string;
  name: string;
  public?: boolean;
  panels: Panel[];
}

export interface DashboardUser {
  dashboards: Dashboard[];
}
