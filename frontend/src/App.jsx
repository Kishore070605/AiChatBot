import { useState } from "react"
import axios from "axios"
import ReactMarkdown from "react-markdown"
import { useRef, useEffect } from "react"

function App() {
  const messagesEndRef = useRef(null);
  const [input,setInput] = useState("")
  const [chat,setChat] = useState([])
  function handleChange(event){
    setInput(event.target.value)
  
  }

 const handleSubmit=async (event)=> {

    event.preventDefault()
    setChat((prev) =>{return [...prev, { user: input }]})
    const response = await axios.post("http://localhost:3000/aichatbot", { message: input })
    console.log(response.data.response)
    setChat((prev) =>{return [...prev, { ai: response.data.response }]})
    setInput("")
    const storeResponse = await axios.post("http://localhost:3000/store", { question: input, answer: response.data.response })
    console.log(storeResponse.data)
    if (storeResponse.data.message === 'Data saved successfully') {
      console.log('Data stored in the database successfully');
    } else {
      console.log('Failed to store data in the database');
    }
  }

  useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  })
}, [chat])

  return(
    
       
       <div>
        
      <div>
          <h3 className="text-3xl text-blue-500 font-bold m-5">llama</h3>
      </div>

      <div className="overflow-y-auto h-[577px]">
          {chat.map((chat, index) => (chat.user ? (
            <div key={index} className="flex justify-end m-5">
              <div className="bg-blue-500 text-white max-w-[70%] rounded-lg px-4 py-2 shadow-md">
                <p className="text-right text-lg font-medium break-words">{chat.user}</p>
              </div>
            </div>
          ) : (
            <div key={index} className="flex justify-start m-5">
              <div className="bg-gray-100 text-gray-900 max-w-[70%] rounded-lg px-4 py-2 shadow-sm">
                <ReactMarkdown>{chat.ai}</ReactMarkdown>
              </div>
            </div>
          )))}
          <div ref={messagesEndRef} />

      </div>

          <div className="w-[100%] flex justify-center align-end absolute bottom-0 right-0">
            <form className="flex gap-3 m-5 flex justify-center align-end absolute bottom-0 ">
              <input type="text" name="input" value={input} onChange={handleChange} className=" w-192 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder=" Hi, how can i help you?" />
              <button type="submit" className="grid place-items-center w-32 h-12 bg-blue-500 text-white rounded px-4 py-2" onClick={handleSubmit}>➤</button>
            </form>
          </div>

       </div>

    
    )

}
export default App
