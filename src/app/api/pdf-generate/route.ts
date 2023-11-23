import { candidateParamScoreExist, candidateParamScoreList, candidateQuoScoreExist, candidateQuoScoreList, paramScoreList, quoScoreList, scoreExist } from "@/lib/candidates";
import { getCompany } from "@/lib/companies";
import { getCompanyRoleCandidate, getRole } from "@/lib/roles";
import { NextRequest, NextResponse } from "next/server";

import * as puppeteer from 'puppeteer';

export async function POST(request: NextRequest) {
  try {
    const { role_id, company_id, candidate_id } = await request.json();

    const companyIdExist = await getCompany(company_id);
    if (companyIdExist.length === 0) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    };

    const roleIdExist = await getRole(company_id, role_id);
    if (roleIdExist.length === 0) {
      return NextResponse.json({ error: "Role not found" }, { status: 404 });
    };

    const rolesCandidate = await getCompanyRoleCandidate(company_id, role_id, candidate_id);
    if (rolesCandidate.length === 0) {
      return NextResponse.json({ error: "No candidates under this role" }, { status: 404 });
    };

    const paramScoreExists: scoreExist[] = await candidateParamScoreExist(candidate_id);
    const quoScoreExists: scoreExist[] = await candidateQuoScoreExist(candidate_id);
    if (paramScoreExists.length === 0 && quoScoreExists.length === 0) {
      return NextResponse.json({ error: "Scores do not exist" }, { status: 404 });
    };

    const candidateParamScore: paramScoreList[] = await candidateParamScoreList(candidate_id);
    const candidateQuoScore: quoScoreList[] = await candidateQuoScoreList(candidate_id);

    const browser = await puppeteer.launch({ headless: "new" });

    const page = await browser.newPage();

    const top5Attributes = candidateParamScore.slice(0, 5).map((obj, index) => ({
      id: index + 1,
      title: obj.parameter_name,
      value: obj.parameter_score
    }));

    const quotientScores = candidateQuoScore.map(obj => {
      let title;

      switch (obj.quotient_name) {
        case 'Adversity Quotient':
          title = 'AQ';
          break;
        case 'Emotional Factor':
          title = 'EQ';
          break;
        case 'Intelligence Factor':
          title = 'IQ';
          break;
        case 'Social Factor':
          title = 'SQ';
          break;
      };

      return {
        id: obj.quotient_score_id,
        title,
        value: obj.quotient_score
      };
    });

    const keyPointsString = JSON.stringify(rolesCandidate[0].key_points);
    const achivementsString = JSON.stringify(rolesCandidate[0].achievement);
    const top5AttributesString = JSON.stringify(top5Attributes);
    const quotientScoresString = JSON.stringify(quotientScores);

    const website_url = `http://localhost:3000/html2pdf/?name=${encodeURIComponent(rolesCandidate[0]?.candidate_name)}&profilePic=${rolesCandidate[0]?.profile_pic}&keyPoints=${keyPointsString}&social=${rolesCandidate[0].social}&companyName=${rolesCandidate[0].company_name}&roleName=${rolesCandidate[0].role_name}&email=${rolesCandidate[0]?.email}&gp-score=${rolesCandidate[0]?.gp_score}&achivements=${achivementsString}&description=${rolesCandidate[0]?.description}&gender=${rolesCandidate[0]?.gender}&experience=${rolesCandidate[0].experience}&fixedLpa=${rolesCandidate[0].fixed_lpa}&phoneNumber=${rolesCandidate[0].phone_number}&topAttributes=${top5AttributesString}&quotientScores=${quotientScoresString}`;

    // console.log(website_url);

    await page.goto(website_url, { waitUntil: 'networkidle0' });

    await page.emulateMediaType('screen');

    // const pdf = await page.pdf({
    //   path: './reports/result.pdf',
    //   printBackground: true,
    //   landscape: true,
    //   height: 1920,
    //   width: 1070
    // });

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
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};
