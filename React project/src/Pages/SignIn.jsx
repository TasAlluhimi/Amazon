import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function SignIn() {

    const navigate = useNavigate()
    const [err, setErr] = React.useState('')
    const [inputs, setInputs] =  React.useState({
        email: '',
        password: '',
    })

    const addInputs = (event)=>{
        setInputs({...inputs,
        [event.target.name]: event.target.value
        })
    }

    const sign_in=()=>{


        if (!inputs.email) {
            setErr('Enter your emeail')
            return
        }

        if (!inputs.password) {
            setErr('Enter your pasword')
            return
        }

        axios.get(`https://fakestoreapi.com/users`)
        .then(res=>{
            console.log(res.data);
        const result = res.data.find((item)=>
        item.email === inputs.email && item.password === inputs.password
        )
        if (result) {
            // console.log(result);
        localStorage.setItem('user', JSON.stringify(result))
        localStorage.setItem('Logged', true)
        navigate('/')

        } else {
            setErr('Email or pasword is wrong')
        }
        })
    }


  return (
    <>
        
        <div className='flex flex-col justify-center items-center'>
        
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png" 
        className='w-32 mt-10'
        alt="" />

        <div class="w-96 rounded-lg shadow-lg p-5 bg-white text-black border mt-5">
  <h2 class="text-2xl font-bold pb-5">Sign in</h2>


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

    <div>
      <p class="text-red-500 pb-5">{err}</p>
    </div>
    <div class="flex flex-col items-center justify-between w-full mb-4">
      <button
        onClick={sign_in}
        class="bg-[rgb(255,216,20)] hover:bg-[rgb(247,202,0)] lg:w-[20rem] focus:ring-2 font-medium rounded-lg text-sm py-2.5 px-5 sm:w-auto"
      >
        Sign in 
      </button>

      <div class="flex items-center text-sm text-left">
        <p>By creating an account, you agree to Amazon's Conditions of Use and Privacy Notice.</p>
      </div>

        <div className='h-0.5 w-40 bg-gray-500 mt-3 mb-3'></div>
      <div class="flex text-sm text-left">
        <p>Don't have an account? <span className='text-blue-400'><Link to='/SignUp'>Sign Up</Link></span></p>
      </div>
    </div>
</div>

    </div>

    </>
  )
}

export default SignIn