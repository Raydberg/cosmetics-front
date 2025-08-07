import { Link } from "react-router"


interface LinkProps {
    name: string,
    href: string
}

const links: LinkProps[] = [
    { name: "Inicio", href: "/" },
    { name: "Productos", href: "/products" },
]

export const CustomFooter = () => {
    const currentYear = new Date().getFullYear()
    return (


        <footer className="bg-white dark:bg-gray-900">
            <div className=" mx-auto w-full">
                <div className="grid grid-cols-2  gap-8 px-4 py-6 lg:py-8 md:grid-cols-3">
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Company</h2>
                        <ul className="text-gray-500 dark:text-gray-400 font-medium">
                            <li className="mb-4">
                                Ofrecemos productos de la más alta calidad, cuidadosamente seleccionados para satisfacer los gustos más exigentes.
                            </li>

                        </ul>
                    </div>
                    <div >
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                            Enlaces
                        </h2>
                        <ul className="text-gray-500 dark:text-gray-400 font-medium">
                            {links.map(({ name, href }, i) => (
                                <li key={i} className="mb-4">
                                    <Link to={`${href}`} className="hover:underline">
                                        {name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div >
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                            Contacto
                        </h2>
                        <ul className="text-gray-500 dark:text-gray-400 font-medium">
                            {/* <li className="mb-4">
                                Calle Principal 123
                                Ciudad, País
                            </li> */}
                            <li className="mb-4">
                                Email: fiestascordovabelenlourdes@gmail.com
                            </li>
                            <li className="mb-4">
                                Teléfono: 935 614 471
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="px-4 py-6 bg-gray-100 dark:bg-gray-700 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    {/* Copyright centrado */}
                    <div className="flex-1 flex justify-center order-1">
                        <span className="text-sm text-gray-500 dark:text-gray-300 text-center">
                            © {currentYear}{" "}
                            <Link to="/" className="hover:underline">
                                BeautyShop Catalogos
                            </Link>
                            {" "}creado por{" "}
                            <Link
                                className="font-medium text-black underline dark:text-white hover:no-underline"
                                to={'https://github.com/Raydberg'}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Raydberg
                            </Link>
                        </span>
                    </div>

                    {/* <div className="flex justify-center md:justify-end order-2">
                        <Link
                            to={'/auth'}
                            className="text-sm dark:text-white hover:underline"
                        >
                            Acceso Personal
                        </Link>
                    </div> */}
                </div>
            </div>
        </footer>
    )
}
