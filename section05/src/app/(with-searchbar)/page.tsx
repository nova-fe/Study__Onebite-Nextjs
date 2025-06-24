import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "../../types";

async function AllBooks() {
  // { cache: "no-store" } : 기본값(캐싱을 하지 않음)
  // { cache: "force-cache" } : 무조건 캐싱, 한번 호출 이후 다시 호출 X
  // { next: { revalidate: 3 } } : 3초마다 리빌리데이트
  // { next: { tags: ['a'] } } : 요청이 들어왔을 때 데이터 최신화
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`, {
    cache: "force-cache",
  });
  if (!response.ok) <div>오류가 발생했습니다.</div>;
  const allBooks: BookData[] = await response.json();
  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RecoBooks() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`, {
    next: { revalidate: 3 },
  });
  if (!response.ok) <div>오류가 발생했습니다.</div>;
  const recoBooks: BookData[] = await response.json();
  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <RecoBooks />
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <AllBooks />
      </section>
    </div>
  );
}
