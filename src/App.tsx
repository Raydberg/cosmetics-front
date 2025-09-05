import { Toaster } from "sonner";
import { ThemeProvider } from "./shared/components/theme-provider";
import { RouterProvider } from "react-router";
import { appRouter } from "./app.router";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const queryClient = new QueryClient()
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>

      <ThemeProvider>
        <Toaster position="top-right" richColors expand={true} closeButton toastOptions={{
          duration: 4000,
          classNames: {
            error: 'text-red-400 border-red-400',
            success: 'text-green-400 border-green-400',
            warning: 'text-yellow-400 border-yellow-400',
            info: 'text-blue-400 border-blue-400'
          }
        }} />
        <RouterProvider router={appRouter} />
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  )
}


