import { notFound } from "next/navigation";
import style from "./page.module.css";
import { BookData, ReviewData } from "../../../types";
import ReviewItem from "../../../components/review-item";
import ReviewEditor from "../../../components/review-editor";
import Image from "next/image";

// export const dynamicParams = false;  // => false 로 하면 generateStaticParams 을 통해 내보내진 페이지 외에는 404 처리

// generateStaticParams: 어떤 URL 파라미터가 빌드 타임에 존재할 수 있는지 직접 설정
// 주의점 1) 파라미터 값 명시는 '문자열'로만 명시
// 2) 데이터 캐싱이 설정되지 않은 데이터 패칭이 존재해도 스태틱 페이지로서 강제로 설정됨
export async function generateStaticParams() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`);
  if (!response.ok) {
    throw new Error("책 목록을 가져오는 데 실패했습니다.");
  }

  const books: BookData[] = await response.json();

  // return [{ id: "1" }, { id: "2" }, { id: "3" }];
  return books.map((book) => ({
    id: book.id.toString(),
  }));
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
        <Image src={coverImgUrl} width={240} height={300} alt={`도서 ${title}의 표지 이미지`} />
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

async function ReviewList({ bookId }: { bookId: string }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`, {
    next: { tags: [`review-${bookId}`] },
  });
  if (!response.ok) {
    throw new Error(`Review fetch failed : ${response.statusText}`);
  }
  const reviews: ReviewData[] = await response.json();

  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const book: BookData = await response.json();
  return {
    title: `${book.title} - 한입 북스`,
    description: `${book.description}`,
    openGraph: {
      title: `${book.title} - 한입 북스`,
      description: `${book.description}`,
      images: [book.coverImgUrl],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className={style.container}>
      <BookDetail bookId={id} />
      <ReviewEditor bookId={id} />
      <ReviewList bookId={id} />
    </div>
  );
}
