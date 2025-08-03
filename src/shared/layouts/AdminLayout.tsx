import { Outlet } from "react-router";

import { AdminHeader } from "@/modules/admin/components/AdminHeader";
import { Button } from "../components/ui/button";
import { useDatabase } from "@/core/hooks/useDatabase";

const AdminLayout = () => {
    const { seedDatabase, loading, error } = useDatabase()
    return (
        <div>
            <div className=" pt-16 lg:pt-20 p-5 flex gap-4">
                <AdminHeader />
            </div>
            
            <div className="px-8">
                <div>
                <h3>Seedes de base de datos</h3>

                <Button
                    onClick={seedDatabase}
                    disabled={loading}
                    variant='outline'
                >
                    {loading ? 'Ejecutando' : 'Poblar DB'}
                </Button>
                {error && (
                    <p className="text-red-500 text-sm mt-2">
                        Error : {error}
                    </p>
                )}
            </div>
                <Outlet />
            </div>
        </div>
    )
}
export default AdminLayout;