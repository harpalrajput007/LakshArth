import React from 'react'

function Universe() {
    return (
        <div className="container">
            <div className="row text-center">
                <h1 className='fs-3 mb-4 mt-5'>The LAKSHARTH Universe</h1>
                <p className='text-muted'>Extend your trading and investment experience even further with our partner platforms</p>
                <div className="row">
                    <div className="col-4 p-3 mt-5">
                        <img style={{height: "50px"}} src="assets\smallcaseLogo.png" alt="" />
                        <p className='text-small text-muted'>Thematic investment platform</p>
                    </div>
                    <div className="col-4 p-3 mt-5">
                        <img style={{height: "50px"}} src="assets\streakLogo.png" alt="" />
                        <p className='text-small text-muted'>Algo & strategy platform</p>
                    </div>
                    <div className="col-4 p-3 mt-5">
                        <img style={{height: "50px"}} src="assets\sensibullLogo.svg" alt="" />
                        <p className='text-small text-muted'>Options trading platform</p>
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="col-4 p-3 mt-5">
                        <img style={{height: "50px"}} src="assets\LAKSHARTHFundhouse.png" alt="" />
                        <p className='text-small text-muted'>Asset management</p>
                    </div>
                    <div className="col-4 p-3 mt-5">
                        <img style={{height: "50px"}} src="assets\goldenpiLogo.png" alt="" />
                        <p className='text-small text-muted'>Bonds trading platform</p>
                    </div>
                    <div className="col-4 p-3 mt-5">
                        <img style={{height: "50px"}} src="assets\dittoLogo.png" alt="" />
                        <p className='text-small text-muted'>Insurance platform</p>
                    </div>
                </div>
                
                <button className = "p-1.5 btn btn-primary fs-5 mb-5" style = {{width: "24%", margin: "0 auto"}}>Sign up for free</button>
            </div>
        </div>
    );
}

export default Universe;