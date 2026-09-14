"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"

import { site } from "@workspace/shared"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import {
  NativeSelect,
  NativeSelectOption,
} from "@workspace/ui/components/native-select"
import { SerpPreview } from "@workspace/ui/components/serp-preview"
import { Textarea } from "@workspace/ui/components/textarea"
import { cn } from "@workspace/ui/lib/utils"

import { seoFormSchema, type SeoFormValues } from "../schemas/seo-form"
import { control, selectWrapper } from "./field-styles"

const label = "text-[13.5px] font-semibold text-ink-700"

export function SeoForm({
  defaultValues,
  liveUrl,
}: {
  defaultValues: SeoFormValues
  liveUrl: string
}) {
  const {
    register,
    control: formControl,
    formState: { errors },
  } = useForm<SeoFormValues>({
    resolver: zodResolver(seoFormSchema),
    defaultValues,
    mode: "onChange",
  })
  const [seoTitle, metaDescription] = useWatch({
    control: formControl,
    name: ["seoTitle", "metaDescription"],
  })

  const counter = (value: string, max: number) => (
    <span
      className={cn(
        "text-xs tabular-nums",
        value.length > max ? "text-destructive" : "text-muted-foreground"
      )}
    >
      {value.length}/{max}
    </span>
  )

  return (
    <section aria-labelledby="seo-form" className="rounded-[18px] border bg-card p-5">
      <h2 id="seo-form" className="mb-3.5 text-[15.5px] font-bold">
        SEO ของหน้านี้
      </h2>
      <form noValidate onSubmit={(e) => e.preventDefault()} className="grid gap-3">
        <div className="grid gap-1.5">
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="seoTitle" className={label}>SEO Title</Label>
            {counter(seoTitle, 65)}
          </div>
          <Input
            id="seoTitle"
            aria-invalid={errors.seoTitle ? true : undefined}
            aria-describedby={errors.seoTitle ? "seoTitle-error" : undefined}
            {...register("seoTitle")}
            className={cn(control, "scroll-mt-28")}
          />
          {errors.seoTitle && (
            <p id="seoTitle-error" className="text-[13px] text-destructive">
              {errors.seoTitle.message}
            </p>
          )}
        </div>
        <div className="grid gap-1.5">
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="metaDescription" className={label}>Meta Description</Label>
            {counter(metaDescription, 160)}
          </div>
          <Textarea
            id="metaDescription"
            rows={3}
            aria-invalid={errors.metaDescription ? true : undefined}
            aria-describedby={errors.metaDescription ? "metaDescription-error" : undefined}
            {...register("metaDescription")}
            className={cn(control, "field-sizing-fixed scroll-mt-28 resize-y")}
          />
          {errors.metaDescription && (
            <p id="metaDescription-error" className="text-[13px] text-destructive">
              {errors.metaDescription.message}
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="grid min-w-0 gap-1.5">
            <Label htmlFor="robots" className={label}>Robots</Label>
            <NativeSelect id="robots" {...register("robots")} className={selectWrapper}>
              <NativeSelectOption value="index,follow">index, follow</NativeSelectOption>
              <NativeSelectOption value="noindex">noindex</NativeSelectOption>
            </NativeSelect>
          </div>
          <div className="grid min-w-0 gap-1.5">
            <Label htmlFor="schemaType" className={label}>Schema</Label>
            <NativeSelect id="schemaType" {...register("schemaType")} className={selectWrapper}>
              {seoFormSchema.shape.schemaType.options.map((o) => (
                <NativeSelectOption key={o} value={o}>
                  {o}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
        </div>
        <div className="mt-2 rounded-[12px] border border-line-soft p-4">
          <p className="mb-2.5 text-[12.5px] font-semibold text-muted-foreground">
            Google Search Preview
          </p>
          <SerpPreview
            url={liveUrl}
            title={`${seoTitle} | ${site.name}`}
            description={metaDescription}
          />
        </div>
      </form>
    </section>
  )
}
