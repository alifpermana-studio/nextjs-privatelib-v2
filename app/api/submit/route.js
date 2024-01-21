import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function POST(req) {
  const imageList = await prisma.post.create({
    data: {
      title: "Ini judul",
      content: "Ini content",
    },
  });
  return NextResponse.json({ success: true, result: imageList });
}
