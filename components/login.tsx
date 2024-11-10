import {SignIn} from '@clerk/nextjs'

export const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <SignIn/>
      </div>
    </div>
  )
}