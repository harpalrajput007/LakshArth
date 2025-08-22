import React from 'react'

function Brokerage() {
    return (
        <div className="container border-top">
            <div className="row mt-3 mb-4">
                <div className="col-8 text-center">
                    <a className='fs-5' style={{textDecoration: "none"}} href="">Brokerage calculator</a>
                </div>
                <div className="col-4 text-center">
                    <a className='fs-5' style={{textDecoration: "none"}} href="">List of charges</a>
                </div>
            </div>
            <div className="row mb-5">
                <ul>
                    <li className='text-muted'>Call & Trade and RMS auto-squareoff: Additional charges of &#8377;50 + GST per order.</li>
                    <li className='text-muted'>Digital contract notes will be sent via e-mail.</li>
                    <li className='text-muted'>Physical copies of contract notes, if required, shall be charged &#8377;20 per contract note. Courier charges apply.</li>
                    <li className='text-muted'>For NRI account (non-PIS), 0.5% or &#8377;100 per executed order for equity (whichever is lower).</li>
                    <li className='text-muted'>For NRI account (PIS), 0.5% or &#8377;200 per executed order for equity (whichever is lower).</li>
                    <li className='text-muted'>If the account is in debit balance, any order placed will be charged &#8377;40 per executed order instead of 20 per executed order.</li>
                </ul>
            </div>
        </div>
    );
}

export default Brokerage;