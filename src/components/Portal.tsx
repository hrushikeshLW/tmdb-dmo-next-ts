import React from "react";
import { createPortal } from "react-dom";

const Portal = ({
  children,
  portalId,
}: {
  children: React.ReactNode;
  portalId: string;
}) => {
  const portalRoot =
    typeof document !== "undefined" && document.getElementById(portalId);

  if (!portalRoot) return null;

  return createPortal(children, portalRoot);
};

export default Portal;
