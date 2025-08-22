import React from 'react'

function LeftSection({imageURL, productName, productDescription, tryDemo, learnMore, googlePlay, appStore}) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-6 p-5">
                    <img className='mt-4' src={imageURL} alt="Product Image"/>
                </div>
                <div className="col-6 p-5 my-auto mx-">
                    <h1 className='fs-3 mb-4'>{productName}</h1>
                    <p className='fs-6' style={{width: "80%"}}>{productDescription}</p>
                    <div className='mb-4'>
                        <a className="try-demo-btn" href={tryDemo}>Try Demo <i class="fa-solid fa-arrow-right-long"></i></a>
                        <a className="learn-more-btn" href={learnMore}>Learn More <i class="fa-solid fa-arrow-right-long"></i></a>
                    </div>
                    <div className='mt-3'>
                        <a href={googlePlay}><img src="assets\googlePlayBadge.svg" alt="" /></a>
                        <a style={{marginLeft: "40px"}} href={appStore}><img src="assets\appstoreBadge.svg" alt="" /></a>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default LeftSection;