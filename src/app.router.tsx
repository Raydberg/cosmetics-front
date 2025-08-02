
import { createBrowserRouter, Navigate } from 'react-router'
import { ClientLayout } from './shared/layouts/ClientLayout'
import { HomePage } from './modules/home/HomePage'
import { ProductPage } from './modules/products/ProductPage'
import { ContactPage } from './modules/contact/ContactPage'
import { PanelPage } from './modules/admin/PanelPage'
import { LoginPage } from './modules/admin/auth/LoginPage'
import { lazy } from 'react'

const AdminLayout = lazy(() => import("./shared/layouts/AdminLayout"))

export const appRouter = createBrowserRouter([
    //Main
    {
        path: "/",
        element: <ClientLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: '/products', element: <ProductPage /> },
            { path: '/contact', element: <ContactPage /> }
        ]
    },
    //Auth
    {
        path: "/auth",
        element: <LoginPage />
    },
    //Admin
    {
        path: "/admin",
        element: (
            <AdminLayout />
        ),
        children: [
            { index: true, element: <PanelPage /> }
        ]
    },
    {
        path: "*",
        element: <Navigate to="/" />
    }
])
