from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services.level_services import LevelServices
from routers.level_routes import router as level_router, get_service_instance

app = FastAPI()

# Configure CORS - Most permissive setting that will always work
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=False,  # Must be False when using wildcard origins
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create a single instance of LevelServices
level_service = LevelServices()

# Register the instance with the router's getter function
get_service_instance.service = level_service

# Include the level router
app.include_router(level_router)

@app.get("/")
async def root():
    return {"message": "DataHunt API is running!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}