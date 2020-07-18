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
          movement: '',
          band: '',
          model_number: '',
          case_measurement: '',
          water_resistance: '',
          complications: '',
          date_bought: '',
          cost: 0.00,
          notes: '',
          user_id: currentUser.user.id,
          image: null
     }
          
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
               const isValidDate = DateValidation(stateData.date_bought)
               if (!isValidDate) {
                    alert('Date Bought/RCVD must be in format yyyy-mm-dd, yyyy-mm or yyyy and contain valid day & month numbers!')
                    return
               }
          }   
          // Create the record
          const formData = new FormData()
          formData.append('comic_publisher', stateData.comic_publisher)
          formData.append('comic_name', stateData.comic_name)
          formData.append('movement', stateData.movement)
          formData.append('band', stateData.band)
          formData.append('model_number', stateData.model_number)
          formData.append('case_measurement', stateData.case_measurement)
          formData.append('water_resistance', stateData.water_resistance)
          formData.append('complications', stateData.complications)
          formData.append('date_bought', stateData.date_bought)
          formData.append('cost', stateData.cost)
          formData.append('notes', stateData.notes)
          formData.append('user_id', stateData.user_id)
          if (stateData.image) {
               formData.append('image', stateData.image)
          }
          dispatch(addComicAction(formData, stateData.comicData))
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
                              ?    <> <label>Comic Publisher</label>
                                        <input autoFocus id='Focus-first-input' 
                                             className='Input-element' required 
                                             type='text'
                                             name='comic_publisher'
                                             onChange={handleChange}/>
                                   </>
                              :    <> <input className='Input-element Dark-red-color'
                                             autoComplete='off'
                                             type='text'
                                             name='comic_publisher'
                                             value={comicRelated}
                                             readonly/>
                                   </>
                         }
                         <br />
                         {!isAddComicRelated
                              ?    <> <label>Comic Name</label>
                                   <input className='Input-element' required 
                                             type='text'
                                             name='comic_name'
                                             onChange={handleChange}/>
                                   </>
                              :    <> <label>Title</label>
                                   <input autoFocus id='Focus-first-input' required
                                             className='Input-element'
                                             type='text'
                                             name='comic_name'
                                             onChange={handleChange}/>
                                   </>
                         }
                         <br />
                         {!isAddComicRelated
                              ?    <> <label>Movement</label>
                                   <input className='Input-element'
                                             type='text'
                                             name='movement'
                                             onChange={handleChange}/>
                                   </>
                              :    <> <input className='Input-element'
                                             autoComplete='off'
                                             type='text'
                                             name='movement'
                                             onChange={handleChange}/>
                                   </>
                         }
                         <br />
                         {!isAddComicRelated
                              ?    <> <label>Complications</label>
                                   <input className='Input-element'
                                             type='text'
                                             name='complications'
                                             onChange={handleChange}/>
                                   </>
                              :    <> <input className='Input-element'
                                             autoComplete='off'
                                             type='text'
                                             name='complications'
                                             onChange={handleChange}/>
                                   </>
                         }
                         <br />
                         {!isAddComicRelated
                              ?    <> <label>Band</label>
                                   <input className='Input-element'
                                             type='text'
                                             name='band'
                                             onChange={handleChange}/>
                                   </>
                              :    <> <input className='Input-element'
                                             autoComplete='off'
                                             type='text'
                                             name='band'
                                             onChange={handleChange}/>
                                   </>
                         }
                         <br /> 
                         {!isAddComicRelated
                              ?    <> <label>Model Number</label>
                                   <input className='Input-element'
                                             type='text'
                                             name='model_number'
                                             onChange={handleChange}/>
                                   </>
                              :    <> <input className='Input-element'
                                             autoComplete='off'
                                             type='text'
                                             name='model_number'
                                             onChange={handleChange}/>
                                   </>
                         }
                         <br />
                         {!isAddComicRelated
                              ?    <> <label>Case Measurement (e.g. 45mm)</label>
                                   <input className='Input-element'
                                             type='text'
                                             name='case_measurement'
                                             onChange={handleChange}/>
                                   </>
                              :    <> <input className='Input-element'
                                             autoComplete='off'
                                             type='text'
                                             name='case_measurement'
                                             onChange={handleChange}/>
                                   </>
                         }
                         <br />
                         {!isAddComicRelated
                              ?    <> <label>Water Resistance (e.g. 200 meters)</label>
                                   <input className='Input-element'
                                             type='text'
                                             name='water_resistance'
                                             onChange={handleChange}/>
                                   </>
                              :    <> <input className='Input-element'
                                             autoComplete='off'
                                             type='text'
                                             name='water_resistance'
                                             onChange={handleChange}/>
                                   </>
                         }
                         <br />
                         {!isAddComicRelated
                              ?    <> <label>Date Bought/RCVD (yyyy-mm-dd, yyyy-mm or yyyy)</label>
                                   <input className='Input-element' required
                                             type='text'
                                             name='date_bought'
                                             onChange={handleChange}/>
                                   </>
                              : null
                         }
                         <br />
                         {!isAddComicRelated
                              ?    <> <label>Cost (e.g. 199.99 | defaults to 0)</label>
                                   <input className='Input-element'
                                             type='number'
                                             step='0.01'
                                             min='0'
                                             name='cost'
                                             onChange={handleChange}
                                   /> 
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
                         <input className='Input-element Choose-image'  
                              type='file'
                              name='image'
                              onChange={handleFile}
                         />
                         <button className='btn Save-button Button-text' type='submit'>Save</button>
                    </form>
               </div>
               
          </div>
     )   
                                    
}

export default AddComic