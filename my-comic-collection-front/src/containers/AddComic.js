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
          for_sale_price: 0.00,
          sold_for: 0.00,
          net_payout: 0.00,
          date_for_sale: '',
          date_sold: '',
          date_shipped: '',
          payout_date: '',
          sale_venue: '',
          grade: '',
          fmv: 0.00,
          notes: '',
          image: null,
          user_id: currentUser.user.id
     }

     const {
          comic_publisher: comic_related
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
          // validate the 'Date Published' input for comic records
          if (!isComicRelated) {
               const isValidDate = DateValidation(stateData.date_published)
               if (!isValidDate) {
                    alert('Date Published must be in format yyyy-mm-dd, yyyy-mm or yyyy and contain valid day & month numbers!')
                    return
               }
          }
          // validate the 'Date For Sale' input for comic records
          if (!isComicRelated && stateData.date_for_sale !== '') {
               const isValidDate = DateValidation(stateData.date_for_sale)
               if (!isValidDate) {
                    alert('Date For Sale must be in format yyyy-mm-dd, yyyy-mm or yyyy and contain valid day & month numbers!')
                    return
               }
          }
          // validate the 'Date Sold' input for comic records
          if (!isComicRelated && stateData.date_sold !== '') {
               const isValidDate = DateValidation(stateData.date_sold)
               if (!isValidDate) {
                    alert('Date Sold must be in format yyyy-mm-dd, yyyy-mm or yyyy and contain valid day & month numbers!')
                    return
               }
          }
          // validate the 'Date Shipped' input for comic records
          if (!isComicRelated && stateData.date_shipped !== '') {
               const isValidDate = DateValidation(stateData.date_shipped)
               if (!isValidDate) {
                    alert('Date Shipped must be in format yyyy-mm-dd, yyyy-mm or yyyy and contain valid day & month numbers!')
                    return
               }
          }
          // validate the 'Payout Date' input for comic records
          if (!isComicRelated && stateData.payout_date !== '') {
               const isValidDate = DateValidation(stateData.payout_date)
               if (!isValidDate) {
                    alert('Payout Date must be in format yyyy-mm-dd, yyyy-mm or yyyy and contain valid day & month numbers!')
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
               formData.append('fmv', stateData.fmv)
               formData.append('for_sale_price', stateData.for_sale_price)
               formData.append('sold_for', stateData.sold_for)
               formData.append('net_payout', stateData.net_payout)
               formData.append('date_for_sale', stateData.date_for_sale)
               formData.append('date_sold', stateData.date_sold)
               formData.append('date_shipped', stateData.date_shipped)
               formData.append('payout_date', stateData.payout_date)
               formData.append('sale_venue', stateData.sale_venue)
               formData.append('grade', stateData.grade)
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
               formData.append('related_input4', stateData.related_input4)
               formData.append('related_input5', stateData.related_input5)
               formData.append('related_input6', stateData.related_input6)
               formData.append('related_input7', stateData.related_input7)
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
                              :    <input className='Input-element'
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
                              :null
                         }
                         
                         {!isAddComicRelated
                              ?    <> <label>For Sale Price (e.g. 99.99 | defaults to 0)</label>
                                        <input className='Input-element'
                                             type='number'
                                             step='0.01'
                                             min='0'
                                             name='for_sale_price'
                                             onChange={handleChange}/> 
                                        <br />   
                                   </>
                              :null
                         }
                         
                         {!isAddComicRelated
                              ?    <> <label>Sold For (e.g. 99.99 | defaults to 0)</label>
                                        <input className='Input-element'
                                             type='number'
                                             step='0.01'
                                             min='0'
                                             name='sold_for'
                                             onChange={handleChange}/> 
                                        <br />    
                                   </>
                              :null
                         }
                         
                         {!isAddComicRelated
                              ?    <> <label>Net Payout (e.g. 99.99 | defaults to 0)</label>
                                        <input className='Input-element'
                                             type='number'
                                             step='0.01'
                                             min='0'
                                             name='net_payout'
                                             onChange={handleChange}/>  
                                        <br />   
                                   </>
                                   :null
                         }
                         
                         {!isAddComicRelated
                              ?    <>   <label>Date For Sale (yyyy-mm-dd, yyyy-mm or yyyy)</label>
                                        <input className='Input-element'
                                             type='text'
                                             name='date_for_sale'
                                             onChange={handleChange}/>
                                   </>
                              :    <input className='Input-element'
                                        autoComplete='off'
                                        type='text'
                                        name='related_input4'
                                        onChange={handleChange}/>
                         }
                         <br />
                         {!isAddComicRelated
                              ?    <>   <label>Date Sold (yyyy-mm-dd, yyyy-mm or yyyy)</label>
                                        <input className='Input-element'
                                             type='text'
                                             name='date_sold'
                                             onChange={handleChange}/>
                                   </>
                              :    <input className='Input-element'
                                        autoComplete='off'
                                        type='text'
                                        name='related_input5'
                                        onChange={handleChange}/>
                         }
                         <br />
                         {!isAddComicRelated
                              ?    <>   <label>Date Shipped (yyyy-mm-dd, yyyy-mm or yyyy)</label>
                                        <input className='Input-element'
                                             type='text'
                                             name='date_shipped'
                                             onChange={handleChange}/>
                                        <br />
                                   </>
                              :null
                         }
                       
                         {!isAddComicRelated
                              ?    <>   <label>Payout Date (yyyy-mm-dd, yyyy-mm or yyyy)</label>
                                        <input className='Input-element'
                                             type='text'
                                             name='payout_date'
                                             onChange={handleChange}/>
                                   </>
                              :    <input className='Input-element'
                                        autoComplete='off'
                                        type='text'
                                        name='related_input6'
                                        onChange={handleChange}/>
                         }
                         <br />
                         {!isAddComicRelated
                              ?    <>   <label>Sale Venue</label>
                                        <input className='Input-element'
                                             type='text'
                                             name='sale_venue'
                                             onChange={handleChange}/>
                                   </>
                              :    <input className='Input-element'
                                        autoComplete='off'
                                        type='text'
                                        name='related_input7'
                                        onChange={handleChange}/>
                         }
                         <br />
                         {!isAddComicRelated
                              ?    <>   <label>Grade</label>
                                        <input className='Input-element'
                                             type='text'
                                             name='grade'
                                             onChange={handleChange}/>
                                   </>
                              :    <input className='Input-element'
                                        autoComplete='off'
                                        type='text'
                                        name='related_input8'
                                        onChange={handleChange}/>
                         }
                         <br />
                         {!isAddComicRelated
                              ?    <> <label>Fair Market Value (FMV) (e.g. 999.99 | defaults to 0)</label>
                                        <input className='Input-element'
                                             type='number'
                                             step='0.01'
                                             min='0'
                                             name='fmv'
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