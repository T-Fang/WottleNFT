import { QueryResult, QueryResultRow } from "pg";
import { DataRowMessage } from "pg-protocol/dist/messages";
import { Listing, ListingStatus } from "../models/listing";
import pool from "./database";

export async function getAllListingsOfStatus(status: ListingStatus): Promise<Listing[]> {
  let data = await pool.query("SELECT * FROM listings WHERE current_status = $1", [status as string])
  return data.rows
}

export async function getListingByID(id: number): Promise<Listing | null> {
  let data = await pool.query("SELECT * FROM listings WHERE current_status = $1", [status as string])
  return data.rows.length ==0 ? null : data.rows[0]
}

export async function addNewListing(listing: Listing): Promise<QueryResult> {
  return pool.query("INSERT INTO listings(nft_id, nft_asset_name, seller_wallet_id, price," 
    + "current_status, seller_contribution, un_goal) VALUES ($1,$2,$3,$4,$5,$6,$7",
    [listing.nft_id, listing.nft_asset_name, listing.seller_wallet_id, listing.price, 
      listing.current_status, listing.seller_contribution, listing.un_goal])
}