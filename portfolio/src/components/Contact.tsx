import React, { useEffect, useState } from 'react';

interface Personal {
  name: string;
  title: string;
  description: string;
  aboutDescription: string;
  profileImage: string;
  location: string;
  email: string;
  phone: string;
  hobbies: string[];
}

interface Social {
  github: string;
  twitter: string;
  linkedin: string;
  instagram: string;
}

const Contact = () => {
  const [personal, setPersonal] = useState<Partial<Personal>>({});
  const [social, setSocial] = useState<Partial<Social>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

  useEffect(() => {
    // Fetch personal data
    fetch(`${apiBase}/api/personal`)
      .then(response => response.json())
      .then(data => setPersonal(data))
      .catch(error => console.error('Error fetching personal data:', error));

    // Fetch social data
    fetch(`${apiBase}/api/social`)
      .then(response => response.json())
      .then(data => setSocial(data))
      .catch(error => console.error('Error fetching social data:', error));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const response = await fetch(`${apiBase}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4" data-aos="fade-up">Get In Touch</h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6" data-aos="fade-up" data-aos-delay="100"></div>
          <p className="text-gray-600 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">Have a project in mind or want to discuss potential opportunities? Feel free to reach out!</p>
        </div>
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2" data-aos="fade-right">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">Your Name</label>
                <input type="text" id="name" name="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent" value={formData.email} onChange={handleInputChange} required />
              </div>
              <div>
                <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
                <input type="text" id="subject" name="subject" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent" value={formData.subject} onChange={handleInputChange} required />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                <textarea id="message" name="message" rows={5} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent" value={formData.message} onChange={handleInputChange} required></textarea>
              </div>
              <button type="submit" className="px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {submitStatus && (
                <p className={`text-center ${submitStatus.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                  {submitStatus}
                </p>
              )}
            </form>
          </div>
          <div className="md:w-1/2" data-aos="fade-left">
            <div className="bg-white p-8 rounded-lg shadow-md h-full">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <i data-feather="mail" className="w-5 h-5 text-indigo-600"></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Email</h4>
                    <p className="text-gray-600">{personal.email || 'your.email@example.com'}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <i data-feather="phone" className="w-5 h-5 text-indigo-600"></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Phone</h4>
                    <p className="text-gray-600">{personal.phone || '+123 456 7890'}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <i data-feather="map-pin" className="w-5 h-5 text-indigo-600"></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Location</h4>
                    <p className="text-gray-600">{personal.location || 'City, Country'}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="font-medium text-gray-800 mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                  <a href={social.github || '#'} className="bg-gray-100 p-3 rounded-full hover:bg-indigo-100 transition">
                    <i data-feather="github" className="w-5 h-5 text-gray-700"></i>
                  </a>
                  <a href={social.twitter || '#'} className="bg-gray-100 p-3 rounded-full hover:bg-indigo-100 transition">
                    <i data-feather="twitter" className="w-5 h-5 text-gray-700"></i>
                  </a>
                  <a href={social.linkedin || '#'} className="bg-gray-100 p-3 rounded-full hover:bg-indigo-100 transition">
                    <i data-feather="linkedin" className="w-5 h-5 text-gray-700"></i>
                  </a>
                  <a href={social.instagram || '#'} className="bg-gray-100 p-3 rounded-full hover:bg-indigo-100 transition">
                    <i data-feather="instagram" className="w-5 h-5 text-gray-700"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
