import React from 'react';

const Navlinks = async () => {

    const res = await fetch("http://api/bazardor/categories");
    const data = await res.json()
    console.log(data);
    return (
        <div>
            
        </div>
    );
};

export default Navlinks;