import { candidateParamScoreExist, candidateParamScoreList, candidateQuoScoreExist, candidateQuoScoreList, paramScoreList, processCandidatePDF, quoScoreList, scoreExist } from "@/lib/candidates";
import { getCompany } from "@/lib/companies";
import { getCompanyRoleCandidate, getCompanyRoleCandidates, getRole, roleCandidates } from "@/lib/roles";
import { NextRequest, NextResponse } from "next/server";

import * as puppeteer from 'puppeteer';

export async function POST(request: NextRequest) {
  try {
    const { role_id, company_id, candidate_list } = await request.json();

    const companyIdExist = await getCompany(company_id);
    if (companyIdExist.length === 0) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    };

    const roleIdExist = await getRole(company_id, role_id);
    if (roleIdExist.length === 0) {
      return NextResponse.json({ error: "Role not found" }, { status: 404 });
    };

    const candidateIndividualResult = await Promise.all(candidate_list.map((candidate_id: number) => processCandidatePDF(company_id, role_id, candidate_id)))

    const browser = await puppeteer.launch({ headless: "new" });

    const page = await browser.newPage();

    const origin = request.headers.get('origin');

    const website_url = `${origin}/multiplehtml2pdf?roleName=${encodeURIComponent(roleIdExist[0]?.role_name)}&companyName=${encodeURIComponent(roleIdExist[0]?.company_name)}&listIndividualCandidateData=${encodeURIComponent(JSON.stringify(candidateIndividualResult))}`;

    // console.log(website_url);

    await page.goto(website_url, { waitUntil: 'networkidle0' });

    await page.emulateMediaType('screen');

    const pdf = await page.pdf({
      printBackground: true,
      landscape: true,
      height: 1920,
      width: 1070
    });

    await browser.close();

    return NextResponse.json(pdf);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: 'Internal Server Error', errMsg: err }, { status: 500 });
  }
};
