import React from 'react';
import Image from 'next/image';

const EventCard = ({ event }) => {
    return (
        <div className="flex flex-col justify-center items-center p-6 rounded-2xl mx-auto my-6 transition-transform hover:scale-110 border-4 w-[15rem] md:w-[17rem] xl:w-[18.75rem] bg-white/10 border-white/50 hover:border-white/80">
            <div className="w-[90%] flex justify-center items-center">
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                        src={event.images?.[0]?.url || "/placeholder.svg"}
                        alt={event.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            </div>
            <div className="relative text-center p-4 mt-4 w-[90%] h-[200px] md:h-[250px] overflow-auto scrollbar">
                <h2 className="font-bold text-xl mb-2 text-white">{event.name}</h2>
                <p className="text-slate-400 text-[1rem]">{event.description}</p>
                <p className="text-slate-400 text-sm mt-2">
                    {event.eventDate} | {event.eventTime}
                </p>
            </div>

            <a
                href={`/events/${event._id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 font-semibold px-6 py-2 rounded-lg border-2 border-white text-white hover:bg-white/20 transition-all"
            >
                Learn More
            </a>
        </div>
    );
};

export default EventCard;