"use server";

import { revalidateTag } from "next/cache";

export async function createReviewAction(_: unknown, formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString(); // 값이 있을 경우 문자열 타입으로 변환(toString())
  const author = formData.get("author")?.toString();

  if (!bookId || !content || !author) {
    return {
      status: false,
      error: "리뷰 내용과 작성자를 입력해주세요",
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`, {
      method: "POST",
      body: JSON.stringify({ bookId, content, author }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // revalidatePath() : 재검증 요청
    // 1. 특정 주소의 해당하는 페이지만 재검증
    // revalidatePath(`/book/${bookId}`);
    // 2. 특정 경로의 모든 동적 페이지를 재검증
    // revalidatePath(`/book/[id]`, "page");
    // 3. 특정 레이아웃을 갖는 모든 페이지 재검증
    // revalidatePath("/(with-searchbar)", "layout");
    // 4. 모든 데이터 재검증
    // revalidatePath("/", "layout");
    // 5. 태그 기준, 데이터 캐시 재검증(가장 효율적)
    revalidateTag(`review-${bookId}`);

    return {
      status: true,
      error: "",
    };
  } catch (err) {
    return {
      status: false,
      error: `리뷰 저장에 실패했습니다 : ${err}`,
    };
  }
}
