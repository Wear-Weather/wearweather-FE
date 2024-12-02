export default function ShowIcon({ fill = 'rgb(var(--color-label-600))' }: { fill: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.0023 11.577C12.1355 11.577 13.0979 11.1804 13.8896 10.3872C14.6812 9.59408 15.0771 8.63092 15.0771 7.49775C15.0771 6.36458 14.6805 5.40217 13.8873 4.6105C13.0942 3.81883 12.131 3.423 10.9978 3.423C9.86466 3.423 8.90224 3.81958 8.11058 4.61275C7.31891 5.40592 6.92307 6.36908 6.92307 7.50225C6.92307 8.63542 7.31966 9.59783 8.11282 10.3895C8.90599 11.1812 9.86916 11.577 11.0023 11.577ZM11.0001 10.2C10.2501 10.2 9.61257 9.9375 9.08757 9.4125C8.56257 8.8875 8.30007 8.25 8.30007 7.5C8.30007 6.75 8.56257 6.1125 9.08757 5.5875C9.61257 5.0625 10.2501 4.8 11.0001 4.8C11.7501 4.8 12.3876 5.0625 12.9126 5.5875C13.4376 6.1125 13.7001 6.75 13.7001 7.5C13.7001 8.25 13.4376 8.8875 12.9126 9.4125C12.3876 9.9375 11.7501 10.2 11.0001 10.2ZM11.0013 14.5C8.70182 14.5 6.60657 13.8657 4.71557 12.597C2.82457 11.3285 1.43224 9.6295 0.538574 7.5C1.43224 5.3705 2.82407 3.6715 4.71407 2.403C6.60424 1.13433 8.69916 0.5 10.9988 0.5C13.2983 0.5 15.3936 1.13433 17.2846 2.403C19.1756 3.6715 20.5679 5.3705 21.4616 7.5C20.5679 9.6295 19.1761 11.3285 17.2861 12.597C15.3959 13.8657 13.301 14.5 11.0013 14.5ZM11.0001 13C12.8834 13 14.6126 12.5042 16.1876 11.5125C17.7626 10.5208 18.9667 9.18333 19.8001 7.5C18.9667 5.81667 17.7626 4.47917 16.1876 3.4875C14.6126 2.49583 12.8834 2 11.0001 2C9.11674 2 7.38757 2.49583 5.81257 3.4875C4.23757 4.47917 3.03341 5.81667 2.20007 7.5C3.03341 9.18333 4.23757 10.5208 5.81257 11.5125C7.38757 12.5042 9.11674 13 11.0001 13Z"
        fill={fill}
      />
    </svg>
  );
}
