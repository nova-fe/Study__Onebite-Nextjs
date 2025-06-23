// CSS Module
import { ReactNode, useEffect } from "react";
import style from "./index.module.css";
import SearchableLayout from "../components/searchable-layout";
import books from "@/mock/books.json";
import BookItem from "../components/book-item";
import { InferGetServerSidePropsType } from "next";

// SSR
export const getServerSideProps = () => {
  // 컴포넌트보다 먼저 실행, 컴포넌트에 필요한 데이터를 불러오는 함수
  console.log("서버사이드 프롭스예요..."); // => 서버 환경에서만 실행됨. 브라우저 콘솔에선 뜨지 않음. 터미널에선 뜸
  const data = "hello";

  return {
    // props라는 프로퍼티가 들어있는 객체를 반환
    props: {
      data,
    },
  };
};

export default function Home({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // data: getServerSideProps 에서 받아온것
  console.log(data); // => 총 두번 실행됨.(터미널, 브라우저 콘솔에서 한번씩 뜸.)

  // 브라우저측에서만 실행되는 코드를 작성하고 싶다면 useEffect 사용해서 마운트 시점 이후 되도록...
  useEffect(() => {
    console.log(window);
  }, []);

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
