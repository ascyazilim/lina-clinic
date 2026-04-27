import { alpha, createTheme } from "@mui/material/styles";

interface CustomGradients {
  hero: string;
  shell: string;
  card: string;
  accent: string;
}

declare module "@mui/material/styles" {
  interface Theme {
    customGradients: CustomGradients;
  }

  interface ThemeOptions {
    customGradients?: Partial<CustomGradients>;
  }
}

const gradients: CustomGradients = {
  hero:
    "linear-gradient(135deg, rgba(20,33,61,0.98) 0%, rgba(53,71,114,0.95) 48%, rgba(199,144,138,0.92) 100%)",
  shell:
    "radial-gradient(circle at top left, rgba(215,177,170,0.22), transparent 34%), radial-gradient(circle at bottom right, rgba(20,33,61,0.08), transparent 28%), linear-gradient(180deg, #fffdfa 0%, #fff7f1 100%)",
  card:
    "linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(255,248,244,0.98) 100%)",
  accent:
    "linear-gradient(135deg, rgba(199,144,138,0.22), rgba(198,162,126,0.18))",
};

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#14213d",
      light: "#22345a",
      dark: "#0c1527",
      contrastText: "#fffdf9",
    },
    secondary: {
      main: "#c7908a",
      light: "#ddb8b2",
      dark: "#ab6f68",
      contrastText: "#14213d",
    },
    background: {
      default: "#fffdfa",
      paper: "#fffaf6",
    },
    text: {
      primary: "#162033",
      secondary: "#5f6678",
    },
    divider: alpha("#14213d", 0.08),
  },
  customGradients: gradients,
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Manrope", "Segoe UI", sans-serif',
    h1: {
      fontFamily: '"Cormorant Garamond", serif',
      fontWeight: 700,
      fontSize: "clamp(3rem, 7vw, 5.5rem)",
      letterSpacing: "-0.03em",
      lineHeight: 0.96,
    },
    h2: {
      fontFamily: '"Cormorant Garamond", serif',
      fontWeight: 700,
      fontSize: "clamp(2.4rem, 5vw, 4rem)",
      letterSpacing: "-0.03em",
      lineHeight: 1.02,
    },
    h3: {
      fontFamily: '"Cormorant Garamond", serif',
      fontWeight: 600,
      fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
    },
    h4: {
      fontWeight: 700,
    },
    button: {
      textTransform: "none",
      fontWeight: 700,
      letterSpacing: "0.01em",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          colorScheme: "light",
        },
        body: {
          minWidth: 320,
          background: gradients.shell,
        },
        a: {
          color: "inherit",
          textDecoration: "none",
        },
        "::selection": {
          background: "rgba(199,144,138,0.3)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          boxShadow: "none",
          backdropFilter: "blur(16px)",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 14,
          paddingInline: 20,
          minHeight: 44,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: `1px solid ${alpha("#14213d", 0.09)}`,
          boxShadow: "0 18px 44px rgba(20, 33, 61, 0.07)",
        },
      },
    },
  },
});
