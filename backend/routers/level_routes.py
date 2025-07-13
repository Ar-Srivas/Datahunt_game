from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Callable, List, Optional, Dict, Any
from services.level_services import LevelServices  # Change to absolute import

# Create a function that will hold our service instance
class ServiceProvider:
    def __init__(self):
        self.service = None
    
    def __call__(self):
        if self.service is None:
            # Fallback to a new instance if not set (shouldn't happen in production)
            self.service = LevelServices()
        return self.service

# Create the provider
get_service_instance = ServiceProvider()

router = APIRouter()

class SolutionRequest(BaseModel):
    level_id: int
    dev_mode: bool = False

class WordGuessRequest(BaseModel):
    session_id: str
    guess: str

class LogicGateRequest(BaseModel):
    sequence: List[str]
    circuit_id: str  # Add circuit ID field


class AccessPatternRequest(BaseModel):
    answers: List[str]

@router.post("/solution")
def check_solution(request: SolutionRequest, level_service: LevelServices = Depends(get_service_instance)):
    # Allow level access in dev mode
    if not request.dev_mode and not level_service.is_level_available(request.level_id):
        raise HTTPException(status_code=403, detail="Level not available yet")
    
    if level_service.check_solution(request.level_id):
        next_level = request.level_id + 1 if request.level_id < level_service.total_levels else None
        return {"message": "Correct! Proceed to the next level.", "next_level": next_level}
    
    return {"message": "Invalid solution"}

@router.get("/levels")
def get_levels(level_service: LevelServices = Depends(get_service_instance)):
    completed = list(level_service.get_completed_levels())
    # Use the get_available_levels method instead of the list comprehension
    available = level_service.get_available_levels()
    
    return {
        "completed": completed,
        "available": available
    }

# Word Game Routes
@router.post("/word-game/start")
def start_word_game(level_service: LevelServices = Depends(get_service_instance)):
    """Start a new word guessing game session."""
    return level_service.word_game_service.start_game()

@router.post("/word-game/guess")
def guess_word(request: WordGuessRequest, level_service: LevelServices = Depends(get_service_instance)):
    """Process a word guess and return similarity."""
    result = level_service.word_game_service.check_guess(request.session_id, request.guess)
    
    # If the guess was successful, mark level 3 as completed
    if result.get("is_successful", False):
        level_service.complete_level_3()
        print(f"Level 3 completed with word: {result['guess']}, similarity: {result['similarity']}%")
    
    # Add completion status to the response
    result["completed"] = 3 in level_service.get_completed_levels()
    
    return result

@router.get("/word-game/reveal/{session_id}")
def reveal_word(session_id: str, level_service: LevelServices = Depends(get_service_instance)):
    """Reveal the target word."""
    return level_service.word_game_service.reveal_word(session_id)

@router.get("/word-game/words")
def get_valid_words(level_service: LevelServices = Depends(get_service_instance)):
    """Get list of valid words."""
    return {"words": level_service.word_game_service.get_valid_words()}

# Add this route for checking the logic gate solution
@router.post("/logic-gates/check")
def check_logic_gates(request: LogicGateRequest, level_service: LevelServices = Depends(get_service_instance)):
    """Check the submitted logic gate sequence."""
    result = level_service.check_logic_gates(request.sequence, request.circuit_id)
    return result

# Add a reset endpoint for testing
@router.post("/logic-gates/reset")
def reset_logic_gates(level_service: LevelServices = Depends(get_service_instance)):
    """Reset the logic gate puzzle state."""
    level_service.reset_logic_circuits()
    return {"reset": True}


@router.post("/access-patterns/check")
def check_access_patterns(request: AccessPatternRequest, level_service: LevelServices = Depends(get_service_instance)):
    """Check the submitted access pattern classifications."""
    result = level_service.check_access_patterns(request.answers)
    return result