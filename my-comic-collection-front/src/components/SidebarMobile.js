import React from 'react'

const SidebarMobile = ({ showComics, setShowComics }) => {  

    return (
        <div className='Sidebar-mobile-list'>
            <div className='SidebarMobile-list-icon' onClick={() => {
                    setShowComics(!showComics) // watch list can be toggled on and off in mobile view
                }}>
                <div></div>     
            </div>
        </div>
    )  
}

export default SidebarMobile