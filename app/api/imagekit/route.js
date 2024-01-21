import ImageKit from "imagekit";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

export const prisma = new PrismaClient();

const imagekit = new ImageKit({
  urlEndpoint: process.env.NEXT_PUBLIC_IK_ENDPOINT1,
  publicKey: process.env.NEXT_PUBLIC_IK_PUBLIC_KEY,
  privateKey: process.env.NEXT_PUBLIC_IK_PRIVATE_KEY,
});

export async function GET(req) {
  var result = imagekit.getAuthenticationParameters();

  return NextResponse.json({ success: true, result: result });
}

export async function POST(req) {
  const data = await req.json();

  const session = await getServerSession(options);

  let seconds = "0" + new Date().getSeconds();
  let secondsSliced = seconds.slice(-2);
  let minute = "0" + new Date().getMinutes();
  let minuteSliced = minute.slice(-2);
  let hour = "0" + new Date().getHours();
  let hourSliced = hour.slice(-2);
  /* let day = new Date().getDate() */
  let day = "0" + new Date().getDate();
  let daySliced = day.slice(-2);
  let month = "0" + (new Date().getMonth() + 1);
  let monthSliced = month.slice(-2);
  let year = "0" + new Date().getYear();
  let yearSliced = year.slice(-2);
  let mergeTitle =
    hourSliced +
    minuteSliced +
    secondsSliced +
    daySliced +
    monthSliced +
    yearSliced;

  if (data.action === "Upload") {
    const res = await imagekit.upload({
      file: data.imageData,
      fileName: mergeTitle + "-" + data.permalink,
      useUniqueFileName: false,
      folder: "/" + session.user.userName,
    });

    const upDBResult = await prisma.Imagekit.create({
      data: {
        title: data.title,
        uploadDate: mergeTitle,
        permalink: data.permalink,
        tags: data.tags,
        folder: session.user.userName,
        fileId: res.fileId,
        purgeRequestId: "0",
        userId: session.user.id,
      },
    });
    console.log(upDBResult);
  } else if (data.action === "Update") {
    if (data.permalink === data.oldPermalink) {
      await prisma.Imagekit.update({
        where: {
          fileId: data.fileId,
        },
        data: {
          title: data.title,
          permalink: data.permalink,
          tags: data.tags,
        },
      });
    } else if (data.permalink !== data.oldPermalink) {
      const resIK = await imagekit.renameFile({
        filePath:
          "/" +
          session.user.userName +
          "/" +
          data.uploadDate +
          "-" +
          data.oldPermalink,
        newFileName: data.uploadDate + "-" + data.permalink,
        purgeCache: true, // optional
      });

      const resDB = await prisma.Imagekit.update({
        where: {
          fileId: data.fileId,
        },
        data: {
          title: data.title,
          permalink: data.permalink,
          tags: data.tags,
        },
      });
      console.log(data);
    }
  } else if (data.action === "Delete") {
    /* await ImageKit_Lib.deleteOne({ fileId: data.fileId }); */ // returns {deletedCount: 1}

    imagekit.deleteFile(data.fileId, function (error, result) {
      if (error) console.log(error);
      else console.log(result);
    });

    await prisma.Imagekit.delete({
      where: {
        fileId: data.fileId,
      },
    });
  }

  return NextResponse.json({ success: true, imageKitStatus: data });
}
