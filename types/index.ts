import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type formDataT =
  | {
      productId?: string | number;
      productTitle?: string;
    }
  | undefined;
