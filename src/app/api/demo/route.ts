import { NextRequest, NextResponse } from "next/server";

import * as puppeteer from 'puppeteer';

export async function POST(request: NextRequest) {

  const { name } = await request.json();

  const browser = await puppeteer.launch({ headless: "new" });

  const page = await browser.newPage();

  const gender = 'M';

  const keyPoints = [
    '7+ years in AI/ML, Reinforcement Learning, Robotics research',
    'Senior Chief Engineer Samsung Research',
    'Ex-Ola Electric AV2.0 Researcher',
    'ISRO Deign Engineer, NASA Post-doctoral researcher',
    'PhD IISC Bangalore'
  ];

  const top5Attributes = [
    {
      id: 1,
      title: 'Pedigree',
      value: 5
    },
    {
      id: 2,
      title: 'Communication',
      value: 4
    },
    {
      id: 3,
      title: 'Deep Learning',
      value: 4
    },
    {
      id: 4,
      title: 'Conflict Management',
      value: 4
    },
    {
      id: 5,
      title: 'People Management',
      value: 4
    },
  ]

  const IQvalue = 4.5;
  const EQValue = 3.9;
  const SQValue = 4;
  const AQValue = 3.5;

  const keyPointsString = JSON.stringify(keyPoints);
  const top5AttributesString = JSON.stringify(top5Attributes);

  const website_url = `http://localhost:3000/html2pdf/?name=${encodeURIComponent(name)}&gender=${gender}&keyPoints=${keyPointsString}&topAttributes=${top5AttributesString}&IQValue=${IQvalue}&EQValue=${EQValue}&SQValue=${SQValue}&AQValue=${AQValue}`;

  console.log(website_url);

  await page.goto(website_url, { waitUntil: 'networkidle0' });

  await page.emulateMediaType('screen');

  const pdf = await page.pdf({
    path: './reports/result.pdf',
    printBackground: true,
    landscape: true,
    height: 1920,
    width: 1070
  });

  await browser.close();

  return NextResponse.json('nice');

}
