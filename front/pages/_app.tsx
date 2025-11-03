import { AuthProvider } from "../contexts/AuthContext";
import AuthMiddleware from "../middleware/AuthMiddleware";
import { SnackbarProvider } from "../components/snackbar-context/SnackbarContext";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "../styles/global";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <AuthProvider>
          <AuthMiddleware>
            <CssBaseline />
            <Component {...pageProps} />
          </AuthMiddleware>
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
