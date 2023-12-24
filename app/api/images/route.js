import { NextRequest, NextResponse } from 'next/server'
import dbConnect from "@/lib/dbConnect";
import ImageKit_Lib from "@/models/ImageKit"

export async function GET(req) {

  await dbConnect()

  const imageList = await ImageKit_Lib.find({})
  return NextResponse.json({ success: true, result: imageList})
} 