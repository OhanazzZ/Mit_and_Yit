# Welcome to Mit & Yit

We are in the **Monday 2 pm** workshop.
 
| Member      | ID     |
| :---------- | :----- |
| Kechen Zhao | 957398 |
| Bin Zhang   | 895427 |
| Yuan Ye     | 980728 | 

The web app we are creating is a **social dining platform**, with the goal to **help people connect over food**!

### Core Functionalities and routes
| Functionality            | Features          | route   |
| :----------------------- | :---------------  | :------ |
| Account and profile | Register, login, authentication, access control, profile setup and modification |  /user   |
| Match Finding            | Match like-minded users based on availability, food preference and other criteria |  /match  |
| Review Posting           | Allow users to write and update review; reviews are linked to user profiles        |  /review | 

For Deliverable 3, the first functionality has been implemented

### Catalogue
* [Final Deliverable](#Final-Deliverable)
* [Deliverable 3](#Deliverable-3)
* [Deliverable 2](#Deliverable-2)


## Final Deliverable
availabile after 07 June

## Deliverable 3:

The link to Git repository for the web application is https://github.com/GilfoylePP/Mit_and_Yit--INFO30005.  
The URL to the live website is https://mityit.herokuapp.com.  
The commit id is **ef74058**.

**User profile** is the core functionality we implemented for deliverable 3. Users can sign up or login into our app, view and modify their information in their personal profile. 

### User Profile Instruction：

* #### Welcome page

    This is our home page (for all unauthenticated visitors).  
    Users can either login or register before they can proceed.
    
    
    | Welcome page | example: unauthorised access denial (see url)|
    | -- | -- |
    |![welcome](/manual-ReadMe_images/home-pre-login.jpg)|![welcome-unauthorised](/manual-ReadMe_images/home-unortharised.jpg)|

* #### Register page

   This is the register page. Input validations have been implemented to ensure well-formedness of the user's data.  
   If successful, the user will be redirected to the home page.
   | register page | example: register failed |
   | -- | -- |
   |![user](/manual-ReadMe_images/signup1.jpg) | ![user](/manual-ReadMe_images/signup-error.jpg)|

* #### Login page

   This is the login page. Input validations have been implemented to check the user's credentials.  
   If successful, the user will be redirected to the home page.
   | login page | example: login failed |
   |--|--|
   |![user](/manual-ReadMe_images/login.jpg) |![user-error](/manual-ReadMe_images/login-noInput.jpg)|

* #### Home page

   After authentication, user will be redirected to this page.  
   On this page, there are links to the home page and core functionalities.  
   (For this deliverable, only profile has been implemented)
   ![user](/manual-ReadMe_images/home-login.jpg)

* #### Personal Profile page

   This page displays all personal information.  
   If the user wants to edit any of them, there is an button at the buttom for that purpose.
   |||
   |--|--|
   |![user](/manual-ReadMe_images/profile1.jpg) |![user](/manual-ReadMe_images/profile2.jpg)|

* #### Edit Personal Profile page
   
   This page allows user to update their profile and personal information.  
   Just as previously, all input will be subject to validation checks
   |||
   |--|--|
   |![user](/manual-ReadMe_images/profileEdit1.jpg) |![user](/manual-ReadMe_images/profileEdit2.jpg)|


## Deliverable 2:

The link to Git repository for the web application is https://github.com/GilfoylePP/Mit_and_Yit--INFO30005.  
The URL to the live website is https://mityit.herokuapp.com.  
The commit id is **c69c43a**.


Three core functionalities, **user profile**, **matching system** and **review system**, have been implemented separately by using three routers. Detailed descriptions are listed below. 

Below is the data structure for users. Currently our database has users with id 1~9.  
```markdown
{  
    "id":               int,      // a unique int that identifies a user  
    "username":         String,  
    "email":            String,  
    "cuisine":          String,   // their food preference  
    "lunch":            Boolean,  // availability for lunch   
    "dinner":           Boolean,  // availability for dinner  
    "coffee_lightMeal": Boolean,  // availability for coffee  
    "reviewIndex":      int       // a unique index position that help to retrieve user's review from the Review database  
}  
```
Below is an exapmle of the data structure for reviews, which shows the review for user id 1, which is at index 0 position.   
```
{  
   score:          3.5,  // int, average score calculated based on all reviews  
   scoreNum:       2,    // int, number of review messages received  
   review:               // an array that store all review messages  
        [{  
          givenBy: 2,  
          date:    "03-04-2019",  
          tag:     ["nice","interesting"],  
          comment: "really nice and kind",  
         },  
         {  
          givenBy: 7,  
          date:    "09-04-2019",  
          score:   3,  
          tag:     ["boring","kind"],  
          comment: "xx is nice but we have no common interest",  
         }]  
}  
```

### 1. Users' information system (userRouter)

Our first core functionality is user system. It allows to view all users’ information, extract an existing user's information, modify existing user's information, and add new user to json file.  

* https://mityit.herokuapp.com/user/info
  * **GET** request - retrieve all users' information  

* https://mityit.herokuapp.com/user/info/:id
  * **GET** request - retrieve a particular user's information by id  

* https://mityit.herokuapp.com/user/info/:id
  * **PATCH** request - update an existing user's information by id  
  * Input JSON file: 
    ```
    {  
      "id":               int,  
      "username":         String,  
      "email":            String,  
      "cuisine":          String,  
      "lunch":            Boolean,  
      "dinner":           Boolean,  
      "coffee_lightMeal": Boolean,  
      "reviewIndex":      int  
    }  
    ```
    Example for updating an existing user's information:                                         
    Url to test: https://mityit.herokuapp.com/user/info/7  
    Original information:  
    ```
    {  
      "id":               7,  
      "username":         "user7",  
      "email":            "email_7@gmail.com",  
      "cuisine":          "Italian",  
      "lunch":            true,  
      "dinner":           true,  
      "coffee_lightMeal": false,  
      "reviewIndex":      6  
    },
    ```
    Make changes(JSON code to test):  
    ```
    {   
      "id":               7,  
      "username":         "user7_newname",  
      "email":            "email_7@gmail.com",  
      "cuisine":          "Korean",  
      "lunch":            true,  
      "dinner":           true,  
      "coffee_lightMeal": false,  
      "reviewIndex":      6  
    },  
    ```

* https://mityit.herokuapp.com/user/signup
  * **POST** request - add a new user's information  
    Input JSON file:
    ```
    {  
      "username":    String,  
      "email":       String,  
      "cuisine":     String,  
      "lunch":       Boolean,  
      "dinner":      Boolean,  
      "reviewIndex": int  
    }  
    ```

### 2. Matching System (matchRouter)

In matching system, a user can find all suitable partners that matches him/her based on either cuisine preference or time availability.

* https://mityit.herokuapp.com/match/:id :  
  * **GET** request - retrieve all matches for a user (based on both cuisine and availability)

* https://mityit.herokuapp.com/match/find_cuisine/:id :  
  * **GET** request - find matches for a user based on cuisine 

* https://mityit.herokuapp.com/match/find_availability/:id :  
  * **GET** request - find matches for a user based on availability  

  
### 3. Review System (reviewRouter)

Router for review system allows to find reviews, edit existing review and upload new review for a specific user.

* https://mityit.herokuapp.com/review/:id
  * **GET** request - get reviews written to the user identifiable by the provided ID  

* https://mityit.herokuapp.com/review/:id
  * **POST** request - write a new review to the user identifiable by the provided ID  
    Input JSON file:  
    ```
    {  
      "givenBy": int,
      "date":    date,
      "score":   int,
      "tag":     String[],
      "comment": String  
    }
    ```

* https://mityit.herokuapp.com/review/:id
  * **PATCH** request - modify an existing review to the user identifiable by the provided ID  
  * Input JSON file: the same data structure as review **POST** request  
