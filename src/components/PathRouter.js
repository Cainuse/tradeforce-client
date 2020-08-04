import React from "react";
import { Route, Switch } from "react-router-dom";

import ItemPage from "./pages/ItemPage";
import { ItemResults } from "./pages/ItemResults";
import LandingPage from "./pages/LandingPage";
import UserProfile from "./pages/UserProfile";
import EditItemDetailsPage from "./pages/EditItemDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import ScrollToTop from "./ScrollToTop";
import EditUserProfilePage from "./pages/EditUserProfilePage";
import ChatPage from "./pages/ChatPage";

const PathRouter = () => {
  return (
    <React.Fragment>
      <ScrollToTop />
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/items/item=:id">
          <ItemPage />
        </Route>
        <Route path="/items/item=:id/edit">
          <EditItemDetailsPage />
        </Route>
        <Route path="/items">
          <ItemResults />
        </Route>
        <Route exact path="/profile/user=:id/edit">
          <EditUserProfilePage />
        </Route>
        <Route exact path="/profile/user=:id">
          <UserProfile />
        </Route>
        <Route exact path="/chat">
          <ChatPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default PathRouter;
