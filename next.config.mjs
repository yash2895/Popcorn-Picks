/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    remotePatterns:[
      {
hostname:"m.media-amazon.com",
      },
    ]
  }
};

export default nextConfig;
