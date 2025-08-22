import React from 'react'

function Hero() {
    return (
        <section className="container-fluid" id="supportHero">
            <div className="p-3" id="supportWrapper">
                <h5 className='mt-4'>Support Portal</h5>
                <a href="">Track Tickets</a>
            </div>
            <div className="row p-3 mt-4 mb-5 mx-auto">
                <div className="col-6 mb-5" id='leftColumn'>
                    <h2 className='fs-4 mb-4'>Search for an answer or browse help topics<br/>to create a ticket</h2>
                    <input className='p-4 rounded mb-4' style={{width: "480px"}} type="text" placeholder='Eg: how do i activate F&O, why is my order getting rejected..'/>
                    <br />
                    <a href="">Track account opening</a>&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="">Track segment activation</a>&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="">Intraday margins</a>&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="">Kite user manual</a>
                </div>
                <div className="col-6" id='rightColumn'>
                    <h2>Featured</h2>
                    <p>1.<a href=''>Current Takeovers and Delisting - january 2024</a></p>
                    <p>2.<a href=''>Latest Intraday Leverages - MIS & CO</a></p>
                </div>
            </div>
        </section>
    );
}

export default Hero;