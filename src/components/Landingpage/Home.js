import React from 'react';
import './App.css';
import { GlobalProvider } from './context/GlobalState';

import Header from './Components/Header/Header';
import Hero from './Components/Hero/Hero';
import About1 from './Components/About1/About1';
import About2 from './Components/About2/About2';
import Services from './Components/Services/Services';
import Info from './Components/Info/Info';
import HowItWorks from './Components/HowItWorks/HowItWorks';
import MobileApp from './Components/MobileApp/MobileApp';
import SellerReviews from './Components/SellerReviews/SellerReviews';
import PayLater from './Components/PayLater/PayLater';
import Media from './Components/Media/Media';
import Partner from './Components/Partner/Partner';
import Footer from './Components/Footer/Footer';

import BackToTop from './Components/BackToTop/BackToTop';

// MUI custom theme
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './Theme'

function Home() {
  return (
    <GlobalProvider>
      <ThemeProvider theme={theme}>
        <div className='App'>
          <div className={'bgTop'}>
            <div className={'bgBottom'} />
            <Header />
            <Hero />
            <About1 />
            <About2 />
            <Services />
            <Info />
            <HowItWorks />
            <MobileApp />
            <SellerReviews />
            <PayLater />
            <Media />
            <Partner />
            <Footer />
            {/* arrow button */}
            <BackToTop />
          </div>
        </div>
      </ThemeProvider>
    </GlobalProvider>
  );
}

export default Home;
