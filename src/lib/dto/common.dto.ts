type ApiResponseProps = {
  data?: any;
  message: string;
};

export const apiResponse = ({ data = null, message }: ApiResponseProps) => {
  return {
    message,
    data,
  };
};
