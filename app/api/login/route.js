import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function POST(req) {
  try {
    const body = await req.json();
    const userData = body.formData;

    //Confirm data exists
    if (!userData?.email || !userData.password) {
      return NextResponse.json({
        message: "All field are required.",
        status: 400,
      });
    }

    // check for duplicate emails
    const foundUser = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (foundUser) {
      const match = await bcrypt.compare(
        userData.password,
        foundUser.hashedPassword
      );

      if (match) {
        if (foundUser.accountStatus === "Verified") {
          return NextResponse.json({ message: "Verified", status: 201 });
        }
        return NextResponse.json({ message: "Unverified", status: 203 });
      }

      return NextResponse.json({
        message: "Password didn't match",
        status: 203,
      });
    }

    return NextResponse.json({ message: "User not Found", status: 401 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", status: 500 });
  }
}
