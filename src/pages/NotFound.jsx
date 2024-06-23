import {Link} from 'react-router-dom'
const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-blue-300 min-h-screen w-full">
      <div className="max-w-md text-center">
        <h1 className="text-9xl font-bold text-gray-500">404</h1>
        <p className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</p>
        <p className="text-gray-600 mb-8">Sorry, the page you are looking for does not exist.</p>
        <Link to="/welcome" className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound