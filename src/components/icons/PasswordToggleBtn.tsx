interface PasswordToggleBtnProps {
  onToggle: (e: React.MouseEvent<HTMLElement>) => void;
  isVisible: boolean;
}

export default function PasswordToggleBtn({ onToggle, isVisible }: PasswordToggleBtnProps) {
  return (
    <div onClick={onToggle} className="cursor-pointer">
      {isVisible ? <ShowPasswordIcon /> : <HidePasswordIcon />}
    </div>
  );
}

function ShowPasswordIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.0023 11.577C12.1355 11.577 13.0979 11.1804 13.8896 10.3872C14.6812 9.59408 15.0771 8.63092 15.0771 7.49775C15.0771 6.36458 14.6805 5.40217 13.8873 4.6105C13.0942 3.81883 12.131 3.423 10.9978 3.423C9.86466 3.423 8.90224 3.81958 8.11058 4.61275C7.31891 5.40592 6.92307 6.36908 6.92307 7.50225C6.92307 8.63542 7.31966 9.59783 8.11282 10.3895C8.90599 11.1812 9.86916 11.577 11.0023 11.577ZM11.0001 10.2C10.2501 10.2 9.61257 9.9375 9.08757 9.4125C8.56257 8.8875 8.30007 8.25 8.30007 7.5C8.30007 6.75 8.56257 6.1125 9.08757 5.5875C9.61257 5.0625 10.2501 4.8 11.0001 4.8C11.7501 4.8 12.3876 5.0625 12.9126 5.5875C13.4376 6.1125 13.7001 6.75 13.7001 7.5C13.7001 8.25 13.4376 8.8875 12.9126 9.4125C12.3876 9.9375 11.7501 10.2 11.0001 10.2ZM11.0013 14.5C8.70182 14.5 6.60657 13.8657 4.71557 12.597C2.82457 11.3285 1.43224 9.6295 0.538574 7.5C1.43224 5.3705 2.82407 3.6715 4.71407 2.403C6.60424 1.13433 8.69916 0.5 10.9988 0.5C13.2983 0.5 15.3936 1.13433 17.2846 2.403C19.1756 3.6715 20.5679 5.3705 21.4616 7.5C20.5679 9.6295 19.1761 11.3285 17.2861 12.597C15.3959 13.8657 13.301 14.5 11.0013 14.5ZM11.0001 13C12.8834 13 14.6126 12.5042 16.1876 11.5125C17.7626 10.5208 18.9667 9.18333 19.8001 7.5C18.9667 5.81667 17.7626 4.47917 16.1876 3.4875C14.6126 2.49583 12.8834 2 11.0001 2C9.11674 2 7.38757 2.49583 5.81257 3.4875C4.23757 4.47917 3.03341 5.81667 2.20007 7.5C3.03341 9.18333 4.23757 10.5208 5.81257 11.5125C7.38757 12.5042 9.11674 13 11.0001 13Z"
        fill="#858588"
      />
    </svg>
  );
}

function HidePasswordIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.7731 9.97306L13.6501 8.85006C13.8001 8.0219 13.5638 7.27731 12.9413 6.61631C12.319 5.95548 11.5552 5.70006 10.6501 5.85006L9.52707 4.72706C9.75274 4.62573 9.98416 4.54973 10.2213 4.49906C10.4585 4.4484 10.7181 4.42306 11.0001 4.42306C12.1347 4.42306 13.0979 4.8189 13.8896 5.61056C14.6812 6.40223 15.0771 7.3654 15.0771 8.50006C15.0771 8.78206 15.0517 9.0449 15.0011 9.28856C14.9504 9.53206 14.8744 9.76023 14.7731 9.97306ZM17.9538 13.0846L16.8501 12.0501C17.4834 11.5667 18.0459 11.0376 18.5376 10.4626C19.0292 9.88756 19.4501 9.2334 19.8001 8.50006C18.9667 6.81673 17.7709 5.47923 16.2126 4.48756C14.6542 3.4959 12.9167 3.00006 11.0001 3.00006C10.5167 3.00006 10.0417 3.0334 9.57508 3.10006C9.10841 3.16673 8.65007 3.26673 8.20007 3.40006L7.03482 2.23481C7.66682 1.98348 8.31233 1.79823 8.97132 1.67906C9.63033 1.55973 10.3066 1.50006 11.0001 1.50006C13.3436 1.50006 15.457 2.14623 17.3403 3.43856C19.2237 4.7309 20.5974 6.41806 21.4616 8.50006C21.0911 9.39356 20.6126 10.2276 20.0261 11.0021C19.4394 11.7764 18.7487 12.4706 17.9538 13.0846ZM18.7616 18.8693L14.7156 14.8538C14.2027 15.0436 13.6344 15.1988 13.0106 15.3193C12.3869 15.4398 11.7167 15.5001 11.0001 15.5001C8.65007 15.5001 6.53666 14.8539 4.65982 13.5616C2.78282 12.2692 1.40907 10.5821 0.538574 8.50006C0.907741 7.61673 1.38466 6.79273 1.96932 6.02806C2.55399 5.26323 3.19757 4.60006 3.90007 4.03856L1.13082 1.23856L2.18482 0.184814L19.8153 17.8153L18.7616 18.8693ZM4.95407 5.09231C4.42574 5.51281 3.91191 6.01831 3.41257 6.60881C2.91324 7.19915 2.50907 7.82956 2.20007 8.50006C3.03341 10.1834 4.22924 11.5209 5.78757 12.5126C7.34591 13.5042 9.08341 14.0001 11.0001 14.0001C11.4552 14.0001 11.9085 13.9616 12.3598 13.8846C12.811 13.8077 13.1937 13.7283 13.5078 13.6463L12.2423 12.3501C12.0718 12.4192 11.8744 12.4743 11.6501 12.5153C11.4257 12.5565 11.2091 12.5771 11.0001 12.5771C9.86541 12.5771 8.90224 12.1812 8.11058 11.3896C7.31891 10.5979 6.92307 9.63473 6.92307 8.50006C6.92307 8.29756 6.94366 8.08573 6.98483 7.86456C7.02583 7.6434 7.08091 7.44115 7.15007 7.25781L4.95407 5.09231Z"
        fill="#858588"
      />
    </svg>
  );
}
