# TRADEFORCE

View the project at: <https://tradeforce.herokuapp.com>

Tradeforce Server URL: https://github.com/Cainuse/tradeforce-server

[Built by: ](#rubric-6-list-of-contributions) Abid Salahi (z2u0b), Jenessa Tan (s9p1b), Sang Xu Jacqueline Yin (r6s1b), Zhen Peng Zhu (i8v0b)

## Table of Contents

- [I. Description of App](#rubric-1-description-of-app)
- [II. Statement of Goals and Completed Items](#rubric-2-statement-of-goals-and-completed-items)
- [III. Tech Breakdown](#rubric-3-how-tech-from-units-1-5-were-used-in-project)
- [IV. Above and Beyond Functionality](#rubric-4-above-and-beyond-functionality)
- [V. Next Steps](#rubric-5-next-steps)
- [VI. List of Contributions](#rubric-6-list-of-contributions)
- [VII. Challenges](#challenges-during-development)
- [VIII. Appendix](#appendix)

## Rubric 1: Description of App

Tradeforce is a webapp designed to connect community members together to facilitate the direct exchange of items in a barter-like system.

By engaging with one another in trade, Tradeforce helps two-fold: strengthening community ties as people come together to help their neighbours; and also reducing collective spending and waste, finding new homes for items that would otherwise be discarded.

## Rubric 2: Statement of Goals and Completed Items

### MVP Requirements

:white_check_mark: User Interface
:white_check_mark: User sign-in & User profiles
:white_check_mark: User search postings
:white_check_mark: User create/edit/delete postings (edit and deletion is limited to postings that they themselves have created)
:white_check_mark: Users can offer/respond with things on postings by other users to trade

### Standard Requirements

:white_check_mark: Archive unavailable/traded items
:white_check_mark: User reviews for satisfaction
:white_check_mark: Notification centre for receiving responses/offer
:white_check_mark: User's posts/offers are displayed (user profile page)
:white_check_mark: Third party login (ex. via Google)

### Stretch Requirements

:white_check_mark: Live-chat functionality
:white_check_mark: Location Services with Google Maps API
:x:  Meeting scheduling interface
:x:  2-factor authentication for login security
:x:  Admin Module

## Rubric 3: How Tech from Units 1-5 were used in Project

#### HTML/CSS/JS:

- **HTML**: While we didn't explicitly use HTML, we used JSX to build the frontend, which allows us to write HTML in React

- **CSS**: We used CSS to enhance/customize the styling of our app in Material UI using the library's `makeStyles` and `withStyles` styling solutions

- **JS**: Our whole app was built in JS (ex. React, Node). It was a vital part of connecting different parts of app and processing data.

#### React/Redux:

- **React**: Our frontend was built entirely upon React; it provides a component based structure, which greatly supports reusability of code as you could reuse components in different contexts. Furthermore, React uses a virtual DOM, which makes our app more secure than if we had used the traditional HTML method of building a webapp, as it makes DOM manipulation by unauthorized users much more unlikely.

- **Redux**: Redux was used to keep a single source of truth in terms of our frontend data, including information regarding postings, users, offerings, and state of app (ex. modal state). Because updates to the redux store triggers rerendering of related components, it ensured that our view was always up-to-date with our data.

#### MongoDB:

- **MongoDB**: We used mongoDB to store our postings, users, offering, chat, notification data in their own collections. We utilized the Mongoose ODM to specify data schemas and to ensure consistency of document data structure.

#### Node/Express:

- **Node/Express**: Express, a Node.js framework, was used to set up our backend with REST API endpoints that were then called from the frontend (with `axios` and `redux-thunk`) to obtain/create/update and delete the data from the database.

#### Release Engineering:

- **Release Engineering**:

  - _Many Repo_: Our client (this repo) relies upon our server, which is in a separate repo (found at https://github.com/Cainuse/tradeforce-server) for a clean distinction between frontend vs backend code.

  - _Version Control_: We used git for version control to minimize conflicts and track changes.

  - _Deployment_: We used Heroku, a cloud-based platform, to build and run our application, taking advantage of Heroku's GitHub integration to have a more frequent cadence of deployment and release of our project with pushes to `master` branch.

## Rubric 4: Above and Beyond Functionality

One of the features that we are most proud of in our application is live chat. Users can communicate with each other in real-time to co-ordinate the exchange of their items in person. This was a crucial feature to include because it offered a logical end to the online transaction. We used the real-time bi-directional communication library, Socket.IO, to implement chat. On both server and client, socket event listeners were set up to respond to events emitted by the other. For the server, receiving specific events, such as `add-message`, triggered the creation of new data to be saved to the Mongo database. On the other hand, reception of server events on the client-side required specific updates to the React UI, such as rendering a new message bubble. Although we were using the Material-UI library, it did not have any pre-built chat-like components for us to use. Therefore, we had to design and build our own to make our chat interface more aesthetic.

Learning how to incorporate chat into our existing app was a challenge; more details about this can be read [here](#challenges-during-development).

In addition to chat, we also included the following functionalities:

- push notifications for unread chat and offering notification counts in the navigation bar to alert users

- Google OAuth to provide a seemless and familiar registration/login mechanism for users

- Google Maps API integration to fetch more detailed information about a user's location based on pr:white_check_mark:d postal code and enable approximate distance calculations relative to the current app user to be shown on the previews of postings (i.e. search results page). This allows the user to plan for their trades smarter and be able to trade with people who are within a reasonable distance away from them.

## Rubric 5: Next Steps

For future development, the following features should be added to improve useability and functionality:

- the ability to select pre-existing postings when making an offer. This would require a change to the offering data structure to be able to differentiate between postings and items that are standalone. Furthermore, if a posting is offered and that offer is accepted, all the offers made to the posting in question should be declined and that posting should be set to inactive/traded.

- the ability to refine search using distances of the postings relative to the current user, i.e. user can specify in their search that they only want to see result within an X km radius. To accomplish this, our frontend would need to add the distance options to the search filter menu and the backend would need to adjust the database query

- an admin module to monitor and moderate content on the site. This is especially important for removing inappropriate content and/or users. Admin would also be able to update specific app parameters, such as categories and conditions. This would require adjustment to our authentication components

Other things we discussed:

- clicking notifications in the notification menu (nav bar) would open the offer details modal
- adjusting the data structure of offerings to include more descriptive information (i.e. adding a title)
- move image upload to use external image hosting service (e.g. Amazon S3, Google Firebase, etc) to improve loading performance

## Rubric 6: List of Contributions

#### Abid Salahi

Abid worked on the following features:

- Authentication & Google OAuth login (frontend and backend)
- Static offering notifications (frontend and backend)
- Frontend deployment
- Frontend location implementation
- Backend live chat

Despite the complexities involved with implementing authentication and with 3rd party integration, Abid did not hesitate to volunteer himself for the job. This was crucial, especially in the early development stages of our app, as the functionality of Tradeforce relied heavily on having users. Furthermore, Abid pushed strongly for the group to implement live-chat, arguing (correctly) that the transaction on Tradeforce between users felt too incomplete without it. He then went on to spearhead the backend implementation of live-chat.

#### Jenessa Tan

Jenessa worked on the following features:

- Prototype design
- Integration of frontend and backend
- Frontend implementation, including but not limited to:
  - frontend live chat
  - posting details & search results
  - image drag & drop uploader
  - styling
- Push notifications for chat and offer notifications

Jenessa was pivotal to the development of this app, from the conceptualization and designing of the prototype that would eventually become the foundation of how the frontend styled the user interface, to the architecting of user workflow of the transactions of postings. She was an all-rounder for our group, working on crucial components and features that spanned across both the frontend and the backend. As the starkest example, Jenessa tackled the sizable task of connecting the backend and frontend for live-chat, implementing the code necessary for the real-time exchange of information between client and server, and then actualizing that information in an aesthetically appealing UI.


#### Sang Xu Jaqueline Yin

Jackie worked on the following features:

- Frontend implementation, including but not limited to:
  - making offer detail modal
  - user profile
  - offers received/sent previews
  - offers received/sent details modal
  - navigation bar
  - styling
- Refactoring & restructuring of code
- Quality assurance and remediation of bugs

Without Jackie, this README write-up would not exist. She dictated the majority of the information you’ve been reading thus far (and that you will continue to read if you continue past this point). In terms of the app, Jackie focused her efforts mainly on developing the frontend - offerings in particular. From designing the offering working flow, to the implementation of all the necessary components involved with offerings, Jackie’s code fingerprints can be found throughout the client repo. She was essential in locating and rectifying discovered bugs, which she was consistent in doing throughout the process of development.

#### Zhen Peng Zhu

Peng worked on the following features:

- Backend APIs & server set-up
- MongoDB & Mongoose schemas
- Backend deployment
- Backend locations using Google Maps API
- Backend pagination

Peng was vital in developing the server-side of our application. He single handedly crafted the majority of the API endpoints and was quick to make adjustments as frontend needed. As an example, he made strategic changes to the offerings database schema to facilitate the joining of two collections. Peng took great initiative in building the backend location functionality using Google Maps API, volunteering to do it even while he was completing pagination and, in spite of the fact that we were in our last week of development before our internal code freeze.

## Challenges During Development

#### Chat

Chat function was the hardest thing to implement, for many reasons. It’s a vital feature for our app. We knew from the get-go, chat was a stretch goal that we weren’t sure we’d complete, given the breadth of the application and the time constraints. However, after implementing accept offerings, it was clear that there was something missing. The user experience felt incomplete. However, because everything else had to be set up before we started chat, chat had to be implemented at the very end of the development cycle, leaving us with very little time. Furthermore, all the tutorials online were for a standalone chat apps, so we had to figure out how to integrate it into our own app within that time crunch. We distributed the work among several team members and held many impromptu meetings to discuss our learnings and progress. In the end, through cooperation and many sleepless nights of reading documentations and piece-mealing several tutorials and resources together, we eventually built and integrated this massive feature, of which all of our team members are really proud.

#### Coordination/Task Management

Due to the novelty of having to work 100% remotely and members having outside commitments, we admittedly were not very coordinated in the beginning of our project. There were overlaps in what people were working on, which introduced technical conflicts, there other tasks that blocked other tasks but weren’t being addressed and so forth. We realized that adhering to this pattern would be detrimental to our project and completing our goals so we introduced an agile sprint board in trello to collect, plan, and organize our tickets.

## Appendix

### Project Description:

The app will store information related to physical items such as quantity, category, condition.
Likewise, the app will support the upload of an image file of the object that the user wishes to put up for exchange.
The app will also support the ability for users to create and manage their own accounts/profiles by storing basic user information.

In summary, the app will support the following actions for users:

    1. Account creation/maintenance/deletion
    2. Creation/editing/deletion of postings of items the user wants to put up for exchange
    3. Ability to search the application for goods that they are interested in
    4. Ability to contact other users to arrange the trade

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
