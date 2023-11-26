/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['deck-automation-profile-pictures-bucket.s3.ap-south-1.amazonaws.com']
  },
  distDir: 'build'
}

module.exports = nextConfig
