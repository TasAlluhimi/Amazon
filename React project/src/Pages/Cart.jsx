import React from 'react'
import NavPar from '../Components/NavPar'
import axios from 'axios'

function Cart() {

    const [isLogged, setIsLogged] = React.useState(localStorage.getItem('Logged'))
    const user = localStorage.getItem('user')
    const userData = JSON.parse(user);
    const [summ, setSum] = React.useState(0)
    const [data, setData] = React.useState([])
    const [products, setProducts] = React.useState([])
    // const [productId, setProductId] = React.useState([])
    React.useEffect(()=>{
        getData()
    }, [])

    // const cart = products.filter((item)=>
    // item.id == data.products.productId
    // )

    // console.log(cart)
    ;
    const getData =()=>{
        axios.get(`https://657c69a1853beeefdb9965c7.mockapi.io/cart`)
        .then(res=>{
            // console.log(res.data);
            const cart = res.data.filter((item)=>
            item.userId === userData.id
            )
            setData(cart);

        })
    }

    const sum = (id)=>{
        axios.get(`https://657c69a1853beeefdb9965c7.mockapi.io/cart/${id}`)
        .then(res=>{
            // console.log(res.data);
            const cart = res.data.filter((item)=>
            item.userId === userData.id
            )
            if (cart) {
                
                setSum(cart.reduce((a, b, index) => a[5] + b, 
                0))
            } else {
                
            }
            // setData(res.data);

        })
    }

    console.log(summ);

    const del =(id)=>{
        axios.delete(`https://657c69a1853beeefdb9965c7.mockapi.io/cart/${id}`)
        .then(res=>{
            console.log('deleted');
            getData()
        })
    }
    console.log(data.quantity);

    const upd = (id)=>{
        axios.put(`https://657c69a1853beeefdb9965c7.mockapi.io/cart/${id}`, {
            quantity: '2',
        })
        .then(res=>{
            alert('updated to cart!')
        })
    }

    console.log(data);

  return (
    <>
        <NavPar/>
        
        <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 class="text-2xl font-bold my-4">Shopping Cart</h1>
        <button 
        onClick={()=>{alert('order placed sucsesfully')}}
        class="bg-[rgb(255,216,20)] hover:bg-[rgb(247,202,0)]  font-bold py-2 px-4 rounded">
      Prssed to Checkout
    </button>
    </div>
    <div class="mt-8">

        <div class="flex flex-col lg:flex-col md:flex-col border-b border-gray-400 py-4 gap-3">
        
        
        {data.map((item)=>(

            <div class="container mx-auto px-4 py-8">
    <div class="mt-8">
        <div class="flex flex-col md:flex-row border-b border-gray-400 py-4">
            <div class="flex-shrink-0">
                <img src={item.image} alt="Product image" class="w-32 h-32 object-cover"/>
            </div>
            <div class="mt-4 md:mt-0 md:ml-6">
                <h2 class="text-lg font-bold">{item.title}</h2>
                <p class="mt-2 text-gray-600">{data.description}</p>
                <div class="mt-4 flex items-center">
                    <span class="mr-2 text-gray-600">Quantity:</span>
                    <div class="flex items-center">
                    <button class="bg-gray-200 rounded-l-lg px-2 py-1" 
                         onClick={()=>{del(item.id)}}
                        >-</button>
                        <span class="mx-2 text-gray-600">{data.quantity}1</span>
                        <button class="bg-gray-200 rounded-r-lg px-2 py-1"
                        onClick={()=>{upd(item.id)}}>+</button>
                    </div>
                    <span class="ml-auto font-bold">${data.price}10</span>
                </div>
            </div>
        </div>

    </div>
   
</div>
        ))}
            

            {/* </div> */}
            <div class="flex flex-col justify-center items-center mt-8 bg-white px-5">
        <span class="text-gray-600 mr-4">Subtotal ( item):</span>
        <span class="text-xl font-bold">${summ}</span>
    </div>
        </div>
       
    </div>
    
</div>
    </>
  )
}

export default Cart