import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../Utils/GlobalContext';

function NavBar(){
    const [search, setSearch]=useState('');
    const context = useContext(GlobalContext);
    function onSearchChange(e){
        setSearch(e.target.value);
    }
    function onSearchButtonClick(){
        console.log(search);
        context.changeCity(search);
        // console.log(context.city)
    }
    return(
        <div className='d-flex flex-grow-1'>
            <input type="text" placeholder="Search City..." onChange={onSearchChange} value={search} className="form-control w-25 mx-4" />
            <input type="button" value="search!" onClick={onSearchButtonClick} className="btn btn-primary" />
        </div>
    )
}
export default NavBar;