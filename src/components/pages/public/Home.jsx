import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Activity, Coffee, Users, ShieldPlus, Star, ChevronRight } from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { reviewService } from '../../../services/review.service';

// Icons mapping for services
const SERVICES = [
  { id: 1, title: '24/7 Elder Care', desc: 'Round the clock assistance and monitoring for utmost safety.', icon: <Heart className="w-8 h-8 text-red-500" /> },
  { id: 2, title: 'Doctor Support', desc: 'Regular check-ups and on-call specialist doctors.', icon: <ShieldPlus className="w-8 h-8 text-blue-500" /> },
  { id: 3, title: 'Nutritious Meals', desc: 'Dietitian approved, freshly cooked organic meals.', icon: <Coffee className="w-8 h-8 text-orange-500" /> },
  { id: 4, title: 'Yoga & Exercise', desc: 'Daily light physical activities to keep the body active.', icon: <Activity className="w-8 h-8 text-green-500" /> },
  { id: 5, title: 'Community Activities', desc: 'Engaging games, music, and socializing events.', icon: <Users className="w-8 h-8 text-purple-500" /> },
];

const HeroSection = () => (
  <section className="relative bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-16 lg:pt-24 px-4 sm:px-6 lg:px-8">
        <main className="mx-auto max-w-7xl">
          <div className="sm:text-center lg:text-left">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-primary-dark text-sm font-semibold tracking-wide mb-4">
              Care & Compassion First
            </span>
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">A safe haven for</span>{' '}
              <span className="block text-primary">our elders</span>
            </h1>
            <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              All Is Well Foundation provides end-to-end care including food, healthcare, emotional support, and yoga. We ensure every senior lives with dignity, health, and happiness.
            </p>
            <div className="mt-8 sm:flex sm:justify-center lg:justify-start gap-4">
              <Link to="/donate" className="btn-primary w-full sm:w-auto mt-3 sm:mt-0 shadow-lg shadow-primary/30 text-lg">
                Donate Now
              </Link>
              <Link to="/signup" className="btn-secondary w-full sm:w-auto mt-3 sm:mt-0 shadow-lg shadow-secondary/30 text-lg">
                Join Us
              </Link>
              <Link to="/contact" className="btn-outline w-full sm:w-auto mt-3 sm:mt-0 text-lg">
                Contact
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
    {/* Real visual placeholder: Use an inviting image of elderly care */}
    <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-gray-100">
      <img
        className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full opacity-90"
        src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=1200&h=800"
        alt="Elderly people smiling together"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent lg:visible hidden"></div>
    </div>
  </section>
);

const ServicesSection = () => (
  <section className="py-20 bg-gray-50 border-y border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Comprehensive Care</h2>
        <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">Everything needed for a healthy, dignified, and joyful life.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((service) => (
          <div key={service.id} className="card p-8 group border border-gray-100/50">
             <div className="bg-gray-50 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
               {service.icon}
             </div>
             <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
             <p className="text-gray-600 leading-relaxed text-lg">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ImpactStats = () => (
  <section className="py-20 bg-primary text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
        <div className="py-4">
          <div className="text-5xl font-extrabold mb-2">150+</div>
          <div className="text-primary-light font-medium text-xl uppercase tracking-wider">Elders Supported</div>
        </div>
        <div className="py-4">
          <div className="text-5xl font-extrabold mb-2">45k+</div>
          <div className="text-primary-light font-medium text-xl uppercase tracking-wider">Meals Served</div>
        </div>
        <div className="py-4">
          <div className="text-5xl font-extrabold mb-2">300+</div>
          <div className="text-primary-light font-medium text-xl uppercase tracking-wider">Events Conducted</div>
        </div>
      </div>
    </div>
  </section>
);

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await reviewService.getAllReviews();
        // Set reviews or empty array if null
        setReviews(response.data || []);
      } catch (error) {
        console.error("Failed to fetch reviews");
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: reviews.length > 2,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1, infinite: true, dots: true }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1 }
      }
    ]
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Voices of Love</h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">See what our community and family members have to say.</p>
        </div>

        {loading ? (
          <div className="flex justify-center p-12">
            <div className="animate-pulse flex space-x-4 w-full">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex-1 bg-gray-100 h-64 rounded-xl"></div>
              ))}
            </div>
          </div>
        ) : reviews.length > 0 ? (
          <div className="px-4 pb-12">
            <Slider {...sliderSettings} className="-mx-4">
              {reviews.map((review) => (
                <div key={review._id || Math.random()} className="px-4 outline-none">
                  <div className="card h-full p-8 border border-gray-100 flex flex-col items-center text-center">
                    <div className="flex gap-1 mb-4 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-6 h-6 ${i < (review.rating || 5) ? 'fill-current' : 'text-gray-200'}`} />
                      ))}
                    </div>
                    <p className="text-gray-600 italic mb-6 text-lg line-clamp-4">"{review.comment}"</p>
                    <div className="mt-auto pt-6 border-t border-gray-100 w-full">
                      <div className="font-bold text-gray-900 text-lg">{review.userName || 'Family Member'}</div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <div className="text-center p-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <p className="text-xl text-gray-500">No reviews yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <ImpactStats />
      <ServicesSection />
      <ReviewsSection />
    </div>
  );
};

export default Home;
