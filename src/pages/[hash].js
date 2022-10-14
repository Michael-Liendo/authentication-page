import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function CommentPage() {
  const router = useRouter();
  const hash = router.query.hash;

  useEffect(() => {
    async function getUrl(hash) {
      if (!hash) return;
      console.log(hash);
      const request = await fetch(`/api/hash/${hash}`);
      const response = await request.json();
      if (response?.status === 'error') {
        router.push('/');
      } else {
        router.push(response.original_url);
      }
    }
    getUrl(hash);
  }, [hash, router]);

  return (
    <>
      <h1>You are redirect to page</h1>
    </>
  );
}
