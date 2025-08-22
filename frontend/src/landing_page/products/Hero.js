import React from 'react'

function Hero() {
    return (
        <div className="container border-bottom p-5">
            <div className="row text-center mt-5">
                <h1 className='mt-3 mb-3'>Technology</h1>
                <h5 className='mb-3 text-muted'>Sleek, modern and intuitive trading platforms</h5>
                <p className='mb-5'>Check out our <a style={{textDecoration: "none"}} href="">investment offerings <i class="fa-solid fa-arrow-right-long"></i></a></p>
            </div>
        </div>
    );
}

export default Hero;