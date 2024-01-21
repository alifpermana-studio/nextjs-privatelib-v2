import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

export const prisma = new PrismaClient();

export async function GET(req) {
  const session = await getServerSession(options);

  const imageList = await prisma.Imagekit.findMany({
    where: {
      userId: session.user.id,
    },
  });
  return NextResponse.json({ success: true, result: imageList });
}
