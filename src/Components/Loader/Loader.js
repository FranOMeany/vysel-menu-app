import Spinner from 'react-bootstrap/Spinner';
import './Loader.css'

function Loader() {
    return (
      <>
      <Spinner animation="border" variant="primary" className='app-loader' />
      </>
    );
}

export default Loader;