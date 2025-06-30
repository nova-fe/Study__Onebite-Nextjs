import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  logging: {
    fetches: {
      fullUrl: true, // 넥스트 앱에서 발생하는 모든 데이터 패칭 로그로 출력
    },
  },
  images: {
    domains: ["shopping-phinf.pstatic.net"],
  },
};

export default nextConfig;
