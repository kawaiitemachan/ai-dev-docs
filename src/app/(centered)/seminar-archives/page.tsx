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
      <h1 className="mt-10 text-3xl/10 font-normal tracking-tight text-gray-950 sm:mt-14 dark:text-white">
        限定公開セミナーアーカイブ
      </h1>
      <p className="mt-6 max-w-xl text-base/7 text-gray-600 dark:text-gray-400">
        セミナー参加者に案内した限定公開の録画リンクをまとめています。ページURLを共有された方のみアクセスしてください。
      </p>

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
