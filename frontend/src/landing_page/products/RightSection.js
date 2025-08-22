import React from 'react'

function RightSection({productName, productDescription, imageURL, learnMore}) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-6 p-5 my-auto mx-">
                    <h1 className='fs-3 mb-4'>{productName}</h1>
                    <p className='fs-6' style={{width: "80%"}}>{productDescription}</p>
                    <div className='mb-4'>
                        <a style={{textDecoration: "none"}} href={learnMore}>Learn More <i class="fa-solid fa-arrow-right-long"></i></a>
                    </div>
                </div>
                <div className="col-6 p-5">
                    <img className='mt-4' src={imageURL} alt="Product Image"/>
                </div>
            </div>
        </div>
    );
}

export default RightSection;