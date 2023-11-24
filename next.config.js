/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ['deck-automation-profile-pictures-storage.s3.ap-south-1.amazonaws.com', 'demo-images-bucket-stream-helper.s3.ap-south-1.amazonaws.com']
    domains: ['deck-automation-profile-pictures-bucket.s3.ap-south-1.amazonaws.com']
  },
  distDir: 'build'
}

module.exports = nextConfig
