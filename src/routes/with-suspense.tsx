import { Suspense } from 'react';
import FallbackLoader from '../components/core-ui/fallback-loader/FallbackLoader';

interface IProps {
  children: React.ReactNode;
}

function WithSuspense({ children }: IProps) {
  return <Suspense fallback={<FallbackLoader />}>{children}</Suspense>;
}

export default WithSuspense;
