# tradeforce

### Project Description:

Tradeforce is a webapp designed to connect members of the community with each other and facilitate the direct exchange of items in a barter-like system.
The app will store information related to physical items such as size, weight, condition.
Likewise, the app will support the upload of an image file of the object that the user wishes to put up for exchange.
The app will also support the ability for users to create and manage their own accounts/profiles by storing basic user information.  
  
In summary, the app will support the following actions for users:

    1. Account creation/maintenance/deletion
    2. Creation/editing/deletion of postings of items the user wants to put up for exchange
    3. Ability to search the application for goods that they are interested in
    4. Ability to contact other users to arrange the trade

### Project Task Requirements

#### Minimal Requirements / MVP

    1. User Interface being responsive
    2. User sign-in & User profiles
    3. User search postings
    4. User create/edit/delete postings (edit and deletion is limited to postings that they themselves have created)
    5. Users can offer/respond with things on postings by other users to trade

#### Standard Requirements

    1. Archive unavailable/traded items
    2. User reviews for satisfaction
    3. Notification centre for receiving responses/offer
    4. User posts/offers page (personal user account page)
    5. Third party login (ex. via Google, Facebook, etc)

#### Stretch Requirements

    1. Live-chat functionality
    2. Admin module
    3. Meeting scheduling interface
    4. 2-factor authentication for login security

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
