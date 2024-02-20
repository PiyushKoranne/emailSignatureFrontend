import {Link} from 'react-router-dom'

const ErrorHandler = () => {
  return (
    <div>
        <h2>Oops! Some Error Has Occurred.</h2>
        <h3>Please try again later.</h3>
        <Link to='/' className='site-btn'> Back To Home </Link>
    </div>
  )
}

export default ErrorHandler