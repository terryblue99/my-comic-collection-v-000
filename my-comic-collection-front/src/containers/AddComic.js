import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import NavBar from './NavBar'
import { addComicAction } from '../actions/comicsActions'
import ClearForm from '../components/ClearForm'
import SetFocus from '../components/SetFocus'
import RedirectTo from '../components/RedirectTo'
import DateValidation from '../components/DateValidation'

const AddComic = (props) => {

     const currentUser = useSelector(state => state.currentUser)
     const comicRelated = useSelector(state => state.myComics.comicRelated) // For records that are not related to a specific comic.
     const dispatch = useDispatch()

     const initialState = {
          comic_publisher: comicRelated,
          comic_name: '',
          comic_number: '',
          comic_title: '',
          date_published: '',
          cost: 0.00,
          notes: '',
          image: null,
          user_id: currentUser.user.id
     }

     const {
          comic_publisher: comic_related,
          comic_name: related_title,
          comic_number: related_input1,
          comic_title: related_input2,
          date_published: related_input3
     } = initialState
          
     const [backToDashboard, setBackToDashboard] = useState({isBackToDashboard: false})
     const [stateData, setStateData] = useState(initialState)

     const handleChange = (event) => {
          const {name, value} = event.target
          setStateData(prevStateData => {
               return {
                    ...prevStateData,
                   [name]: value
               }
          })                         
     }

     const handleFile = (event) => {
          const {files} = event.target
          setStateData(prevStateData => {
               return {
                    ...prevStateData,
                    image: files[0]
               }
          }) 
     }

     const handleSubmit = (event) => { 
          event.preventDefault()
      
          let isComicRelated = false
          if (stateData.comic_publisher === comicRelated) {
               isComicRelated = true
          } 
          // validate the 'Date Bought/RCVD' input for comic records
          if (!isComicRelated) {
               const isValidDate = DateValidation(stateData.date_published)
               if (!isValidDate) {
                    alert('Date Published must be in format yyyy-mm-dd, yyyy-mm or yyyy and contain valid day & month numbers!')
                    return
               }
          }   
          // Create the record
          const formData = new FormData()
          if (!isComicRelated) {
               formData.append('comic_publisher', stateData.comic_publisher)
               formData.append('comic_name', stateData.comic_name)
               formData.append('comic_number', stateData.comic_number)
               formData.append('comic_title', stateData.comic_title)         
               formData.append('date_published', stateData.date_published)
               formData.append('cost', stateData.cost)
               formData.append('notes', stateData.notes)
               formData.append('user_id', stateData.user_id)
               if (stateData.image) {
                    formData.append('image', stateData.image)
               }
          } else {
               formData.append('comic_related', comic_related)
               formData.append('related_title', stateData.related_title)
               formData.append('related_input1', stateData.related_input1)
               formData.append('related_input2', stateData.related_input2)
               formData.append('related_input3', stateData.related_input3)
               formData.append('notes', stateData.notes)
               formData.append('user_id', currentUser.user.id)
               if (stateData.image) {
                    formData.append('image', stateData.image)
               }
          }
          dispatch(addComicAction(formData))
          if (!isComicRelated) {
               alert('The comic has been added and saved!')
          } else alert(`The ${comicRelated} has been added and saved!`)
          // Clear the form
          ClearForm('AddComic-Form')
          // Set focus on the first input
          SetFocus('Focus-first-input')
     }

     const handleBack = () => {
          setBackToDashboard(prevBackToDashboard => {
               return {
                    ...prevBackToDashboard,
                    isBackToDashboard: true
               }
          })
     }     

     if (backToDashboard.isBackToDashboard) { 
          RedirectTo('/dashboard')
     }

     const isAddComicRelated = props.location.isAddComicRelated || false
     
     return (
          <div>
               <div>
                    <NavBar /> 
               </div>

               <h1 className='ComicForm-header Dark-red-color Center-text'>
                    {!isAddComicRelated
                         ? <>Add a Comic</>
                         : <>Add a Comic-Related</>
                    }
               </h1> 

               <div className='container ComicForm-container'> 

                    <button onClick={handleBack} className='btn Back-button Button-text'>Back to dashboard</button>
                    <form id='AddComic-Form'
                         onSubmit={handleSubmit}
                    >
                         {!isAddComicRelated
                              ?    <>   <label>Comic Publisher</label>
                                        <input autoFocus id='Focus-first-input' 
                                             className='Input-element' required 
                                             type='text'
                                             name='comic_publisher'
                                             onChange={handleChange}/>
                                   </>
                              :    <input className='Input-elemen'
                                        type='hidden'
                                        name='comic_related'
                                        value={comic_related}
                                   />
                         }
                         <br />
                         {!isAddComicRelated
                              ?    <>   <label>Comic Name</label>
                                        <input className='Input-element' required 
                                             type='text'
                                             name='comic_name'
                                             onChange={handleChange}/>
                                   </>
                              :    <>   <label>Title</label>
                                        <input autoFocus id='Focus-first-input' required
                                             className='Input-element'
                                             type='text'
                                             name='related_title'
                                             onChange={handleChange}/>
                                   </>
                         }
                         <br />
                         {!isAddComicRelated
                              ?    <>   <label>Comic Number</label>
                                        <input className='Input-element' required 
                                             type='text'
                                             name='comic_number'
                                             onChange={handleChange}/>
                                   </>
                              :    <input className='Input-element'
                                        autoComplete='off'
                                        type='text'
                                        name='related_input1'
                                        onChange={handleChange}/>
                         }
                         <br />
                         {!isAddComicRelated
                              ?    <> <label>Comic Title</label>
                                        <input className='Input-element'
                                             type='text'
                                             name='comic_title'
                                             onChange={handleChange}/>
                                   </>
                              :         <input className='Input-element'
                                             autoComplete='off'
                                             type='text'
                                             name='related_input2'
                                             onChange={handleChange}/>
                         }
                         <br />
                         {!isAddComicRelated
                              ?    <>   <label>Date Published (yyyy-mm-dd, yyyy-mm or yyyy)</label>
                                        <input className='Input-element' required
                                             type='text'
                                             name='date_published'
                                             onChange={handleChange}/>
                                   </>
                              :    <input className='Input-element'
                                        autoComplete='off'
                                        type='text'
                                        name='related_input3'
                                        onChange={handleChange}/>
                         }
                         <br />
                         {!isAddComicRelated
                              ?    <> <label>Cost (e.g. 99.99 | defaults to 0)</label>
                                        <input className='Input-element'
                                             type='number'
                                             step='0.01'
                                             min='0'
                                             name='cost'
                                             onChange={handleChange}/> 
                                        <br />    
                                   </>
                              : null
                         }
                         <label>Notes</label>
                              <textarea className='Text-area'  
                                   name='notes'
                                   onChange={handleChange}
                              />
                         <br /> 
                         <b className='ComicForm-upload-text Dark-red-color Center-text'>
                              Upload image</b>
                         {!isAddComicRelated
                              ?    <input className='Input-element Choose-image'  
                                        type='file'
                                        name='image'
                                        onChange={handleFile}
                                   />
                              :    <input className='Input-element Choose-image'  
                                        type='file'
                                        name='image'
                                        onChange={handleFile}
                                   />
                         }
                         <br />
                         <button className='btn Save-button Button-text' type='submit'>Save</button>
                    </form>
               </div>
               
          </div>
     )   
                                    
}

export default AddComic