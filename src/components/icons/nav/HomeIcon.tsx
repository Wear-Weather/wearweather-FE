interface IconProps {
  fill: string;
}

export default function HomeIcon({ fill }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 25 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path d="M6.5 19H9.5V13H15.5V19H18.5V10L12.5 5.5L6.5 10V19ZM4.5 21V9L12.5 3L20.5 9V21H13.5V15H11.5V21H4.5Z" />
    </svg>
  );
}
