import { Outlet } from "react-router";
import { Button } from "../components/ui/button";
import { ArrowRightFromLine } from "lucide-react";

const AdminLayout = () => {
    return (
        <div>
            <header className="flex justify-between items-center mx-3 my-2">
                <h1>Administrador</h1>
                <div className="flex gap-4">
                    <Button variant={'outline'}>
                        Ver Sitio
                    </Button>
                    <Button>
                        <ArrowRightFromLine />
                        Cerrar Sesion
                    </Button>
                </div>
            </header>
            <Outlet />
        </div>
    )
}
export default AdminLayout;