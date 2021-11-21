import * as express from 'express'
import { StatusCodes } from 'http-status-codes'
import { addNewListing, getAllListingsOfStatus, getListingByID } from '../../database/listingQueries'
import { ListingStatus } from '../../models/listing'
export async function getAllCurrentListings(req: express.Request, res: express.Response) {
  try {
    let listings = await getAllListingsOfStatus(ListingStatus.listing)
    res.status(StatusCodes.OK).json({
      listings: listings
    })
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errorMessage: error.message
    })
  }
}
export async function getListing(req: express.Request, res: express.Response) {
  try {
    let listing = await getListingByID(Number(req.params.listing_id))
    if (listing == null) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "No listing with ID"
      })
    }
    return res.status(StatusCodes.OK).json({
      listing: listing
    })
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errorMessage: error.message
    })
  }
}
export async function createListing(req: express.Request, res: express.Response) {
  try{
    await addNewListing({
      listing_id: null,
      nft_id: req.body.nft_id,
      nft_asset_name: req.body.nft_asset_name,
      buyer_wallet_id: null,
      seller_wallet_id: req.body.wallet_id,
      price: req.body.price,
      current_status: ListingStatus.listing,
      seller_contribution: null,
      buyer_contribution: null,
      un_goal: null
    })
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errorMessage: error.message
    })
  }
}
