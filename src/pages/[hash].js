import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function CommentPage() {
  const router = useRouter();
  const hash = router.query.hash;

  useEffect(() => {
    router.push(`/api/${hash}`);
  }, [hash, router]);

  return (
    <>
      <h1>You are redirect to page</h1>
    </>
  );
}
