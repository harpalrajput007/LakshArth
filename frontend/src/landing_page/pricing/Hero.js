import React from 'react'

function Hero() {
    return (
        <div className="container">
            <div className="row p-4 text-center mt-5 border-bottom">
                <h1 className='mb-4 fs-1'>Pricing</h1>
                <p className='mb-5 fs-5 text-muted'>Free equity investments and flat &#8377;20 intraday and F&O trades</p>
            </div>
            <div className="row p-4 text-center mt-5 mb-5">
                <div className="col-4">
                    <img src="assets\pricing0.svg" alt="" />
                    <h1 className='fs-3'>Free equity delivery</h1>
                    <p className='text-muted'>All equity delivery investments (NSE, BSE),<br/>are absolutely free — ₹ 0 brokerage.</p>
                </div>
                <div className="col-4">
                    <img src="assets\intradayTrades.svg" alt="" />
                    <h1 className='fs-3'>Intraday and F&O trades</h1>
                    <p className='text-muted'>Flat ₹ 20 or 0.03% (whichever is lower) per<br/>executed order on intraday trades across<br/>equity, currency, and commodity trades. Flat<br/>₹20 on all option trades.</p>
                </div>
                <div className="col-4">
                    <img src="assets\pricingEquity.svg" alt="" />
                    <h1 className='fs-3'>Free direct MF</h1>
                    <p className='text-muted'>All direct mutual fund investments are<br/>absolutely free — ₹ 0 commissions & DP<br/>charges.</p>
                </div>
            </div>
        </div>
    );
}

export default Hero;