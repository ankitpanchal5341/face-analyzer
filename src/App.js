import logo from './logo.svg';
import './App.css';
import axios from 'axios';
// import FaceCapture from './FaceCapture'
import ReactWebcam from './ReactWebcam'
import { useEffect, useState } from 'react';


function App() {
  const [filePath, setFilePath] = useState("")
  const [loading, setLoading] = useState(false)
  const [resData, setResData] = useState({})
  const fileChange = (file) => {
    setFilePath(file.target.files[0])
  }
  // useEffect(() => {
  //   console.log("filePath", filePath)
  // }, [filePath])

  const uploadImage = () => {
    setLoading(true)
    var formData = new FormData();
    formData.append("file", filePath);
    axios.post("http://34.140.27.246/face_analyzer", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        setResData(res.data)
        setLoading(false)

      }
      )
      .catch(err => console.log(err))

  }

  useEffect(() => {
    console.log("loading", loading)
  }, [loading])

  const ImageBox = (props) => {
    return (<div style={{ border: '2px solid grey', backgroundColor: "lightgrey", maxWidth: 250 }} >
      <span style={{ padding: "0px 5px" }}>{props.titlekey} : {props.title}</span>
      <img src={props.src} width="250" height={"250"} />
    </div>
    )
  }

  return (
    <div className="App" >
      <ReactWebcam setResData={setResData} setLoading={setLoading}/>


      <div style={{ marginTop: 20, border: '2px solid red', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <h4>Upload Image</h4>
        <div style={{ maxWidth: 300 }}>
          <input type={"file"} onChange={fileChange} />
          <button onClick={uploadImage}>Upload</button>
        </div>
      </div>

      {Object.keys(resData).length != 0 ? <div>
        <h3>Result</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', padding: 10 }}>
          <ImageBox src={resData['original_image']['image_url']} title={""} titlekey={"Original Image"} />
          <ImageBox src={resData['acne_score']['acne_image_url']} title={resData['acne_score']['acne_density']} titlekey={"acne density"} />
          <ImageBox src={resData['dark_circle_score']['darkcircle_image_url']} title={resData['dark_circle_score']['dark_circle_density']} titlekey={"dark_circle_density"} />
          <ImageBox src={resData['redness_score']['pigmentation_image_url']} title={resData['redness_score']['Redness_density']} titlekey={"Redness density"} />
          <ImageBox src={resData['wrinkle_score']['wrinkle_image_url']} title={resData['wrinkle_score']['wrinkle_density']} titlekey={"wrinkle density"} />
        </div>

        <div style={{ border: '1px solid cyan' }}>
          <h2>skin_age_conf : {resData['skin_age_conf']['label']}</h2>
          <h2>Score : {resData['skin_age_conf']['score']}</h2>
        </div>

      </div> : null
      }
      <div>
        {loading ?
          <img src='https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif' height={100} width={100} />
          : null
        }
      </div>
    </div>
  );
}

export default App;
