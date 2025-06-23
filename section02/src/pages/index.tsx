import { ReactNode } from "react";
import style from "./index.module.css";
import SearchableLayout from "../components/searchable-layout";
import BookItem from "../components/book-item";
import { InferGetServerSidePropsType } from "next";
import fetchBooks from "../lib/fetch-books";
import fetchRandomBooks from "../lib/fetch-random-books";

// SSR로 동작
export const getServerSideProps = async () => {
  // 컴포넌트보다 먼저 실행, 컴포넌트에 필요한 데이터를 불러오는 함수
  // Promise.all: 인수로 전달한 배열 안에 들어있는 모든 비동기 함수들을 동시에 실행
  const [allBooks, recoBooks] = await Promise.all([fetchBooks(), fetchRandomBooks()]);

  return {
    // props라는 프로퍼티가 들어있는 객체를 반환
    props: {
      allBooks,
      recoBooks,
    },
  };
};

export default function Home({
  allBooks,
  recoBooks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // data: getServerSideProps 에서 받아온것
  console.log(allBooks); // => 총 두번 실행됨.(터미널, 브라우저 콘솔에서 한번씩 뜸.)

  return (
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
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
