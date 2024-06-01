import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Button from "./Button";



const AllItemsDisplay = ({headings, children}) => {
  return (
    <div className="pt-18 px-10 max-w-[100%]">
      <Button>
        <Link to="/" className="inline-flex text-xl">
        <FaHome className="text-2xl pr-1 pt-1"/> Back Home
        </Link>
      </Button>

      <div className="grid grid-cols-3 text-center text-4xl font-bold gap-16 py-5">
        {headings.map((header) => {
          return (
            <h1 key={header}>{header}</h1>
          )
        })}
        </div>
      {children}
    </div>
  )
}

export default AllItemsDisplay