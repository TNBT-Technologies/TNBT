import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';  
function Manager() {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({site: "", userName: "", password: "" })
  const [passwordArray, setPasswordArray] = useState([])

  const getPasswords = async()=>{
          let req = await fetch("http://localhost:3000/")
          let passwords = await req.json()  
          console.log(passwords)
      setPasswordArray(passwords);
    }

  
  useEffect(() => {
    getPasswords();
    

  },[])


  const copyText = (text) => {
    toast('Copied to clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",

    });
    navigator.clipboard.writeText(text)

  }

  const showPassword = () => {
    passwordRef.current.type = "text"
    if (ref.current.src.includes("/hidepass.png")) {
      ref.current.src = "/showpasseye.png"
      passwordRef.current.type = "password"
    }
    else {
      passwordRef.current.type = "text"
      ref.current.src = "/hidepass.png"
    }

  }


  const savePassword = async() => {
    console.log(form);
    setPasswordArray([...passwordArray, {...form, id: uuidv4()}]);
     await fetch("http://localhost:3000/", {method:"DELETE", headers:{"content-Type": "application/json"}, body: JSON.stringify({id: form.id})})
      await fetch("http://localhost:3000/", {method:"POST", headers:{"content-Type": "application/json"}, body: JSON.stringify({...form, id:uuidv4()})})

    //localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
    //console.log(passwordArray)
    setForm({site:"", userName: "", password:"" })
    toast('Password saved!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",

    });
  }
  const deletePassword = async(id) => {
    console.log("Deleted with id", id);
    setPasswordArray(passwordArray.filter(item=>item.id !== id));
    let res = await fetch("http://localhost:3000/", {method:"DELETE", headers:{"content-Type": "application/json"}, body: JSON.stringify({ id})})
    //localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id !== id)))
    console.log(passwordArray)
    toast('Password deleted!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",

    });

  }

    
      
    const editPassword = (id) => {
    console.log("editing with id", id);
setForm({...passwordArray.filter(i => i.id === id)[0], id: id});

    
    setPasswordArray(passwordArray.filter(item => item.id !== id));
};


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"

      />

      <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0),rgba(252,205,238,.5)_100%)]"></div>

      <div className="myContainer">

        <h1 className="text-4xl font-bold text-center">
          <span className="bg-green-700">&lt;</span>Password Manager <span className="bg-green-700">&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">Save your passwords</p>


        <div className="flex flex-col p-4 text-black gap-8 items-center">

          <input value={form.site} onChange={handleChange} className="rounded-full border border-green-500 w-full p-4 py-1" type="text" name="site" placeholder="Enter website URL" />


          <div className="flex w-full gap-8">
            <input value={form.userName} onChange={handleChange} className="rounded-full border border-green-500 w-full p-4 py-1" type="text"
              name='userName' placeholder="Enter username" />
            <div className="relative"><input ref={passwordRef} value={form.password} onChange={handleChange} className="rounded-full border border-green-500 w-full p-4 py-1" type="password" name='password' placeholder="Enter password" />
              <span className='absolute right-0 top-0 cursor-pointer ' onClick={showPassword}>
                <img ref={ref} src="/showpasseye.png" alt='eye' className='p-3 w-10 flex justify-content-center'></img>
              </span>
            </div>
          </div>



          <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-500 rounded-full px-8 py-2 w-fit hover:bg-green-300'>
            <lord-icon
              src="https://cdn.lordicon.com/hqymfzvj.json"
              trigger="hover"
            >
            </lord-icon>
            Save Password</button>
        </div>

        <div className="passwords">
          <h2 className='font-bold text-2xl py-4'> Your passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 &&

            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className=' bg-green-800 text-white  className="text-center w-32"'>
                <tr>
                  <th className='py-2'>Site</th>
                  <th className='py-2'>Username</th>
                  <th className='py-2'>Password</th>
                  <th className='py-2'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-green-50'>

                {passwordArray.map((item, index) => {
                  return <tr key={index}>
                    <td className="text-center py-2 border border-white">
                      <div className='flex items-center justify-center'>
                        <a href={item.site} target='_blank'>{item.site}</a>
                        <div className="lordiconcopy size-7 cursor-pointer" onClick={() => { copyText(item.site) }}>
                          <lord-icon
                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                            src="https://cdn.lordicon.com/fjvfsqea.json" trigger="hover"></lord-icon>
                        </div>
                      </div>
                    </td>



                    <td className=" text-center py-2 border border-white">
                      <div className='flex items-center justify-center'>
                        <span>{item.userName}</span>

                        <div className="lordiconcopy size-7 cursor-pointer" onClick={() => { copyText(item.userName) }}>
                          <lord-icon
                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                            src="https://cdn.lordicon.com/fjvfsqea.json" trigger="hover"></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="text center py-2 border border-white">
                      <div className='flex items-center justify-center'>
                        <span>{"*".repeat(item.password.length)}</span>
                        <div className="lordiconcopy size-7 cursor-pointer" onClick={() => { copyText(item.password) }}>
                          <lord-icon
                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                            src="https://cdn.lordicon.com/fjvfsqea.json" trigger="hover"></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className=" text-center py-2 border border-white">
                      <span className='cursor-pointer mx-1' onClick={()=>{editPassword(item.id)}
                      }><lord-icon
                        src="https://cdn.lordicon.com/exymduqj.json"
                        trigger="hover"
                        style={{"width":"25px", "height":"25px"}}>
                      </lord-icon></span>
                      <span className='cursor-pointer mx-1'onClick={()=>{deletePassword(item.id)}}><lord-icon
                        src="https://cdn.lordicon.com/hwjcdycb.json"
                        trigger="hover"
                        style={{"width":"25px", "height":"25px"}}>
                      </lord-icon></span>
                    </td>
                  </tr>
                })}


              </tbody>
            </table>}
        </div>
      </div>
    </>
  );
}

export default Manager; 
