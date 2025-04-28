interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-500 text-white mt-5 h-auto rounded-xs p-5">
      {message}
    </div>
  );
};

export default ErrorMessage;
