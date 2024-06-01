import AllItemsDisplay from "../../components/AllItemsDisplay"

export const headings = [
  "Provider",
  "NPI",
  "Something"
]


const AllProviders = () => {
  return (
    <div className="pt-24 px-5">
    <AllItemsDisplay headings={headings}/>
    </div>
  )
}

export default AllProviders