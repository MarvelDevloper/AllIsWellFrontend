import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { contactService } from '../../../services/contact.service';

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      await contactService.submitEnquiry(data);
      toast.success("Message sent successfully! We will get back to you soon.");
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message. Please try again or contact us via WhatsApp.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl tracking-tight mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Whether you want to volunteer, donate, or admit a loved one, we are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Contact Information & Map */}
          <div className="p-8 md:p-12 bg-primary text-white flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 mr-4 text-primary-light flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg">Our Location</h4>
                    <p className="text-primary-light text-lg mt-1">Sector 19, Ulwe<br/>Navi Mumbai, Maharashtra, India</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-6 h-6 mr-4 text-primary-light flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg">Phone Number</h4>
                    <p className="text-primary-light text-lg mt-1">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 mr-4 text-primary-light flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg">Email Address</h4>
                    <p className="text-primary-light text-lg mt-1">contact@alliswell.org</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 rounded-xl overflow-hidden shadow-lg h-64 border-4 border-white/10">
              {/* Embed Google Map - focusing on Ulwe, Navi Mumbai */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30175.727546684746!2d72.99725835!3d18.9663785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c390cb33fb75%3A0x64e451b69be5eed3!2sUlwe%2C%20Navi%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location of All Is Well Foundation"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 md:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Full Name</label>
                <input
                  id="name"
                  type="text"
                  className={`block w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-primary focus:border-primary'} shadow-sm text-gray-900 focus:outline-none`}
                  placeholder="John Doe"
                  {...register('name', { required: "Name is required" })}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                <input
                  id="email"
                  type="email"
                  className={`block w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-primary focus:border-primary'} shadow-sm text-gray-900 focus:outline-none`}
                  placeholder="john@example.com"
                  {...register('email', { required: "Email is required" })}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                <textarea
                  id="message"
                  rows="5"
                  className={`block w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-primary focus:border-primary'} shadow-sm text-gray-900 focus:outline-none resize-none`}
                  placeholder="How can we help you?"
                  {...register('message', { required: "Message is required" })}
                ></textarea>
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center btn-primary py-4 text-lg mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/919876543210?text=Hello%20I%20need%20help%20regarding%20All%20Is%20Well%20Foundation"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:scale-110 hover:shadow-2xl transition-all z-50 flex items-center justify-center group"
        aria-label="Contact us on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      </a>
    </div>
  );
};

export default Contact;
