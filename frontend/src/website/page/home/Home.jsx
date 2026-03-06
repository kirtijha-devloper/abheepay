import React, { useRef, useEffect } from 'react';
import Herosection from "../home/Herosection";
import About from "../home/About";
import Services from '../home/Services';
import Whychooseus from '../home/Whychooseus';
import Ourclient from '../home/Ourclient';
import Benefites from '../home/Benefites';
import Team from '../home/Team';
import Blog from "../home/Blog";
import EnquiryPopup from '../../components/Enquiryform';
import FaqSection from './Faq';
import Enquiry from '../home/Enquiry'
import Whatwedo from './Whatwedo';
import Join from './Join';
import Journey from './Journey';
import Testimonial from './Testimonial';

const Home = () => {
  const popupRef = useRef();

  // Optional: Prevent popup from showing again if user closed it
  useEffect(() => {
    const hasClosedPopup = sessionStorage.getItem('enquiryPopupClosed');

    if (!hasClosedPopup) {
      const timer = setTimeout(() => {
        popupRef.current?.openPopup();
      }, 5000); // 8 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  // Track when popup is closed
  const handlePopupClose = () => {
    sessionStorage.setItem('enquiryPopupClosed', 'true');
  };

  return (
    <div>
      {/* Enquiry Popup - Auto open after 8s (only once per session) */}
      <EnquiryPopup ref={popupRef} onClose={handlePopupClose} />

      {/* All Sections */}
      <Herosection />
      <About />
      <Whatwedo />
      {/* <Services /> */}
      <Whychooseus />
      <Ourclient />
      <Join />
      <Journey />
      <Testimonial />
      {/* <Benefites /> */}
      {/* < Team /> */}
      <Blog />
      <FaqSection />
      <Enquiry />
    
    </div>
  );
};

export default Home;