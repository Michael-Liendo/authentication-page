import { useRouter } from 'next/router';

export default function CommentPage() {
  const router = useRouter();
  const hash = router.query.hash;

  try {
    router.push(`/api/${hash}`);
  } catch (error) {
    console.log('No Found');
  }

  return (
    <>
      <h1>You are redirect to page</h1>
    </>
  );
}
