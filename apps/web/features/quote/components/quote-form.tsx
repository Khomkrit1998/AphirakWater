"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CheckIcon, Loader2Icon } from "lucide-react"
import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"

import {
  quoteFormSchema,
  serviceTypeOptions,
  site,
  todayInBangkok,
  volumeOptions,
  type QuoteDefaults,
  type QuoteForm as QuoteFormValues,
  type QuoteFormInput,
} from "@workspace/shared"
import { Button, buttonVariants } from "@workspace/ui/components/button"
import { CheckMark } from "@workspace/ui/components/check-list"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import {
  NativeSelect,
  NativeSelectOption,
} from "@workspace/ui/components/native-select"
import { Textarea } from "@workspace/ui/components/textarea"
import { cn } from "@workspace/ui/lib/utils"

import { useSubmitQuote } from "../hooks/use-submit-quote"

const defaultValues: QuoteFormInput = {
  name: "",
  phone: "",
  lineId: "",
  serviceType: "",
  volume: "",
  date: "",
  location: "",
  details: "",
  website: "",
}

const control =
  "h-auto rounded-[12px] border-input bg-input-bg px-4 py-3.5 text-[15.5px] md:text-[15.5px] focus-visible:bg-background"
const selectWrapper = cn(
  "w-full",
  "[&>select]:h-auto [&>select]:rounded-[12px] [&>select]:bg-input-bg [&>select]:py-3.5 [&>select]:pr-10 [&>select]:pl-4 [&>select]:text-[15.5px] [&>select]:focus-visible:bg-background"
)
const card =
  "min-w-0 rounded-[22px] border bg-card p-[clamp(22px,3vw,34px)] shadow-form"

