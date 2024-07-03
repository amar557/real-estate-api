import express from "express";
import {
  createlisting,
  getListedItem,
  getUserItems,
  deleteUserItem,
  updateItem,
  searchItems,
} from "../controllers/listing.controller.js";
const listingapi = express.Router();
listingapi.post("/listing", createlisting);
listingapi.get("/listingitem/:id", getListedItem);
listingapi.get("/useritems/:id", getUserItems);
listingapi.delete("/deleteUserItem/:id", deleteUserItem);
listingapi.post("/UpdateItem/:id", updateItem);
listingapi.post("/searchitem", searchItems);

export default listingapi;
