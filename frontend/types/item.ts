export interface ItemDefinition {
  // Base unique name used internally
  uniqueName: string;

  // Display name shown in UI
  displayName: string;

  // Actual Albion item used for image rendering
  imageUniqueName?: string;

  // Actual Albion item used for API lookup
  defaultUniqueName?: string;

  category?: string;
}