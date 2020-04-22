import React, { ChangeEvent } from 'react'
import axios from 'axios'

function App() {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const uploadFile = files[0]
      const formData = new FormData()
      formData.append(uploadFile.name, uploadFile)
      axios.post('http://jsonplaceholder.typicode.com/posts', formData, {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      }).then(res => {
        console.log(res)
      })
    }
  }
  return (
    <div className="App">
      <input type='file' onChange={handleChange} />
    </div>
  );
}

export default App;
