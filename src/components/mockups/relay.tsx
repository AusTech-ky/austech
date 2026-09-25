import {
  BarChart3,
  Check,
  CheckCheck,
  ChevronDown,
  ChevronLeft,
  Inbox,
  MessagesSquare,
  Mic,
  Paperclip,
  Phone,
  Plus,
  Settings,
  Smile,
  StickyNote,
  Tag,
  Users,
  Zap,
  MoreHorizontal,
} from "lucide-react";
import { Avatar, AreaChart, BarChart, Card, CardHeader, Pill, Progress, StatusBar, TopBar } from "./primitives";
import { cn } from "@/lib/cn";

const GREEN = "#0f9f6e";
const GREEN_SOFT = "#e8f6f0";
const OUT_BUBBLE = "#dcf4e7";
const CHAT_BG = "#f5f4f0";

const convos = [
  { name: "Sophie Merren", msg: "Yes please! Do we need to bring anything?", t: "now", unread: 1, who: "Maya Rivers", label: ["Booking", "#0f9f6e", "#e8f6f0"] },
  { name: "+1 345 555 0187", msg: "Hi, do you deliver to East End?", t: "4m", unread: 1, who: null, label: ["New", "#2f55d4", "#eef2fd"] },
  { name: "Aaliyah Connor", msg: "Is the 2-bedroom still free for December?", t: "12m", who: "Maya Rivers", label: ["Enquiry", "#6d5ae6", "#f0eefd"] },
  { name: "Pedro's Café", msg: "You: Updated menu attached 📎", t: "26m", who: "Chris Ebanks" },
  { name: "Daniel Ebanks", msg: "Thanks! Received the invoice 👍", t: "41m", who: "Jordan Scott", done: true },
  { name: "Marcus Tibbetts", msg: "📷 Photo", t: "1h", who: "Jordan Scott" },
  { name: "Nadia Frederick", msg: "Great, see you then.", t: "2h", who: "Chris Ebanks", done: true },
  { name: "Kevin Walton", msg: "Can I change the pickup to 3pm?", t: "3h", who: "Maya Rivers" },
];

