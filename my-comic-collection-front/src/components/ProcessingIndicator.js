// https://www.basefactor.com/react-how-to-display-a-loading-indicator-on-fetch-calls
import React from 'react'
// React promise tracker implements a custom hook that can report 
// the current status to the loading indicator component
import { usePromiseTracker } from "react-promise-tracker"
// react-loader-spinner provides simple React.js spinner component which 
// can be implemented for async wait operation before data load to the view
import Loader from 'react-loader-spinner'

const ProcessingIndicator = () => {
  const { promiseInProgress } = usePromiseTracker()
  return promiseInProgress &&
    <div>
      <Loader type="ThreeDots" color="#2BAD60" height="50" width="50" />
      Deleting your account - Please wait!
    </div>
}

export default ProcessingIndicator