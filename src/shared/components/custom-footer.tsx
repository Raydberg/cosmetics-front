import { Link } from "react-router"

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
                            <li className="mb-4">
                                <Link to={'/'} className="hover:underline">Inicio</Link>
                            </li>
                            <li className="mb-4">
                                <Link to={'/products'} className="hover:underline">Productos</Link>
                            </li>
                            <li className="mb-4">
                                <Link to={'/contact'} className="hover:underline">Contacto</Link>
                            </li>

                        </ul>
                    </div>
                    <div >
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                            Contacto
                        </h2>
                        <ul className="text-gray-500 dark:text-gray-400 font-medium">
                            <li className="mb-4">
                                Calle Principal 123

                                Ciudad, País
                            </li>
                            <li className="mb-4">
                                Email: info@catalogoelegante.com
                            </li>
                            <li className="mb-4">
                               Teléfono: +1 234 567 890
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="px-4 py-6  bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">© {currentYear} <a href="https://flowbite.com/">Flowbite™</a>. All Rights Reserved.
                    </span>
                    <Link to={'/auth'}>
                        Acceso Personal
                    </Link>
                </div>
            </div>
        </footer>
    )
}
