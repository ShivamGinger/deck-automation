import { NextRequest, NextResponse } from "next/server";

import * as puppeteer from 'puppeteer';

export async function POST(request: NextRequest) {

  const { name } = await request.json();

  const browser = await puppeteer.launch({ headless: "new" });

  const page = await browser.newPage();

  const website_url = `http://localhost:3000/html2pdf/?name=${encodeURIComponent(name)}`;

  await page.goto(website_url, { waitUntil: 'networkidle0' });

  await page.emulateMediaType('screen');

  const pdf = await page.pdf({
    path: './reports/result.pdf',
    printBackground: true,
    format: 'A4',
    landscape: true,
  });

  await browser.close();

  return NextResponse.json('nice');

}
