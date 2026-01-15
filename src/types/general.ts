export type AppThemeMode = "light" | "dark";
export interface IApp {
  toggleMode: () => void;
  mode: AppThemeMode;
}
