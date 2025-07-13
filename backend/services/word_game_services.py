import uuid
import numpy as np
import os
from typing import Dict, List, Any, Optional, Set
from dotenv import load_dotenv
import google.generativeai as genai


load_dotenv()


class WordGameService:
    
    def __init__(self):
        self.sessions = {}
        self.similarity_threshold = 95 
        

        self.word_list = ["espionage"]

        self.use_gemini = False
        
        api_key = os.getenv("GEMINI_API_KEY")
        if api_key:
            genai.configure(api_key=api_key)
            self.use_gemini = True
        
        # Set up embeddings and predetermined similarities
        self.embeddings = {}
        self.similarity_matrix = self._create_similarity_matrix()
        self._initialize_embeddings()
        
    def _create_similarity_matrix(self):
        """Create a predefined similarity matrix focused on espionage."""
        matrix = {
            "espionage": {
                "espionage": 100.0,
                "spy": 90.0,
                "agent": 90.0,
                "surveillance": 88.0,
                "covert": 85.0,
                "intelligence": 83.0,
                "infiltration": 80.0,
                "sabotage": 78.0,
                "cipher": 75.0,
                "reconnaissance": 73.0,
                "deception": 70.0,
                "stealth": 68.0,
                "undercover": 65.0,
                "smuggling": 62.0,
                "subterfuge": 60.0,
                "blackmail": 58.0,
                "wiretap": 55.0,
                "interrogation": 52.0,
                "cryptography": 50.0,
                "saboteur": 48.0,
                "disguise": 45.0,
                "hacker": 40.0,
                "exploit": 42.0,
                "firewall": 30.0,
                "payload": 35.0,
                "decipher": 48.0,
                "coordinates": 25.0,
                "signal": 40.0
            }
        }
        
        # Create reverse mappings
        for target_word, similarities in list(matrix.items()):
            for word, similarity in similarities.items():
                if word not in matrix:
                    matrix[word] = {}
                if target_word not in matrix[word]:
                    matrix[word][target_word] = similarity
                    
                # Also ensure each word has a self-similarity of 100%
                if word not in matrix[word]:
                    matrix[word][word] = 100.0
        
        return matrix
        
    def _initialize_embeddings(self):
        """Generate embeddings for espionage and related words."""
        # Get all unique words from the similarity matrix
        all_words = set()
        for word in self.similarity_matrix:
            all_words.add(word)
            for related_word in self.similarity_matrix[word]:
                all_words.add(related_word)
                
        if self.use_gemini:
            self._initialize_with_gemini(all_words)
        else:
            self._initialize_with_mock_data(all_words)
    
    def _initialize_with_gemini(self, words):
        """Initialize word embeddings using Gemini API."""
        embedding_model = "models/embedding-001"
        
        for word in words:
            try:
                embedding_result = genai.embed_content(
                    model=embedding_model,
                    content=word,
                    task_type="semantic_similarity"
                )
                embedding = embedding_result["embedding"]
                self.embeddings[word] = embedding
            except Exception:
                # Fallback to mock embedding
                self.embeddings[word] = self._create_mock_embedding(word)
    
    def _initialize_with_mock_data(self, words):

        np.random.seed(42)  # For reproducibility
        espionage_vec = np.random.rand(100)
        espionage_vec = espionage_vec / np.linalg.norm(espionage_vec)
        self.embeddings["espionage"] = espionage_vec.tolist()
        for word in words:
            if word == "espionage":
                continue
                
            # Get target similarity or default
            target_sim = 0.4  # Default similarity for unknown words
            if word in self.similarity_matrix["espionage"]:
                target_sim = self.similarity_matrix["espionage"][word] / 100.0
                
            # Create a vector that will have the target similarity with espionage
            np.random.seed(sum(ord(c) for c in word))  # Word-specific seed
            random_vec = np.random.rand(100)
            random_vec = random_vec / np.linalg.norm(random_vec)
            
            # Get an orthogonal component
            ortho_vec = random_vec - espionage_vec * np.dot(random_vec, espionage_vec)
            if np.linalg.norm(ortho_vec) > 1e-10:  # Avoid division by zero
                ortho_vec = ortho_vec / np.linalg.norm(ortho_vec)
                # Mix the vectors to get the target similarity
                final_vec = target_sim * espionage_vec + np.sqrt(1 - target_sim**2) * ortho_vec
                final_vec = final_vec / np.linalg.norm(final_vec)
                self.embeddings[word] = final_vec.tolist()
            else:
                # Fall back to a random vector if orthogonalization fails
                self.embeddings[word] = random_vec.tolist()
    
    def _create_mock_embedding(self, word):
        """Create a mock embedding that will respect similarity with espionage."""
        word = word.lower()
        
        # Get target similarity or default
        target_sim = 0.3  # Default similarity for unknown words
        if "espionage" in self.similarity_matrix and word in self.similarity_matrix["espionage"]:
            target_sim = self.similarity_matrix["espionage"][word] / 100.0
        
        # If espionage embedding exists, use it to create a related vector
        if "espionage" in self.embeddings:
            espionage_vec = np.array(self.embeddings["espionage"])
            
            # Create a partially aligned vector
            np.random.seed(sum(ord(c) for c in word))
            random_vec = np.random.rand(100)
            random_vec = random_vec / np.linalg.norm(random_vec)
            
            # Mix to achieve target similarity
            final_vec = target_sim * espionage_vec + np.sqrt(1 - target_sim**2) * random_vec
            return (final_vec / np.linalg.norm(final_vec)).tolist()
        else:
            # If no espionage embedding yet, create a basic random vector
            np.random.seed(sum(ord(c) for c in word))
            vec = np.random.rand(100)
            return (vec / np.linalg.norm(vec)).tolist()
    
    def _calculate_similarity(self, word1, word2):
        """Calculate similarity between two words."""
        # First check our predetermined similarity matrix
        word1 = word1.lower()
        word2 = word2.lower()
        
        # If both words are in our matrix, use the predefined similarity
        if word1 in self.similarity_matrix and word2 in self.similarity_matrix[word1]:
            return self.similarity_matrix[word1][word2]
            
        # If the word isn't in our matrix, estimate similarity
        if word1 == word2:
            return 100.0
            
        # If one word is "espionage", provide crafted similarities for common spy terms
        if word1 == "espionage" or word2 == "espionage":
            check_word = word2 if word1 == "espionage" else word1
            
            # Check for substrings that indicate relevance to espionage
            spy_terms = {
                "spy": 90.0, "secret": 75.0, "agent": 85.0, "intelligen": 80.0,
                "cover": 80.0, "surveillance": 85.0, "reconn": 70.0, "infiltrat": 80.0,
                "stealth": 65.0, "decept": 70.0, "crypt": 50.0, "secur": 60.0,
                "mission": 65.0, "shadow": 60.0, "covert": 85.0, "classified": 75.0
            }
            
            for term, sim in spy_terms.items():
                if term in check_word:
                    return sim
                    
        # For unknown words, try to determine a reasonable similarity
        # Check for partial matches
        if word1 in word2 or word2 in word1:
            return 65.0
            
        # Check for common prefixes
        common_prefix_length = 0
        for i in range(min(len(word1), len(word2))):
            if word1[i] == word2[i]:
                common_prefix_length += 1
            else:
                break
                
        if common_prefix_length >= 3:
            return 40.0 + (common_prefix_length * 2)
                
        # If nothing else matches, return a low but not too low similarity
        return 20.0
    
    def start_game(self) -> Dict[str, str]:
        """Start a new word guessing session with espionage as the target word."""
        session_id = str(uuid.uuid4())
        
        # Always use espionage as the target word
        target_word = "espionage"
        
        # Get or create embedding for target word
        if target_word in self.embeddings:
            target_embedding = self.embeddings[target_word]
        else:
            target_embedding = self._create_mock_embedding(target_word)
            self.embeddings[target_word] = target_embedding
        
        # Store session data
        self.sessions[session_id] = {
            "target_word": target_word,
            "target_embedding": target_embedding,
            "guesses": []
        }
        
        return {"session_id": session_id}
    
    def check_guess(self, session_id: str, guess: str) -> Dict[str, Any]:
        """Process a word guess and return similarity."""
        if session_id not in self.sessions:
            return {"error": "Invalid session ID"}
        
        session = self.sessions[session_id]
        guess = guess.lower().strip()
        target_word = session["target_word"]
        
        # Handle exact match
        if guess == target_word:
            self.sessions[session_id]["guesses"].append({"word": guess, "similarity": 100.0})
            return {
                "guess": guess,
                "similarity": 100.0,
                "is_valid_word": True,
                "is_successful": True
            }
        
        # Calculate similarity
        similarity = self._calculate_similarity(target_word, guess)
        
        # Track the guess
        session["guesses"].append({"word": guess, "similarity": similarity})
        
        # Determine if the guess is successful
        is_successful = similarity >= self.similarity_threshold
        
        return {
            "guess": guess,
            "similarity": round(similarity, 2),
            "is_valid_word": True,  # Consider all words valid for better user experience
            "is_successful": is_successful
        }
    
    def reveal_word(self, session_id: str) -> Dict[str, str]:
        """Reveal the target word."""
        if session_id not in self.sessions:
            return {"error": "Invalid session ID"}
        
        return {"target_word": self.sessions[session_id]["target_word"]}
    
    def get_valid_words(self) -> List[str]:
        """Return the list of valid words for hints."""
        return ["espionage", "spy", "agent", "surveillance", "covert", "intelligence"]