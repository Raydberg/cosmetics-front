import { Outlet } from "react-router";

import { AdminHeader } from "@/modules/admin/components/AdminHeader";

const AdminLayout = () => {
    return (
        <div>
            <div className=" pt-16 lg:pt-20 p-5 flex gap-4">
                <AdminHeader />
            </div>
            <div className="px-8">
            <Outlet />
            </div>
        </div>
    )
}
export default AdminLayout;