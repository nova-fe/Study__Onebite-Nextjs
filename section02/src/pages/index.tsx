import { ReactNode } from "react";
import style from "./index.module.css";
import SearchableLayout from "../components/searchable-layout";
import BookItem from "../components/book-item";
import { InferGetStaticPropsType } from "next";
import fetchBooks from "../lib/fetch-books";
import fetchRandomBooks from "../lib/fetch-random-books";
import Head from "next/head";

// SSR로 동작 (컴포넌트보다 먼저 실행, 컴포넌트에 필요한 데이터를 불러오는 함수)
// export const getServerSideProps = async () => {

// SSG로 동작 (빌드 타임에 딱 한 번만 생성)
export const getStaticProps = async () => {
  // Promise.all: 인수로 전달한 배열 안에 들어있는 모든 비동기 함수들을 동시에 실행
  const [allBooks, recoBooks] = await Promise.all([fetchBooks(), fetchRandomBooks()]);

  return {
    // props라는 프로퍼티가 들어있는 객체를 반환
    props: {
      allBooks,
      recoBooks,
    },
    // revalidate: 3, // 단위: 초 => 3초 주기로 재검증
  };
};

export default function Home({
  allBooks,
  recoBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>한입북스</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스" />
        <meta property="og:description" content="한입 북스에 등록된 도서들을 만나보세요" />
      </Head>
      <div className={style.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          {recoBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          {allBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
      </div>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
