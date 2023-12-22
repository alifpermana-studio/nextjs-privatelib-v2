import { NextRequest, NextResponse } from 'next/server'
import dbConnect from "@/lib/dbConnect";
import IK_Collection from "@/models/ImageKit"

export async function GET(req) {

  await dbConnect()

  const imageList = await IK_Collection.find({})
  return NextResponse.json({ successku: true, result: imageList})
} 