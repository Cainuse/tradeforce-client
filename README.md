# TRADEFORCE

View the project at: <https://tradeforce.herokuapp.com>

Tradeforce Server URL: https://github.com/Cainuse/tradeforce-server

## Rubric 1: Description of App

Tradeforce is a webapp designed to connect community members together to facilitate the direct exchange of items in a barter-like system. 

By engaging with one another in trade, Tradeforce helps two-fold: strengthening community ties as people come together to help their neighbours; and also reducing collective spending and waste, finding new homes for items that would otherwise be discarded.

## Rubric 2: Statement of Goals and Completed Items

### MVP Requirements

- [x] User Interface
- [x] User sign-in & User profiles
- [x] User search postings
- [x] User create/edit/delete postings (edit and deletion is limited to postings that they themselves have created)
- [x] Users can offer/respond with things on postings by other users to trade

### Standard Requirements
- [x] Archive unavailable/traded items
- [x] User reviews for satisfaction
- [x] Notification centre for receiving responses/offer
- [x] User's posts/offers are displayed (user profile page)
- [x] Third party login (ex. via Google)

### Stretch Requirements
- [x] Live-chat functionality
- [x] Location Services with Google Maps API
- [ ] Meeting scheduling interface
- [ ] 2-factor authentication for login security
- [ ] Admin Module

## Rubric 3: How Tech from Units 1-5 were used in Project

#### HTML/CSS/JS:
- **HTML**: While we didn't explicitly use HTML, we used JSX to build the frontend, which allows us to write HTML in React
  
- **CSS**: We used CSS to enhance/customize the styling of our app in Material UI using the library's `makeStyles` and `withStyles` styling solutions
  
- **JS**: Our whole app was built in JS (ex. React, Node). It was a vital part of connecting different parts of app and processing data. 

#### React/Redux:
- **React**: Our frontend was built entirely upon React; it provides a component based structure, which greatly supports reusability of code as you could reuse components in different contexts. Furthermore, React uses a virtual DOM, which makes our app more secure than if we had used the traditional HTML method of building a webapp, as it makes DOM manipulation by unauthorized users much more unlikely.
  
- **Redux**: Redux was used to keep a single source of truth in terms of our frontend data, including information regarding postings, users, offerings, and state of app (ex. modal state). Because updates to the redux store triggers rerendering of related components, it ensured that our view was always up-to-date with our data.

#### MongoDB:
- **MongoDB**: We used mongoDB to store our postings, users, offering, chat, notification data. We utilized the Mongoose ODM to specify data schemas and to ensure consistency of document data structure.

#### Node/Express:
- **Node/Express**: Express, a Node.js framework, was used to set up our backend with REST API endpoints that were then called from the frontend (using `redux-thunk`) to obtain/create/update and delete the data from the database.

#### Release Engineering:
- **Release Engineering**:
    - *Many Repo*: Our client (this repo) relies upon our server, which is in a separate repo (found at https://github.com/Cainuse/tradeforce-server) for a clean distinction between frontend vs backend code. 
  
    - *Version Control*: We used git for version control to minimize conflicts and track changes. 
  
    - *Deployment*: We used Heroku, a cloud-based platform, to build and run our application, taking advantage of Heroku's GitHub integration to have a more frequent cadence of deployment and release of our project with pushes to `master` branch.




### Project Description:

The app will store information related to physical items such as quantity, category, condition.
Likewise, the app will support the upload of an image file of the object that the user wishes to put up for exchange.
The app will also support the ability for users to create and manage their own accounts/profiles by storing basic user information.

In summary, the app will support the following actions for users:

    1. Account creation/maintenance/deletion
    2. Creation/editing/deletion of postings of items the user wants to put up for exchange
    3. Ability to search the application for goods that they are interested in
    4. Ability to contact other users to arrange the trade

### Project Task Requirements



### Task Breakdown

##### MVP Requirement #1: "User Interface"

    1. Design GUI layout with intuitive and user-friendly workflow for the following pages:
        1. Landing Page
        2. User Profile
        3. Item Posting
        4. Item Search Pages

Note: Please refer to the [prototype sketch](https://github.com/Cainuse/tradeforce-client/blob/master/prototype-sketch/Prototype-sketches.pdf) for more detail

##### MVP Requirement #4: "User create posting"

    1. Ability to upload/replace/remove image file of item
    2. Ability to create/edit/delete description of item
        1. Condition
        2. Size dimensions
        3. Weight
        4. Description blurb
    3. Ability to assign tags and/or categories to facilitate search functionality

##### For Development

** Note that we are using yarn rather than npm, see some reasons for this here: https://www.sitepoint.com/yarn-vs-npm/ **
But don't be alarmed, they are pretty much the same aside from mechanisms not visible to the user

1. Install Yarn @ https://classic.yarnpkg.com/en/docs/install/#mac-stable
2. In terminal (Or Gitbash on Windows), CD into project directory and run 'yarn install' command
3. If all dependencies are installed, you can run the project by executing 'yarn start'

Remote Repository Etiquette

- For feature development, please open a new branch and do your work there
- DO NOT push directly to master, this will be enforced on Github
- All MR or PR need to be reviewed and approved by at least another person for merging with master (This prevents breaking changes to occur on production, but is subject to change depending on rate of development)
- CD is set up for master branch so all updates made to master branch will be deployed to production, the link to production will be shared once the environment is ready
