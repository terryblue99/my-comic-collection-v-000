import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import NavBar from './NavBar'
import {editComicAction} from '../actions/comicsActions'
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
    comic_number: props.location.state.comic.comic_number,
    comic_title: props.location.state.comic.comic_title,
    date_published: props.location.state.comic.date_published,
    cost: props.location.state.comic.cost,
    sold_for: props.location.state.comic.sold_for,
    net_payout: props.location.state.comic.net_payout,
    date_for_sale: props.location.state.comic.date_for_sale,
    date_sold: props.location.state.comic.date_sold,
    payout_date: props.location.state.comic.payout_date,
    sale_venue: props.location.state.comic.sale_venue,
    fmv: props.location.state.comic.fmv,
    notes: props.location.state.comic.notes,
    user_id: props.location.state.comic.user_id,
    image: null
  }
  const [stateData, setStateData] = useState(initialState)
  const [formInput, setFormInput] = useState({isFormInput: false})
  const [backToDashboard, setBackToDashboard] = useState({isBackToDashboard: false})

  let {
    comic_publisher: comic_related,
    comic_name: related_title,
    comic_number: related_input1,
    comic_title: related_input2,
    date_published: related_input3,
    date_sold: related_input4,
    payout_date: related_input5,
    sale_venue: related_input6,
    date_for_sale: related_input7
  } = stateData

  if (related_input1 === 'undefined') {
    related_input1 = ' '
  }
  if (related_input2 === 'undefined') {
    related_input2 = ' '
  }
  if (related_input3 === 'undefined') {
    related_input3 = ' '
  }
  if (related_input4 === 'undefined') {
    related_input4 = ' '
  }
  if (related_input5 === 'undefined') {
    related_input5 = ' '
  }
  if (related_input6 === 'undefined') {
    related_input6 = ' '
  }

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
      return({
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
    if (formInput.isFormInput) { // validate the 'Date Published' input for comic records
      if (stateData.comic_publisher && ! isComicRelated) {
        const isValidDate = DateValidation(stateData.date_published)
        if (! isValidDate) {
          alert('Date Published must be in format yyyy-mm-dd, yyyy-mm or yyyy and contain valid day & month numbers!')
          return
        }
      }
      if (formInput.isFormInput) { // validate the 'Date For Sale' input for comic records
        if (stateData.comic_publisher && ! isComicRelated && stateData.date_for_sale !== '') {
          const isValidDate = DateValidation(stateData.date_for_sale)
          if (! isValidDate) {
            alert('Date For Sale must be in format yyyy-mm-dd, yyyy-mm or yyyy and contain valid day & month numbers!')
            return
          }
        }
      }
      if (formInput.isFormInput) { // validate the 'Date Sold' input for comic records
        if (stateData.comic_publisher && ! isComicRelated && stateData.date_sold !== '') {
          const isValidDate = DateValidation(stateData.date_sold)
          if (! isValidDate) {
            alert('Date Sold must be in format yyyy-mm-dd, yyyy-mm or yyyy and contain valid day & month numbers!')
            return
          }
        }
      }
      if (formInput.isFormInput) { // validate the 'Payout Date' input for comic records
        if (stateData.comic_publisher && ! isComicRelated && stateData.payout_date !== '') {
          const isValidDate = DateValidation(stateData.payout_date)
          if (! isValidDate) {
            alert('Payout Date must be in format yyyy-mm-dd, yyyy-mm or yyyy and contain valid day & month numbers!')
            return
          }
        }
      }  
      // Edit the record
      const formData = new FormData()
      if (! isComicRelated) {
        formData.append('comic_publisher', stateData.comic_publisher)
        formData.append('comic_name', stateData.comic_name)
        formData.append('comic_number', stateData.comic_number)
        formData.append('comic_title', stateData.comic_title)
        formData.append('date_published', stateData.date_published)
        formData.append('cost', stateData.cost)
        formData.append('sold_for', stateData.sold_for)
        formData.append('net_payout', stateData.net_payout)
        formData.append('date_for_sale', stateData.date_for_sale)
        formData.append('date_sold', stateData.date_sold)
        formData.append('payout_date', stateData.payout_date)
        formData.append('sale_venue', stateData.sale_venue)
        formData.append('fmv', stateData.fmv)
        formData.append('notes', stateData.notes)
        formData.append('user_id', stateData.user_id)
        if (stateData.image) {
          formData.append('image', stateData.image)
        }
      } else {
        formData.append('comic_related', comic_related)
        formData.append('related_title', related_title)
        formData.append('related_input1', related_input1)
        formData.append('related_input2', related_input2)
        formData.append('related_input3', related_input3)
        formData.append('related_input4', related_input4)
        formData.append('related_input5', related_input5)
        formData.append('related_input6', related_input6)
        formData.append('notes', stateData.notes)
        formData.append('user_id', stateData.user_id)
        if (stateData.image) {
          formData.append('image', stateData.image)
        }
      } dispatch(editComicAction(formData, stateData.id))
      if (! isComicRelated) {
        alert('The comic has been edited')
      } else 
        alert(`The ${comicRelated} has been edited`)
      
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
    return RedirectToWithState('/dashboard', {
      isFromEditComic: true,
      isEdits: true
    })

  } else if (backToDashboard.isBackToDashboard) {
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
        <NavBar/>
      </div>

      <h1 className='ComicForm-header Dark-red-color Center-text'>
        {
        ! isEditComicRelated ? <>Edit this Comic</> : <>Edit this Comic-Related</>
      } </h1>

      <div className='container ComicForm-container'>

        <button onClick={handleBack}
          className='btn Back-button Button-text'>Back to dashboard</button>

        <form className='EditComic-Form'
          onSubmit={handleSubmit}>
          {
          ! isEditComicRelated ? <>
            <label>Comic Publisher</label>
            <input className='Input-element' required type='text' name='comic_publisher'
              defaultValue={
                comic.comic_publisher
              }
              onChange={handleChange}/>
          </> : <>
            <input className='Input-element Dark-red-color' type='hidden' name='comic_publisher'
              value={comic_related}/>
          </>
        }
          <br/> {
          ! isEditComicRelated ? <>
            <label>Comic Name</label>
            <input className='Input-element' required type='text' name='comic_name'
              defaultValue={
                comic.comic_name
              }
              onChange={handleChange}/>
          </> : <>
            <label>Title</label>
            <input className='Input-element' required autoComplete='off' type='text' name='comic_name'
              defaultValue={related_title}
              onChange={handleChange}/>
          </>
        }
          <br/> {
          ! isEditComicRelated ? <>
            <label>Comic Number</label>
            <input className='Input-element' required type='text' name='comic_number'
              defaultValue={
                comic.comic_number
              }
              onChange={handleChange}/>
          </> : <>
            <input className='Input-element' autoComplete='off' type='text' name='comic_number'
              defaultValue={related_input1}
              onChange={handleChange}/>
          </>
        }
          <br/> {
          ! isEditComicRelated ? <>
            <label>Comic Title</label>
            <input className='Input-element' type='text' name='comic_title'
              defaultValue={
                comic.comic_title
              }
              onChange={handleChange}/>
          </> : <>
            <input className='Input-element' autoComplete='off' type='text' name='comic_title'
              defaultValue={related_input2}
              onChange={handleChange}/>
          </>
        }
          <br/> {
          ! isEditComicRelated ? <>
            <label>Date Published (yyyy-mm-dd, yyyy-mm or yyyy)</label>
            <input className='Input-element' required type='text' name='date_published'
              defaultValue={
                comic.date_published
              }
              onChange={handleChange}/>
          </> : <>
            <input className='Input-element' autoComplete='off' type='text' name='date_published'
              defaultValue={related_input3}
              onChange={handleChange}/>
          </>
        }
          <br/> {
          ! isEditComicRelated ? <>
            <label>Cost (e.g. 99.99 | defaults to 0)</label>
            <input className='Input-element' type='number' step='0.01' min='0' name='cost'
              defaultValue={
                comic.cost
              }
              onChange={handleChange}/>
            <br/>
          </> : null
        }
          {
          ! isEditComicRelated ? <>
            <label>Sold For (e.g. 99.99 | defaults to 0)</label>
            <input className='Input-element' type='number' step='0.01' min='0' name='sold_for'
              defaultValue={
                comic.sold_for
              }
              onChange={handleChange}/>
            <br/>
          </> : null
        }
          {
          ! isEditComicRelated ? <>
            <label>Net Payout (e.g. 99.99 | defaults to 0)</label>
            <input className='Input-element' type='number' step='0.01' min='0' name='net_payout'
              defaultValue={
                comic.net_payout
              }
              onChange={handleChange}/>
            <br/>
          </> : null
        }
          {
            ! isEditComicRelated ? <>
              <label>Date For Sale (yyyy-mm-dd, yyyy-mm or yyyy)</label>
              <input className='Input-element' type='text' name='date_for_sale'
                defaultValue={
                  comic.date_for_sale
                }
                onChange={handleChange}/>
            </> : <>
              <input className='Input-element' autoComplete='off' type='text' name='date_for_sale'
                defaultValue={related_input7}
                onChange={handleChange}/>
            </>
          }
          <br/> 
          {
            ! isEditComicRelated ? <>
              <label>Date Sold (yyyy-mm-dd, yyyy-mm or yyyy)</label>
              <input className='Input-element' type='text' name='date_sold'
                defaultValue={
                  comic.date_sold
                }
                onChange={handleChange}/>
            </> : <>
              <input className='Input-element' autoComplete='off' type='text' name='date_sold'
                defaultValue={related_input4}
                onChange={handleChange}/>
            </>
          }
          <br/> {
            ! isEditComicRelated ? <>
              <label>Payout Date (yyyy-mm-dd, yyyy-mm or yyyy)</label>
              <input className='Input-element' type='text' name='payout_date'
                defaultValue={
                  comic.payout_date
                }
                onChange={handleChange}/>
            </> : <>
              <input className='Input-element' autoComplete='off' type='text' name='payout_date'
                defaultValue={related_input5}
                onChange={handleChange}/>
            </>
          }
          <br/> {
          ! isEditComicRelated ? <>
            <label>Sale Venue</label>
            <input className='Input-element' type='text' name='sale_venue'
              defaultValue={
                comic.sale_venue
              }
              onChange={handleChange}/>
          </> : <>
            <input className='Input-element' autoComplete='off' type='text' name='sale_venue'
              defaultValue={related_input6}
              onChange={handleChange}/>
          </>
        }
          <br/> {
            ! isEditComicRelated ? <>
              <label>Fair Market Value (FMV) Low (e.g. 999.99 | defaults to 0)</label>
              <input className='Input-element' type='number' step='0.01' min='0' name='fmv'
                defaultValue={
                  comic.fmv
                }
                onChange={handleChange}/>
              <br/>
            </> : null
        }
          <label>Notes</label>
          <textarea className='Text-area' name='notes'
            defaultValue={
              comic.notes
            }
            onChange={handleChange}/>
          <br/>
          <b className='ComicForm-upload-text Dark-red-color Center-text'>
            Upload image</b>
          <input className='Input-element Choose-image' type='file' name='image'
            onChange={handleFile}/>
          <button className='btn Save-button Button-text' type='submit'>Save</button>
        </form>
      </div>
    </div>
  )
}

export default EditComic
