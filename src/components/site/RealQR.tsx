import { useEffect, useState } from "react";
import QRCode from "qrcode";

interface RealQRProps {
  value: string;
  size?: number;
  className?: string;
  dark?: string;
  light?: string;
}

/**
 * Real, scannable SVG QR code. Encodes any string via the `qrcode` lib.
 */
export function RealQR({
  value,
  size = 168,
  className = "",
  dark = "#0f172a",
  light = "#ffffff",
}: RealQRProps) {
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    QRCode.toString(value, {
      type: "svg",
      margin: 1,
      width: size,
      errorCorrectionLevel: "M",
      color: { dark, light },
    })
      .then((s) => {
        if (mounted) setSvg(s);
      })
      .catch(() => {
        if (mounted) setSvg("");
      });
    return () => {
      mounted = false;
    };
  }, [value, size, dark, light]);

  return (
    <div
      className={className}
      style={{ width: size, height: size }}
      aria-label="Payment QR code"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
