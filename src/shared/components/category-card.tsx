import { Link } from "react-router";

interface CategoryCardProps {
    name: string
    href: string
    imageUrl?: string
}

export const CategoryCard = ({ name, href, imageUrl = "https://cdn.tailkit.com/media/placeholders/photo-PDX_a_82obo-700x700.jpg", ...props }: CategoryCardProps) => {
    return (
        <>
            <Link
                to={href}
                className="group relative block overflow-hidden rounded-xl transition ease-out active:opacity-75 w-64 h-40 sm:w-72 sm:h-48 shadow-lg hover:shadow-xl"
                {...props} >
                <img
                    src={imageUrl}
                    alt="Product Image"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 transition-all duration-300 group-hover:bg-black/10" />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                    <div className="rounded-full bg-white/90 backdrop-blur-sm px-4 py-2 text-sm font-semibold tracking-wide uppercase transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 shadow-md">
                        {name}
                    </div>
                </div>
            </Link>
        </>
    );
}