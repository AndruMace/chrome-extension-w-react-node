# Chrome Extension Project

## Technologies Used/Justification
- NodeJS with Express for Routing and JWT for authentication
    - Chosen due to familiarity, enjoyability, and my ability to develop with it given a deadline 
- ReactJS
    - Chosen for much of the same reason I chose NodeJS 
- MongoDB hosted on MongoDB Cloud Atlas
    - Mongo is, in my experience, the easiest "set up and go" database available and given the data contraints, would suffer no significant performance loss to a well-structure SQL database. 

## Security implementations and considerations.
- Authentication:
    - Auth was done via JWT's as it allows for stateless authentication, ideal for API's and excellent for future scalibility. The initial access token provided has an expiration of 15 minutes, which once verified provides an HTTP only refresh token that expires after 7 days. The token is HTTP only to prevent XSS attacks.  This refresh token can only be used to obtain a new short-lived access token, which prevents CSRF attacks by ensuring constant communication between client and server. For further security, each time the refresh token is used to generate a new access token (every 15 minutes, automatically), the refresh token is itself forcefully expired and replaced. This allows us to save user state for up to 7 days after initial sign in, but ensures routine security while the user is actively engaged with the application.
- Data validation:
    - All data in and out is double validated, once on the client and again on the server. Should anything unexpected be submitted or expelled from our application it will throw and error and deny the request. 

## Admin server account(s) info (if needed).
- First account to sign up will automatically be given admin access, all further account with be considered regular "users". Super admin would have access to the cloud DB to upgrade admins and delete accounts. This process is one of those that I'd like to polish a bit more but unfortunately was not able to due to time contraints.

## Any problems you encountered and any flaws in your project.
- Please see the "missing features" section.

## Which frameworks you used.
- Please see above

## What still needs to be done if you had more time?
- Much more to be done on the extension itself. Specific issues are listed below in the "missing features section". Please read there for more information.
- Further polishing of codebase, UI, and UX. Many quality of life enhancements that could have been made. 
- More complete features on the server, this ties into QoL enhancements mentioned above.

## What database did you use and why?
- Please see above

## Any additional features you implemented.
- Email verification/password resets was something I started out doing initially before seeing it wasn't required, once I realized my folly I focused on parts of the project that were more mission critical.

## What did you struggle with?
- Please see below, I go into detail in the "missing features" sections

## Did you enjoy this project and is it something you would like to continue working on?
- It wasn't the most thrilling project, but it certainly did provide a challenge and I wouldn't mind continuing to hack away at it so I could figure out some of the stuff that stumped me intially. While the project itself wasn't exactly exciting, the problems I encountered (and, for the most part, solved) throughout the development of it was something I enjoyed.

## Do you think this project was fair?
- Yes and no. While I believe that the project is an excellent indication of what I am/am not capable of, much more so than an algorithm challenge or it's equivalent, it was also naturally much more labor intensive. If I don't get the job, $30 for this project is an extremely low amount in my estimation. Hopefully you won't need this advice and I'll get the job, but for future candidates I believe a solid middle ground would be to remove some of the requirements, perhaps the tiered role-based authentication or much of the admin dashboard, and keep the rest of the project. 

## Missing Features
#### In the Extension

The extension itself is lacking significantly in features. Having never developed a chrome extension before, implementing any sort of "advanced" functionality was difficult. Finding onling shopping sites to test text injection on was challenging in and of itself, and even if I got it working on one, I wasn't sure what approach to take so that it would be able to automatically detect and interact with the coupon text box's on multiple sites, each with different element ID's, structures, etc. I'm sure given time, I could find a way. My fatal flaw here was that I decided initially "I'll do the backend and admin dashboard first, since that's what I know, then I'll knock out the extension after" and ultimately didn't leave myself with enough time to figure out how to get the extension working. Below is the list of requirements from Coderbytes along with what did/didn't get accomplished 

- ✔️ When the user installs the extension, it should generate a unique ID that represents the user.
- ⚠️ The extension will allow users to upload a text file with potential coupons codes. _(User can input coupons via a form)_
- ❌ If  the user reaches a page with an “apply discount” input and has something in their cart the extension should ask the user if they want to try their list of discount codes.
- ❌ If yes, each code will be injected into the “apply coupon” box on the web page and submitted automatically.
- ❌ If any of the discount codes work, it should be applied.
- ❌ If two or more discount codes work, the code that generates the highest discount should be applied.
- ❌ If the user enters a working discount code that is not in the text file, the extension should ask the user if they want to add the discount code to the text file and act accordingly.
- ⚠️ The extension should send the unique ID, store name, URL, successful coupon code, and the date it was used to the database via API. _(Extension sends unique ID, store name, and coupon code. Due to aforementioned issues date used, URL, and whether or not the code was successful has been omitted)_


#### In the Server
Due to the aforementioned shortcomings in with the extension, much of the data requested to be displayed
on the Admin dashboard just wasn't available and therefore wasn't implemented. Additionally, due to time constraints, some of the functionality implemented isn't as smooth/polished as I would like it to be.

- ✔️ The server will provide an endpoint for the Chrome Extension or WordPress Plugin to interface with.
- ✔️ The server will receive CRUD requests and adjust the database accordingly.
- For each user display:
    - ✔️ Their ID.
    - ❌ Successful coupon codes. 
    - ✔️ The store name.
    - ❌ The store URL.
    - ❌ The date the coupon was first used.
    - ❌ The most recent date the coupon was used.
    - ❌ How many times the coupon was used.
    - ❌ Allow admins to search for users by their ID or coupon codes. I.E if I search for a user ID of “e4839” it should bring up that user’s data or if I search for the coupon “freefood” it should bring up all users that used that coupon code.
- ✔️ There should be one super admin account and other admins can sign up for accounts.
- ✔️ The sign up should require a password and email address (email addresses do not have to be verified).
- ✔️ The super admin account should see a list of active admin accounts and can delete any account.
- ✔️ Each additional standard admin account must be approved by the super admin before they have access to the server.
- ✔️ Standard admins can’t delete any accounts.
- ✔️ Admins must be able to change their passwords but not their email.
- ❌ The super admin should get notified of any failed user login attempts.

## Usage Instructions
- git clone the repo
- cd into backend, run 'npm install' and then 'npm start'
- cd into frontend, run 'npm install' and then 'npm start'
- open the chrome extension folder on the chrome extension management page
- Add a 'config.json' and follow instructions in the 'config.json.example'
- Download MongoDB or use the free cloud tier at https://www.mongodb.com/cloud/atlas
- Copy and paste the connection string into the correct location in the config.json
- Navigate to http://localhost:8080/ and you should be good to go!





