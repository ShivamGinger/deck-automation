import { NextRequest, NextResponse } from "next/server";

import { PutObjectCommand, S3Client, S3ClientConfig } from "@aws-sdk/client-s3";
import { randomBytes } from "crypto";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3ClientConfig: S3ClientConfig = {
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY!
  },
};

const awsS3Client = new S3Client(s3ClientConfig);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const profilePicture = formData.get('profile-pic');
    const candidateName = formData.get('candidate-name');

    if (!profilePicture) {
      return NextResponse.json({ error: 'Profile Picture is required' }, { status: 400 });
    }

    if (!candidateName || typeof candidateName !== 'string') {
      return NextResponse.json({ error: 'Candidate Name is required and must be a string' }, { status: 400 });
    }

    const rawBytes = randomBytes(8);
    const random = rawBytes.toString('hex');

    const params = {
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
      Key: `profile-pic-for-${candidateName}-${random}-${Date.now()}`,
    };

    const command = new PutObjectCommand(params);

    const url = await getSignedUrl(awsS3Client, command, { expiresIn: 60 });

    await fetch(url, {
      method: 'PUT',
      body: profilePicture
    });

    const imageUrl = url.split('?')[0];

    return NextResponse.json({ imageUrl }, { status: 200 });
  } catch (err) {
    console.log(err);

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
