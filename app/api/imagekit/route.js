import dbConnect from "@/lib/dbConnect";
import ImageKit from "imagekit";
import { NextRequest, NextResponse } from 'next/server'
import ImageKit_Lib from "@/models/ImageKit"
import { resolve } from "styled-jsx/css";

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

    let seconds = "0" + new Date().getSeconds()
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
    let mergeTitle = hourSliced + minuteSliced + secondsSliced + "_" + day + monthSliced + yearSliced

    if (data.action === "Upload") {
        const uploadResult = new Promise((resolve, reject) => {
            const res = imagekit.upload({
                file: data.imageData,
                fileName: data.permalink,
                useUniqueFileName: false,
            })

            if (res) {
                resolve(res)
            } else {
                reject("Failed")
            }
        })

        uploadResult.then((response) => {
            ImageKit_Lib.create({ title: data.title, uploadDate: mergeTitle, permalink: data.permalink, tags: data.tags, fileId: response.fileId, purgeRequestId: "" })
            console.log(response);
        }).catch((message) => {
            console.log(message);
        })

        /* const imageDbRegist = await ImageKit_Lib.create({ title: data.title, uploadDate: mergeTitle, permalink: data.permalink, tags: data.tags, fileId: upResult.fileId }) */
    } else if (data.action === "Update") {


        /* await ImageKit_Lib.findOneAndUpdate({ fileId: data.fileId }, { title: data.title, permalink: data.title, tags: data.tags }) */

        if (data.permalink === data.oldPermalink) {
            await ImageKit_Lib.findOneAndUpdate({ fileId: data.fileId }, { title: data.title, permalink: data.permalink, tags: data.tags })
        } else if ((data.permalink !== data.oldPermalink)) {
            const resDB = await ImageKit_Lib.findOneAndUpdate({ fileId: data.fileId }, { title: data.title, permalink: data.permalink, tags: data.tags })


            const resIK = imagekit.renameFile({
                filePath: "/" + data.oldPermalink,
                newFileName: data.permalink,
                purgeCache: true // optional
            })

            /* const updateResult = new Promise((resolve, reject) => {
                const res = imagekit.renameFile({
                    filePath: "/" + data.oldPermalink,
                    newFileName: data.permalink,
                    purgeCache: true // optional
                })

                if (res) {
                    resolve(res)
                } else {
                    reject("Failed")
                }
            })

            updateResult.then((response) => {
                ImageKit_Lib.findOneAndUpdate({ fileId: data.fileId }, { title: data.title, permalink: data.permalink, tags: data.tags, purgeRequestId: response.purgeRequestId })
            }).catch((message) => {
                console.log(message);
            }) */
        }


    } else if (data.action === "Delete") {
        await ImageKit_Lib.deleteOne({ fileId: data.fileId }); // returns {deletedCount: 1}

        imagekit.deleteFile(data.fileId, function (error, result) {
            if (error) console.log(error);
            else console.log(result);
        });
    }

    return NextResponse.json({ success: true, imageKitStatus: data })
}