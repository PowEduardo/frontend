/**
 * IRPF Model
 *
 * Brazilian tax (Imposto de Renda Pessoa Física) data for investments.
 * Calculates taxable income from dividends, JCP, and capital gains.
 *
 * Used for tax planning and annual tax return preparation (Declaração de Imposto de Renda).
 *
 * @example
 * {
 *   "averagePrice": 50.00,
 *   "totalValue": 5000.00,
 *   "totalAmount": 100,
 *   "totalValueLastYear": 4800.00,
 *   "totalJCP": 150.00,
 *   "totalDividend": 500.00,
 *   "totalSellValue": null,
 *   "totalFutureDividend": 75.00,
 *   "totalFutureJCP": 25.00
 * }
 */
export class IrpfModel {
  /** Average cost per unit calculated for this asset */
  averagePrice!: number;

  /** Current total value of the asset position */
  totalValue!: number;

  /** Total units/shares held */
  totalAmount!: number;

  /** Asset value from previous year (for comparison) */
  totalValueLastYear!: number;

  /** Total Juros sobre Capital Próprio (JCP) received - taxable income */
  totalJCP!: number;

  /** Total dividends received - tax-exempt income in Brazil */
  totalDividend!: number;

  /** Total value from sales/liquidations - for capital gains calculation */
  totalSellValue!: number;

  /** Expected future JCP distributions - for planning */
  totalFutureDividend!: number;

  /** Expected future JCP distributions */
  totalFutureJCP!: number;
}
