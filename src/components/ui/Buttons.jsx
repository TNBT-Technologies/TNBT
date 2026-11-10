import { ArrowUpRight } from "lucide-react";
import Magnetic from "./Magnetic";

/** Arrow that exits top-right and is replaced by its twin on hover. */
export function ArrowSwap({ className = "" }) {
  return (
    <span className={`arrow-swap ${className}`} aria-hidden="true">
      <ArrowUpRight strokeWidth={2} />
      <ArrowUpRight strokeWidth={2} />
    </span>
  );
}

/** Pill CTA rendered as a link. `variant`: "primary" | "ghost". */
export function ButtonLink({ href, children, variant = "primary", size, magnetic = true, className = "", ...rest }) {
  const link = (
    <a href={href} className={`btn btn-${variant} ${size === "sm" ? "btn-sm" : ""} ${className}`} {...rest}>
      {children}
      <ArrowSwap />
    </a>
  );
  return magnetic ? <Magnetic>{link}</Magnetic> : link;
}
