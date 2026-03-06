import React from 'react';

const steps = [
  { 
    id: 1, 
    title: 'Prospect', 
    color: 'bg-[#2DD4BF]',    
    border: 'border-[#2DD4BF]', 
    img: 'public/assets/image/logo/logos.png' 
  },
  { 
    id: 2, 
    title: 'Approach', 
    color: 'bg-[#519ABA]',
    border: 'border-[#519ABA]', 
    img: 'https://www.instantmudra.net/apps/home/media/images/image-temp.jpg' 
  },
  { 
    id: 3, 
    title: 'KYC Collection', 
    color: 'bg-[#F3924D]',
    border: 'border-[#F3924D]', 
    img: 'https://www.instantmudra.net/apps/home/media/images/about-temp2.jpg' 
  },
  { 
    id: 4, 
    title: 'KYC Validation', 
    color: 'bg-[#66D2A3]',
    border: 'border-[#66D2A3]', 
    img: 'https://www.instantmudra.net/apps/home/media/images/intro-video.jpg' 
  },
  { 
    id: 5, 
    title: 'Account Setup', 
    color: 'bg-[#7E7389]',
    border: 'border-[#7E7389]', 
    img: 'https://www.instantmudra.net/apps/home/media/images/case-study1.jpg' 
  },
  { 
    id: 6, 
    title: 'Let Start', 
    color: 'bg-[#D26FA5]',
    border: 'border-[#D26FA5]', 
    img: 'https://i.pinimg.com/1200x/cc/87/d0/cc87d05cac84c6f7de24486693900a6e.jpg' 
  },
];

const Journey = () => {
  return (
    <div className="py-12 bg-white font-sans">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
        Let the Journey Begins...
        <div className="w-12 h-0.5 bg-[#2dd4bf] mx-auto mt-2"></div>
      </h2>

      <div className="flex flex-wrap justify-center gap-4 px-4">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center w-40">
           
            <div className={`relative p-2 rounded-full border-4 ${step.border} mb-4 shadow-lg`}>
              <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-50 flex items-center justify-center">
                <img 
                  src={step.img}
                  alt={step.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="w-full text-center">
              <p className="font-bold text-gray-800 mb-2 h-10 flex items-center justify-center">
                {step.title}
              </p>
              <div className={`${step.color} text-white py-1 rounded-sm text-sm font-semibold`}>
                Step{step.id}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journey;
