import React from 'react';

interface IconProps {
  fill: string;
}

const HangerIcon: React.FC<IconProps> = ({ fill }) => {
  return (
    <svg width="25" height="24" viewBox="0 0 25 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path d="M3.5 20C3.21667 20 2.97917 19.9042 2.7875 19.7125C2.59583 19.5208 2.5 19.2833 2.5 19C2.5 18.8333 2.53333 18.6792 2.6 18.5375C2.66667 18.3958 2.76667 18.2833 2.9 18.2L11.5 11.75V10.85C11.5 10.0973 11.7086 9.5 12.5 9.5C13.2578 9.5 13.4914 9.21584 13.7517 8.86093C14.012 8.50602 14 7.89167 14 7.475C14 7.05833 13.8542 6.70833 13.5625 6.425C13.2708 6.14167 12.9167 6 12.5 6C12.0833 6 11.7292 6.14583 11.4375 6.4375C11.1458 6.72917 11 7.08333 11 7.5H9C9 6.53333 9.34167 5.70833 10.025 5.025C10.7083 4.34167 11.5333 4 12.5 4C13.4667 4 14.2917 4.3375 14.975 5.0125C15.6583 5.6875 16 6.50833 16 7.475C16 8.25833 15.7708 8.95833 15.3125 9.575C14.8542 10.1917 14.25 10.6167 13.5 10.85V11.75L22.1 18.2C22.2333 18.2833 22.3333 18.3958 22.4 18.5375C22.4667 18.6792 22.5 18.8333 22.5 19C22.5 19.2833 22.4042 19.5208 22.2125 19.7125C22.0208 19.9042 21.7833 20 21.5 20H3.5ZM6.5 18H18.5L12.5 13.5L6.5 18Z" />
    </svg>
  );
};

export default HangerIcon;