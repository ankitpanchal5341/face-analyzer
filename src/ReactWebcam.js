import React, { useEffect } from "react";
// import Webcam from 'react-webcam'
import Webcam from "react-webcam";
import S3 from "react-aws-s3";

import './style.css'
import axios from "axios";
export default function ReactWebcam(){
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    const [imagePath,setImagePath] = React.useState("");
  
    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    //   console.log(imgSrc,"imgSrc")
    fetch(imageSrc)
    .then(res =>res.blob())
    .then(blob => {
        const fd = new FormData();
        // const file = new File([blob], "filename.jpeg");
        fd.append('file',blob)
        // fd.append('file,', file)
    axios.post("http://34.140.27.246/face_analyzer",fd, {
        headers: {
        'Content-Type': 'multipart/form-data'
      }})
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
    })

    

        
    }, [webcamRef, setImgSrc]);
    
    
    return (
      <>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          screenshotQuality={1080}
        />
        <button onClick={capture}>Capture photo</button>
        {/* <button onClick={capture}>Download</button> */}
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
  