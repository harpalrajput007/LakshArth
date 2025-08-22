import React from 'react'
import Hero from './Hero';
import LeftSection from './LeftSection';
import RightSection from './RightSection';
import Universe from './Universe';

function ProductsPage() {
    return ( 
        <>
            <Hero/>
            <LeftSection 
                imageURL = "assets/TARK.png" 
                productName = "TARK" 
                productDescription = "Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Experience seamless trading with real-time portfolio tracking and comprehensive order management." 
                tryDemo ="http://localhost:3001" 
                learnMore ="" 
                googlePlay = "" 
                appStore = ""
            />
            <RightSection imageURL = "assets\console.png" productName = "Console" productDescription = "The central dashboard for your LAKSHARTH account. Gain insights into your trades and investments with in-depth reports and visualisations." tryDemo ="" learnMore ="" googlePlay = "" appStore = ""/>
            <LeftSection imageURL = "assets\coin.png" productName = "Coin" productDescription = "Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices." tryDemo ="" learnMore ="" googlePlay = "" appStore = ""/>
            <RightSection imageURL = "assets\kiteconnect.png" productName = "Kite Connect API" productDescription = "Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it to our clientbase." tryDemo ="" learnMore ="" googlePlay = "" appStore = ""/>
            <LeftSection imageURL = "assets\varsity.png" productName = "Varsity Mobile" productDescription = "An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations. Content is broken down into bite-size cards to help you learn on the go." tryDemo ="" learnMore ="" googlePlay = "" appStore = ""/>
            <p className='text-center fs-5 mb-5'>Want to know more about our technology stack? Check out the <a style={{textDecoration: "none"}} href="">LAKSHARTH.tech</a> blog.</p>
            <Universe/>
        </>
     );
}

export default ProductsPage;