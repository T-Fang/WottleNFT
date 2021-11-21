import { createListing, getAllCurrentListings, getListing } from "../../controller/marketplace";

const express = require('express');
const marketplaceRouter = express.Router();

marketplaceRouter.get('/all/current', getAllCurrentListings);
marketplaceRouter.get('/:listing_id', getListing)
marketplaceRouter.post('/listing', createListing)
export default marketplaceRouter