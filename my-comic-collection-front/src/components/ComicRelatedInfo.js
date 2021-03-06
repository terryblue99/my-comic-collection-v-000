import React from 'react'
import { useHistory } from 'react-router-dom'

const ComicRelatedInfo = ()  => {

  let history = useHistory()
  
  const handleBack = () => {
    history.push('/dashboard')
  }
    
  return (

    <div className='ComicRelated'>
    
      <div className='ComicRelated-container'>
        < br/>
        < br/>
        <h2 className='ComicRelated-text Dark-red-color Center-text'>Comic-Related Information</h2>
        < br/>
        <p>Comic-Related records can contain any type of information</p>
        <p>related to comics. Images for these will not be displayed</p>
        <p>on the main dashboard.</p>
        < br/>
        <p><span className='ComicRelated-note'>Note:</span> Information about a specific saved comic can be entered in</p>
        <p className='ComicRelated-info-tab'>the <span className='Blue-color'>Notes</span> input field of that comic.</p>
        < br/>
        <h3 className='ComicRelated-text Dark-red-color Center-text'>To add a Comic-Related record</h3>
        < br/>
        <ol className='ComicRelated-OL'>
          <li>Click the <span className='Blue-color'>ADD COMIC-RELATED</span> button</li>
          <li>Enter a title for it in the <span className='Blue-color'>Title</span> input</li>
          <li>Use the <span className='Blue-color'>Notes</span> input and/or other input/s to enter information</li>
          <li>If an image is available, click the <span className='Blue-color'>Choose File</span> button to upload it</li>
          <li>Click the <span className='Blue-color'>SAVE</span> button to save the record</li>
        </ol>
        < br/>
        <p><span className='ComicRelated-note'>Note:</span> Include words you may want to search on in these records.</p>
        < br/>
        <button onClick={handleBack} className='btn Button-text'>Back to dashboard</button>
      </div>

    </div>
  )   
}

export default ComicRelatedInfo