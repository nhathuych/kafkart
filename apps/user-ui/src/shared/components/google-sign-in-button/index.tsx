import React from 'react';

interface GoogleSignInButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center gap-3 
        w-full px-6 py-3 
        border border-gray-300 
        rounded-lg 
        bg-white text-gray-700 
        font-medium text-sm 
        hover:shadow-md hover:bg-gray-50 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        transition-all duration-200
        ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
      `}
      style={{ fontFamily: 'Roboto, sans-serif' }}
    >
      {/* Google SVG Icon */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M22.5005 12.2332C22.5005 11.3666 22.4294 10.5332 22.297 9.73315H12.0005V14.4332H17.405C17.1418 15.8666 16.2891 17.0666 15.0387 17.8166V20.3332H18.608C20.7141 18.4332 22.5005 15.6005 22.5005 12.2332Z"
          fill="#4285F4"
        />
        <path
          d="M12.0005 22.9999C14.691 22.9999 16.9246 22.0333 18.608 20.3333L15.0387 17.8166C14.0328 18.4666 12.7382 18.8666 12.0005 18.8666C9.38705 18.8666 7.17455 17.1333 6.29705 14.7999H2.62305V17.3999C4.29555 20.6999 7.79305 22.9999 12.0005 22.9999Z"
          fill="#34A853"
        />
        <path
          d="M6.297 14.8C6.05625 14.15 5.924 13.45 5.924 12.7333C5.924 12.0167 6.05625 11.3167 6.297 10.6667V8.06665H2.623C1.88625 9.63332 1.5 11.3667 1.5 12.7333C1.5 14.1 1.88625 15.8333 2.623 17.4L6.297 14.8Z"
          fill="#FBBC05"
        />
        <path
          d="M12.0005 6.59998C13.4268 6.59998 14.7391 7.09998 15.7609 7.99998L18.6523 5.09998C16.9191 3.49998 14.6855 2.46665 12.0005 2.46665C7.79305 2.46665 4.29555 4.76665 2.62305 8.06665L6.29705 10.6667C7.17455 8.33332 9.38705 6.59998 12.0005 6.59998Z"
          fill="#EA4335"
        />
      </svg>

      <span>Sign in with Google</span>
    </button>
  );
};

export default GoogleSignInButton;