function Rail({ active }: { active: "inbox" | "team" }) {
  return (
    <aside className="flex h-full w-[60px] shrink-0 flex-col items-center border-r border-[#ececea] bg-[#fafaf9] py-4">
      <span className="grid size-8 place-items-center rounded-[9px] text-white" style={{ background: GREEN }}>
        <MessagesSquare className="size-4" strokeWidth={2.2} />
      </span>
      <div className="mt-6 flex flex-col gap-1.5">
        {[
          { k: "inbox", i: Inbox },
          { k: "contacts", i: Users },
          { k: "team", i: BarChart3 },
          { k: "replies", i: Zap },
        ].map(({ k, i: I }) => (
          <span
            key={k}
            className={cn(
              "grid size-9 place-items-center rounded-[9px]",
              k === active ? "bg-white shadow-[0_0_0_1px_#ececea,0_1px_2px_rgb(0_0_0/0.05)]" : "text-[#8b919b]",
            )}
          >
            <I className="size-[17px]" style={k === active ? { color: GREEN } : undefined} strokeWidth={k === active ? 2.1 : 1.8} />
          </span>
        ))}
      </div>
      <div className="mt-auto flex flex-col items-center gap-3">
        <Settings className="size-[17px] text-[#8b919b]" />
        <div className="relative">
          <Avatar name="Maya Rivers" size={28} index={0} />
          <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full ring-2 ring-[#fafaf9]" style={{ background: GREEN }} />
        </div>
      </div>
    </aside>
  );
}

function Bubble({
  out,
  children,
  time,
  author,
  read,
}: {
  out?: boolean;
  children: React.ReactNode;
  time: string;
  author?: string;
  read?: boolean;
}) {
  return (
    <div className={cn("flex", out ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[360px] rounded-[14px] px-3 pb-1.5 pt-2 text-[12.5px] leading-[1.5] text-ink shadow-[0_1px_1px_rgb(13_16_20/0.06)]",
          out ? "rounded-br-[4px]" : "rounded-bl-[4px] bg-white",
        )}
        style={out ? { background: OUT_BUBBLE } : undefined}
      >
        {author && <p className="mb-0.5 text-[10.5px] font-semibold" style={{ color: GREEN }}>{author}</p>}
        {children}
        <span className="float-right ml-3 mt-1.5 flex items-center gap-0.5 text-[10px] text-[#8a9189]">
          {time}
          {out && (read ? <CheckCheck className="size-3" style={{ color: "#3b82f6" }} /> : <Check className="size-3" />)}
        </span>
      </div>
    </div>
  );
}

// ─── Inbox ──────────────────────────────────────────────────────

export function RelayInbox() {
  return (
    <div className="flex h-full bg-white">
      <Rail active="inbox" />

      {/* Conversation list */}
      <section className="flex w-[318px] shrink-0 flex-col border-r border-[#ececea]">
        <div className="px-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[16px] font-semibold tracking-[-0.01em] text-ink">Inbox</p>
              <p className="nums text-[11px] text-muted">Main line · +1 345 555 0100</p>
            </div>
            <span className="grid size-8 place-items-center rounded-[8px] border border-[#e8e8e5]">
              <Plus className="size-4 text-ink-2" />
            </span>
          </div>
          <div className="mt-3 flex gap-1 rounded-[9px] bg-[#f3f3f1] p-0.5 text-[12px]">
            {[
              ["Mine", "4", true],
              ["Unassigned", "3"],
              ["All open", "18"],
            ].map(([l, n, a]) => (
              <span
                key={l as string}
                className={cn(
                  "flex flex-1 items-center justify-center gap-1 rounded-[7px] py-1.5",
                  a ? "bg-white font-medium text-ink shadow-[0_1px_2px_rgb(0_0_0/0.06)]" : "text-muted",
                )}
              >
                {l} <span className="nums text-faint">{n}</span>
              </span>
            ))}
          </div>
        </div>
        <div className="mt-3 flex-1 overflow-hidden">
          {convos.map((c, i) => (
            <div
              key={c.name}
              className={cn(
                "relative flex gap-3 border-b border-[#f3f3f1] px-4 py-[11px]",
                i === 0 && "bg-[#f3faf6]",
              )}
            >
              {i === 0 && <span className="absolute inset-y-0 left-0 w-[3px]" style={{ background: GREEN }} />}
              <Avatar name={c.name.startsWith("+") ? "? ?" : c.name} size={34} index={c.name.startsWith("+") ? 5 : undefined} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className={cn("truncate text-[12.5px] text-ink", c.unread ? "font-semibold" : "font-medium")}>{c.name}</p>
                  <span className={cn("shrink-0 text-[10.5px]", c.unread ? "font-medium" : "text-faint")} style={c.unread ? { color: GREEN } : undefined}>
                    {c.t}
                  </span>
                </div>
                <div className="mt-0.5 flex items-center gap-2">
                  <p className={cn("flex-1 truncate text-[11.5px]", c.unread ? "text-ink-2" : "text-muted")}>{c.msg}</p>
                  {c.unread ? (
                    <span className="nums grid size-[18px] place-items-center rounded-full text-[10px] font-semibold text-white" style={{ background: GREEN }}>
                      {c.unread}
                    </span>
                  ) : c.done ? (
                    <CheckCheck className="size-3.5 text-faint" />
                  ) : null}
                </div>
                <div className="mt-1.5 flex items-center gap-1.5">
                  {c.label && (
                    <Pill color={c.label[1]} bg={c.label[2]} className="h-[18px] text-[10px]">
                      {c.label[0]}
                    </Pill>
                  )}
                  {c.who ? (
                    <span className="ml-auto flex items-center gap-1 text-[10.5px] text-faint">
                      <Avatar name={c.who} size={16} /> {c.who.split(" ")[0]}
                    </span>
                  ) : (
                    <span className="ml-auto text-[10.5px] font-medium text-[#b26a00]">Unassigned</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Thread */}
      <section className="flex min-w-0 flex-1 flex-col" style={{ background: CHAT_BG }}>
        <header className="flex h-[60px] shrink-0 items-center gap-3 border-b border-[#ececea] bg-white px-4">
          <Avatar name="Sophie Merren" size={34} />
          <div className="min-w-0 flex-1">
            <p className="text-[13.5px] font-semibold text-ink">Sophie Merren</p>
            <p className="nums text-[11px] text-muted">+1 345 555 0142 · WhatsApp</p>
          </div>
          <span className="flex h-8 items-center gap-1.5 rounded-[8px] border border-[#e8e8e5] bg-white px-2 text-[12px] text-ink">
            <Avatar name="Maya Rivers" size={18} index={0} /> Maya R.
            <ChevronDown className="size-3.5 text-faint" />
          </span>
          <span className="flex h-8 items-center gap-1.5 rounded-[8px] px-3 text-[12px] font-medium text-white" style={{ background: GREEN }}>
            <Check className="size-3.5" /> Resolve
          </span>
        </header>

        <div className="flex-1 space-y-2.5 overflow-hidden px-5 py-4">
          <div className="flex justify-center">
            <span className="rounded-full bg-white/80 px-2.5 py-0.5 text-[10.5px] text-muted shadow-[0_0_0_1px_#ecebe7]">Today</span>
          </div>
          <Bubble time="09:12">Hi! We&apos;d like to book the sunset charter for 6 people this weekend 🌅</Bubble>
          <Bubble out time="09:14" author="Jordan" read>
            Hi Sophie, lovely to hear from you again! Saturday and Sunday both have space. Would you prefer the 5:30pm departure?
          </Bubble>
          <div className="flex justify-center py-0.5">
            <span className="flex items-center gap-1.5 text-[10.5px] text-muted">
              <Avatar name="Jordan Scott" size={14} /> Jordan assigned this to <span className="font-medium text-ink-2">Maya</span> · 09:20
            </span>
          </div>
          <div className="mx-auto w-[88%] rounded-[12px] border border-[#f1dfae] bg-[#fff9e9] px-3 py-2 text-[12px] text-[#5d4a14]">
            <p className="mb-0.5 flex items-center gap-1.5 text-[10.5px] font-semibold text-[#9a7414]">
              <StickyNote className="size-3" /> Internal note · Jordan
            </p>
            Returning guest, booked in March. <span className="font-semibold">@Maya</span> happy to offer the returning-guest rate.
          </div>
          <Bubble time="09:31">Actually, could we do a morning trip instead? The kids are early risers 😄</Bubble>
          <Bubble out time="09:33" author="Maya" read>
            Of course! There&apos;s a 10am departure on Saturday with room for 6, and as returning guests you get 10% off. Shall I hold it?
          </Bubble>
          <Bubble time="09:34">Yes please! Do we need to bring anything?</Bubble>
        </div>

        {/* Composer */}
        <div className="shrink-0 border-t border-[#ececea] bg-white px-4 pb-3 pt-2.5">
          <div className="flex items-center gap-4 text-[11.5px]">
            <span className="border-b-2 pb-1.5 font-medium text-ink" style={{ borderColor: GREEN }}>
              Reply
            </span>
            <span className="pb-1.5 text-muted">Internal note</span>
            <span className="ml-auto flex items-center gap-1.5 pb-1.5 text-faint">
              <Avatar name="Jordan Scott" size={16} /> Jordan is viewing
            </span>
          </div>
          <div className="mt-2 rounded-[12px] border border-[#e8e8e5] px-3 py-2.5">
            <p className="text-[12.5px] leading-[1.5] text-ink">
              Just sunscreen and towels! We&apos;ll have snorkel gear, water and snacks on board
              <span className="ml-px inline-block h-[14px] w-[1.5px] translate-y-[3px] animate-pulse bg-ink" />
            </p>
            <div className="mt-2.5 flex items-center gap-3 text-faint">
              <Paperclip className="size-4" />
              <Smile className="size-4" />
              <span className="flex items-center gap-1 rounded-[6px] bg-[#f4f4f2] px-1.5 py-0.5 text-[10.5px] text-muted">
                <Zap className="size-3" /> /what-to-bring
              </span>
              <span className="ml-auto flex h-7 items-center rounded-[7px] px-3 text-[11.5px] font-medium text-white" style={{ background: GREEN }}>
                Send
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact panel */}
      <aside className="w-[262px] shrink-0 border-l border-[#ececea] bg-white px-4 py-5">
        <div className="flex flex-col items-center text-center">
          <Avatar name="Sophie Merren" size={52} />
          <p className="mt-2.5 text-[14px] font-semibold text-ink">Sophie Merren</p>
          <p className="nums text-[11.5px] text-muted">+1 345 555 0142</p>
          <div className="mt-3 flex gap-2">
            {[Phone, Tag, MoreHorizontal].map((I, i) => (
              <span key={i} className="grid size-8 place-items-center rounded-full border border-[#e8e8e5]">
                <I className="size-3.5 text-ink-2" />
              </span>
            ))}
          </div>
        </div>
        <div className="mt-5 border-t border-[#f1f1ef] pt-4">
          <p className="text-[10.5px] font-medium uppercase tracking-[0.08em] text-faint">Labels</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Pill color={GREEN} bg={GREEN_SOFT}>Booking</Pill>
            <Pill color="#6d5ae6" bg="#f0eefd">Returning</Pill>
            <Pill color="#5f6570" bg="#f0f0ee">+ Add</Pill>
          </div>
        </div>
        <dl className="mt-5 space-y-2.5 border-t border-[#f1f1ef] pt-4 text-[12px]">
          {[
            ["Customer since", "Mar 2025"],
            ["Conversations", "7"],
            ["First response", "1m 48s"],
            ["Status", "Open"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <dt className="text-muted">{k}</dt>
              <dd className="nums font-medium text-ink">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-5 border-t border-[#f1f1ef] pt-4">
          <p className="text-[10.5px] font-medium uppercase tracking-[0.08em] text-faint">Previous</p>
          <div className="mt-2 space-y-2">
            {[
              ["Sunset charter · 6 guests", "14 Mar · Resolved by Chris"],
              ["Gift voucher enquiry", "2 Feb · Resolved by Maya"],
            ].map(([a, b]) => (
              <div key={a} className="rounded-[10px] border border-[#f0f0ee] px-2.5 py-2">
                <p className="text-[11.5px] font-medium text-ink">{a}</p>
                <p className="text-[10.5px] text-muted">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

// ─── Team overview ──────────────────────────────────────────────

const team = [
  { name: "Maya Rivers", role: "Bookings", online: true, open: 6, resolved: 14, resp: "2m 05s", load: 75 },
  { name: "Jordan Scott", role: "Bookings", online: true, open: 5, resolved: 11, resp: "3m 40s", load: 62 },
  { name: "Chris Ebanks", role: "Sales", online: true, open: 4, resolved: 9, resp: "4m 18s", load: 50 },
  { name: "Tanya Bush", role: "Accounts", online: false, open: 0, resolved: 8, resp: "6m 02s", load: 0 },
];

export function RelayTeam() {
  return (
    <div className="flex h-full bg-[#fcfcfb]">
      <Rail active="team" />
      <main className="min-w-0 flex-1 px-7 py-6">
        <TopBar
          title="Team overview"
          subtitle="Today · Main line +1 345 555 0100"
          actions={
            <div className="flex rounded-[8px] border border-[#e8e8e5] bg-white p-0.5 text-[12px]">
              {["Today", "7 days", "30 days"].map((t, i) => (
                <span key={t} className={cn("rounded-[6px] px-2.5 py-1", i === 0 ? "bg-[#f3f3f1] font-medium text-ink" : "text-muted")}>
                  {t}
                </span>
              ))}
            </div>
          }
        />
        <div className="mt-5 grid grid-cols-4 gap-3">
          {[
            ["Open conversations", "18", "across 4 teammates"],
            ["Unassigned", "3", "oldest waiting 4 min"],
            ["Median first response", "3m 12s", "last 7 days: 4m 50s"],
            ["Resolved today", "42", "7 more than yesterday"],
          ].map(([k, v, s], i) => (
            <Card key={k} className="px-4 py-3.5">
              <p className="text-[11.5px] text-muted">{k}</p>
              <p className="nums mt-1 text-[22px] font-semibold tracking-[-0.02em] text-ink" style={i === 1 ? { color: "#b26a00" } : undefined}>
                {v}
              </p>
              <p className="mt-0.5 text-[10.5px] text-faint">{s}</p>
            </Card>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-[1.4fr_1fr] gap-4">
          <Card>
            <CardHeader title="Conversations by hour" right="Today" />
            <div className="px-4 pb-3">
              <BarChart
                data={[3, 6, 11, 14, 9, 7, 12, 15, 10, 8, 6, 4]}
                labels={["7a", "8a", "9a", "10a", "11a", "12p", "1p", "2p", "3p", "4p", "5p", "6p"]}
                width={588}
                height={150}
                color={GREEN}
                activeIndex={7}
                gap={12}
                radius={5}
                muted="#d7eee3"
              />
            </div>
          </Card>
          <Card>
            <CardHeader title="First response time" right="Last 7 days" />
            <div className="px-4">
              <p className="nums text-[22px] font-semibold tracking-[-0.02em] text-ink">
                3m 12s <span className="ml-1 text-[11.5px] font-medium" style={{ color: GREEN }}>↓ 34%</span>
              </p>
              <div className="mt-3">
                <AreaChart data={[7.2, 6.4, 6.8, 5.1, 4.6, 4.9, 3.2]} width={410} height={100} color={GREEN} />
              </div>
            </div>
          </Card>
        </div>

        <Card className="mt-4">
          <CardHeader title="Team" right="4 members · 3 online" />
          <table className="w-full text-left text-[12px]">
            <thead>
              <tr className="border-y border-[#f1f1ef] text-[10.5px] uppercase tracking-[0.06em] text-faint">
                <th className="px-4 py-2 font-medium">Member</th>
                <th className="py-2 text-center font-medium">Open</th>
                <th className="py-2 text-center font-medium">Resolved</th>
                <th className="py-2 font-medium">Median response</th>
                <th className="w-[200px] px-4 py-2 font-medium">Workload</th>
              </tr>
            </thead>
            <tbody>
              {team.map((m, i) => (
                <tr key={m.name} className="border-b border-[#f5f5f3] last:border-0">
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2.5">
                      <div className="relative">
                        <Avatar name={m.name} size={28} index={i === 0 ? 0 : undefined} />
                        <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full ring-2 ring-white" style={{ background: m.online ? GREEN : "#c9c9c5" }} />
                      </div>
                      <div>
                        <p className="font-medium text-ink">{m.name}</p>
                        <p className="text-[10.5px] text-muted">{m.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="nums text-center text-ink">{m.open}</td>
                  <td className="nums text-center text-ink">{m.resolved}</td>
                  <td className="nums text-ink-2">{m.resp}</td>
                  <td className="px-4">
                    {m.online ? (
                      <Progress value={m.load} color={m.load > 70 ? "#e0a13a" : GREEN} height={5} />
                    ) : (
                      <span className="text-[11px] text-faint">Offline</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </main>
    </div>
  );
}

// ─── Mobile ─────────────────────────────────────────────────────

export function RelayMobile() {
  return (
    <div className="flex h-full flex-col" style={{ background: CHAT_BG }}>
      <div className="bg-white">
        <StatusBar />
        <div className="flex items-center gap-2.5 border-b border-[#ececea] px-3 pb-3 pt-2">
          <ChevronLeft className="size-6" style={{ color: GREEN }} />
          <Avatar name="Sophie Merren" size={36} />
          <div className="flex-1">
            <p className="text-[15px] font-semibold text-ink">Sophie Merren</p>
            <p className="flex items-center gap-1 text-[11.5px] text-muted">
              <Avatar name="Maya Rivers" size={14} index={0} /> Assigned to you
            </p>
          </div>
          <span className="rounded-full px-3 py-1.5 text-[12px] font-medium text-white" style={{ background: GREEN }}>
            Resolve
          </span>
        </div>
      </div>
      <div className="flex-1 space-y-2.5 overflow-hidden px-3 py-4">
        <div className="flex justify-center">
          <span className="rounded-full bg-white/80 px-2.5 py-0.5 text-[10.5px] text-muted shadow-[0_0_0_1px_#ecebe7]">Today</span>
        </div>
        <Bubble out time="09:14" author="Jordan" read>
          Hi Sophie! Saturday and Sunday both have space. Would you prefer the 5:30pm departure?
        </Bubble>
        <Bubble time="09:31">Actually, could we do a morning trip instead? The kids are early risers 😄</Bubble>
        <div className="mx-auto w-[92%] rounded-[12px] border border-[#f1dfae] bg-[#fff9e9] px-3 py-2 text-[12px] text-[#5d4a14]">
          <p className="mb-0.5 flex items-center gap-1.5 text-[10.5px] font-semibold text-[#9a7414]">
            <StickyNote className="size-3" /> Note · Jordan
          </p>
          Returning guest. Offer the returning-guest rate.
        </div>
        <Bubble out time="09:33" author="Maya" read>
          Of course! There&apos;s a 10am departure on Saturday with room for 6, and you get 10% off as returning guests. Shall I hold it?
        </Bubble>
        <Bubble time="09:34">Yes please! Do we need to bring anything?</Bubble>
        <div className="flex">
          <div className="flex items-center gap-1 rounded-[14px] rounded-bl-[4px] bg-white px-3 py-3 shadow-[0_1px_1px_rgb(13_16_20/0.06)]">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-1.5 animate-typing rounded-full bg-[#9aa0aa]" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-1.5 overflow-hidden px-3 pb-2">
        {["/what-to-bring", "/directions", "/deposit"].map((q) => (
          <span key={q} className="flex shrink-0 items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11.5px] text-ink-2 shadow-[0_0_0_1px_#ecebe7]">
            <Zap className="size-3" style={{ color: GREEN }} /> {q}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 bg-white px-3 pb-9 pt-2.5">
        <span className="grid size-9 place-items-center rounded-full bg-[#f3f3f1]">
          <Plus className="size-4 text-ink-2" />
        </span>
        <div className="flex h-9 flex-1 items-center rounded-full border border-[#e8e8e5] px-3.5 text-[13px] text-faint">
          Reply to Sophie…
        </div>
        <span className="grid size-9 place-items-center rounded-full text-white" style={{ background: GREEN }}>
          <Mic className="size-4" />
        </span>
      </div>
    </div>
  );
}

