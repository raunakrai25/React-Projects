import { useCallback, useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8);
  const [isNumberAllowed, setisNumberAllowed] = useState(false);
  const [isCharacterAllowed, setisCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const GeneratPassword = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(isNumberAllowed) str+="0123456789";
    if(isCharacterAllowed) str+="!@#$%^&*()_-+=':,./|{}[]`~";

    for (let i = 1; i< length; i++) {
          let char = Math.floor(Math.random()*str.length + 1)
          pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, isNumberAllowed, isCharacterAllowed, setPassword])

  const passwordRef = useRef(null)

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    GeneratPassword();
  }, [length, isNumberAllowed, isCharacterAllowed, GeneratPassword])  

  return (
    <>
       <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
           ref={passwordRef}
        />
        <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>
        
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setlength(e.target.value)}}
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={isNumberAllowed}
          id="numberInput"
          onChange={() => {
              setisNumberAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={isCharacterAllowed}
              id="characterInput"
              onChange={() => {
                  setisCharacterAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
</div>
    </>
  )
}

export default App
