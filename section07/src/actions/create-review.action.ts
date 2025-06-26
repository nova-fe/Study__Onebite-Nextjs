"use server";
export async function createReviewAction(formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString(); // 값이 있을 경우 문자열 타입으로 변환(toString())
  const author = formData.get("author")?.toString();

  if (!bookId || !content || !author) return;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`, {
      method: "POST",
      body: JSON.stringify({ bookId, content, author }),
    });
    console.log(response.status);
  } catch (err) {
    console.error(err);
    return;
  }
}
