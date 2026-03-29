// theme.ts
import { vars } from "nativewind";

export interface ThemeFonts {
  heading: {
    family: string;
    weights: Record<string, string>;
  };
  body: {
    family: string;
    weights: Record<string, string>;
  };
  mono: {
    family: string;
    weights: Record<string, string>;
  };
}

export const themeFonts: ThemeFonts = {
  heading: {
    family: 'Inter',
    weights: {
      normal: 'Inter_400Regular',
      medium: 'Inter_500Medium',
      semibold: 'Inter_600SemiBold',
      bold: 'Inter_700Bold',
    },
  },
  body: {
    family: 'Inter',
    weights: {
      normal: 'Inter_400Regular',
      medium: 'Inter_500Medium',
      semibold: 'Inter_600SemiBold',
    },
  },
  mono: {
    family: 'JetBrainsMono',
    weights: {
      normal: 'JetBrainsMono_400Regular',
      medium: 'JetBrainsMono_500Medium',
    },
  },
};

// Teal theme for HelpMate - trustworthy, helpful, and modern
export const lightTheme = vars({
  "--radius": "12",

  // Core semantic colors - Teal-based light theme
  "--background": "240 253 250", // Very light teal (teal-50)
  "--foreground": "15 23 42", // Dark slate (slate-900)

  "--card": "255 255 255", // Pure white
  "--card-foreground": "15 23 42", // Dark slate

  "--popover": "255 255 255",
  "--popover-foreground": "15 23 42",

  "--primary": "13 148 136", // Teal-600
  "--primary-foreground": "255 255 255", // White text

  "--secondary": "204 251 241", // Teal-100
  "--secondary-foreground": "19 78 74", // Teal-900

  "--muted": "241 245 249", // Slate-100
  "--muted-foreground": "100 116 139", // Slate-500

  "--accent": "20 184 166", // Teal-500
  "--accent-foreground": "255 255 255", // White

  "--destructive": "220 38 38", // Red-600

  "--border": "226 232 240", // Slate-200
  "--input": "241 245 249", // Slate-100
  "--ring": "13 148 136", // Teal-600

  // Chart colors
  "--chart-1": "13 148 136", // Teal
  "--chart-2": "59 130 246", // Blue
  "--chart-3": "249 115 22", // Orange
  "--chart-4": "168 85 247", // Purple
  "--chart-5": "236 72 153", // Pink

  // Sidebar colors
  "--sidebar": "240 253 250",
  "--sidebar-foreground": "15 23 42",
  "--sidebar-primary": "13 148 136",
  "--sidebar-primary-foreground": "255 255 255",
  "--sidebar-accent": "204 251 241",
  "--sidebar-accent-foreground": "19 78 74",
  "--sidebar-border": "226 232 240",
  "--sidebar-ring": "13 148 136",
});

export const darkTheme = vars({
  "--radius": "12",

  // Core semantic colors - Teal-based dark theme
  "--background": "15 23 42", // Deep slate (slate-900)
  "--foreground": "240 253 250", // Light teal

  "--card": "30 41 59", // Slate-800
  "--card-foreground": "240 253 250", // Light teal

  "--popover": "30 41 59",
  "--popover-foreground": "240 253 250",

  "--primary": "45 212 191", // Teal-400
  "--primary-foreground": "15 23 42", // Dark slate text

  "--secondary": "51 65 85", // Slate-700
  "--secondary-foreground": "240 253 250", // Light teal

  "--muted": "51 65 85", // Slate-700
  "--muted-foreground": "148 163 184", // Slate-400

  "--accent": "20 184 166", // Teal-500
  "--accent-foreground": "240 253 250", // Light teal

  "--destructive": "248 113 113", // Red-400

  "--border": "51 65 85", // Slate-700
  "--input": "30 41 59", // Slate-800
  "--ring": "45 212 191", // Teal-400

  // Chart colors
  "--chart-1": "45 212 191", // Teal
  "--chart-2": "96 165 250", // Blue
  "--chart-3": "251 146 60", // Orange
  "--chart-4": "192 132 252", // Purple
  "--chart-5": "244 114 182", // Pink

  // Sidebar colors
  "--sidebar": "30 41 59",
  "--sidebar-foreground": "240 253 250",
  "--sidebar-primary": "45 212 191",
  "--sidebar-primary-foreground": "15 23 42",
  "--sidebar-accent": "51 65 85",
  "--sidebar-accent-foreground": "240 253 250",
  "--sidebar-border": "51 65 85",
  "--sidebar-ring": "45 212 191",
});