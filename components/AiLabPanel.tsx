"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { ArrowRight, Bot, Clock3, Eye, LockKeyhole, Radio, ShieldCheck, UsersRound } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import type { PublicDoraEventClientView } from "@/lib/dora-public-client";
import { formatPublicEventTime } from "@/lib/dora-public-format";
import { localizeSiteText } from "@/lib/site-i18n";
import {
  activityModeLabel,
  displayEvents,
  focusEvent,
  freshnessLabel,
  modeLabel,
  useDoraLiveEvents,
  visibleLiveEvents
} from "@/lib/use-dora-live";

export type HomeDoraAgentPreview = {
  stageName: string;
  stateLabel: string;
  href: string;
};

type AiLabPanelProps = {
  fallbackEvents: PublicDoraEventClientView[];
  agents: HomeDoraAgentPreview[];
};

const boundaryRows = [
  {
    label: "Public relay",
    value: "Public-safe events"
  },
  {
    label: "Public schema",
    value: "Closed allowlist"
  },
  {
    label: "Owner boundary",
    value: "Private work stays gated"
  },
  {
    label: "Read-only surface",
    value: "No public controls"
  }
] as const;

export function AiLabPanel({ fallbackEvents, agents }: AiLabPanelProps) {
  const { locale } = useLanguage();
  const t = (value: string) => localizeSiteText(value, locale);
  const live = useDoraLiveEvents();
  const events = useMemo(() => displayEvents(live.events, fallbackEvents), [fallbackEvents, live.events]);
  const visibleLiveActivity = useMemo(() => visibleLiveEvents(live.events), [live.events]);
  const hasVisibleLiveActivity = visibleLiveActivity.length > 0;
  const currentFocus = focusEvent(events);
  const currentMode = modeLabel(live.connection, live.events);
  const activityMode = activityModeLabel(live.connection, live.events, hasVisibleLiveActivity);
  const isLiveActivity = live.connection === "live" && hasVisibleLiveActivity;

  return (
    <div className="home-ai-panel home-dora-live-panel">
      <div className="home-dora-live-statusbar" aria-label={t("Office preview status")}>
        <span className={isLiveActivity ? "home-dora-live-dot is-live" : "home-dora-live-dot"} aria-hidden />
        <strong>{t("Doraemon Office live preview")}</strong>
        <small>{t(activityMode)}</small>
      </div>

      <div className="home-ai-command-room home-dora-live-stage" aria-label={t("Homepage Doraemon Office live public preview")}>
        <Image
          className="home-ai-command-room-art"
          src="/visuals/doraemon-office-command-room-v2.png"
          alt=""
          width={1536}
          height={1024}
          sizes="(max-width: 1180px) 94vw, 54vw"
          priority={false}
        />

        <div className="home-dora-live-focus-card">
          <span>
            <Radio size={15} aria-hidden />
            {t("Current public focus")}
          </span>
          <strong>{t(currentFocus?.title ?? "Demo snapshot")}</strong>
          <p>{t("Visible activity uses fixed public labels before it reaches this page.")}</p>
          <dl>
            <div>
              <dt>{t("Focus agent")}</dt>
              <dd>{t(currentFocus?.agent ?? "Doraemon")}</dd>
            </div>
            <div>
              <dt>{t("Focus state")}</dt>
              <dd>{t(currentFocus?.state ?? "Demo")}</dd>
            </div>
          </dl>
        </div>

        <div className="home-dora-agent-orbit" role="list" aria-label={t("Team presence")}>
          {agents.map((agent) => (
            <span key={agent.href} role="listitem">
              <Link href={agent.href} className="link-focus home-dora-agent-node">
                <Bot size={15} aria-hidden />
                <span>
                  <strong>{t(agent.stageName)}</strong>
                  <small>{t(agent.stateLabel)}</small>
                </span>
              </Link>
            </span>
          ))}
        </div>
      </div>

      <section className="home-dora-live-feed" aria-label={t("Latest public-safe events")}>
        <div className="home-dora-live-feed-head">
          <span>
            <Clock3 size={15} aria-hidden />
            {t("Latest public-safe events")}
          </span>
          <Link href="/dora/activity" className="link-focus">
            {t("View all")}
            <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
        <ol>
          {events.slice(0, 4).map((event) => (
            <li key={event.event_id} className={`home-dora-live-event is-${event.severity}`}>
              <time dateTime={event.created_at}>{formatPublicEventTime(event.created_at)}</time>
              <strong>{t(event.agent)}</strong>
              <span>{t(event.title)}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="home-dora-live-boundary" aria-label={t("Homepage Doraemon Office public boundary")}>
        {boundaryRows.map((row, index) => {
          const Icon = index === 0 ? Eye : index === 1 ? ShieldCheck : index === 2 ? LockKeyhole : UsersRound;

          return (
            <div key={row.label}>
              <Icon size={15} aria-hidden />
              <span>{t(row.label)}</span>
              <strong>{t(row.value)}</strong>
            </div>
          );
        })}
      </div>

      <div className="home-dora-live-footer">
        <p>{t("Signals are live when the relay has public events; otherwise this card shows the same sanitized demo snapshot as Doraemon Office.")}</p>
        <div>
          <span>{t("Relay mode")}: {t(currentMode)}</span>
          <span>{t("Event freshness")}: {t(freshnessLabel(live.events))}</span>
        </div>
      </div>

      <div className="sr-only" aria-live="polite">
        {t("Doraemon Office public relay mode:")} {t(currentMode)}.
      </div>
    </div>
  );
}
