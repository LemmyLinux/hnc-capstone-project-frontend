import React from 'react';

const WaitModal = () => {
    return (
        <div className='container text-center w-100' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className='spinner-border'></div>
        </div>
    )
}

export default WaitModal;