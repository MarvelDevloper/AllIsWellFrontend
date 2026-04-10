import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Calendar, Clock, MapPin, SearchX } from 'lucide-react';
import { eventService } from '../../../services/event.service';

const EventSkeleton = () => (
  <div className="card animate-pulse flex flex-col h-full bg-white">
    <div className="h-64 bg-gray-200"></div>
    <div className="p-6 flex flex-col flex-grow">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
      
      <div className="mt-auto space-y-3">
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>
  </div>
);

const EventsListing = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventService.getAllEvents();
        // Adjust depending on the exact backend response format. 
        // Based on user input: Response: { success: true, data: [] }
        setEvents(response.data || []);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl tracking-tight">Community Events</h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            Join us in our upcoming activities designed to bring joy, health, and togetherness.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <EventSkeleton key={i} />
            ))}
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event._id || event.id} className="card flex flex-col h-full bg-white group">
                <div className="h-64 relative overflow-hidden bg-gray-100">
                  {event.images && event.images.length > 0 ? (
                    event.images.length === 1 ? (
                      <img 
                        src={event.images[0].url || event.images[0]} 
                        alt={event.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    ) : (
                      <Slider {...sliderSettings} className="h-full">
                        {event.images.map((img, idx) => (
                          <div key={idx} className="h-64 outline-none">
                            <img 
                              src={img.url || img} 
                              alt={`${event.title} slide ${idx + 1}`} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                        ))}
                      </Slider>
                    )
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                      <span className="text-sm font-medium">No Image Provided</span>
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-6 flex-grow line-clamp-3">
                    {event.description}
                  </p>
                  
                  <div className="mt-auto space-y-3 pt-4 border-t border-gray-100">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
                      <span>{formatDate(event.startDate)}</span>
                    </div>
                    {event.endDate && event.endDate !== event.startDate && (
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="w-5 h-5 mr-3 text-secondary flex-shrink-0" />
                        <span>Until {formatDate(event.endDate)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-16 text-center">
            <SearchX className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Events Scheduled</h3>
            <p className="text-gray-500 text-lg">We don't have any events planned at the moment. Please check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsListing;
