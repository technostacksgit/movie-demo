import React from 'react'
import RegisterForm from './components/RegisterForm'

const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[400px] flex flex-col gap-10 border p-10 rounded-lg">
        <div className="text-center">
            <h1 className="text-2xl font-bold">Register</h1>
            <p className="text-sm text-gray-500">Create an account to get started</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage