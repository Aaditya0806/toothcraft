import type { SVGProps } from "react";

/* Brand glyphs are drawn inline because the icon set no longer ships brand marks. */

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-7.5h2.53l.38-2.94H13.5V8.69c0-.85.24-1.43 1.46-1.43h1.56V4.63A20.9 20.9 0 0 0 14.25 4.5c-2.25 0-3.79 1.37-3.79 3.9v2.16H7.9v2.94h2.56V21h3.04Z" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.9" />
      <circle cx="17.1" cy="6.9" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.53 3.5h3.02l-6.6 7.55 7.77 9.45h-6.08l-4.76-5.73-5.45 5.73H2.4l7.06-8.07L2 3.5h6.23l4.3 5.24L17.53 3.5Zm-1.06 15.2h1.67L7.6 5.22H5.8L16.47 18.7Z" />
    </svg>
  );
}

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.04 2.5a9.42 9.42 0 0 0-8.1 14.24L2.5 21.5l4.9-1.4a9.42 9.42 0 1 0 4.64-17.6Zm0 1.7a7.72 7.72 0 1 1-3.93 14.37l-.3-.18-2.86.82.84-2.78-.2-.31A7.72 7.72 0 0 1 12.04 4.2Zm-3.3 3.9c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.23.9 2.42 1.03 2.59.12.17 1.74 2.78 4.3 3.79 2.12.84 2.55.67 3.01.63.46-.04 1.48-.6 1.69-1.19.21-.58.21-1.08.15-1.19-.06-.1-.23-.17-.48-.29-.25-.13-1.48-.73-1.71-.82-.23-.08-.4-.12-.56.13-.17.25-.65.81-.8.98-.14.17-.29.19-.54.06-.25-.12-1.06-.39-2.02-1.24-.75-.66-1.25-1.48-1.4-1.73-.14-.25-.01-.39.11-.51.11-.11.25-.29.38-.44.12-.14.16-.25.25-.41.08-.17.04-.32-.02-.44-.06-.13-.55-1.36-.77-1.86-.2-.47-.4-.41-.56-.42l-.51-.01Z" />
    </svg>
  );
}
