import React from 'react';
import { Link } from 'react-router-dom';

function Error() {
    return ( 
        <div >
            <h1 className='title'>I am pretty sure this isn't the right page...</h1>
            <Link to="/login">Go back to login page.</Link>
        </div>
     );
}

export default Error;