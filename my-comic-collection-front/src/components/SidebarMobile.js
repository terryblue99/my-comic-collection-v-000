import React from 'react'

const SidebarMobile = ({ showWatches, setShowWatches }) => {  

    return (
        <div className='Sidebar-mobile-list'>
            <div className='SidebarMobile-list-icon' onClick={() => {
                    setShowWatches(!showWatches) // watch list can be toggled on and off in mobile view
                }}>
                <div></div>     
            </div>
        </div>
    )  
}

export default SidebarMobile