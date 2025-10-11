import React, { useEffect } from 'react';
import { useParams, Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

interface Post {
  title: string;
  date: string;
  readTime: string;
  images: string[];
  content: string;
}

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();

  // Hardcoded blog data (in a real app, this would come from an API or CMS)
  const blogPosts: Record<string, Post> = {
    1: {
      title: "Getting Started with React Hooks",
      date: "June 15, 2023",
      readTime: "5 min read",
      images: [
        "https://static.photos/technology/640x360/7",
        "https://static.photos/technology/640x360/10",
        "https://static.photos/technology/640x360/11"
      ],
      content: `
        <p>React Hooks have revolutionized the way we write React components. Introduced in React 16.8, hooks allow you to use state and other React features without writing a class component. This makes your code more readable, reusable, and easier to test.</p>

        <h2>What are React Hooks?</h2>
        <p>Hooks are functions that let you "hook into" React state and lifecycle features from function components. They don't work inside classes – they let you use React without classes.</p>

        <p>The most commonly used hooks are:</p>
        <ul>
          <li><strong>useState:</strong> For adding state to function components</li>
          <li><strong>useEffect:</strong> For performing side effects in function components</li>
          <li><strong>useContext:</strong> For consuming context in function components</li>
        </ul>

        <h2>useState Hook</h2>
        <p>The useState hook allows you to add state to your function components. Here's a simple example:</p>

        <pre><code>import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}</code></pre>

        <h2>useEffect Hook</h2>
        <p>The useEffect hook lets you perform side effects in function components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React classes.</p>

        <p>Example of fetching data:</p>
        <pre><code>import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(response => response.json())
      .then(data => setUser(data));
  }, [userId]);

  if (!user) return <div>Loading...</div>;

  return <div>{user.name}</div>;
}</code></pre>

        <h2>Rules of Hooks</h2>
        <p>There are two main rules you must follow when using hooks:</p>
        <ol>
          <li>Only call hooks at the top level. Don't call hooks inside loops, conditions, or nested functions.</li>
          <li>Only call hooks from React function components or custom hooks.</li>
        </ol>

        <p>Following these rules ensures that hooks are called in the same order each time a component renders, which is crucial for React to correctly preserve the state of hooks between multiple useState and useEffect calls.</p>

        <h2>Conclusion</h2>
        <p>React Hooks provide a powerful way to write cleaner, more maintainable React code. While there might be a learning curve initially, the benefits of using hooks far outweigh the costs. Start small by converting simple class components to function components with hooks, and gradually expand your usage as you become more comfortable.</p>
      `
    },
    2: {
      title: "CSS Grid vs Flexbox",
      date: "May 28, 2023",
      readTime: "8 min read",
      images: [
        "https://static.photos/technology/640x360/8",
        "https://static.photos/technology/640x360/12",
        "https://static.photos/technology/640x360/13",
        "https://static.photos/technology/640x360/14"
      ],
      content: `
        <p>CSS Grid and Flexbox are two powerful layout systems that have transformed how we approach web design. While both are incredibly useful, they serve different purposes and are often complementary rather than competing technologies.</p>

        <h2>Understanding Flexbox</h2>
        <p>Flexbox, or Flexible Box Layout, is designed for one-dimensional layouts. It excels at distributing space along a single axis (either horizontal or vertical) and is perfect for:</p>
        <ul>
          <li>Navigation bars</li>
          <li>Card layouts</li>
          <li>Centering content</li>
          <li>Simple responsive designs</li>
        </ul>

        <p>Flexbox works from the content out. You apply display: flex to a container, and the children become flex items that can be aligned and distributed along the main axis and cross axis.</p>

        <h2>Understanding CSS Grid</h2>
        <p>CSS Grid Layout is designed for two-dimensional layouts. It allows you to create complex grid-based designs with rows and columns, making it ideal for:</p>
        <ul>
          <li>Page layouts</li>
          <li>Complex forms</li>
          <li>Image galleries</li>
          <li>Dashboard layouts</li>
        </ul>

        <p>Grid works from the layout in. You define the grid structure first, then place items into specific grid areas.</p>

        <h2>When to Use Flexbox</h2>
        <p>Use Flexbox when you need to:</p>
        <ul>
          <li>Align items along a single axis</li>
          <li>Distribute space between items</li>
          <li>Reorder items dynamically</li>
          <li>Create simple, responsive layouts</li>
        </ul>

        <p>Example: A navigation bar</p>
        <pre><code>.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}</code></pre>

        <h2>When to Use CSS Grid</h2>
        <p>Use CSS Grid when you need to:</p>
        <ul>
          <li>Create complex, two-dimensional layouts</li>
          <li>Align items both horizontally and vertically</li>
          <li>Define specific grid areas for content</li>
          <li>Build responsive designs with precise control</li>
        </ul>

        <p>Example: A page layout</p>
        <pre><code>.page {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
}</code></pre>

        <h2>Using Them Together</h2>
        <p>The best approach is often to use both technologies together. For example, you might use CSS Grid for the overall page layout, and Flexbox for aligning content within individual grid areas.</p>

        <p>This combination gives you the power of two-dimensional layout control with the flexibility of one-dimensional item alignment.</p>

        <h2>Browser Support</h2>
        <p>Both Flexbox and CSS Grid have excellent browser support:</p>
        <ul>
          <li>Flexbox: Supported in all modern browsers (IE 11+)</li>
          <li>CSS Grid: Supported in all modern browsers (IE 11+ with -ms- prefixes)</li>
        </ul>

        <p>For older browsers, consider using Autoprefixer or providing fallbacks.</p>

        <h2>Conclusion</h2>
        <p>CSS Grid and Flexbox are both essential tools in modern web development. Rather than choosing one over the other, learn both and use them where they excel. Flexbox for one-dimensional layouts, CSS Grid for two-dimensional layouts, and both together for complex, responsive designs.</p>
      `
    },
    3: {
      title: "Optimizing Web Performance",
      date: "April 12, 2023",
      readTime: "6 min read",
      images: [
        "https://static.photos/technology/640x360/9",
        "https://static.photos/technology/640x360/15"
      ],
      content: `
        <p>Web performance is crucial for user experience and SEO. Slow websites lose visitors and rank lower in search results. Fortunately, there are many techniques to optimize your site's performance.</p>

        <h2>Why Performance Matters</h2>
        <p>Studies show that:</p>
        <ul>
          <li>53% of mobile users abandon sites that take longer than 3 seconds to load</li>
          <li>Every 1-second delay in page load time can reduce conversions by 7%</li>
          <li>Fast sites rank higher in Google search results</li>
        </ul>

        <h2>Image Optimization</h2>
        <p>Images often account for the majority of a webpage's file size. Here are some optimization techniques:</p>

        <h3>Choose the Right Format</h3>
        <ul>
          <li><strong>JPEG:</strong> Best for photographs and complex images</li>
          <li><strong>PNG:</strong> Good for images with transparency or simple graphics</li>
          <li><strong>WebP:</strong> Modern format with better compression (use with fallbacks)</li>
          <li><strong>SVG:</strong> Perfect for logos and icons</li>
        </ul>

        <h3>Compress Images</h3>
        <p>Use tools like ImageOptim, TinyPNG, or online services to reduce file sizes without losing quality.</p>

        <h3>Responsive Images</h3>
        <p>Use the srcset attribute to serve different image sizes based on screen size and device pixel ratio.</p>
        <pre><code><img src="image-small.jpg"
     srcset="image-small.jpg 480w,
             image-medium.jpg 768w,
             image-large.jpg 1024w"
     sizes="(max-width: 480px) 100vw,
            (max-width: 768px) 50vw,
            33vw"></code></pre>

        <h2>Minify and Compress Assets</h2>
        <p>Minification removes unnecessary characters from code without changing functionality. Compression reduces file sizes for transmission.</p>

        <ul>
          <li><strong>HTML:</strong> Use tools like HTMLMinifier</li>
          <li><strong>CSS:</strong> Use cssnano or clean-css</li>
          <li><strong>JavaScript:</strong> Use UglifyJS or Terser</li>
          <li><strong>Gzip/Brotli:</strong> Enable compression on your server</li>
        </ul>

        <h2>Lazy Loading</h2>
        <p>Lazy loading defers the loading of non-critical resources until they're needed. This can significantly improve initial page load times.</p>

        <p>For images:</p>
        <pre><code><img loading="lazy" src="image.jpg" alt="Description"></code></pre>

        <p>For JavaScript modules, consider using dynamic imports:</p>
        <pre><code>const module = await import('./module.js');</code></pre>

        <h2>Caching Strategies</h2>
        <p>Proper caching can dramatically improve repeat visit performance.</p>

        <h3>Browser Caching</h3>
        <p>Set appropriate cache headers for static assets:</p>
        <pre><code>Cache-Control: public, max-age=31536000</code></pre>

        <h3>Service Workers</h3>
        <p>Service workers can cache assets and serve them from cache, enabling offline functionality and instant loading for repeat visits.</p>

        <h2>Critical Rendering Path</h2>
        <p>Optimize the critical rendering path to get content on screen as quickly as possible.</p>

        <ul>
          <li>Eliminate render-blocking JavaScript and CSS</li>
          <li>Inline critical CSS</li>
          <li>Defer non-critical JavaScript</li>
          <li>Use resource hints like preload and prefetch</li>
        </ul>

        <h2>Monitoring Performance</h2>
        <p>Use tools to monitor and measure your site's performance:</p>

        <ul>
          <li><strong>Lighthouse:</strong> Google's automated tool for improving web page quality</li>
          <li><strong>WebPageTest:</strong> Detailed performance analysis</li>
          <li><strong>Chrome DevTools:</strong> Built-in browser performance tools</li>
          <li><strong>Real User Monitoring (RUM):</strong> Track actual user experiences</li>
        </ul>

        <h2>Conclusion</h2>
        <p>Web performance optimization is an ongoing process. Start with the basics like image optimization and minification, then move on to more advanced techniques like lazy loading and service workers. Regularly monitor your site's performance and make improvements iteratively.</p>
      `
    }
  };

  const post = blogPosts[id];

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
            <span>{post.date}</span>
            <span className="mx-2">•</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Blog Post Images */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {post.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${post.title} - Image ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Post Content */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
