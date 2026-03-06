
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import posts from "./blogData.json";

export default function BlogDetails() {
  const { id } = useParams();

  const postIndex = posts.findIndex(
    (p) => p.id?.toLowerCase() === id?.toLowerCase()
  );
  const post = postIndex !== -1 ? posts[postIndex] : null;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <Link
          to="/blog"
          className="text-[#00D3CD] font-bold border-b-2 border-[#00D3CD]"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fafafa] min-h-screen font-sans text-black pb-20">
     
      <div className="max-w-6xl mx-auto pt-10 md:pt-20 px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div
            className={`space-y-6 transition-all duration-1000 ${
              visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="inline-block px-3 py-1 bg-black text-white text-xs font-bold uppercase tracking-tighter">
              {post.tag}
            </div>

            <h1 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tighter">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
              <span className="w-10 h-[2px] bg-[#00D3CD]"></span>
              <span>{post.author}</span>
              <span>•</span>
              <span>{post.date}</span>
            </div>
          </div>

          <div
            className={`relative transition-all duration-1000 delay-300 ${
              visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-[#00D3CD] z-0"></div>
            <img
              src={post.img}
              alt={post.title}
              className="relative z-10 w-full h-[300px] md:h-[400px] object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-20 px-6 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
          {post.content?.map((para, i) => (
            <p
              key={i}
              className="text-xl leading-relaxed text-gray-800 font-light"
            >
              {para}
            </p>
          ))}

      
          {post.whyChoose && (
            <div className="grid sm:grid-cols-2 gap-0 border-2 border-black mt-16">
              {post.whyChoose.map((item, i) => (
                <div
                  key={i}
                  className="p-6 border border-gray-100 flex items-start gap-4 bg-white group hover:bg-black transition-colors duration-300"
                >
                  <span className="text-[#00D3CD] text-2xl font-black group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                  <span className="font-bold group-hover:text-white">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

    
        <div className="lg:col-span-4">
          <div className="sticky top-10 space-y-6">
            <div className="bg-[#00D3CD] p-8 transform md:rotate-2">
              <h2 className="text-black font-black text-2xl mb-6 uppercase">
                Highlights
              </h2>

              <div className="space-y-8">
                {post.highlights?.map((f, i) => (
                  <div
                    key={i}
                    className="border-b border-black/10 pb-4 last:border-0"
                  >
                    <h3 className="font-black text-sm uppercase mb-2">
                      {f.title}
                    </h3>
                    <p className="text-black/70 text-sm leading-snug">
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

      
            <Link
              to="/blog"
              className="flex items-center justify-center gap-2 w-full py-4 border-2 border-black font-bold hover:bg-black hover:text-white transition-all uppercase text-sm tracking-widest"
            >
              ← All blogs
            </Link>
          </div>
        </div>
      </div>

      
      {post.related && (
        <div className="max-w-6xl mx-auto mt-32 px-6">
          <h2 className="text-3xl font-black mb-10 tracking-tighter">
            More to Read
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {post.related.map((idx) => (
              <Link
                key={idx}
                to={`/blog/${posts[idx].id}`}
                className="group block"
              >
                <div className="relative overflow-hidden mb-6">
                  <img
                    src={posts[idx].img}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={posts[idx].title}
                  />
                  <div className="absolute inset-0 bg-[#00D3CD]/10 group-hover:bg-transparent transition-colors"></div>
                </div>

                <h3 className="text-2xl font-black group-hover:underline decoration-[#00D3CD] decoration-4 underline-offset-4">
                  {posts[idx].title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}