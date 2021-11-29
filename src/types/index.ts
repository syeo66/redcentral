export interface BasePanel {
  uuid: string;
  size: { columns: number; rows: number };
  position: number;
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

export interface NasaImagesPanel extends BasePanel {
  component: 'NasaImages';
}

export interface Image {
  alt: string;
  src: string;
}
export interface ImageViewerPanel extends BasePanel {
  component: 'ImageViewer';
  settings: { images: Image[] };
}

export type PanelType<T extends WidgetType> = T extends 'BitcoinPrice'
  ? BitcoinPricePanel
  : T extends 'HtmlContent'
  ? HtmlContentPanel
  : T extends 'CryptoCharts'
  ? CryptoChartsPanel
  : T extends 'ImageViewer'
  ? ImageViewerPanel
  : T extends 'NasaImages'
  ? NasaImagesPanel
  : never;
export type Panel = BitcoinPricePanel | HtmlContentPanel | CryptoChartsPanel | ImageViewerPanel | NasaImagesPanel;
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
