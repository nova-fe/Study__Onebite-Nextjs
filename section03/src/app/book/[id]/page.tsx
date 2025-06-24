export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  console.log(id); // http://localhost:3000/book/123 로 접속시 123

  return <div>book/[id] {id} 페이지</div>;
}
