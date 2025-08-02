import { CustomHeader } from '../components/custom-header'
import { CustomFooter } from '../components/custom-footer'
import { Outlet } from 'react-router'

export const ClientLayout = () => {
    return (
        <div className='min-h-screen bg-background'>
            <CustomHeader />
            <Outlet />
            <CustomFooter />
        </div>
    )
}
