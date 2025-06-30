import BookItem from "@/components/book-item";
import { BookData } from "../../../types";
import { delay } from "../../../util/delay";
import { Suspense } from "react";
import BookListSkeleton from "../../../components/skeleton/book-list-skeleton";
import { Metadata } from "next";

async function SearchResult({ q }: { q: string }) {
  await delay(1500);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`, {
    cache: "force-cache",
  });
  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

// 동적인 메타 태그 설정시 generateMetadata 라는 약속된 함수 사용
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  // 현재 페이지 메타 데이터를 동적으로 생성하는 역할을 함(페이지 컴퍼넌트가 전달받는 페이지의 props를 전달 받을 수 있음)
  const { q } = await searchParams;
  return {
    title: `${q} : 한입 북스 검색`,
    description: `${q}에 대한 검색 결과입니다.`,
    openGraph: {
      title: `${q} : 한입 북스 검색`,
      description: `${q}에 대한 검색 결과입니다.`,
      images: ["/thumbnail.png"],
    },
  };
}

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;

  return (
    <Suspense key={q || ""} fallback={<BookListSkeleton count={3} />}>
      <SearchResult q={q || ""} />
    </Suspense>
  );
}
