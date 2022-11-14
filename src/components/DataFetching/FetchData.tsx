import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useHttp from '../../hooks/use-http';
import { abortRequestSafe } from '../../controllers/index';
import Spinner from '../UI/Spinner';
import ErrorUI from '../UI/Error';
import Page404 from '../../pages/Page404';

type Props = {
  urls: string[];
  handleData: (data: any) => void;
  children: React.ReactNode;
  containerClass?: string;
  dependencies?: any[];
};

const FetchData = ({
  urls,
  handleData,
  children,
  containerClass,
  dependencies = [],
}: Props) => {
  const [numOfFetchReattempts, setNumOfFetchesReattempts] = useState(1);
  const [abortSignalKeys, setAbortSignalKeys] = useState<string[]>(
    urls.map(_ => uuidv4())
  );

  const { isLoading, error, sendRequest } = useHttp();

  const handleFetchReattempt = () => {
    setNumOfFetchesReattempts(prev => prev + 1);
  };

  useEffect(() => {
    sendRequest(
      {
        urls,
        signalKeys: abortSignalKeys,
      },
      handleData
    );

    return () => abortRequestSafe(abortSignalKeys);
  }, [sendRequest, numOfFetchReattempts, ...dependencies]);

  return (
    <div className={containerClass}>
      {children}
      {isLoading && <Spinner />}
      {!isLoading && error === '404' && <Page404 />}
      {!isLoading && error && error !== '404' && (
        <ErrorUI onButtonClick={handleFetchReattempt} />
      )}
    </div>
  );
};

export default FetchData;
