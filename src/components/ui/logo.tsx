import Image from "next/image";

interface LogoProps {
  /** Size of the logo icon in pixels. Default: 28 */
  size?: number;
  /** Whether to show the wordmark next to the icon. Default: true */
  showName?: boolean;
  /** Extra className for the wrapper */
  className?: string;
}

export function Logo({ size = 28, showName = true, className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Image
        src="/logo.png"
        alt="EcoLoop logo"
        width={size}
        height={size}
        className="object-contain"
        priority
      />
      {showName && (
        <span
          style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
          className="font-semibold tracking-tight text-text-primary"
        >
          EcoLoop
        </span>
      )}
    </span>
  );
}
