import Link from 'next/link';
import RegisterPageUIWithRoles from './register/page';
export default function Home() {
  return (
    <>
     <Link href="/register"> Go to register Page</Link>
    </>
  );
}
