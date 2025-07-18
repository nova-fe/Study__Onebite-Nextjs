import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fetchOneBook from "../../lib/fetch-one-book";
import { useRouter } from "next/router";
import Head from "next/head";

export const getStaticPaths = () => {
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }, { params: { id: "3" } }],
    fallback: true,
    // false: 404 Notfound (path에 설정하지 않은 경로는 모두 404)
    // blocking: SSR 방식으로 실시간으로 페이지 생성(사전렌더링)
    // true: SSR 방식 + fallback 상태의 페이지(Props 데이터가 없는 상태의 페이지)부터 생성해 보내줌
  };
};

// SSG로 동작
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));

  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      book,
    },
  };
};

export default function Page({ book }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (router.isFallback)
    return (
      <>
        <Head>
          <title>한입북스</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="한입북스" />
          <meta property="og:description" content="한입 북스에 등록된 도서들을 만나보세요" />
        </Head>
        <div>로딩중입니다.</div>
      </>
    );
  if (!book) return "문제가 발생했습니다 다시 시도하세요";
  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <>
      <Head>
        <title>한입북스 - {title}</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={`한입북스 - ${title}`} />
        <meta property="og:description" content={description} />
      </Head>
      <div className={style.container}>
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
      </div>
    </>
  );
}
