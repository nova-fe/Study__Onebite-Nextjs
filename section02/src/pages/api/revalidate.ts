import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await res.revalidate("/"); // 인수: revalidate 하려는 페이지 경로
    return res.json({ revalidate: true });
  } catch (error) {
    console.error(error);
    // 실패했을 경우 status를 500으로 설정 후 응답
    res.status(500).send("Revalidation Failed");
  }
}
