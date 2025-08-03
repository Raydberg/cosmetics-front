import { CustomHeader } from '../components/custom-header'
import { CustomFooter } from '../components/custom-footer'
import { Outlet } from 'react-router'
import { CustomCarousel } from '../components/custom-carousel'

export const ClientLayout = () => {
    return (
        <div className='min-h-screen bg-background'>
            <CustomHeader />
            <CustomCarousel />
            <div className='pt-16 lg:pt-20 p-5'>
                <Outlet />
            </div>
            <CustomFooter />
        </div>
    )
}
