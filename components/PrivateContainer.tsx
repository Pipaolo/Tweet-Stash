import { Session } from 'next-auth';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';

interface IProps {
  children?: React.ReactNode;
}
export const PrivateContainer = (props: IProps) => {
  const [session, isLoading] = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect the user to the unauthorized page
    if (!isLoading && !session) {
      console.log('Unauthorized! Redirecting!');
      router.replace('/unauthorized');
    }
  }, [session, isLoading, router]);

  const renderLoading = () => {
    if (isLoading) {
      return <div>Loading</div>;
    }

    if (
      !isLoading &&
      (!session || Object.keys(session as Session).length === 0)
    ) {
      return null;
    }

    return <>{props.children}</>;
  };

  return <>{renderLoading()}</>;
};