export function QuoteForm({ defaults }: { defaults: QuoteDefaults }) {
  const mutation = useSubmitQuote()
  // Spam check: bots submit within moments of the form appearing.
  const openedAt = useRef(0)
  useEffect(() => {
    openedAt.current = performance.now()
  }, [])
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<QuoteFormInput, unknown, QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      ...defaultValues,
      serviceType: defaults.service ?? "",
      volume: defaults.volume ?? "",
    },
  })
  // Tell the visitor which answers came from their choice on the home page.
  const prefilled = (name: "serviceType" | "volume") =>
    Boolean(name === "serviceType" ? defaults.service : defaults.volume) && !dirtyFields[name]

  const field = (name: keyof QuoteFormInput) => ({
    id: name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
    ...register(name),
  })

  if (mutation.isSuccess) {
    return (
      <div role="status" className={cn(card, "grid justify-items-start gap-4")}>
        <CheckMark className="size-11 [&_svg]:size-5" />
        <h2 className="text-2xl">ส่งคำขอใบเสนอราคาเรียบร้อย</h2>
        <p className="text-base leading-[1.7] text-ink-600">
          เลขอ้างอิงคำขอ{" "}
          <strong className="text-foreground">{mutation.data.reference}</strong>{" "}
          ทีมงานจะติดต่อกลับโดยเร็วที่สุด หากต้องการน้ำด่วนโทรได้ตลอด 24 ชั่วโมง
        </p>
        <a
          href={site.phoneHref}
          className={cn(buttonVariants({ variant: "call", size: "cta-sm" }))}
        >
          โทร {site.phone}
        </a>
      </div>
    )
  }

  return (
    <form
      noValidate
      onSubmit={(event) =>
        handleSubmit((values) =>
          mutation.mutate({
            ...values,
            elapsedMs: Math.round(performance.now() - openedAt.current),
          })
        )(event)
      }
      className={cn(card, "grid gap-[18px]")}
    >
      {/* Honeypot: hidden from sight, keyboard and screen readers, so only bots fill it. */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="website">เว็บไซต์</label>
        <input {...register("website")} id="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {mutation.isError && (
        <div
          role="alert"
          className="rounded-[14px] border border-call-border bg-call-soft px-4 py-3.5 text-[14.5px] leading-[1.6] text-call-text"
        >
          {mutation.error.message}{" "}
          <a href={site.phoneHref} className="font-semibold underline underline-offset-4">
            โทร {site.phone}
          </a>
        </div>
      )}

      <Field name="name" label="ชื่อผู้ติดต่อ" error={errors.name?.message}>
        <Input
          {...field("name")}
          autoComplete="name"
          placeholder="ชื่อ–นามสกุล หรือชื่อกิจการ"
          className={control}
        />
      </Field>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(180px,100%),1fr))] gap-[18px]">
        <Field name="phone" label="เบอร์โทรศัพท์" error={errors.phone?.message}>
          <Input
            {...field("phone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="08X-XXX-XXXX"
            className={control}
          />
        </Field>
        <Field name="lineId" label="LINE ID (ถ้ามี)" error={errors.lineId?.message}>
          <Input {...field("lineId")} placeholder="@yourline" className={control} />
        </Field>
      </div>

      <Field name="serviceType" label="ประเภทบริการ" error={errors.serviceType?.message} hint={prefilled("serviceType") ? "เลือกไว้จากหน้าหลัก เปลี่ยนได้" : undefined}>
        <NativeSelect {...field("serviceType")} className={selectWrapper}>
          <NativeSelectOption value="">เลือกประเภทบริการ</NativeSelectOption>
          {serviceTypeOptions.map((o) => (
            <NativeSelectOption key={o.value} value={o.value}>
              {o.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </Field>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(180px,100%),1fr))] gap-[18px]">
        <Field name="volume" label="ปริมาณน้ำต่อเที่ยว" error={errors.volume?.message} hint={prefilled("volume") ? "เลือกไว้จากหน้าหลัก เปลี่ยนได้" : undefined}>
          <NativeSelect {...field("volume")} className={selectWrapper}>
            <NativeSelectOption value="">เลือกปริมาณน้ำ</NativeSelectOption>
            {volumeOptions.map((o) => (
              <NativeSelectOption key={o.value} value={o.value}>
                {o.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </Field>
        <Field name="date" label="วันที่ต้องการใช้น้ำ" error={errors.date?.message}>
          <Input
            {...field("date")}
            type="date"
            min={todayInBangkok()}
            className={cn(control, "py-[13px]")}
          />
        </Field>
      </div>

      <Field name="location" label="พื้นที่หน้างาน" error={errors.location?.message}>
        <Input
          {...field("location")}
          placeholder="อำเภอ / ตำบล เช่น ป่าตอง, ภูเก็ต"
          className={control}
        />
      </Field>

      <Field name="details" label="รายละเอียดเพิ่มเติม" error={errors.details?.message}>
        <Textarea
          {...field("details")}
          rows={4}
          placeholder="เช่น จำนวนห้องพัก ขนาดสระ ความกว้างซอย จุดจอดรถ หรือรอบการส่งที่ต้องการ"
          className={cn(control, "field-sizing-fixed resize-y")}
        />
      </Field>

      <Button
        type="submit"
        disabled={mutation.isPending}
        className="h-auto rounded-[14px] py-[17px] text-[16.5px] font-semibold shadow-cta"
      >
        {mutation.isPending ? (
          <>
            <Loader2Icon className="animate-spin" aria-hidden="true" />
            กำลังส่ง…
          </>
        ) : (
          "ส่งคำขอใบเสนอราคา"
        )}
      </Button>
      <p className="text-center text-[13.5px] text-muted-foreground">
        ทีมงานติดต่อกลับโดยเร็วที่สุด · รับสายตลอด 24 ชั่วโมง โทร {site.phone}
      </p>
    </form>
  )
}

function Field({
  name,
  label,
  error,
  hint,
  children,
}: {
  name: string
  label: string
  error?: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="grid min-w-0 content-start gap-[7px]">
      <Label htmlFor={name} className="text-[14.5px] leading-normal font-semibold text-ink-700">
        {label}
      </Label>
      {children}
      {error ? (
        <p id={`${name}-error`} className="text-[13px] text-destructive">
          {error}
        </p>
      ) : (
        hint && (
          <p className="flex items-center gap-1.5 text-[13px] text-brand-strong animate-in duration-300 fade-in-0 motion-reduce:animate-none">
            <CheckIcon aria-hidden="true" className="size-3.5" strokeWidth={3} />
            {hint}
          </p>
        )
      )}
    </div>
  )
}
