import { useCallback, useEffect, useState } from 'react'
import './App.css'

function App() {
  
  // Use of useState
  const [length, setLength] = useState(6)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const [copy, setCopy] = useState("Copy")

  // Use of useCallback
  const passGenerator = useCallback(
    () => {
      let pass = ""
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

      if(numberAllowed) str+="0123456789";
      if(characterAllowed) str+="!@#$%^&*()_+";

      for(let i=1;i<=length;i++){
        let char = Math.floor(Math.random()*str.length + 1);
        pass += str.charAt(char);
      }

      setPassword(pass)
    },
    [length,numberAllowed,characterAllowed,setPassword],
  )
  const copyToClipboard = useCallback(() => {
      window.navigator.clipboard.writeText(password)
    },
    [password])
  
// Use of useEffect
useEffect(() => {
    passGenerator()
    setCopy("Copy")
  }, [length,numberAllowed,characterAllowed,passGenerator])
  
// Use of useRef
// const passRef = useRef(null)
  
  return (
    <>
      <div id="main">
        <div id="page-1">
          <div id="p1-container" className='flex flex-col justify-center items-center'>
            <div id="p1-header">
              <h1>Password Generator</h1>
            </div>

            <div id="p1-password">
              <input 
              type="text"
              value={password} 
              placeholder='Password'
              readOnly
              />
              <button onClick={()=>{
                setCopy("Copied")
                copyToClipboard()
                }}>{copy}</button>
            </div>

            <div id="p1-range" className='flex justify-center'>
              <input 
              type="range" 
              min={6}
              max={100}
              onChange={(e)=> setLength(e.target.value)}
              className='cursor-pointer mx-4'
              // ref={passRef}
              />
              <label className='text-white'>Length : {length}</label>
            </div>

            <div id="p1-checkbox" className='flex justify-center my-4 items-center gap-4'>
              <div class="numbers flex justify-center items-center">
                <input 
                type="checkbox" 
                onChange={()=>{
                  setNumberAllowed((prev)=>!prev)
                }}/>
                <label htmlFor="numberInput" className='text-white px-1'>Numbers</label>
              </div>

              <div class="numbers numbers flex justify-center items-center">
                <input 
                type="checkbox" 
                onChange={()=>{
                  setCharacterAllowed((prev) => !prev)
                }}
                />
                <label htmlFor="numberInput" className='text-white px-1'>Characters</label>
              </div>
             
              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
