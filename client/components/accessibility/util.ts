import React from "react";

export function onKeyDown(e: React.KeyboardEvent) {
  if (e.code === "Enter" || e.code === "Space") {
    (e.target as HTMLElement).click && (e.target as HTMLElement).click();
  }
}