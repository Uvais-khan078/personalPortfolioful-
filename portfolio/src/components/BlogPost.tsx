import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

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
}

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_BASE_URL || 'https://personal-portfolioful.vercel.app';

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
  }, [id]);

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
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
          <div className="flex items-center text-sm text-gray-500 mb-8">
            <span>{post.date || 'N/A'}</span>
            <span className="mx-2">•</span>
            <span>{post.readTime || 'N/A'}</span>
          </div>
        </div>
      </section>

      {/* Blog Post Images */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {post.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${post.title} - Image ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
            )) || []}
          </div>
        </div>
      </section>

      {/* Blog Post Content */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
