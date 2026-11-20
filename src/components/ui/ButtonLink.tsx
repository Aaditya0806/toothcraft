import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "gold" | "outline" | "outline-light" | "light";

const variantClass: Record<Variant, string> = {
  primary: "",
  gold: "btn-gold",
  outline: "btn-outline",
  "outline-light": "btn-outline-light",
  light: "btn-light",
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "sm";
  /** Show the trailing arrow (default) or supply your own leading icon. */
  arrow?: boolean;
  icon?: ReactNode;
  className?: string;
  /** Open in a new tab (used for WhatsApp and maps). */
  external?: boolean;
  ariaLabel?: string;
};

/** Pill button rendered as a link. Internal routes use next/link; tel:, mailto: and external URLs use <a>. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = true,
  icon,
  className,
  external = false,
  ariaLabel,
}: ButtonLinkProps) {
  const classes = cn("btn", variantClass[variant], size === "sm" && "btn-sm", className);
  const content = (
    <>
      {icon}
      <span>{children}</span>
      {arrow ? <ArrowUpRight aria-hidden className="btn-icon size-4" strokeWidth={1.75} /> : null}
    </>
  );

  const isInternal = href.startsWith("/") || href.startsWith("#");
  if (isInternal && !external) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={classes}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  );
}

type TextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  /** When the link sits inside a `.group` card, let the card hover drive the underline. */
  groupHover?: boolean;
};

/** Small-caps text link with an animated underline and arrow. */
export function TextLink({ href, children, className, external = false, groupHover = false }: TextLinkProps) {
  const classes = cn("link-line", groupHover && "group-line", className);
  const content = (
    <>
      <span>{children}</span>
      <ArrowUpRight aria-hidden className="link-icon size-4" strokeWidth={1.75} />
    </>
  );
  if (href.startsWith("/") && !external) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {content}
    </a>
  );
}

/** The same visual as TextLink, for use inside a parent that is already a link. */
export function TextLinkLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("link-line group-line", className)}>
      <span>{children}</span>
      <ArrowUpRight aria-hidden className="link-icon size-4" strokeWidth={1.75} />
    </span>
  );
}
