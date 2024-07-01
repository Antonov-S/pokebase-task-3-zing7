import React from "react";
import { GetServerSidePropsContext } from "next";

type ErrorProps = {
  statusCode: number;
};

const ErrorPage: React.FC<ErrorProps> = ({ statusCode }) => {
  return (
    <div>
      <h1>{statusCode}</h1>
      {statusCode === 404 ? (
        <p>Page not found</p>
      ) : (
        <p>An error occurred on the server</p>
      )}
    </div>
  );
};

export default ErrorPage;

export const getServerSideProps = async ({
  res
}: GetServerSidePropsContext): Promise<{ props: ErrorProps }> => {
  const statusCode = res ? res.statusCode : 404;
  return { props: { statusCode } };
};
