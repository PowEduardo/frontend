import { MovementModel } from '../../commons/base/movement/model/movement-model';

/**
 * Account Movement Model
 * Represents a debit or credit movement for an account.
 * Extends base MovementModel with account-specific behavior.
 * 
 * Examples:
 * - Salary deposit (CREDIT)
 * - Bill payment (DEBIT)
 * - Transfer (DEBIT/CREDIT)
 * - Interest (CREDIT)
 */
export class AccountMovementModel extends MovementModel {
}