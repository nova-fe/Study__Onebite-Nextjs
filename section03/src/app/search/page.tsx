export default async function Page({ searchParams }: { searchParams: Promise<{ q: string }> }) {
  // console.log(await searchParams.q); // http://localhost:3000/search?q=123 로 접속시 /search?q=123
  const { q } = await searchParams;

  return <div>Search 페이지 : {q}</div>;
}
