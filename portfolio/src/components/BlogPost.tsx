import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'wouter';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Blog {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  date?: string;
  readTime?: string;
  images?: string[];
  content?: string;
  content1?: string;
  content2?: string;
  content3?: string;
  content4?: string;
  content5?: string;
  disclaimer?: boolean;
  disclaimerContent?: string;
}

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const apiBase = import.meta.env.VITE_API_BASE_URL || 'https://uvaiskhan078.vercel.app';

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        post?.images ? (prevIndex + 1) % post.images.length : 0
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [post?.images]);

  useEffect(() => {
    fetch(`${apiBase}/api/blogs`)
      .then(response => response.json())
      .then((blogs: Blog[]) => {
        const foundPost = blogs.find(blog => blog.id === parseInt(id));
        setPost(foundPost || null);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching blog:', error);
        setLoading(false);
      });
  }, [id, apiBase]);

  if (loading) {
    return (
      <div className="font-sans antialiased text-gray-800 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-32">
          <h1 className="text-4xl font-bold text-center">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="font-sans antialiased text-gray-800 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-32">
          <h1 className="text-4xl font-bold text-center">Blog Post Not Found</h1>
          <Link to="/blog" className="block text-center mt-8 text-indigo-600 hover:text-indigo-800">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans antialiased text-gray-800 bg-gray-50 min-h-screen">
      {/* Blog Post Header */}
      <section className="pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-8 transition">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title} - Blog Post</h1>
          <div className="flex items-center text-sm text-gray-500 mb-8">
            <span>{post.date || 'N/A'}</span>
            <span className="mx-2">•</span>
            <span>{post.readTime || 'N/A'}</span>
          </div>
        </div>
      </section>

      {/* Image Carousel */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img
                src={post.images ? `${apiBase}/${post.images[currentImageIndex]}` : ''}
                alt={`${post.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-[500px] object-contain transition-opacity duration-500"
              />
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={() => setCurrentImageIndex((prev) =>
                post?.images ? (prev - 1 + post.images.length) % post.images.length : 0
              )}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setCurrentImageIndex((prev) =>
                post?.images ? (prev + 1) % post.images.length : 0
              )}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Indicators */}
            <div className="flex justify-center mt-4 space-x-2">
              {post.images?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition ${
                    index === currentImageIndex ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-72 xl:px-80 prose prose-xl max-w-none">
          {post.content1 && (
            <div className="mb-8">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content1}</ReactMarkdown>
            </div>
          )}
          {post.content2 && (
            <div className="mb-8">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content2}</ReactMarkdown>
            </div>
          )}
          {post.content3 && (
            <div className="mb-8">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content3}</ReactMarkdown>
            </div>
          )}
          {post.content4 && (
            <div className="mb-8">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content4}</ReactMarkdown>
            </div>
          )}
          {post.content5 && (
            <div className="mb-8">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content5}</ReactMarkdown>
            </div>
          )}

          {/* Disclaimer */}
          {post.disclaimer && post.disclaimerContent && (
            <div className="mt-12 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded-r-lg">
              <p className="text-sm italic">
                {post.disclaimerContent}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
