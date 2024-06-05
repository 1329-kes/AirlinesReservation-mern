Frontend:reactjs,reactrouter,axios
Backend:mongodbatlas,mongoose,expressjs,nodejs,
backend changes:
use your mongodb connection path in db.js
    function connectDB(){

    mongoose.connect('use your mongodb connection path
' , {useUnifiedTopology: true , useNewUrlParser: true})
   // mongodb://localhost:27017/Flights

    const connection = mongoose.connection
    --BACKEND
    To install backend:
    ~sh
    flight/npm install
    
    To run backend:
    ~sh
    flight/npm start

    --FRONTEND
    To install Frontend:
    ~sh
    flight/client/npm install
    
    to run frontend:
    
    ~sh
    flight/client/npm start
