/** @type {import('next').NextConfig} */

// Configuration options for Next.js
const nextConfig = {};

// Configuration object for next-pwa plugin
import pwa from "next-pwa";

// Export the combined configuration for Next.js with PWA support
const withPWA = pwa({
  dest: 'public'
})

export default withPWA(nextConfig);

