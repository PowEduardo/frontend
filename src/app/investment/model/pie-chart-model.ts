/**
 * Pie Chart Model
 *
 * Represents data for pie chart visualization in ECharts.
 * Used to display investment distribution by asset type/category.
 *
 * @example
 * {
 *   "name": "STOCKS",
 *   "value": 25000
 * }
 */
export class PieChartModel {
  /** Category name to display in legend */
  name!: string;

  /** Numeric value for pie slice size (typically current value) */
  value!: number;
}
