import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileReset = () => {
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("upload_file", file);

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/result", {
        method: "POST",
        body: formData,
      }).then((_) => setLoading(false));

      if (response.ok) {
        console.log("File uploaded successfully");
        const data = await response.json();
        setResult(data);
        console.log(data);
      } else {
        console.log("File upload failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <h1>Welcome to General Purpose Object Detector (GPOD)</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={handleFileChange}
          required
          accept=".jpg, .jpeg, .png"
        />
        <button type="submit">Upload</button>
        <button type="reset" onClick={handleFileReset}>
          Reset
        </button>
      </form>
      {file && (
        <div>
          <p>Uploaded image:{file.name}</p>
          <img src={URL.createObjectURL(file)} alt="uploaded" />
        </div>
      )}

      <div className="result">
        {loading && <p>Loading...</p>}
        {result && (
          <div>
            <h2>Result</h2>
            <p>Image: {result.image}</p>
            <p>Objects: {result.objects}</p>
            <p>Confidence: {result.confidence}</p>
            <p>Coordinates: {result.coordinates}</p>
            <p>Time: {result.time}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
