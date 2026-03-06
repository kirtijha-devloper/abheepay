import React from 'react';

const teamMembers = [
  {
    name: "Arjun Sharma",
    role: "Company CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400", // Indian Male
    bgColor: "bg-orange-100"
  },
  {
    name: "Vikram Malhotra",
    role: "Co-Founder",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400", // Indian Male
    bgColor: "bg-red-100"
  },
  {
    name: "Priya Iyer",
    role: "Property Manager",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400", // Indian Female
    bgColor: "bg-blue-100"
  },
  {
    name: "Ananya Singh",
    role: "Estate Consultant",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400", // Indian Female
    bgColor: "bg-orange-50"
  }
];

const TeamSection = () => {
  return (
    <section className="py-10 px-6 max-w-7xl mx-auto text-center font-sans bg-[#F6F6FB]">
 
      <div className="mb-10">
        <h2 className="text-4xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Meet Our Team
        </h2>
        <p className="text-gray-500 max-w-3xl mx-auto text-md leading-relaxed">
          Hamari team ke anubhav aur local market ki gehri samajh hi hamari takat hai. 
          Hum aapke real estate sapno ko pura karne ke liye hamesha taiyar hain.
        </p>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-center group">
            
            
            <div className={`relative w-full aspect-[4/5] rounded-t-[100px] overflow-hidden ${member.bgColor} transition-transform duration-300 group-hover:scale-105`}>
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-full object-cover mix-blend-multiply grayscale hover:grayscale-0 transition-all duration-500"
              />
              
              
              <div className="absolute bottom-0 left-0 w-full leading-[0]">
                <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="h-20 w-full fill-white">
                  <path d="M0.00,49.98 C150,150 350,0 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"></path>
                </svg>
              </div>
            </div>

            
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-gray-800 tracking-tight">{member.name}</h3>
              <p className="text-gray-500 font-medium text-sm mt-1 uppercase tracking-widest italic">
                {member.role}
              </p>
            </div>
            
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;