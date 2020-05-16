# Welcome to Mit & Yit

We are in the **Monday 2 pm** workshop.
 
| Member      | ID     |
| :---------- | :----- |
| Kechen Zhao | 957398 |
| Bin Zhang   | 895427 |
| Yuan Ye     | 980728 | 

The web app we are creating is a social dining platform.

## Deliverable 3 descrpition:

The link to Git repository for the web application is https://github.com/GilfoylePP/Mit_and_Yit--INFO30005.  
The URL to the live website is https://mityit.herokuapp.com.  
The commit id is **UPDATE LATER**.

**User profile** is the core functionality we implemented for deliverable 3. Users can sign up or login into our app, view and modify their information in their personal profile. 

### User Profile Instruction：

* #### Welcome page

    In the welcome page, we have two icons, one for register and one for login. New user can click the register icon to signup and enter their personal information. If you have already had an account, simply click the login icon and fill in the login form.


* #### Register page

  * New user's information will be entered in this webpage and delivered to the database. Inputs of all essential fields (form under "Basic Profile") will be checked before store into the database. If you enter an invalid input(e.g. empty value, invalid email format,an existed username/email, or not reach the minimum length of password, or password is not matched with you password confirmation), after click "Submit" button, warning messages will be displayed at the top of the form, and you will need to register again. 

* #### Login page

  * User with an existed account can login the app via this page. Inputs of username and password must be valid and existed in our database, and they will be checked. If you enter a username which is not in the database, or an incorrect password, error messages will be showed at the top of the webpage after you click "Login" button, and you need to login again. 

* #### Home page

  * After register or login, you will be redirect to our home page. This page includes a navigation bar at the top, a logout icon (upper-right corner), which is a link to the welcome page, and three icons in the middle, each of them is a link to our profile page, matching system and review system. For now we only finished the front end for our personal profile, so to access it, you can click the profile icon or "Profile" in the navigation bar. 

* #### Personal Profile page

  * This page will show all your personal information. Similar to the home page, a navigation bar is at the top of the page, a home icon (upper-left corner) can redirect you to the home page, and a logout icon (upper-right corner) can redirect you to the welcome page. If you want to edit any of your information, click "Edit" button, then you will be redirect to edit_profile webpage. 

* #### Edit Personal Profile page

  * In this webpage, you can modify you personal information, and all valid modified values will be updated in the database. Similar to the profile page, a navigation bar is at the top of the page, a home icon (upper-left corner) can redirect you to the home page, and a logout icon (upper-right corner) can redirect you to the welcome page. As in the register page, inputs of fields in "Basic Profile" will be checked before the update is actually processed. If any invalid value (examples are the same for register page) is entered, after you click the "Update" button, error messages will be displayed and you will need to update your profile again. If all your input values are valid, "Update" button will redirect you to the Personal Profile page, and a message "Profile have been updated" will be showed at the top of the page. Updated information will be displayed in your profile page now. 


## Deliverable 2 descrpition:

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
