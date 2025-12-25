/**
 * Represents an action button that can be displayed in a table row.
 */
export interface TableAction<T = unknown> {
  label: string;           // Button label (e.g., "Edit", "Delete")
  icon?: string;           // Optional icon class (e.g., "pi pi-pencil")
  cssClass?: string;       // Optional CSS class (e.g., "btn btn-sm btn-primary")
  disabled?: boolean;      // Whether button is disabled
  
  // Called when action is triggered
  action: (row: T, index: number) => void;
}
