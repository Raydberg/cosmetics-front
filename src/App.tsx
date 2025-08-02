import { Toaster } from "sonner";
import { ThemeProvider } from "./shared/components/theme-provider";
import { RouterProvider } from "react-router";
import { appRouter } from "./app.router";

export default function App() {
  return (
    <ThemeProvider>
      <Toaster />
      <RouterProvider router={appRouter} />
    </ThemeProvider>
  )
}


