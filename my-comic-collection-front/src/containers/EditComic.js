import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import NavBar from './NavBar'
import { editComicAction } from '../actions/ComicsActions'
import RedirectTo from '../components/RedirectTo'
import RedirectToWithState from "../components/RedirectToWithState"
import DateValidation from "../components/DateValidation"

const EditComic = (props) => {
   
     const comicRelated = useSelector(state => state.myComics.comicRelated)
     const dispatch = useDispatch()
     const initialState = {
          id: props.location.state.comic.id,
          comic_publisher: props.location.state.comic.comic_publisher,
          comic_name: props.location.state.comic.comic_name,
          movement: props.location.state.comic.movement,
          complications: props.location.state.comic.complications,
          band: props.location.state.comic.band,
          model_number: props.location.state.comic.model_number,
          case_measurement: props.location.state.comic.case_measurement,
          water_resistance: props.location.state.comic.water_resistance,
          date_bought: props.location.state.comic.date_bought,
          cost: props.location.state.comic.cost,
          notes: props.location.state.comic.notes,
          user_id: props.location.state.comic.user_id,
          image: null
     }
     const [stateData, setStateData] = useState(initialState)
     const [formInput, setFormInput] = useState({isFormInput: false})  
     const [backToDashboard, setBackToDashboard] = useState({isBackToDashboard: false})

     const setFormInputTrue = () => { 
          setFormInput(prevFormInput => {
               return {
               ...prevFormInput,
               isFormInput: true
               }
          })                            
     }
     
     const handleChange = (event) => {
          const {name, value} = event.target  
          setFormInputTrue()
          setStateData(prevStateData => {
               return ({
               ...prevStateData,
               [name]: value
               })    
          })                                 
     }
 
     const handleFile = (event) => {
          const {files} = event.target
          setFormInputTrue()
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
          if (formInput.isFormInput) {
               // validate the 'Date Bought/RCVD' input for comic records
               if (stateData.comic_publisher && !isComicRelated) {
                    const isValidDate = DateValidation(stateData.date_bought)
                    if (!isValidDate) {
                         alert('Date Bought/RCVD must be in format yyyy-mm-dd, yyyy-mm or yyyy and contain valid day & month numbers!')
                         return
                    }
               }    
               // Edit the record
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
               dispatch(editComicAction(formData, stateData.id))
               if (!isComicRelated) {
                    alert('The comic has been edited')
               } else alert(`The ${comicRelated} has been edited`)
          } else {
               alert('Nothing has been edited!')
          }  
     }

     const handleBack = () => {
          setBackToDashboard(prevBackToDashboard => {
               return {
                    ...prevBackToDashboard,
                    isBackToDashboard: true
               }
          })
     }
 
     if (backToDashboard.isBackToDashboard && formInput.isFormInput) {

          setFormInput(prevFormInput => {
               return {
               ...prevFormInput,
               isFormInput: false
               }
          })  
          setBackToDashboard(prevBackToDashboard => {
               return {
                    ...prevBackToDashboard,
                    isBackToDashboard: false
               }
          })  
          return RedirectToWithState(
                                        '/dashboard',
                                        {
                                             isFromEditComic: true,
                                             isEdits: true
                                        }
                                        )
               
     } 
     else if (backToDashboard.isBackToDashboard) {
          setBackToDashboard(prevBackToDashboard => {
               return {
                    ...prevBackToDashboard,
                    isBackToDashboard: false
               }
          })
          RedirectTo('/dashboard')
     }

     const comic = props.location.state.comic

     const isEditComicRelated = props.location.state.isEditComicRelated || false

     return ( 

          <div>
               <div>
                    <NavBar /> 
               </div> 

               <h1 className='ComicForm-header Dark-red-color Center-text'>
                    {!isEditComicRelated
                         ? <>Edit this Comic</>
                         : <>Edit this Comic-Related</>
                    }
               </h1>

               <div className='container ComicForm-container'>
               
                    <button onClick={handleBack} className='btn Back-button Button-text'>Back to dashboard</button>
                    
                    <form className='EditComic-Form'
                              onSubmit={handleSubmit}
                    >
                         {!isEditComicRelated
                              ?    <> <label>Comic Publisher</label>
                                        <input className='Input-element' required 
                                             type='text'
                                             name='comic_publisher'
                                             defaultValue={comic.comic_publisher}
                                             onChange={handleChange}/>
                                   </>
                              :    <> <input className='Input-element Dark-red-color'
                                             type='text'
                                             name='comic_publisher'
                                             value={stateData.comic_publisher}/>
                                   </>
                         }
                         <br />
                         {!isEditComicRelated
                              ?    <> <label>Comic Name</label>
                                        <input className='Input-element' required 
                                             type='text'
                                             name='comic_name'
                                             defaultValue={comic.comic_name}
                                             onChange={handleChange}/>
                                   </>
                              :    <> <label>Title</label>
                                        <input className='Input-element'
                                             autoComplete='off'
                                             type='text'
                                             name='comic_name'
                                             defaultValue={comic.comic_name}
                                             onChange={handleChange}/>
                                   </>
                         }
                         <br />
                         {!isEditComicRelated
                              ?    <> <label>Movement</label>
                                        <input className='Input-element'
                                             type='text'
                                             name='movement'
                                             defaultValue={comic.movement}
                                             onChange={handleChange}/>
                                   </>
                              :    <> <input className='Input-element'
                                             autoComplete='off'
                                             type='text'
                                             name='movement'
                                             defaultValue={comic.movement}
                                             onChange={handleChange}/>
                                   </>
                         }
                         <br />
                         {!isEditComicRelated
                              ?    <> <label>Complications</label>
                                        <input className='Input-element'
                                             type='text'
                                             name='complications'
                                             defaultValue={comic.complications}
                                             onChange={handleChange}/>
                                   </>
                              :    <> <input className='Input-element'
                                             autoComplete='off'
                                             type='text'
                                             name='complications'
                                             defaultValue={comic.complications}
                                             onChange={handleChange}/>
                                   </>
                         }
                         <br /> 
                         {!isEditComicRelated
                              ?    <> <label>Band</label>
                                        <input className='Input-element'
                                             type='text'
                                             name='band'
                                             defaultValue={comic.band}
                                             onChange={handleChange}/>
                                   </>
                              :    <> <input className='Input-element'
                                             autoComplete='off'
                                             type='text'
                                             name='band'
                                             defaultValue={comic.band}
                                             onChange={handleChange}/>
                                   </>
                         }
                         <br />
                         {!isEditComicRelated
                              ?    <> <label>Model Number</label>
                                        <input className='Input-element'
                                             type='text'
                                             name='model_number'
                                             defaultValue={comic.model_number}
                                             onChange={handleChange}/>
                                   </>
                              :    <> <input className='Input-element'
                                             autoComplete='off'
                                             type='text'
                                             name='model_number'
                                             defaultValue={comic.model_number}
                                             onChange={handleChange}/>
                                   </>
                         }
                         <br /> 
                         {!isEditComicRelated
                              ?    <> <label>Case Measurement (e.g. 45mm)</label>
                                        <input className='Input-element'
                                             type='text'
                                             name='case_measurement'
                                             defaultValue={comic.case_measurement}
                                             onChange={handleChange}/>
                                   </>
                              :    <> <input className='Input-element'
                                             autoComplete='off'
                                             type='text'
                                             name='case_measurement'
                                             defaultValue={comic.case_measurement}
                                             onChange={handleChange}/>
                                   </>
                         }
                         <br />
                         {!isEditComicRelated
                              ?    <> <label>Water Resistance (e.g. 200 meters)</label>
                                        <input className='Input-element'
                                             type='text'
                                             name='water_resistance'
                                             defaultValue={comic.water_resistance}
                                             onChange={handleChange}/>
                                   </>
                              :    <> <input className='Input-element'
                                             autoComplete='off'
                                             type='text'
                                             name='water_resistance'
                                             defaultValue={comic.water_resistance}
                                             onChange={handleChange}/>
                                   </>
                         }
                         <br />
                         {!isEditComicRelated
                              ?    <> <label>Date Bought/RCVD (yyyy-mm-dd, yyyy-mm or yyyy)</label>
                                        <input className='Input-element' required
                                             type='text'
                                             name='date_bought'
                                             defaultValue={comic.date_bought}
                                             onChange={handleChange}/>
                                   </>
                              : null
                         }
                         <br />
                         {!isEditComicRelated
                              ?    <> <label>Cost (e.g. 199.99 | defaults to 0)</label>
                                        <input className='Input-element'
                                             type='number'
                                             step='0.01'
                                             min='0'
                                             name='cost'
                                             defaultValue={comic.cost}
                                             onChange={handleChange}
                                        />
                                        <br />
                                   </>
                              : null
                         }
                         <label>Notes</label>
                              <textarea className='Text-area'  
                                   name='notes'
                                   defaultValue={comic.notes}
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

export default EditComic