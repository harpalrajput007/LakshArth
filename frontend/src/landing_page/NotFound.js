import React from 'react'

function NotFound() {
    return (
        <div className='container p-5 mb-5 border mt-5 rounded' style={{width: "40%", backgroundColor: "rgba(56, 126, 209, 0.3)"}}>
            <div className='row text-center'>
                <h1 className = "mt-5 mb-3">404 Not Found</h1>
                <p className='mb-4'>Sorry, the page you are looking for does not exist.</p>
            </div> 
        </div> 
    );
}

export default NotFound;