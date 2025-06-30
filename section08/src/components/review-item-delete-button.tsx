"use client";

import { useActionState, useEffect, useRef } from "react";
import { deleteReviewAction } from "../actions/delete-review.action";

export default function ReviewItemDeleteButton({
  reviewId,
  bookId,
}: {
  reviewId: number;
  bookId: number;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(deleteReviewAction, null);

  // 에러 처리
  useEffect(() => {
    // state가 존재하고, 값이 false라면 (요청실패)
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <input name="reviewId" value={reviewId} readOnly hidden />
      <input name="bookId" value={bookId} readOnly hidden />
      {isPending ? (
        <div>...</div>
      ) : (
        <div onClick={() => formRef.current?.requestSubmit()}>삭제하기</div>
      )}
    </form>
  );
}
