import dbConnect from "@/lib/dbConnect";
import ImageKit from "imagekit";
import { NextRequest, NextResponse } from 'next/server'
import IK_Collection from "@/models/ImageKit"

const imagekit = new ImageKit({
    urlEndpoint: process.env.NEXT_PUBLIC_IK_ENDPOINT1,
    publicKey: process.env.NEXT_PUBLIC_IK_PUBLIC_KEY,
    privateKey: process.env.NEXT_PUBLIC_IK_PRIVATE_KEY
});

export async function GET(req) {
    var result = imagekit.getAuthenticationParameters();

    return NextResponse.json({ success: true, result: result })
}

export async function POST(req) {
    const data = await req.json()

    await dbConnect()

    let seconds="0"+ new Date().getSeconds()
    let secondsSliced = seconds.slice(-2)
    let minute = "0" + new Date().getMinutes()
    let minuteSliced = minute.slice(-2)
    let hour = "0" + new Date().getHours()
    let hourSliced = hour.slice(-2)
    let day = new Date().getDate()
    let month = "0" + (new Date().getMonth() + 1)
    let monthSliced = month.slice(-2)
    let year = "0" + (new Date().getYear())
    let yearSliced = year.slice(-2)
    let mergeTitle= hourSliced + minuteSliced + secondsSliced + "_" + day + monthSliced + yearSliced + "_exp"

    imagekit.upload({
        file: data, //required
        fileName: mergeTitle,   //required
        useUniqueFileName:false,
        tags: ["tag1", "tag2"]
    }, function (error, result) {
        if (error) console.log(error);
        /* else console.log(result); */
    });

    const imageDbRegist= await IK_Collection.create({ fileName: mergeTitle, category: "general" })

    return NextResponse.json({ success: true, imagekitStatus: imagekit })
}