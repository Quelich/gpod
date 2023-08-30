from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse, JSONResponse
from PIL import Image
import io
import model  # ML  model

# Create FastAPI instance
app = FastAPI()

# Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/result")
async def read_ml_model_result(upload_file: bytes = File(...)):
    if upload_file is None:
        return JSONResponse(content={"message": "No file uploaded"}, status_code=400)

    img_bytes = io.BytesIO(upload_file)
    results = model.get_results(img_bytes)
    print(results)
    
    headers = {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Headers": "Content-Type",
    }
    return FileResponse(path=results, headers=headers, media_type="image/png", status_code=200)
