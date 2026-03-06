// BlogPage.jsx (React JSX + Tailwind CSS) ✅ FULL UPDATED
import React from "react";
import { Link } from "react-router-dom";
import posts from "./blogData.json";

export default function BlogPage() {
  return (
    <div className="bg-white">
      <div className="relative w-full">
        <img
          src="public/assets/image/blog/banner.jpg"
          alt="Blog Banner"
          className="w-full h-[500px] object-cover hidden sm:block"
        />
        <img
          src="public/assets/image/blog/banner.jpg"
          alt="Blog Banner Mobile"
          className="w-full object-cover h-[300px] sm:hidden"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        
      </div>

  
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {posts.map((post, index) => (
              <div
                key={post.id || index}
                className="bg-white border border-black/10 rounded-md shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
              >
              
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />

              
                <div className="p-4 flex flex-col flex-1">
                 
                  <div className="flex items-center gap-4 text-[10px] text-black/60 mb-2">
                    <span className="flex items-center gap-1">⏳ {post.time}</span>
                    <span className="flex items-center gap-1">
                      💬 {post.comments}
                    </span>
                  </div>

                  
                  <p className="text-[11px] font-bold text-[#00D3CD] uppercase tracking-wide">
                    {post.tag}
                  </p>

                  <h3 className="text-sm font-semibold text-black leading-5 mt-1 mb-3 flex-1">
                    {post.title}
                  </h3>

             
                  <div className="flex items-center gap-6 text-xs text-black/70 mb-4">
                    <span className="flex items-center gap-1">
                      👤 {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      📅 {post.date}
                    </span>
                  </div>

                
                  <Link
                    to={`/blog/${post.id}`}
                    className="mt-auto text-center bg-black text-white text-sm font-medium py-2 px-4 rounded hover:bg-[#00D3CD] hover:text-black transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}