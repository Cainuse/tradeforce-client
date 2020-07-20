import React, { useEffect, useState } from "react";
import { Card, CardActionArea, CardHeader } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { getUserByIdAysnc } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;

export const OfferingPreview = (props) => {
  let { offer, index } = props;
  const dispatch = useDispatch();
  const [offerer, setOfferer] = useState({ } );

  useEffect( () => {
    async function getOfferer() {
      let user = await dispatch(getUserByIdAysnc(offer.userId));
      setOfferer(user);
      return user;
    }
    getOfferer();
  }, [])


  return (
    <Card elevation={2}>
      <CardActionArea >
        <CardHeader title={`${offerer.userName} has made you an offer`}></CardHeader>
      </CardActionArea>
    </Card>
  )
}

const mapDispatchToProps = (dispatch) => ({
  getUser: (userId) => dispatch(getUserByIdAysnc(userId)),
})

