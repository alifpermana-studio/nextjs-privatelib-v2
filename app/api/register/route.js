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
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 },
      );
    }

    // check for duplicate emails
    const foundUser = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (foundUser) {
      return NextResponse.json({
        message: "Your Email has been authorized as User.",
        status: 409,
      });
    }

    /* const duplicateEmail = await User.findOne({ email: userData.email })
      .lean()
      .exec()

    const duplicateUserName = await User.findOne({ userName: userData.userName })
      .lean()
      .exec() */

    /* if (duplicateEmail) {
      return NextResponse.json({
        message: "Your Email has been authorized as User.",
        status: 409,
      });
    } else if (duplicateUserName) {
      return NextResponse.json({
        message: "Your Username has been used by another user.",
        status: 409,
      });
    } */

    const hashPassword = await bcrypt.hash(userData.password, 10);

    const user = await prisma.user.create({
      data: {
        name: userData.name,
        userName: userData.userName,
        email: userData.email,
        hashedPassword: hashPassword,
        accountStatus: "Unverified",
        role: "General User",
      },
    });

    return NextResponse.json({ message: "User Created.", status: 201 });
  } catch (error) {
    console.log(err);
    return NextResponse.json({ message: "Error", status: 500 });
  }
}
