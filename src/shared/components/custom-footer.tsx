import { Link } from "react-router"

export const CustomFooter = () => {
    return (
        <footer>
            <Link to="/auth">
                Acceso Autorizado
            </Link>
        </footer>
    )
}
