import { notFound } from "next/navigation";
import style from "./page.module.css";

// export const dynamicParams = false;  // => false 로 하면 generateStaticParams 을 통해 내보내진 페이지 외에는 404 처리

// generateStaticParams: 어떤 URL 파라미터가 빌드 타임에 존재할 수 있는지 직접 설정
// 주의점 1) 파라미터 값 명시는 '문자열'로만 명시
// 2) 데이터 캐싱이 설정되지 않은 데이터 패칭이 존재해도 스태틱 페이지로서 강제로 설정됨
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`);

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다.</div>;
  }
  const book = await response.json();

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

function ReviewEditor() {
  async function createReviewAction(formData: FormData) {
    "use server";
    // console.log(formData);
    const content = formData.get("content")?.toString(); // 값이 있을 경우 문자열 타입으로 변환(toString())
    const author = formData.get("author")?.toString();
    console.log(content, author);
    //18:-0
  }

  return (
    <section>
      <form action={createReviewAction}>
        <input name="content" placeholder="리뷰 내용" />
        <input name="author" placeholder="작성자" />
        <button type="submit">작성하기</button>
      </form>
    </section>
  );
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className={style.container}>
      <BookDetail bookId={id} />
      <ReviewEditor />
    </div>
  );
}
