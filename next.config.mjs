/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static export for deployment
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}
export default nextConfig