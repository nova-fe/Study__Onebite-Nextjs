import BookPage from "@/app/book/[id]/page";
import Modal from "../../../components/modal";

export default function Page(props: any) {
  return (
    <div>
      클라이언트 사이드 렌더링 가로채기 성공!
      <Modal>
        <BookPage {...props} />
      </Modal>
    </div>
  );
}
