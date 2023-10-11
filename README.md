
  # Social Network API
    
  ## Description
  The social network API is a MongoDB/Mongoose back-end project for a social network app where users can create accounts, make friends lists, share thoughts, and react to each others thoughts. It uses Express.js for routing, MongoDB database and Mongoose.
   

  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage) 
  - [License](#license)
  - [Contributing](#contributing)
  - [Test](#test)
  - [Questions](#questions)

    
  ## Installation
  The app is installed by cloning the repo to your local computer. Open the command line and run "npm i" to install dependencies.
    
  ## Usage
  To use the app simply run "npm start" in the command line. Use a tool like Insomnia to test HTTP requests.  

  [Video Demo](https://drive.google.com/file/d/14fPYCqN0qf9lt1aSN-CwMZD8TrDcvovF/view)

  ### Create a User

- **Endpoint**: POST /api/users
- **Request**:
```json
  {
    "username": "newuser123",
    "email": "newuser@example.com"
  }
  
```
- **Response**:
```json
{
  "message": "User created successfully",
  "user": {
    "_id": "user-id",
    "username": "newuser123",
    "email": "newuser@example.com"
  }
}
```
 

  ## License
  This project is licensed under the MIT License.
    
  ## Contributing
  Any contributions to the Social Network API are welcome! If you would like to contribute please follow these steps: Fork the repoistory > create a new feature branch > make your changes while commenting your code > create a pull request with a descriptive comment.
    
  ## Test
  To test the app use a tool like Insomnia to test HTTP requests to confirm the requests/response are working as intended.
    
  ## Questions
  Do you want to know more? You can reach me at:
  
  GitHub: https://github.com/BenACooper
  
  Email: benjamin.axel.cooper@gmail.com
  