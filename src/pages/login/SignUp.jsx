import React from 'react'
import Button from '../../components/Button'

const signUpForm = [
  {id: 1, label: "First Name", input: "text"},
  {id: 2, label: "Last Name", input: "text"},
  {id: 3, label: "Email", input: "text"},
  {id: 4, label: "Password", input: "password"},
]

const SignUp = () => {
  return (
    <div className="pt-28 px-5">
          <form action="" className="text-center">
          <div className="grid grid-cols-1">
            {signUpForm.map(({id, label, input}) => {
              return (
                <div key={id} className="items-center">
                <p className="text-xl">{label}</p> <input type={input} className="m-2 rounded-lg text-bold pl-2 text-lg" />
                </div>
              )
            })}
          </div>
          <Button>Sign Up!</Button>
        </form>
    </div>
  )
}

export default SignUp