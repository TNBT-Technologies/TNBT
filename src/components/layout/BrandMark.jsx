import { asset } from "../../lib/asset";

export default function BrandMark({ className = "", compact = false }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img src={asset("tnbt-mark.svg")} alt="" width="34" height="34" className="h-[34px] w-[34px] shrink-0" />
      <span className="font-display text-[17px] font-semibold leading-none tracking-[-0.02em] text-fog">
        TNBT
        {!compact && <span className="ml-1.5 font-normal text-mist">Technologies</span>}
      </span>
    </span>
  );
}
