
const Button = ({children}) => {
  return (
    <div className="py-5">
      <button className="bg-blue-400 hover:bg-blue-500 px-4 py-1 rounded-lg text-xl font-bold">{children}</button>
    </div>
  )
}

export default Button