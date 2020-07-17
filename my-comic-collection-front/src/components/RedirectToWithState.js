import { useHistory } from 'react-router-dom'

const RedirectToWithState = (path, state) => {
      const history = useHistory()
      history.push({
            pathname: path,
            state: state
      })
}

export default RedirectToWithState