export type EditWidgetProps<T = unknown> = {
  id: string;
  onChange: (id: string, config: T) => void
  onRemove: (id: string) => void
}