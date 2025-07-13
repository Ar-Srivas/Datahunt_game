from typing import List, Set, Dict, Any
from services.word_game_services import WordGameService

class LevelServices:
    def __init__(self):
        self.completed_levels = set()
        self.total_levels = 5  # Updated to include Level 5
        
        # Initialize services for different levels
        self.word_game_service = WordGameService()
        
        # For Level 4: Logic Gate Puzzle
        # Track which circuits have been solved
        self.solved_circuits = {"circuit1": False, "circuit2": False}
        
        # Define solutions for each circuit
        self.circuit_solutions = {
            "circuit1": ["NOT", "AND", "OR"],
            "circuit2": ["NAND", "OR", "NOR"]
        }
        
        # For Level 5: Access Pattern Identification
        self.access_pattern_correct_answers = ["Unauthorized", "Unauthorized", "Authorized", "Unauthorized"]
    
    def is_level_available(self, level_id: int) -> bool:
        """Check if a level is available to play."""
        # First level is always available
        if level_id == 1:
            return True
            
        # Other levels are available if the previous level is completed
        return level_id - 1 in self.completed_levels
    
    def get_available_levels(self) -> List[int]:
        """Return list of available levels."""
        return [i for i in range(1, self.total_levels + 1) 
                if self.is_level_available(i)]
    
    def get_completed_levels(self) -> Set[int]:
        """Return set of completed levels."""
        return self.completed_levels
        
    def check_solution(self, level_id: int, dev_mode: bool = False) -> bool:
        """Check if the solution for a given level is correct."""
        if dev_mode:
            # In dev mode, just mark as completed
            self.completed_levels.add(level_id)
            return True
            
        # Normal validation logic goes here for each level
        if level_id == 1:
            self.completed_levels.add(level_id)
            return True
        elif level_id == 2:
            self.completed_levels.add(level_id)
            return True
        elif level_id == 3:
            # Level 3 is handled by the word game service
            return level_id in self.completed_levels
        elif level_id == 4:
            # Level 4 is handled by the logic gates endpoint
            return level_id in self.completed_levels
        elif level_id == 5:
            # Level 5 is handled by the access pattern endpoint
            return level_id in self.completed_levels
        elif level_id == 6:
            self.completed_levels.add(level_id)
            return True
        elif level_id == 7:
            self.completed_levels.add(level_id)
            return True
        elif level_id == 8:
            self.completed_levels.add(level_id)
            return True
        else:
            return False
    
    def complete_level_3(self):
        """Mark level 3 as completed."""
        self.completed_levels.add(3)
    
    def complete_level_4(self):
        """Mark level 4 as completed."""
        self.completed_levels.add(4)
    
    def check_logic_gates(self, submitted_sequence: List[str], circuit_id: str) -> Dict[str, Any]:
        """Check if the submitted logic gate sequence is correct for a specific circuit."""
        # Get the expected solution for this circuit
        expected_solution = self.circuit_solutions.get(circuit_id)
        
        # Check if solution is correct
        is_correct = submitted_sequence == expected_solution
        
        if is_correct:
            # Mark this circuit as solved
            self.solved_circuits[circuit_id] = True
            
            # Only complete the level if both circuits are solved
            if all(self.solved_circuits.values()):
                self.completed_levels.add(4)
        
        return {
            "correct": is_correct,
            "completed": 4 in self.completed_levels,
            "all_circuits_solved": all(self.solved_circuits.values()),
            "circuits_solved": list(k for k, v in self.solved_circuits.items() if v)
        }
    
    def reset_logic_circuits(self):
        """Reset the logic circuit status."""
        self.solved_circuits = {"circuit1": False, "circuit2": False}
        if 4 in self.completed_levels:
            self.completed_levels.remove(4)
    
    def check_access_patterns(self, submitted_answers: List[str]) -> Dict[str, Any]:
        """Check if the submitted access pattern classifications are correct."""
        is_correct = submitted_answers == self.access_pattern_correct_answers
        
        if is_correct:
            self.completed_levels.add(5)
        
        return {
            "correct": is_correct,
            "completed": 5 in self.completed_levels
        }