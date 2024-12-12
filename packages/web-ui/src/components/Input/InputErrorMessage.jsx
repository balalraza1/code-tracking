import PropTypes from 'prop-types';
import clsx from 'clsx';

const ErrorMessage = ({ error }) => {
  if (!error) return;

  return (
    <span
      className={clsx([
        '[&>svg]:mt-[-1px]',
        'flex',
        'space-x-[6.33px]',
        'pt-[5px]',
        'text-[13px]',
        'text-darkMode-red'
      ])}
    >
      <p className="text-p3">{error}</p>
    </span>
  );
};

ErrorMessage.defaultProps = {
  error: null
};

ErrorMessage.propTypes = {
  error: PropTypes.string
};

export default ErrorMessage;
