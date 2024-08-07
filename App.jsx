import {useState, useCallback, useEffect, useRef} from 'react'
import './App.css'
function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharrAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passRef = useRef(null);
  const passwordGenerator = useCallback(()=>{
    let pass=""
    let str ="QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"
    if(numAllowed) str+="1234567890"
    if(charAllowed) str+=",./;'!@#$%^&*"
    for(let i=1; i<=length;i++) {
      let char = Math.floor(Math.random() * str.length +1);
      pass += str.charAt(char)

    }
    setPassword(pass)

  },[length, numAllowed, charAllowed, setPassword])
  const copyPass = useCallback(()=>{
    passRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(()=>{
    passwordGenerator()
  },[length, numAllowed, charAllowed, passwordGenerator])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-300 bg-gray-700">
        <h1 className="text-white text-center my-3">Password Generatror</h1>
        <div className="flex shadow rounded-lg owerflow-hidden mb-4">
          <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly ref={passRef}/>
          <button onClick={copyPass} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-ceter gap-x-1">
            <input type="range"
              min={8}
              max={50}
              value={length}
              className='cursor-pointer'
              onChange={(e)=>{setLength(e.target.value)}}
            />
            <label>length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={numAllowed}
              id='numberInput'
              onChange={()=>{
                setNumAllowed((prev)=>!prev)
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={charAllowed}
              id='charInput'
              onChange={()=>{
                setCharrAllowed((prev)=>!prev)
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
