import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

  const body = await request.json();

  return NextResponse.json(body);
}

export async function GET(request: NextRequest) {

  const body = await request.json();
  console.log(body);

  return NextResponse.json('nice');
}