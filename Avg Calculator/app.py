from fastapi import FastAPI, HTTPException
import requests
import time

app = FastAPI()

# API Endpoints for fetching numbers
API_URLS = {
    "p": "http://20.244.56.144/test/primes",
    "f": "http://20.244.56.144/test/fibo",
    "e": "http://20.244.56.144/test/even",
    "r": "http://20.244.56.144/test/rand",
}

WINDOW_SIZE = 10
number_store = {
    "p": [],
    "f": [],
    "e": [],
    "r": []
}

def fetch_numbers(category: str):
    """Fetch numbers from the external API and return a unique list."""
    if category not in API_URLS:
        return []
    
    try:
        response = requests.get(API_URLS[category], timeout=0.5)
        if response.status_code == 200:
            numbers = response.json().get("numbers", [])
            return list(set(numbers))  # Ensure uniqueness
    except requests.exceptions.RequestException:
        return []  # Return empty list in case of errors
    
    return []

@app.get("/numbers/{category}")
def get_numbers(category: str):
    """Fetch numbers, maintain a sliding window, and calculate the average."""
    if category not in number_store:
        raise HTTPException(status_code=400, detail="Invalid category")

    start_time = time.time()

    new_numbers = fetch_numbers(category)

    # Maintain unique numbers and sliding window behavior
    previous_state = number_store[category].copy()
    for num in new_numbers:
        if num not in number_store[category]:
            number_store[category].append(num)

    # Trim the window if it exceeds the size
    if len(number_store[category]) > WINDOW_SIZE:
        number_store[category] = number_store[category][-WINDOW_SIZE:]

    # Calculate average
    avg = sum(number_store[category]) / len(number_store[category]) if number_store[category] else 0

    response = {
        "windowPrevState": previous_state,
        "windowCurrState": number_store[category],
        "numbers": new_numbers,
        "avg": round(avg, 2)
    }

    # Ensure response time does not exceed 500ms
    elapsed_time = (time.time() - start_time) * 1000
    if elapsed_time > 500:
        raise HTTPException(status_code=408, detail="Request Timeout")

    return response
