import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET() {
  return NextResponse.json({
    message: "hello world",
  });
}

export async function POST(
  req: NextRequest,
) {
  if (req.method !== "POST") {
    return NextResponse.json({message: "Invalid", status: 405});
  }

  try {
    const { email, name, password } =  await req.json();

    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json({error: 'Email taken', status: 422})
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return NextResponse.json({message: user, status: 200})
  } catch (error) {
    console.log(error);
    return NextResponse.json({message: "", status: 405})
  }
}
