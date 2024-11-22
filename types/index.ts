import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type ApiResponse = {
  success: boolean;
  message: string;
}
