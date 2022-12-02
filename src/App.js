import logo from './logo.svg';
import './App.css';
import axios from 'axios';
// import FaceCapture from './FaceCapture'
import ReactWebcam from './ReactWebcam'
import { useEffect, useState } from 'react';

function App() {
  const[filePath,setFilePath] = useState("")
  const fileChange = (file) =>{
    setFilePath(file.target.files[0])
  }
  useEffect(()=>{
console.log("filePath",filePath)
  },[filePath])

  const uploadImage = () =>{
    var formData = new FormData();
formData.append("file", filePath);
    axios.post("http://34.140.27.246/face_analyzer",formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }})
    .then(res=>console.log(res))
    .catch(err=>console.log(err))  }
  

  return (
    <div className="App">
      {/* <FaceCapture /> */}
      <ReactWebcam />
      <input type={"file"} onChange={fileChange}/>
  <button onClick={uploadImage}>Upload</button>
  
    </div>
  );
}

export default App;
