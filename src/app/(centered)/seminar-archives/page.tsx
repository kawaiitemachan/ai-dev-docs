import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbSeparator,
  Breadcrumbs,
} from "@/components/breadcrumbs";
import { CenteredPageLayout } from "@/components/centered-layout";
import { ContentLink } from "@/components/content-link";
import { PageSection } from "@/components/page-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seminar Archives - AI Dev Lab",
  description:
    "限定公開セミナーのアーカイブ動画リンクをまとめたページです。参加者向けに配布した録画へのアクセスを管理します。",
};

export default function Page() {
  return (
    <CenteredPageLayout
      breadcrumbs={
        <Breadcrumbs>
          <BreadcrumbHome />
          <BreadcrumbSeparator />
          <Breadcrumb>Seminar Archives</Breadcrumb>
        </Breadcrumbs>
      }
    >
      <div className="relative mt-10 overflow-hidden rounded-3xl border border-gray-950/10 bg-gray-950/80 shadow-2xl dark:border-white/10 sm:mt-14">
        <img
          alt=""
          src="/images/seminar-archives-background.jpeg"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950/60 via-gray-950/50 to-gray-950/20 dark:from-black/70 dark:via-black/60 dark:to-black/30" />
        <div className="relative px-6 py-16 sm:px-10 sm:py-20 lg:px-14">
          <h1 className="text-3xl/10 font-normal tracking-tight text-white">
            限定公開セミナーアーカイブ
          </h1>
          <p className="mt-6 max-w-2xl text-base/7 text-gray-200">
            セミナー参加者に案内した限定公開の録画リンクをまとめています。ページURLを共有された方のみアクセスしてください。
          </p>
        </div>
      </div>

      <div className="mt-16 space-y-16">
        <PageSection title={<h2>2025年開催分</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            最新セッションの資料と録画を参照できます。リンクの再配布はご遠慮ください。
          </p>
          <div className="mt-8 max-w-2xl space-y-6">
            <ContentLink
              type="video"
              title="生成AI開発ワークショップ（2025年9月）"
              description="セッション全編の録画（YouTube 限定公開）"
              href="https://youtu.be/mqJKIs2WUmY"
            />
          </div>
        </PageSection>
      </div>
    </CenteredPageLayout>
  );
}
