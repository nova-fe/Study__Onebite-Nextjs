import { useRouter } from "next/router";
import { ReactNode } from "react";
import SearchableLayout from "../../components/searchable-layout";

export default function Page() {
  const router = useRouter();
  // /search?q=Nova 로 접속한 경우
  const { q } = router.query;
  console.log(q); // Nova
  return <h1>{q}</h1>;
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
