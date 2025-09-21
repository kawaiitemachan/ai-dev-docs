"use client";

import { IconButton } from "@/components/icon-button";
import type { Module } from "@/data/lessons";
import { SidebarIcon } from "@/icons/sidebar-icon";
import {
  CloseButton,
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";
import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { Navbar } from "./navbar";

export const SidebarContext = createContext<{
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
  isMobileDialogOpen: boolean;
  setIsMobileDialogOpen: (isMobileDialogOpen: boolean) => void;
}>({
  isSidebarOpen: true,
  setIsSidebarOpen: () => {},
  isMobileDialogOpen: false,
  setIsMobileDialogOpen: () => {},
});

const EXTRA_NAVIGATION = [
  {
    title: "アーカイブ",
    links: [{ title: "限定公開セミナーアーカイブ", href: "/seminar-archives" }],
  },
];

function CourseNavigation({
  modules,
  onNavigate,
  className,
}: {
  modules: Module[];
  onNavigate?: () => void;
  className?: string;
}) {
  let pathname = usePathname();
  let [openModules, setOpenModules] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(modules.map(({ id }) => [id, true])),
  );

  useEffect(() => {
    setOpenModules((prev) => {
      let next = { ...prev };
      let changed = false;

      for (let module of modules) {
        if (!(module.id in next)) {
          next[module.id] = true;
          changed = true;
        }
      }

      for (let key of Object.keys(next)) {
        if (!modules.some((module) => module.id === key)) {
          delete next[key];
          changed = true;
        }
      }

      return changed ? next : prev;
    });
  }, [modules]);

  return (
    <div className={clsx(className, "space-y-8")}>
      {modules.map((module) => (
        <div key={module.id}>
          <button
            type="button"
            className="flex w-full items-center justify-between gap-2 text-left text-base/7 font-semibold text-pretty text-gray-950 sm:text-sm/6 dark:text-white"
            aria-expanded={openModules[module.id] ?? true}
            aria-controls={`module-${module.id}`}
            onClick={() =>
              setOpenModules((prev) => ({
                ...prev,
                [module.id]: !(prev[module.id] ?? true),
              }))
            }
          >
            <span>{module.title}</span>
            <span className="text-lg leading-none text-gray-600 transition-transform dark:text-gray-300">
              {(openModules[module.id] ?? true) ? "-" : "+"}
            </span>
          </button>
          <ul
            id={`module-${module.id}`}
            data-open={openModules[module.id] ?? true ? "" : undefined}
            className={clsx(
              "mt-4 flex flex-col gap-4 border-l border-gray-950/10 text-base/7 text-gray-700 sm:mt-3 sm:gap-3 sm:text-sm/6 dark:border-white/10 dark:text-gray-400",
              !(openModules[module.id] ?? true) && "hidden",
            )}
          >
            {module.lessons.map((lesson) => (
              <li
                key={lesson.id}
                className={clsx(
                  "-ml-px flex border-l border-transparent pl-4",
                  "hover:text-gray-950 hover:not-has-aria-[current=page]:border-gray-400 dark:hover:text-white",
                  "has-aria-[current=page]:border-gray-950 dark:has-aria-[current=page]:border-white",
                )}
              >
                <Link
                  href={`/${lesson.id}`}
                  aria-current={
                    `/${lesson.id}` === pathname ? "page" : undefined
                  }
                  onNavigate={onNavigate}
                  className="aria-[current=page]:font-medium aria-[current=page]:text-gray-950 dark:aria-[current=page]:text-white"
                >
                  {lesson.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {EXTRA_NAVIGATION.map((section) => (
        <div key={section.title}>
          <h2 className="text-base/7 font-semibold text-pretty text-gray-950 sm:text-sm/6 dark:text-white">
            {section.title}
          </h2>
          <ul className="mt-4 flex flex-col gap-4 border-l border-gray-950/10 text-base/7 text-gray-700 sm:mt-3 sm:gap-3 sm:text-sm/6 dark:border-white/10 dark:text-gray-400">
            {section.links.map((link) => (
              <li
                key={link.href}
                className={clsx(
                  "-ml-px flex border-l border-transparent pl-4",
                  "hover:text-gray-950 hover:not-has-aria-[current=page]:border-gray-400 dark:hover:text-white",
                  "has-aria-[current=page]:border-gray-950 dark:has-aria-[current=page]:border-white",
                )}
              >
                <Link
                  href={link.href}
                  aria-current={link.href === pathname ? "page" : undefined}
                  onNavigate={onNavigate}
                  className="aria-[current=page]:font-medium aria-[current=page]:text-gray-950 dark:aria-[current=page]:text-white"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function MobileNavigation({
  open,
  onClose,
  modules,
}: {
  open: boolean;
  onClose: () => void;
  modules: Module[];
}) {
  return (
    <Dialog open={open} onClose={onClose} className="xl:hidden">
      <DialogBackdrop className="fixed inset-0 bg-gray-950/25" />
      <DialogPanel className="fixed inset-y-0 left-0 isolate w-sm max-w-[calc(100%-(--spacing(11)))] overflow-y-auto bg-white ring ring-gray-950/10 sm:w-xs dark:bg-gray-950 dark:ring-white/10">
        <div className="sticky top-0 z-10 px-4 py-4 sm:px-6">
          <div className="flex h-6 shrink-0">
            <CloseButton as={IconButton}>
              <SidebarIcon className="shrink-0 stroke-gray-950 dark:stroke-white" />
            </CloseButton>
          </div>
        </div>
        <CourseNavigation
          modules={modules}
          onNavigate={onClose}
          className="px-4 pb-4 sm:px-6"
        />
      </DialogPanel>
    </Dialog>
  );
}

export function SidebarLayout({
  modules,
  children,
}: {
  modules: Module[];
  children: React.ReactNode;
}) {
  let [isSidebarOpen, setIsSidebarOpen] = useState(true);
  let [isMobileDialogOpen, setIsMobileDialogOpen] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        isMobileDialogOpen,
        setIsMobileDialogOpen,
      }}
    >
      <div
        data-sidebar-collapsed={isSidebarOpen ? undefined : ""}
        className="group"
      >
        <aside className="fixed inset-y-0 left-0 w-2xs overflow-y-auto border-r border-gray-950/10 group-data-sidebar-collapsed:hidden max-xl:hidden dark:border-white/10">
          <nav aria-label="Course" className="px-6 py-4">
            <div className="sticky top-4 flex h-6">
              <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <SidebarIcon className="shrink-0 stroke-gray-950 dark:stroke-white" />
              </IconButton>
              <MobileNavigation
                open={isMobileDialogOpen}
                onClose={() => setIsMobileDialogOpen(false)}
                modules={modules}
              />
            </div>
            <div className="mt-3">
              <CourseNavigation modules={modules} className="max-xl:hidden" />
            </div>
          </nav>
        </aside>
        <div className="xl:not-group-data-sidebar-collapsed:ml-(--container-2xs)">
          {children}
        </div>
      </div>
    </SidebarContext.Provider>
  );
}

export function SidebarLayoutContent({
  breadcrumbs,
  children,
}: {
  breadcrumbs: React.ReactNode;
  children: React.ReactNode;
}) {
  let {
    isSidebarOpen,
    setIsSidebarOpen,
    isMobileDialogOpen,
    setIsMobileDialogOpen,
  } = useContext(SidebarContext);

  return (
    <>
      <Navbar>
        <div className="flex min-w-0 shrink items-center gap-x-4">
          <IconButton
            onClick={() => setIsMobileDialogOpen(!isMobileDialogOpen)}
            className="xl:hidden"
          >
            <SidebarIcon className="shrink-0 stroke-gray-950 dark:stroke-white" />
          </IconButton>
          {!isSidebarOpen && (
            <IconButton
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="max-xl:hidden"
            >
              <SidebarIcon className="shrink-0 stroke-gray-950 dark:stroke-white" />
            </IconButton>
          )}
          <div className="min-w-0">{breadcrumbs}</div>
        </div>
      </Navbar>
      <main className="px-4 sm:px-6">{children}</main>
    </>
  );
}
