import React, { useMemo, useState, useEffect } from "react";

export default function ReviewerConsole() {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "runs" | "reviews" | "devices" | "tests" | "analytics" | "settings"
  >("dashboard");
  const [selectedRun, setSelectedRun] = useState<Run | null>(null);
  const [drawerTab, setDrawerTab] = useState<DrawerTab>("summary");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredRuns = useMemo(() => {
    return MOCK_RUNS.filter(
      (r) =>
        (statusFilter === "all" || r.status === statusFilter) &&
        (search.trim() === "" ||
          r.deviceId.toLowerCase().includes(search.toLowerCase()) ||
          r.runId.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, statusFilter]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <TopNav />
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-6 space-y-6">
          {activeTab === "dashboard" && <Dashboard setActiveTab={setActiveTab} />}
          {activeTab === "runs" && (
            <RunsTable
              runs={filteredRuns}
              search={search}
              statusFilter={statusFilter}
              onSearch={setSearch}
              onStatusFilter={setStatusFilter}
              onSelectRun={(r) => {
                setSelectedRun(r);
                setDrawerTab("summary");
              }}
            />
          )}
          {activeTab === "reviews" && (
            <ReviewsQueue
              onOpen={(r) => {
                setSelectedRun(r);
                setDrawerTab("review");
              }}
            />
          )}
          {activeTab === "devices" && <Devices />}
          {activeTab === "tests" && <TestsCatalog />}
          {activeTab === "analytics" && <AnalyticsFull />}
          {activeTab === "settings" && <SettingsPage />}
        </main>
      </div>

      {selectedRun && (
        <RunDrawer
          run={selectedRun}
          tab={drawerTab}
          onTab={setDrawerTab}
          onClose={() => setSelectedRun(null)}
          onApprove={() => alert("Approved (wire to mcp.hitl.approve)")}
          onReject={() => alert("Rejected (wire to mcp.hitl.reject)")}
          onRerun={() => alert("Re-run subset (wire to orchestrator)")}
        />
      )}

      <DevTests />
    </div>
  );
}

function TopNav() {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-indigo-600" />
          <div className="font-semibold tracking-tight">TWAIN Cert Platform</div>
          <span className="text-slate-400">•</span>
          <div className="text-sm text-slate-500">Reviewer Console</div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 text-sm rounded-xl bg-slate-100 hover:bg-slate-200">Start Run</button>
          <button className="px-3 py-2 text-sm rounded-xl bg-indigo-600 text-white hover:bg-indigo-700">New Device</button>
          <div className="h-8 w-8 rounded-full bg-slate-200" />
        </div>
      </div>
    </header>
  );
}

function Sidebar({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (t: any) => void }) {
  const items: { id: any; label: string; icon: string }[] = [
    { id: "dashboard", label: "Dashboard", icon: "🏠" },
    { id: "runs", label: "Runs", icon: "📄" },
    { id: "reviews", label: "Reviews", icon: "✅" },
    { id: "devices", label: "Devices", icon: "🖨️" },
    { id: "tests", label: "Tests", icon: "🧪" },
    { id: "analytics", label: "Analytics", icon: "📈" },
    { id: "settings", label: "Settings", icon: "⚙️" }
  ];
  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-[calc(100vh-4rem)]">
      <nav className="p-3 space-y-1">
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => setActiveTab(it.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left hover:bg-slate-50 ${activeTab === it.id ? "bg-slate-100" : ""}`}
          >
            <span className="text-base">{it.icon}</span>
            <span className="text-sm">{it.label}</span>
          </button>
        ))}
      </nav>
      <div className="px-3">
        <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100">
          <div className="text-xs font-semibold text-indigo-700">HITL Policies</div>
          <div className="text-xs text-indigo-700/80 mt-1">
            CI ≥ 0.85 auto-pass · 0.65–0.85 review · <span className="font-medium">8%</span> random sampling
          </div>
        </div>
      </div>
    </aside>
  );
}

function Dashboard({ setActiveTab }: { setActiveTab: (t: any) => void }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Kpi title="Runs Today" value="42" trend="+8%" />
        <Kpi title="Pass Rate" value="93%" trend="+2%" />
        <Kpi title="Avg CI" value="0.88" trend="+0.03" />
        <Kpi title="HITL Queue" value="7" trend="-3" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Recent Runs</h3>
            <button className="text-sm text-indigo-600 hover:underline" onClick={() => setActiveTab("runs")}>View all</button>
          </div>
          <div className="mt-3">
            <RunsMiniList onSelect={() => setActiveTab("runs")} />
          </div>
        </Card>
        <Card>
          <h3 className="font-semibold">Queue Breakdown</h3>
          <div className="mt-3 space-y-3">
            <QueueBar label="Likely Pass" value={62} color="bg-emerald-500" />
            <QueueBar label="Borderline" value={24} color="bg-amber-500" />
            <QueueBar label="Likely Fail" value={14} color="bg-rose-500" />
          </div>
        </Card>
      </div>
    </div>
  );
}

function RunsTable({ runs, search, statusFilter, onSearch, onStatusFilter, onSelectRun }:
  { runs: Run[]; search: string; statusFilter: string; onSearch: (v: string) => void; onStatusFilter: (v: string) => void; onSelectRun: (r: Run) => void; }) {
  return (
    <Card>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h3 className="font-semibold">Runs</h3>
        <div className="flex items-center gap-2">
          <input value={search} onChange={(e) => onSearch(e.target.value)} placeholder="Search runId or deviceId" className="px-3 py-2 rounded-xl border border-slate-200 text-sm w-64" />
          <select value={statusFilter} onChange={(e) => onStatusFilter(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-200 text-sm">
            <option value="all">All statuses</option>
            <option value="PASSED">Passed</option>
            <option value="WARN">Warn</option>
            <option value="FAILED">Failed</option>
          </select>
        </div>
      </div>
      <div className="mt-4 overflow-auto rounded-xl border border-slate-100">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-3 py-2 text-left">Run ID</th>
              <th className="px-3 py-2 text-left">Device</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Avg CI</th>
              <th className="px-3 py-2">Tests</th>
              <th className="px-3 py-2">Started</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {runs.map((r) => (
              <tr key={r.runId} className="border-t hover:bg-slate-50">
                <td className="px-3 py-2 font-mono text-xs">{r.runId}</td>
                <td className="px-3 py-2">{r.deviceId}</td>
                <td className="px-3 py-2"><StatusBadge status={r.status} /></td>
                <td className="px-3 py-2"><CiBadge ci={r.ciAvg} /></td>
                <td className="px-3 py-2 text-center">{r.tests}</td>
                <td className="px-3 py-2 whitespace-nowrap">{r.startedAt}</td>
                <td className="px-3 py-2 text-right">
                  <button className="px-3 py-1.5 rounded-lg text-sm bg-slate-100 hover:bg-slate-200" onClick={() => onSelectRun(r)}>Open</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function ReviewsQueue({ onOpen }: { onOpen: (r: Run) => void }) {
  const policy = { autoPass: 0.85, reviewLower: 0.65, samplePct: 8 };
  const seededPercent = (key: string) => {
    let h = 2166136261;
    for (let i = 0; i < key.length; i++) h = (h ^ key.charCodeAt(i)) * 16777619;
    return Math.abs(h % 100);
  };
  const queue = MOCK_RUNS.filter((r) => {
    if (r.ciAvg < policy.reviewLower) return false;
    const borderline = r.status === "WARN" || r.ciAvg < policy.autoPass;
    const sampled = seededPercent(r.runId) < policy.samplePct;
    return borderline || sampled;
  });

  return (
    <Card>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Pending Human Reviews</h3>
        <div className="text-sm text-slate-500">
          {queue.length} in queue · Policy: CI in [{policy.reviewLower.toFixed(2)}, {policy.autoPass.toFixed(2)}) + {policy.samplePct}% sampling
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-3">
        {queue.map((r) => (
          <div key={r.runId} className="p-3 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between">
              <div className="font-medium">{r.deviceId}</div>
              <CiBadge ci={r.ciAvg} />
            </div>
            <div className="mt-1 font-mono text-xs text-slate-500">{r.runId}</div>
            <div className="mt-2 flex items-center gap-2 text-xs text-slate-600">
              <span>Flags:</span>
              <Flag label="duplex-contrast" />
              <Flag label="tls-check" />
            </div>
            <div className="mt-3 flex items-center gap-2">
              <button className="px-3 py-1.5 rounded-lg text-sm bg-slate-100 hover:bg-slate-200" onClick={() => onOpen(r)}>Open</button>
              <button className="px-3 py-1.5 rounded-lg text-sm bg-emerald-600 text-white hover:bg-emerald-700">Approve</button>
              <button className="px-3 py-1.5 rounded-lg text-sm bg-rose-600 text-white hover:bg-rose-700">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function Devices() {
  return (
    <Card>
      <h3 className="font-semibold">Devices</h3>
      <div className="mt-3 overflow-auto rounded-xl border border-slate-100">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-3 py-2 text-left">Model</th>
              <th className="px-3 py-2 text-left">Firmware</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Lab</th>
              <th className="px-3 py-2">Last Seen</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_DEVICES.map((d) => (
              <tr key={d.id} className="border-t">
                <td className="px-3 py-2">{d.model}</td>
                <td className="px-3 py-2 font-mono text-xs">{d.firmware}</td>
                <td className="px-3 py-2 text-center"><StatusBadge status={d.status} /></td>
                <td className="px-3 py-2 text-center">{d.lab}</td>
                <td className="px-3 py-2 text-right text-slate-500">{d.lastSeen}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function TestsCatalog() {
  return (
    <Card>
      <h3 className="font-semibold">Test Catalog</h3>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
        {TEST_GROUPS.map((g) => (
          <div key={g.id} className="p-3 rounded-xl border border-slate-200 bg-white">
            <div className="font-semibold">{g.title}</div>
            <div className="text-xs text-slate-500">{g.count} tests</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function AnalyticsFull() {
  const Spark = ({ data, min = 0.8, max = 1 }: { data: number[]; min?: number; max?: number }) => {
    const h = 48, w = 220, p = 5;
    const xs = data.map((_, i) => (i / (data.length - 1)) * (w - p * 2) + p);
    const ys = data.map((v) => h - ((v - min) / (max - min)) * (h - p * 2) - p);
    const d = xs.map((x, i) => `${i ? 'L' : 'M'}${x},${ys[i]}`).join(' ');
    const last = data[data.length - 1];
    return (
      <div className="flex items-center gap-3">
        <svg width={w} height={h} className="text-slate-700">
          <path d={d} fill="none" stroke="currentColor" />
          <circle cx={xs[xs.length - 1]} cy={ys[ys.length - 1]} r="2" />
        </svg>
        <div className="text-xs text-slate-500">Last: <span className="font-medium">{(last * 100).toFixed(0)}%</span></div>
      </div>
    );
  };

  const total = ANALYTICS.byStatus.PASSED + ANALYTICS.byStatus.WARN + ANALYTICS.byStatus.FAILED;
  const pct = (n: number) => Math.round((n / total) * 100);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Kpi title="Total Runs (7d)" value={String(ANALYTICS.runs7d)} trend={ANALYTICS.runsTrend} />
        <Kpi title="Pass Rate (7d)" value={`${pct(ANALYTICS.byStatus.PASSED)}%`} trend={"+2% wow"} />
        <Kpi title="Avg CI (7d)" value={ANALYTICS.avgCi.slice(-1)[0].toFixed(2)} trend={"+0.01"} />
        <Kpi title="HITL Rate" value={`${ANALYTICS.hitlRate}%`} trend={"-1% wow"} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <h3 className="font-semibold">Pass Rate (7 days)</h3>
          <div className="mt-2"><Spark data={ANALYTICS.passRate} /></div>
        </Card>
        <Card>
          <h3 className="font-semibold">Run Outcomes</h3>
          <div className="mt-3 space-y-3">
            <div>
              <div className="flex items-center justify-between text-sm"><span>Passed</span><span className="text-slate-500">{ANALYTICS.byStatus.PASSED}</span></div>
              <div className="h-2 bg-slate-100 rounded-full mt-1 overflow-hidden"><div className="h-2 bg-emerald-500" style={{ width: `${pct(ANALYTICS.byStatus.PASSED)}%` }} /></div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm"><span>Warn</span><span className="text-slate-500">{ANALYTICS.byStatus.WARN}</span></div>
              <div className="h-2 bg-slate-100 rounded-full mt-1 overflow_hidden"><div className="h-2 bg-amber-500" style={{ width: `${pct(ANALYTICS.byStatus.WARN)}%` }} /></div>
            </div>
            <div>
              <div className="flex items-center justify_between text-sm"><span>Failed</span><span className="text-slate-500">{ANALYTICS.byStatus.FAILED}</span></div>
              <div className="h-2 bg-slate-100 rounded-full mt-1 overflow_hidden"><div className="h-2 bg-rose-500" style={{ width: `${pct(ANALYTICS.byStatus.FAILED)}%` }} /></div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <h3 className="font-semibold">Avg CI (7 days)</h3>
          <div className="mt-2"><Spark data={ANALYTICS.avgCi} /></div>
        </Card>
        <Card className="lg:col-span-2">
          <h3 className="font-semibold">Top Flaky Tests</h3>
          <div className="mt-3 overflow-auto rounded-xl border border-slate-100">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-3 py-2 text-left">Test</th>
                  <th className="px-3 py-2">Flakiness</th>
                  <th className="px-3 py-2">Fails (7d)</th>
                </tr>
              </thead>
              <tbody>
                {ANALYTICS.topFlaky.map((t) => (
                  <tr key={t.id} className="border-t">
                    <td className="px-3 py-2">{t.id} — {t.name}</td>
                    <td className="px-3 py-2 text-center">{t.flakiness}</td>
                    <td className="px-3 py-2 text-center">{t.fails7d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

function SettingsPage() {
  return (
    <Card>
      <h3 className="font-semibold">Settings</h3>
      <div className="mt-2 text-sm text-slate-600">Tenants, roles, routing, and HITL policies (placeholder).</div>
    </Card>
  );
}

function RunDrawer({ run, tab, onTab, onClose, onApprove, onReject, onRerun }:
  { run: Run; tab: DrawerTab; onTab: (t: DrawerTab) => void; onClose: () => void; onApprove: () => void; onReject: () => void; onRerun: () => void; }) {
  return (
    <div className="fixed inset-0 z-40 flex">
      <div className="flex-1" onClick={onClose} />
      <div className="w-full sm:w-[560px] h-full bg-white border-l border-slate-200 shadow-2xl p-4 overflow-y-auto">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="font-semibold">Run {run.runId}</div>
            <div className="text-sm text-slate-500">{run.deviceId}</div>
          </div>
          <button className="px-3 py-1.5 rounded-lg bg-slate-100" onClick={onClose}>Close</button>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <StatusBadge status={run.status} />
          <CiBadge ci={run.ciAvg} />
          <span className="text-xs text-slate-500">{run.tests} tests</span>
        </div>
        <div className="mt-4 border-b border-slate-200 flex gap-4 text-sm">
          {DRAWER_TABS.map((t) => (
            <button key={t.id} onClick={() => onTab(t.id)} className={`pb-2 ${tab === t.id ? "border-b-2 border-indigo-600 text-indigo-600" : "text-slate-500"}`}>
              {t.label}
            </button>
          ))}
        </div>
        <div className="mt-4">
          {tab === "summary" && <SummaryTab run={run} />}
          {tab === "tests" && <TestsTab />}
          {tab === "artifacts" && <ArtifactsTab />}
          {tab === "logs" && <LogsTab />}
          {tab === "security" && <SecurityTab />}
          {tab === "ai" && <AiTab />}
          {tab === "review" && <ReviewTab onApprove={onApprove} onReject={onReject} onRerun={onRerun} />}
        </div>
      </div>
    </div>
  );
}

function SummaryTab({ run }: { run: Run }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Info label="Started" value={run.startedAt} />
        <Info label="Completed" value="—" />
        <Info label="Driver Version" value="2.5.13" />
        <Info label="Lab" value="Pensacola Lab A" />
      </div>
      <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
        <div className="text-sm font-medium">Executive Summary (AI)</div>
        <p className="text-sm text-slate-700 mt-1">
          Device meets baseline criteria with minor duplex contrast variance vs. historical mean. Recommend recalibrating back-side illumination; rerun B-18 under controlled lighting.
        </p>
        <div className="mt-2 flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-lg bg-slate-100 text-sm">Regenerate</button>
          <button className="px-3 py-1.5 rounded-lg bg-slate-100 text-sm">Copy</button>
        </div>
      </div>
    </div>
  );
}

function TestsTab() {
  return (
    <div className="space-y-2">
      {MOCK_TESTS.map((t) => (
        <div key={t.id} className="flex items-center justify-between p-2 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3">
            <StatusBadge status={t.status as any} />
            <div className="text-sm">{t.id} — {t.name}</div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-slate-500">{t.duration}s</span>
            <CiBadge ci={t.ci} />
            <button className="px-3 py-1.5 rounded-lg bg-slate-100">Open</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function ArtifactsTab() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {["A01.tiff", "A08_front.tiff", "A08_back.tiff", "report.pdf"].map((f) => (
        <div key={f} className="p-3 rounded-xl border border-slate-200">
          <div className="text-sm font-medium">{f}</div>
          <div className="mt-2 h-24 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">preview</div>
          <div className="mt-2 flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-lg bg-slate-100 text-sm">Open</button>
            <button className="px-3 py-1.5 rounded-lg bg-slate-100 text-sm">Copy URL</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function LogsTab() {
  return (
    <div className="space-y-2">
      <pre className="text-xs bg-slate-900 text-slate-100 rounded-xl p-3 overflow-auto max-h-64">
[12:00:01] TWAIN: ICAP_XRESOLUTION set 300
[12:00:02] TWAIN: Acquire start
[12:00:04] TWAIN: Image received (A01.tiff, 1.8MB)
[12:00:04] TLS: Handshake OK, TLS1.3, AES256-GCM
[12:00:06] veraPDF: PDF/A-1b compliant
...
      </pre>
    </div>
  );
}

function SecurityTab() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Check label="TLS Version" value="TLS 1.3" ok />
      <Check label="Cipher Suite" value="AES-256-GCM" ok />
      <Check label="Report Signature" value="RS256 / Valid" ok />
      <Check label="PII Redaction" value="No PII detected" ok />
    </div>
  );
}

function AiTab() {
  return (
    <div className="space-y-3">
      <div className="p-3 rounded-xl border border-slate-200">
        <div className="text-sm font-medium">Model Route</div>
        <div className="mt-1 text-sm text-slate-600">vision_pool → function_pool → adjudicator</div>
      </div>
      <div className="p-3 rounded-xl border border-slate-200">
        <div className="text-sm font-medium">Low-Confidence Sentences</div>
        <ul className="list-disc pl-5 text-sm text-slate-700">
          <li>Back-side contrast variance compared to baseline.</li>
          <li>Deskew confidence in B-20 below threshold.</li>
        </ul>
      </div>
    </div>
  );
}

function ReviewTab({ onApprove, onReject, onRerun }: { onApprove: () => void; onReject: () => void; onRerun: () => void }) {
  return (
    <div className="space-y-3">
      <div className="p-3 rounded-xl border border-slate-200 bg-amber-50">
        <div className="text-sm font-medium">Borderline: CI 0.78</div>
        <div className="text-sm text-amber-700">Duplex contrast anomaly; TLS check pending verification.</div>
      </div>
      <div className="flex items-center gap-2">
        <button className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white" onClick={onApprove}>Approve</button>
        <button className="px-3 py-1.5 rounded-lg bg-rose-600 text-white" onClick={onReject}>Reject</button>
        <button className="px-3 py-1.5 rounded-lg bg-slate-100" onClick={onRerun}>Re-run subset</button>
      </div>
      <div className="text-xs text-slate-500">All actions are signed and audited.</div>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <section className={`bg-white p-4 rounded-2xl border border-slate-200 ${className}`}>{children}</section>; }
function Kpi({ title, value, trend }: { title: string; value: string; trend?: string }) {
  return (<Card><div className="text-xs text-slate-500">{title}</div><div className="text-2xl font-semibold mt-1">{value}</div>{trend && <div className="text-xs text-emerald-600 mt-1">{trend}</div>}</Card>);
}
function QueueBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (<div><div className="flex items-center justify-between text-sm"><span>{label}</span><span className="text-slate-500">{value}%</span></div><div className="h-2 bg-slate-100 rounded-full mt-1 overflow-hidden"><div className={`h-2 ${color}`} style={{ width: `${value}%` }} /></div></div>);
}
function StatusBadge({ status }: { status: "PASSED" | "WARN" | "FAILED" | string }) {
  const map: Record<string, string> = { PASSED: "bg-emerald-100 text-emerald-700", WARN: "bg-amber-100 text-amber-700", FAILED: "bg-rose-100 text-rose-700" };
  const label = status === "PASSED" ? "Passed" : status === "WARN" ? "Warn" : status === "FAILED" ? "Failed" : status;
  return <span className={`px-2 py-1 rounded-lg text-xs font-medium ${map[status] || "bg-slate-100 text-slate-600"}`}>{label}</span>;
}
function CiBadge({ ci }: { ci: number }) {
  const color = ci >= 0.85 ? "bg-emerald-100 text-emerald-700" : ci >= 0.65 ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700";
  return <span className={`px-2 py-1 rounded-lg text-xs font-medium ${color}`}>CI {ci.toFixed(2)}</span>;
}
function Flag({ label }: { label: string }) { return <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-xs">{label}</span>; }
function Info({ label, value }: { label: string; value: string }) { return (<div className="p-3 rounded-xl border border-slate-200 bg-white"><div className="text-xs text-slate-500">{label}</div><div className="text-sm font-medium mt-1">{value}</div></div>); }
function RunsMiniList({ onSelect }: { onSelect: () => void }) {
  return (<div className="space-y-2">{MOCK_RUNS.slice(0, 5).map((r) => (<div key={r.runId} className="flex items-center justify-between p-2 rounded-xl border border-slate-200"><div className="flex items-center gap-3"><StatusBadge status={r.status} /><div className="text-sm">{r.deviceId}</div></div><div className="flex items-center gap-3"><CiBadge ci={r.ciAvg} /><button className="px-3 py-1.5 rounded-lg bg-slate-100 text-sm" onClick={onSelect}>Open</button></div></div>))}</div>);
}
function Check({ label, value, ok = false }: { label: string; value: string; ok?: boolean }) {
  return (<div className={`p-3 rounded-xl border ${ok ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-white"}`}><div className="text-xs text-slate-500">{label}</div><div className="text-sm font-medium mt-1">{value}</div></div>);
}

function DevTests() {
  const [pass, setPass] = useState(0);
  const [fail, setFail] = useState(0);
  useEffect(() => {
    type T = { name: string; fn: () => void };
    const TESTS: T[] = [];
    const test = (name: string, fn: () => void) => TESTS.push({ name, fn });
    test("mock_tests_shape", () => {
      if (!Array.isArray(MOCK_TESTS) || MOCK_TESTS.length === 0) throw new Error("MOCK_TESTS missing");
      for (const t of MOCK_TESTS) if (!t.id || !t.name || typeof t.ci !== "number") throw new Error("bad test entry");
    });
    test("mock_tests_ranges", () => {
      for (const t of MOCK_TESTS) { if (t.ci < 0 || t.ci > 1) throw new Error("ci out of range"); if (t.duration <= 0) throw new Error("duration invalid"); }
    });
    test("mock_runs_status_values", () => {
      const allowed = new Set(["PASSED", "WARN", "FAILED"]);
      for (const r of MOCK_RUNS) if (!allowed.has(r.status)) throw new Error("invalid status");
    });
    test("run_ids_unique", () => {
      const seen = new Set<string>(); for (const r of MOCK_RUNS) { if (seen.has(r.runId)) throw new Error("duplicate runId"); seen.add(r.runId); }
    });
    test("mock_tests_last_entry_valid", () => {
      const last = MOCK_TESTS[MOCK_TESTS.length - 1]; if (!last || last.id !== "E-62" || typeof last.duration !== "number") { throw new Error("last test entry mismatch"); }
    });
    test("test_ids_unique", () => {
      const seen = new Set<string>(); for (const t of MOCK_TESTS) { if (seen.has(t.id)) throw new Error("duplicate test id"); seen.add(t.id); }
    });
    test("mock_tests_length", () => { if (MOCK_TESTS.length !== 6) throw new Error("unexpected MOCK_TESTS length"); });
    test("drawer_tabs_set", () => { const ids = DRAWER_TABS.map((d) => d.id).join(","); if (ids !== "summary,tests,artifacts,logs,security,ai,review") throw new Error("drawer tabs mismatch"); });
    test("startedAt_format", () => { const re = /^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}$/; for (const r of MOCK_RUNS) if (!re.test(r.startedAt)) throw new Error("bad startedAt format"); });
    test("mock_runs_length", () => { if (MOCK_RUNS.length !== 6) throw new Error("unexpected MOCK_RUNS length"); });
    test("deviceId_present", () => { for (const r of MOCK_RUNS) if (!r.deviceId || r.deviceId.trim() === "") throw new Error("empty deviceId"); });
    let p = 0, f = 0; for (const t of TESTS) { try { t.fn(); p++; console.log("✅", t.name); } catch (e) { f++; console.error("❌", t.name, e); } } setPass(p); setFail(f);
  }, []);
  return (<div className="fixed bottom-3 right-3 px-3 py-2 rounded-xl bg-slate-900 text-slate-100 text-xs shadow-lg">Tests: <span className="font-medium">{pass}</span> pass • <span className="font-medium">{fail}</span> fail</div>);
}

type Run = { runId: string; deviceId: string; status: "PASSED" | "WARN" | "FAILED"; ciAvg: number; tests: number; startedAt: string; };
const MOCK_RUNS: Run[] = [
  { runId: "RUN-6F12A9", deviceId: "Panasonic KV-S1057C", status: "WARN",   ciAvg: 0.78, tests: 38, startedAt: "2025-08-22 10:13" },
  { runId: "RUN-7B54C3", deviceId: "Fujitsu fi-7160",     status: "PASSED", ciAvg: 0.91, tests: 42, startedAt: "2025-08-22 09:42" },
  { runId: "RUN-3C21D8", deviceId: "Canon DR-C240",       status: "PASSED", ciAvg: 0.87, tests: 40, startedAt: "2025-08-22 09:05" },
  { runId: "RUN-1A09B4", deviceId: "Brother ADS-2700W",   status: "FAILED", ciAvg: 0.61, tests: 41, startedAt: "2025-08-22 08:58" },
  { runId: "RUN-9E88F0", deviceId: "Epson DS-575W",       status: "WARN",   ciAvg: 0.82, tests: 39, startedAt: "2025-08-22 08:21" },
  { runId: "RUN-2D44A0", deviceId: "Ricoh SP-112",        status: "PASSED", ciAvg: 0.89, tests: 36, startedAt: "2025-08-22 07:55" }
];

type DrawerTab = "summary" | "tests" | "artifacts" | "logs" | "security" | "ai" | "review";
const DRAWER_TABS: { id: DrawerTab; label: string }[] = [
  { id: "summary", label: "Summary" },
  { id: "tests", label: "Tests" },
  { id: "artifacts", label: "Artifacts" },
  { id: "logs", label: "Logs" },
  { id: "security", label: "Security" },
  { id: "ai", label: "AI" },
  { id: "review", label: "Review" }
];

const TEST_GROUPS = [
  { id: "basic", title: "Basic (A)", count: 15 },
  { id: "advanced", title: "Advanced (B)", count: 15 },
  { id: "workflows", title: "Workflow (C)", count: 15 }
];

const MOCK_TESTS = [
  { id: "A-01", name: "Scan single page", status: "PASSED", ci: 0.94, duration: 4 },
  { id: "A-08", name: "Duplex scanning", status: "WARN", ci: 0.71, duration: 7 },
  { id: "B-17", name: "OCR accuracy", status: "PASSED", ci: 0.89, duration: 5 },
  { id: "C-33", name: "Scan to FTP/SFTP", status: "PASSED", ci: 0.90, duration: 6 },
  { id: "D-48", name: "Secure transmission (TLS)", status: "PASSED", ci: 0.95, duration: 3 },
  { id: "E-62", name: "Scan speed (PPM)", status: "WARN", ci: 0.80, duration: 10 }
];

type DeviceRow = { id: string; model: string; firmware: string; status: "ONLINE" | "OFFLINE" | "MAINT" | "PASSED" | "WARN" | "FAILED"; lab: string; lastSeen: string };
const MOCK_DEVICES: DeviceRow[] = [
  { id: "D-100", model: "Panasonic KV-S1057C", firmware: "1.4.2", status: "ONLINE",  lab: "Pensacola Lab A", lastSeen: "2 min ago" },
  { id: "D-101", model: "Fujitsu fi-7160",     firmware: "3.1.0", status: "OFFLINE", lab: "Tokyo Lab",       lastSeen: "1 hr ago" },
  { id: "D-102", model: "Canon DR-C240",       firmware: "2.7.5", status: "ONLINE",  lab: "Zurich Lab",      lastSeen: "just now" },
  { id: "D-103", model: "Brother ADS-2700W",   firmware: "1.9.8", status: "MAINT",   lab: "Pensacola Lab B", lastSeen: "yesterday" },
  { id: "D-104", model: "Epson DS-575W",       firmware: "4.2.0", status: "ONLINE",  lab: "Remote Rig 3",    lastSeen: "5 min ago" },
  { id: "D-105", model: "Ricoh SP-112",        firmware: "0.9.4", status: "ONLINE",  lab: "Pensacola Lab A", lastSeen: "11 min ago" },
];

type AnalyticsShape = { runs7d: number; runsTrend: string; passRate: number[]; avgCi: number[]; byStatus: { PASSED: number; WARN: number; FAILED: number }; topFlaky: { id: string; name: string; flakiness: string; fails7d: number }[]; hitlRate: number; };
const ANALYTICS: AnalyticsShape = {
  runs7d: 248,
  runsTrend: "+6% wow",
  passRate: [0.88, 0.90, 0.92, 0.91, 0.93, 0.94, 0.93],
  avgCi:    [0.85, 0.86, 0.87, 0.88, 0.89, 0.90, 0.88],
  byStatus: { PASSED: 72, WARN: 18, FAILED: 10 },
  topFlaky: [
    { id: "A-08", name: "Duplex scanning",          flakiness: "22%", fails7d: 5 },
    { id: "B-20", name: "Deskew stability",         flakiness: "18%", fails7d: 4 },
    { id: "C-11", name: "PDF/A tag compliance",     flakiness: "12%", fails7d: 3 },
  ],
  hitlRate: 28,
};
