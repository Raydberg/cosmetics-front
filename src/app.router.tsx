
import { createBrowserRouter, Navigate } from 'react-router'
import { ClientLayout } from './shared/layouts/ClientLayout'
import { LandingPage } from './modules/client/landing/LandingPage'
import { ProductPage } from './modules/client/products/ProductPage'
import { ProductDetailPage } from './modules/client/products/ProductDetailPage'
import { lazy } from 'react'
import { PanelPage } from './modules/admin/PanelPage'
import { NewProduct } from './modules/admin/products/NewProduct'
import { UpdateProduct } from './modules/admin/products/UpdateProduct'

const AdminLayout = lazy(() => import("./shared/layouts/AdminLayout"))

export const appRouter = createBrowserRouter([
    //Main
    {
        path: "/",
        element: <ClientLayout />,
        children: [
            { index: true, element: <LandingPage /> },
            { path: 'products', element: <ProductPage /> },
            { path: 'products/:id', element: <ProductDetailPage /> },
            // { path: '/contact', element: <ContactPage /> }
        ]
    },
    //Auth
    // {
    //     path: "/auth",
    //     element: <LoginPage />
    // },
    //Admin
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            { index: true, element: <PanelPage /> },
            { path: 'new-product', element: <NewProduct /> },
            { path: 'update-product/:id', element: <UpdateProduct /> }
        ]
    },
    {
        path: "*",
        element: <Navigate to="/" />
    }
])
