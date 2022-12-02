import React, { useEffect } from "react";
// import Webcam from 'react-webcam'
import Webcam from "react-webcam";

import './style.css'
import axios from "axios";
export default function ReactWebcam(props){
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    const [imagePath,setImagePath] = React.useState("");
  
    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      if(imageSrc != null){
        props.setLoading(true)
      
      setImgSrc(imageSrc);
    fetch(imageSrc)
    .then(res =>res.blob())
    .then(blob => {
        const fd = new FormData();
        fd.append('file',blob)
    axios.post("http://34.140.27.246/face_analyzer",fd, {
        headers: {
        'Content-Type': 'multipart/form-data'
      }})
    .then(res=>{
      
      props.setResData(res.data)
      props.setLoading(false)
      
    }
      )
    .catch(err=>{
      console.log(err)
     props.setLoading(false)
    
    })
    })
    // props.setLoading(false)

  }else{
    alert("Please Capture Image")
  }

        
    }, [webcamRef, setImgSrc]);
    
    
    return (
      <>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          screenshotQuality={1080}
          mirrored={true}
        />
        <button onClick={capture}>Capture photo</button>
        {imgSrc && (
          <img
            src={imgSrc}
            
          />
        )}
      </>
    );
  };
  
//   ReactDOM.render(<WebcamCapture />, document.getElementById("root"));
  
  // https://www.npmjs.com/package/react-webcam
  