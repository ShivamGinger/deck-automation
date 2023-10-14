import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const dummyData = {
    msg: 'teri ma '
  }

  return NextResponse.json(dummyData);
}