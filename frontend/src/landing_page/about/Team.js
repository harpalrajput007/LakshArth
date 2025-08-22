import React from 'react'

function Team() {
    return (
        <div className="container" style={{width: "75%"}}>
            <div className="row">
                <h1 className='text-center mb-2 fs-3'>People</h1>
                <div className='row'>
                    <div className="col-5 p-5 text-center">
                        <img style={{height: "300px"}} className='rounded-circle mx-5 mb-4' src="assets\nithinKamath.jpg" alt="" />
                        <p className='fs-5'>Nithin Kamath</p>
                        <p className='text-muted'>Founder, CEO</p>
                    </div>
                    <div className="col-7 mt-4 p-5">
                        <p className='fs-6'>Nithin bootstrapped and founded LAKSHARTH in 2010 to overcome the<br/>hurdles he faced during his decade long stint as a trader. Today,<br/>LAKSHARTH has changed the landscape of the Indian broking industry.</p>
                        <p className='fs-6'>He is a member of the SEBI Secondary Market Advisory Committee<br/>(SMAC) and the Market Data Advisory Committee (MDAC).</p>
                        <p className='fs-6'>Playing basketball is his zen.</p>
                        <p className='fs-6'>Connect on <a style={{textDecoration: "none"}} href=''>Homepage</a>/ <a style={{textDecoration: "none"}} href="">TradingQnA</a> / <a style={{textDecoration: "none"}} href="">Twitter</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Team;