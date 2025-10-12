import withPWA from "next-pwa";

const withPWAFunc = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: false,
};

export default withPWAFunc(nextConfig);
