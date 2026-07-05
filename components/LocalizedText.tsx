"use client";

import type { ElementType } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { localizeSiteText } from "@/lib/site-i18n";

export function LocalizedText({
  as: Tag = "span",
  className,
  value
}: {
  as?: ElementType;
  className?: string;
  value: string;
}) {
  const { locale } = useLanguage();

  return (
    <Tag className={className} data-i18n-skip>
      {localizeSiteText(value, locale)}
    </Tag>
  );
}
