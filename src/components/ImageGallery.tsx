import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export const ImageGallery = ({ images, autoPlayInterval = 3000, pauseDuration = 3000, className }: {
  images: {
    src: string;
    srcSet: string;
    alt?: string;
  }[];
  autoPlayInterval?: number;
  pauseDuration?: number;
  className?: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const autoplayRef = useRef<NodeJS.Timeout>();
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const startAutoplay = () => {
    clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(handleNextImage, autoPlayInterval);
  };

  const pauseAutoplay = () => {
    clearInterval(autoplayRef.current);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      startAutoplay();
    }, pauseDuration);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    pauseAutoplay();
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    pauseAutoplay();
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  useEffect(() => {
    if (isFullscreen || isHovering) {
      clearInterval(autoplayRef.current);
      clearTimeout(timeoutRef.current);

      return;
    }

    startAutoplay();
    return () => {
      clearInterval(autoplayRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, [autoPlayInterval, images.length, isFullscreen, isHovering]);

  return (
    <div className={`w-full min-h-[280px] md:w-[410px] md:min-h-[auto] h-[280px] group relative flex items-stretch group ${className}`}>
      <div className="overflow-hidden" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            srcSet={image.srcSet}
            sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) 850px, 100vw"
            alt={image.alt}
            onClick={openFullscreen}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 rounded-md cursor-pointer ${index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
          />
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={handlePrev}
        className="absolute top-0 left-0 bottom-0 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#00000020]"
      >
        <ChevronLeft size={32} className="text-white" />
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute top-0 right-0 bottom-0 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#00000020]"
      >
        <ChevronRight size={32} className="text-white" />
      </button>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80" onClick={closeFullscreen}>
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 text-white"
          >
            <X size={32} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); handlePrev() }}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 opacity-100"
          >
            <ChevronLeft size={32} className="text-white" />
          </button>

          <div className="flex flex-col gap-2 px-3 md:px-0">
            <img
              src={images[currentIndex].src}
              srcSet={images[currentIndex].srcSet}
              alt=""
              sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) and (max-width: 980px) 980px, (min-width: 981px) and (max-width: 1280px) 1280px, (min-width: 1281px) 1348px, 100vw"
              className="max-w-[980px] max-h-full"
            />
            <p className="self-center md:self-end text-white">
              {currentIndex + 1} of {images.length}
            </p>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); handleNext() }}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 opacity-100"
          >
            <ChevronRight size={32} className="text-white" />
          </button>
        </div>
      )
      }
    </div >
  );
};