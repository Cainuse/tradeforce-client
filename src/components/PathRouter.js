import React from "react";
import { Route, Switch } from "react-router-dom";
import ItemPage from "./Item/ItemPage";
import ItemResults from "./pages/ItemResults";
import UserProfile from "./pages/UserProfile";

// this will be replaced with a back-end call to fetch the actual items from the db
const sampleItemPreviews = [
  {
    id: 0,
    title: "BLA0",
    datePosted: "1/1/2000",
    location: "Vancouver, BC",
  },
  {
    id: 1,
    title: "BLA1",
    datePosted: "1/1/2000",
    location: "Vancouver, BC",
  },
  {
    id: 2,
    title: "BLA2",
    datePosted: "1/1/2000",
    location: "Vancouver, BC",
  },
  {
    id: 3,
    title: "BLA3",
    datePosted: "1/1/2000",
    location: "Vancouver, BC",
  },
  {
    id: 4,
    title: "BLA4",
    datePosted: "1/1/2000",
    location: "Vancouver, BC",
  },
  {
    id: 5,
    title: "BLA5",
    datePosted: "1/1/2000",
    location: "Vancouver, BC",
  },
  {
    id: 6,
    title: "BLA6",
    datePosted: "1/1/2000",
    location: "Vancouver, BC",
  },
  {
    id: 7,
    title: "BLA7",
    datePosted: "1/1/2000",
    location: "Vancouver, BC",
  },
];

const PathRouter = () => {
  return (
    <Switch>
      <Route exact path="/">
        {/* TODO: this is where the landing page should be rendered */}
      </Route>
      <Route exact path="/items">
        <ItemResults items={sampleItemPreviews} />
      </Route>
      <Route path="/items/item=:id">
        <ItemPage />
      </Route>
      <Route exact path="/profile">
        <UserProfile />
      </Route>
    </Switch>
  );
};

export default PathRouter;
