
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import type { ReactNode, MouseEvent } from "react";

interface AuthProductLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}

export default function AuthProductLink({
  href,
  className,
  children,
  "aria-label": ariaLabel,
}: AuthProductLinkProps) {
  const router = useRouter();

  const { data: session, isPending } =
    authClient.useSession();

  const handleClick = (
    event: MouseEvent<HTMLAnchorElement>
  ) => {
    if (isPending) {
      event.preventDefault();
      return;
    }

    if (!session?.user) {
      event.preventDefault();

      const callbackURL = encodeURIComponent(href);

      router.push(
        `/sign-in?callbackURL=${callbackURL}`
      );
    }
  };

  return (
    <Link
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}

