import React from 'react'
import { useHistory } from 'react-router-dom'

const WatchRelatedInfo = ()  => {

  let history = useHistory()
  
  const handleBack = () => {
    history.push('/dashboard')
  }
    
  return (

    <div className='WatchRelated'>
    
      <div className='WatchRelated-container'>
        < br/>
        < br/>
        <h2 className='WatchRelated-text Dark-red-color Center-text'>Watch-Related Information</h2>
        < br/>
        <p>Watch-Related records can contain any type of information</p>
        <p>related to watches. For example, winders, cases, tools, straps,</p>
        <p>bracelets, spare parts, 'how to' info, etc.</p>
        < br/>
        <p><span className='WatchRelated-note'>Note:</span> Information about a specific saved watch can be entered in</p>
        <p className='WatchRelated-info-tab'>the <span className='Blue-color'>Notes</span> input field of that watch.</p>
        < br/>
        <h3 className='WatchRelated-text Dark-red-color Center-text'>To add a Watch-Related record</h3>
        < br/>
        <ol className='WatchRelated-OL'>
          <li>Click the <span className='Blue-color'>ADD WATCH-RELATED</span> button</li>
          <li>Enter a title for it in the <span className='Blue-color'>Title</span> input</li>
          <li>Use the <span className='Blue-color'>Notes</span> input and/or other input/s to enter information</li>
          <li>If an image is available, click the <span className='Blue-color'>Choose File</span> button to upload it</li>
          <li>Click the <span className='Blue-color'>SAVE</span> button to save the record</li>
        </ol>
        < br/>
        <p><span className='WatchRelated-note'>Note:</span> The <span className='Dark-red-color'>Watch-Related</span> field is fixed and uneditable. It will be used</p>
        <p className='WatchRelated-info-tab'>to recognize and select Watch-Related records to be processed accordingly. Include words you may want to search on in those records.</p>
        < br/>
        <button onClick={handleBack} className='btn Button-text'>Back to dashboard</button>
      </div>

    </div>
  )   
}

export default WatchRelatedInfo