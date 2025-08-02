import { Link } from "react-router"
import { ModeToggle } from "./mode-toggle"

const routersHeader = [
    { name: "Incio", link: "/" },
    { name: "Productos", link: "/products" },
    { name: "Contacto", link: "/contact" },
]


export const CustomHeader = () => {
    return (
        <header className="flex mx-3 justify-between items-center">
            <h1 className="font-bold">Catalogo Elegante</h1>

            <section className="flex gap-3 items-center">
                {
                    routersHeader.map((router, index) => (
                        <Link key={index} to={router.link}>
                            {router.name}
                        </Link>
                    ))
                }
                <ModeToggle />
            </section>
        </header>
    )
}
