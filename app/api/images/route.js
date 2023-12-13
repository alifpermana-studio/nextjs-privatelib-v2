import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import { join } from 'path'
import fs from "fs/promises"
import path from 'path'


export async function POST(req) {

  const data = await req.formData()
  const file = data.get('file')

  let minute = "0" + new Date().getMinutes()
  let minuteSliced = minute.slice(-2)
  let hour = "0" + new Date().getHours()
  let hourSliced = hour.slice(-2)
  let day = new Date().getDate()
  let month = "0" + (new Date().getMonth() + 1)
  let monthSliced = month.slice(-2)
  let year = "0" + (new Date().getYear())
  let yearSliced = year.slice(-2)

  /* console.log(data); */
  if (!file) {
    return NextResponse.json({ success: false })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  const path = join(process.cwd() + "/public/images/", `${minuteSliced}${hourSliced}` + "_" + `${day}${monthSliced}${yearSliced}` + "_" + file.name)
  await writeFile(path, buffer)
  /* console.log(path) */

  return NextResponse.json({ success: true })
}



export async function GET(req) {

  const dirs = await fs.readdir(path.join(process.cwd(), "public", "images"))
  /* const imageUrl = path.join(process.cwd(), "public", "images", "/", dirs[2]) */


  return NextResponse.json({ successku: true, hasilku: dirs})
} 