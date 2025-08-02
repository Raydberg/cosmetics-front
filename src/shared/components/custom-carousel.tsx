export const CustomCarousel = () => {
    return (

        <div id="auto-play" data-carousel='{ "loadingClasses": "opacity-0", "isAutoPlay": true, "speed": 1000 }' className="relative w-full" >
            <div className="carousel h-80">
                <div className="carousel-body opacity-0 h-full">
                    <div className="carousel-slide">
                        <div className="bg-base-200/60 flex h-full justify-center p-6">
                            <span className="self-center text-2xl sm:text-4xl">First slide</span>
                        </div>
                    </div>
                    <div className="carousel-slide">
                        <div className="bg-base-200/80 flex h-full justify-center p-6">
                            <span className="self-center text-2xl sm:text-4xl">Second slide</span>
                        </div>
                    </div>
                    <div className="carousel-slide">
                        <div className="bg-base-200 flex h-full justify-center p-6">
                            <span className="self-center text-2xl sm:text-4xl">Third slide</span>
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" className="carousel-prev start-5 max-sm:start-3 carousel-disabled:opacity-50 size-9.5 bg-base-100 flex items-center justify-center rounded-full shadow-base-300/20 shadow-sm">
                <span className="icon-[tabler--chevron-left] size-5 cursor-pointer"></span>
                <span className="sr-only">Previous</span>
            </button>
            <button type="button" className="carousel-next end-5 max-sm:end-3 carousel-disabled:opacity-50 size-9.5 bg-base-100 flex items-center justify-center rounded-full shadow-base-300/20 shadow-sm">
                <span className="icon-[tabler--chevron-right] size-5"></span>
                <span className="sr-only">Next</span>
            </button>
        </div>
    )
}
