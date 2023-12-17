import React from 'react'
import NavPar from '../Components/NavPar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function More() {

    if (!localStorage.getItem('Logged')) {
        window.open('/SignIn', '_self')
    }

    const navigate = useNavigate()
    const [isLogged, setIsLogged] = React.useState(localStorage.getItem('Logged'))
    const user = localStorage.getItem('user')
    const userData = JSON.parse(user);

    const { id } = useParams()
    const [date, setDate] = React.useState(new Date());
    console.log(date);
    const [data, setData] = React.useState([])
    React.useEffect(()=>{
        getData()
    }, [])

    console.log(data);
    const getData =()=>{
        axios.get(`https://fakestoreapi.com/products/${id}`)
        .then(res=>{
            // console.log(res.data);
            setData(res.data);

        })
    }

    const cart = (data)=>{
        axios.post(`https://657c69a1853beeefdb9965c7.mockapi.io/cart`, {
            userId: userData.id,
            date:'2023-12-17',
            image: data.image,
            title: data.title,
            price: data.price,
            quantity:1
        })
        .then(res=>{
            alert('added to cart!')
        })
    }

  return (
    <div>
        <NavPar/>

        <div className='lg:flex lg:flex-row md:flex-col max-md:flex-col max-sm:flex-col justify-center items-center mt-20'>
            {/* prod img  */}
            <div className='h-96 w-96 bg-contain bg-center bg-no-repeat'
            style={{backgroundImage: `url(${data.image})`}}
            >
                
            </div>

            <div className='w-96 flex flex-col'>
                <div className='font-bold text-3xl'>{data.title}</div>
                <div className='font-bold text-xl'>{data.description}</div>
                <div>{data.category}</div>
                <div>
                    {/* Rate: {data.rating.rate} out of 5 | */}
                 {/* <span
                className='text-[rgb(20,124,142)]'>{data.rating.count} person</span> */}
                </div>
                <hr />
                <div>
                    <span>$</span>
                    <span className='text-4xl'>{data.price}</span>
                    <p className='mt-3 text-[rgb(20,124,142)]'>FREE RETURNS</p>
                </div>
            </div>

            <div className='w-80 border flex flex-col gap-3 lg:ml-10'>
                <div className='font-bold'>Buy new:</div>
                <div>
                    <span>$</span>
                    <span className='text-4xl'>{data.price}</span>
                    <p className='mt-3 text-[rgb(20,124,142)]'>FREE RETURNS</p>
                </div>
                <div className='text-gray-500'>
                    ${data.price} $39.93 Shipping & Import Charges to Saudi Arabia 
                    <span className='text-[rgb(20,124,142)]'> Details</span>
                </div>

                <div>
                Delivery Order within 19 hrs 8 mins
                </div>

                <div>
                Or fastest delivery within 9 hrs
                </div>

                <div className='text-[rgb(20,124,142)]'>
                    Deliver to Saudi Arabia
                </div>

                <div className='text-[rgb(72,156,72)] font-bold text-2xl'>
                    In Stock
                </div>

                <button
        onClick={()=>{cart(data)}}
        class="bg-[rgb(255,216,20)] hover:bg-[rgb(247,202,0)] 
        focus:ring-2 font-medium rounded-3xl text-sm py-2.5 px-5 sm:w-auto"
      >
        Add to Cart
      </button>

      <button
        onClick={()=>{navigate('/')}}
        class="bg-[rgb(255,164,28)] hover:bg-[rgb(250,137,0)] 
        focus:ring-2 font-medium rounded-3xl text-sm py-2.5 px-5 sm:w-auto"
      >
        Back
      </button>


            </div>
        </div>
    </div>
  )
}

export default More