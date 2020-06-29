import React from "react";
import { Route, Switch } from "react-router-dom";
import ItemPage from "./Item/ItemPage";
import ItemResults from "./pages/ItemResults";
import LandingPage from "./pages/LandingPage";
import UserProfile from "./pages/UserProfile";
import EditItemDetailsPage from "./pages/EditItemDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";

const PathRouter = () => {
  return (
    <Switch>
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route exact path="/items">
        <ItemResults />
      </Route>
      <Route path="/items/item=:id">
        <ItemPage />
      </Route>
      <Route exact path="/profile">
        <UserProfile />
      </Route>
      <Route path="items/item=:id/edit">
        <EditItemDetailsPage />
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
};

export default PathRouter;
