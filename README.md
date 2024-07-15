
# Tic-Tac-Toe
 - Problem 1 ✅
 - Problem 2 ✅
 - Problem 3 ✅ (with headache)

## Problems
### Problem 1
  - Added useState for board state, current player, winner (as a separate type to include draws)
  - Added click handling, and keyboard press handling for accessibility
  - Winner calculation
  - Game resetting
  - Updated styling for visual appeal bonus points



### Problem 2
- Added fun slider to adjust board size (slider means no trying to set the board size to -1x-1!!)
- Refactored winner calculation to account for board being any size
  


### Problem 3
- Added express/mongoDB backend
- Backend has endpoints to save the results to the database, and to fetch stats for the leaderboard
- Added useEffect to handle getting the stats from the backend
- Added leaderboard with funky styling
- Added dockerfiles for front and backend, and docker-compose to glue them together
- Forgot to add proxy to webpack dev server config and temporarily lost sanity
- Jumped for joy when I found a relevant stackoverflow post!

### Tests
- Wrote some basic tests to cover user interactions with the board, but got stuck with jest config and reached time limit.


## Quickstart
- `docker compose up --build`

