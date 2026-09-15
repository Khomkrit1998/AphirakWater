import Image from "next/image"
import Link from "next/link"

import { footerColumns, resolveRef, site } from "@workspace/shared"

export function SiteFooter() {
  return (
    <footer className="bg-footer px-5 pt-[62px] pb-[30px] text-footer-foreground">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-9">
        <div className="max-w-[300px]">
          <div className="mb-4 flex items-center gap-[11px]">
            <Image
              src="/logo.png"
              alt={`โลโก้${site.name}`}
              width={46}
              height={46}
              className="size-[46px] object-contain"
            />
            <span className="font-heading text-[17px] font-bold text-white">
              {site.legalName}
            </span>
          </div>
          <p className="text-[14.5px] leading-[1.7]">{site.description}</p>
        </div>

        {footerColumns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="mb-3.5 text-[15.5px] text-white">{column.title}</h2>
            <ul className="grid gap-[9px]">
              {column.links.map((ref) => {
                const link = resolveRef(ref)
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[14.5px] text-footer-foreground transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        ))}

        <div>
          <h2 className="mb-3.5 text-[15.5px] text-white">ติดต่อเรา</h2>
          <address className="grid gap-[9px] text-[14.5px] not-italic">
            <a
              href={site.phoneHref}
              className="text-[17px] font-semibold text-white"
            >
              {site.phone}
            </a>
            <a href={site.lineHref} className="hover:text-white">
              LINE: {site.lineId}
            </a>
            <a href={site.whatsappHref} className="hover:text-white">
              WhatsApp: {site.phone}
            </a>
            <span>เปิดรับงาน {site.hours}</span>
            <span>งานเร่งด่วน โทรได้ทันที</span>
          </address>
          <ul aria-label="ช่องทางโซเชียล" className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[14.5px]">
            {site.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-[1200px] flex-wrap justify-between gap-3 border-t border-footer-line pt-[22px] text-[13.5px] text-footer-muted">
        <span>© 2569 {site.legalName} · ภูเก็ต · พังงา</span>
        <span>บริการส่งน้ำ · น้ำใช้ · น้ำเติมสระว่ายน้ำ · น้ำโรงแรม</span>
      </div>
    </footer>
  )
}
