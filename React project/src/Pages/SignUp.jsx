import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function SignUp() {

    const navigate = useNavigate()
    const [err, setErr] = React.useState('')
    const [inputs, setInputs] =  React.useState({
        username: '',
        email: '',
        password: '',
        re_password: '',
    })

    const addInputs = (event)=>{
        setInputs({...inputs,
        [event.target.name]: event.target.value
        })
    }

    const sign_up=()=>{
        if (!inputs.username) {
            setErr('Enter your username')
            return
        }

        if (!inputs.email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(inputs.email)) {
            setErr('Enter your emeail')
            return
        }

        if (!inputs.password || !/[a-zA-Z]/.test(inputs.password) || !/\d/.test(inputs.password)) {
            setErr('Enter your pasword')
            return
        }

        if (!inputs.re_password || inputs.re_password !== inputs.password) {
            setErr('Passwords must match')
            return
        }

        axios.get(`https://fakestoreapi.com/users`)
        .then(res=>{
            console.log(res.data);
        const result = res.data.find((item)=>
        item.username === inputs.username && item.email === inputs.email && item.password === inputs.password
        )
        console.log(result);
        localStorage.setItem('user', JSON.stringify(result))
        localStorage.setItem('Logged', true)
        navigate('/')
        })
    }

  return (
    <div className='flex flex-col justify-center items-center'>
        
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png" 
        className='w-32 mt-10'
        alt="" />

        <div class="w-96 rounded-lg shadow-lg p-5 bg-white text-black border mt-5">
  <h2 class="text-2xl font-bold pb-5">Create account</h2>
    <div class="mb-4">
      <label for="username" class="block mb-2 text-sm font-medium">username</label>
      <input
        type="text"
        id="username"
        name='username'
        class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
        placeholder="your username"
        required
        value={inputs.username}
        onChange={addInputs}
      />
    </div>
    <div class="mb-4">
      <label for="email" class="block mb-2 text-sm font-medium">Email</label>
      <input
        type="email"
        id="email"
        name='email'
        class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
        placeholder="andrew@mail.com"
        required
        value={inputs.email}
        onChange={addInputs}
      />
    </div>
    <div class="mb-4">
      <label for="password" class="block mb-2 text-sm font-medium">Password</label>
      <input
        type="password"
        id="password"
        name='password'
        class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
        placeholder="At least 6 characters"
        required
        value={inputs.password}
        onChange={addInputs}
      />
      <div className='text-xs'>Password must be at least 6 characters.</div>
    </div>

    <div class="mb-4">
      <label for="re_password" class="block mb-2 text-sm font-medium">Re Password</label>
      <input
        type="password"
        id="re_password"
        name='re_password'
        class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
        placeholder="At least 6 characters"
        required
        value={inputs.re_password}
        onChange={addInputs}
      />
      <div className='text-xs'>Password must be at least 6 characters.</div>
    </div>

    <div>
      <p class="text-red-500 pb-5">{err}</p>
    </div>
    <div class="flex flex-col items-center justify-between w-full mb-4">
      <button
        onClick={sign_up}
        class="bg-[rgb(255,216,20)] hover:bg-[rgb(247,202,0)] lg:w-[20rem] focus:ring-2 font-medium rounded-lg text-sm py-2.5 px-5 sm:w-auto"
      >
        Register
      </button>

      <div class="flex items-center text-sm text-left">
        <p>By creating an account, you agree to Amazon's Conditions of Use and Privacy Notice.</p>
      </div>

        <div className='h-0.5 w-40 bg-gray-500 mt-3 mb-3'></div>
      <div class="flex text-sm text-left">
        <p>Already have an account? <span className='text-blue-400'><Link to='/SignIn'>Sign in</Link></span></p>
      </div>
    </div>
</div>

    </div>
  )
}

export default SignUp