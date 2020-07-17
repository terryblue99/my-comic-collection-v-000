import { useHistory } from 'react-router-dom'

const RedirectTo = (path) => {
      const history = useHistory()
      history.push({
            pathname: path
      })
}

export default RedirectTo