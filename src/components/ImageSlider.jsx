'use client';

import { useState } from 'react';

export default function ImageSlider({ media, title }) {
   const [currentIndex, setCurrentIndex] = useState(0);

   if (!media || media.length === 0) return null;

   const currentItem = media[currentIndex];

   return (
       <div className="relative border-2 border-primary/20 p-2 bg-background-light shadow-[4px_4px_0px_0px_rgba(0,255,65,0.2)] group">
           <div className="relative w-full border border-primary/10 overflow-hidden bg-background aspect-video flex items-center justify-center">
              
              {/* Media Content */}
              {currentItem.type === 'video' ? (
                 <iframe 
                    src={currentItem.url} 
                    className="w-full h-full pointer-events-auto"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    title={`${title} - video slide`}
                 />
              ) : (
                 <img 
                    src={currentItem.url} 
                    alt={`${title} - slide ${currentIndex + 1}`} 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
                 />
              )}
              
              {/* Navigation Arrows */}
              {media.length > 1 && (
                  <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-between pointer-events-none px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                         onClick={() => setCurrentIndex(prev => prev === 0 ? media.length - 1 : prev - 1)} 
                         className="pointer-events-auto bg-background/90 text-primary border border-primary px-3 py-2 font-mono font-bold hover:bg-primary hover:text-background shadow-[2px_2px_0px_0px_rgba(0,255,65,0.5)] transition-all"
                         aria-label="Previous slide"
                      >
                         &lt; PREV
                      </button>
                      <button 
                         onClick={() => setCurrentIndex(prev => prev === media.length - 1 ? 0 : prev + 1)} 
                         className="pointer-events-auto bg-background/90 text-primary border border-primary px-3 py-2 font-mono font-bold hover:bg-primary hover:text-background shadow-[2px_2px_0px_0px_rgba(0,255,65,0.5)] transition-all"
                         aria-label="Next slide"
                      >
                         NEXT &gt;
                      </button>
                  </div>
              )}
           </div>

           {/* Dots Indicator */}
           {media.length > 1 && (
               <div className="flex justify-center flex-wrap gap-3 mt-4 pb-2">
                   {media.map((item, idx) => (
                       <button 
                          key={idx} 
                          onClick={() => setCurrentIndex(idx)} 
                          className={`transition-colors flex items-center justify-center ${currentIndex === idx ? 'bg-primary border-primary shadow-[0px_0px_5px_0px_rgba(0,255,65,0.8)]' : 'bg-transparent border border-primary/50 hover:border-primary'} ${item.type === 'video' ? 'w-4 h-4 rounded-full' : 'w-3 h-3'}`}
                          title={`Go to ${item.type} slide`}
                          aria-label={`Go to slide ${idx + 1}`}
                       >
                          {item.type === 'video' && <span className="block w-1.5 h-1.5 bg-background translate-x-[0.5px]">▶</span>}
                       </button>
                   ))}
               </div>
           )}
       </div>
   );
}
