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

export type Panel = BitcoinPricePanel | HtmlContentPanel | CryptoChartsPanel | ImageViewerPanel;
export type WidgetTypes = Panel['component'];

export interface Dashboard {
  uuid: string;
  panels: Panel[];
}

export interface DashboardUser {
  dashboards: Dashboard[];
}
