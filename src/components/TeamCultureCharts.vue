<script setup lang="ts">
import { onMounted } from 'vue'

const P: Record<string, string> = {
    planned: '#3987e5', reactive: '#d95926', techdebt: '#199e70',
    context: '#898781', surface: '#1d1d1d', grid: '#2c2c2a', axis: '#383835',
    muted: '#898781', sec: '#c3c2b7'
}
const SVGNS = 'http://www.w3.org/2000/svg'

function elNode(name: string, attrs: Record<string, string | number> = {}): SVGElement {
    const e = document.createElementNS(SVGNS, name) as unknown as SVGElement
    for (const k in attrs) e.setAttribute(k, String(attrs[k]))
    return e
}

function fmt(n: number): string {
    return (Math.round(n * 100) / 100).toString()
}

let tipEl: HTMLElement | null = null

function bindTip(node: SVGElement, html: string) {
    const move = (e: MouseEvent) => {
        if (!tipEl) return
        const pad = 14
        let x = e.clientX + pad
        let y = e.clientY - 12
        if (x + tipEl.offsetWidth > window.innerWidth - 8) x = e.clientX - tipEl.offsetWidth - pad
        if (y < 4) y = 4
        tipEl.style.left = x + 'px'
        tipEl.style.top = y + 'px'
    }
    node.addEventListener('mouseenter', ((e: MouseEvent) => {
        if (!tipEl) return
        tipEl.innerHTML = html
        tipEl.style.opacity = '1'
        move(e)
    }) as EventListener)
    node.addEventListener('mousemove', move as EventListener)
    node.addEventListener('mouseleave', (() => {
        if (tipEl) tipEl.style.opacity = '0'
    }) as EventListener)
    node.setAttribute('tabindex', '0')
    node.addEventListener('focus', (() => {
        if (!tipEl) return
        tipEl.innerHTML = html
        tipEl.style.opacity = '1'
        const r = node.getBoundingClientRect()
        tipEl.style.left = (r.left + r.width / 2 - tipEl.offsetWidth / 2) + 'px'
        tipEl.style.top = (r.top - tipEl.offsetHeight - 10) + 'px'
    }) as EventListener)
    node.addEventListener('blur', (() => {
        if (tipEl) tipEl.style.opacity = '0'
    }) as EventListener)
}

function legend(hostId: string, items: { c: string; t: string; line?: boolean }[]) {
    const host = document.getElementById(hostId)
    if (!host) return
    host.innerHTML = items.map(i =>
        `<span><i class="sw ${i.line ? 'line' : ''}" style="background:${i.c}"></i>${i.t}</span>`).join('')
}

function table(hostId: string, head: string[], rows: (string | number)[][]) {
    const host = document.getElementById(hostId)
    if (!host) return
    host.innerHTML =
        `<thead><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead>` +
        `<tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>`
}

onMounted(() => {
    tipEl = document.getElementById('tct-tip')

    const KPIS = [
        { v: '−50%', l: 'Defect intake', d: '153 → 76 bugs opened' },
        { v: '63→80%', l: 'Planned work', d: 'share of delivery, +16 pts' },
        { v: '~9x', l: 'Tech-debt investment', d: '0.8% → 7.0% of delivery' },
        { v: '26→14%', l: 'Work that stalled', d: 'and 46% shorter stalls' },
        { v: '−75%', l: 'Deploy friction', d: '0.65 → 0.16 days median' },
        { v: '4 → 7', l: 'Engineers led', d: 'grew team 75%' }
    ]
    const kpiHost = document.getElementById('kpis')
    if (kpiHost) {
        kpiHost.innerHTML = KPIS.map(k =>
            `<div class="stat-card"><div class="kpi-val">${k.v}</div><div class="kpi-lab">${k.l}</div><div class="kpi-det">${k.d}</div></div>`
        ).join('')
    }

    /* ================= CHART 1: work mix stacked bars ================= */
    ;(function () {
        const svg = document.getElementById('c-mix') as unknown as SVGElement | null
        if (!svg) return
        const CATS = [
            { key: 'Planned delivery', c: P.planned },
            { key: 'Reactive / defects', c: P.reactive },
            { key: 'Tech debt', c: P.techdebt }
        ]
        const DATA = [
            { w: 'H1 2025', total: 374, v: [234, 137, 3] },
            { w: 'H1 2026', total: 428, v: [311, 87, 30] }
        ]
        const X0 = 86, X1 = 660, W = X1 - X0, BH = 24, GAP = 2
        legend('lg-mix', CATS.map(c => ({ c: c.c, t: c.key })))

        DATA.forEach((row, ri) => {
            const y = 26 + ri * 62
            const rowLabel = elNode('text', { x: 0, y: y + BH / 2 + 4, class: 'rowlab' })
            rowLabel.textContent = row.w
            svg.appendChild(rowLabel)
            let cx = X0
            row.v.forEach((val, i) => {
                const pctv = val / row.total * 100
                const w = pctv / 100 * W
                const isLast = i === row.v.length - 1
                const drawW = Math.max(1, isLast ? w : w - GAP)
                const r = elNode('rect', { x: cx, y, width: drawW, height: BH, fill: CATS[i].c, rx: 2 })
                svg.appendChild(r)
                const hit = elNode('rect', { x: cx, y: y - 6, width: Math.max(drawW, 8), height: BH + 12, class: 'hit' })
                bindTip(hit, `<b>${CATS[i].key}</b> — ${row.w}<span class="t-sub">${val} issues · ${pctv.toFixed(1)}% of ${row.total}</span>`)
                svg.appendChild(hit)

                const lab = pctv.toFixed(1) + '%'
                if (drawW >= 46) {
                    const t = elNode('text', { x: cx + 10, y: y + BH / 2 + 4, class: 'inlab', fill: '#0d0d0d' })
                    t.textContent = lab
                    svg.appendChild(t)
                } else if (isLast) {
                    const t = elNode('text', { x: cx + drawW + 8, y: y + BH / 2 + 4, class: 'endlab' })
                    t.textContent = lab
                    svg.appendChild(t)
                }
                cx += w
            })
            const tot = elNode('text', { x: X0, y: y + BH + 18, class: 'tick' })
            tot.textContent = row.total + ' issues delivered'
            svg.appendChild(tot)
        })

        table('t-mix', ['Category', 'H1 2025', '%', 'H1 2026', '%'],
            CATS.map((c, i) => [c.key, DATA[0].v[i], (DATA[0].v[i] / 374 * 100).toFixed(1) + '%',
                DATA[1].v[i], (DATA[1].v[i] / 428 * 100).toFixed(1) + '%']))
    })()

    /* ================= CHART 2: defect intake lines ================= */
    ;(function () {
        const svg = document.getElementById('c-def') as unknown as SVGElement | null
        if (!svg) return
        const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
        const S = [
            { n: '2025', v: [19, 18, 25, 23, 36, 32], c: P.context, tot: 153 },
            { n: '2026', v: [13, 0, 10, 17, 16, 20], c: P.planned, tot: 76 }
        ]
        const X0 = 44, X1 = 620, Y0 = 20, Y1 = 200, YMAX = 40
        const sx = (i: number) => X0 + i * (X1 - X0) / (MONTHS.length - 1)
        const sy = (v: number) => Y1 - v / YMAX * (Y1 - Y0)
        legend('lg-def', S.map(s => ({ c: s.c, t: s.n + ' · ' + s.tot + ' bugs', line: true })))

        for (let g = 0; g <= YMAX; g += 10) {
            svg.appendChild(elNode('line', { x1: X0, y1: sy(g), x2: X1, y2: sy(g), stroke: g === 0 ? P.axis : P.grid, 'stroke-width': 1 }))
            const t = elNode('text', { x: X0 - 10, y: sy(g) + 4, class: 'tick', 'text-anchor': 'end' })
            t.textContent = String(g)
            svg.appendChild(t)
        }
        MONTHS.forEach((m, i) => {
            const t = elNode('text', { x: sx(i), y: Y1 + 22, class: 'tick', 'text-anchor': 'middle' })
            t.textContent = m
            svg.appendChild(t)
        })

        S.forEach(s => {
            svg.appendChild(elNode('polyline', {
                points: s.v.map((v, i) => `${sx(i)},${sy(v)}`).join(' '),
                fill: 'none', stroke: s.c, 'stroke-width': 2, 'stroke-linejoin': 'round', 'stroke-linecap': 'round'
            }))
            const li = s.v.length - 1
            svg.appendChild(elNode('circle', { cx: sx(li), cy: sy(s.v[li]), r: 5, fill: s.c, stroke: P.surface, 'stroke-width': 2 }))
            const t = elNode('text', { x: sx(li) + 14, y: sy(s.v[li]) + 4, class: 'endlab' })
            t.textContent = s.n + ': ' + s.v[li]
            svg.appendChild(t)
            s.v.forEach((v, i) => {
                const h = elNode('circle', { cx: sx(i), cy: sy(v), r: 14, class: 'hit' })
                bindTip(h, `<b>${MONTHS[i]} ${s.n}</b><span class="t-sub">${v} bug${v === 1 ? '' : 's'} opened</span>`)
                svg.appendChild(h)
            })
        })
        const zt = elNode('text', { x: sx(1), y: sy(0) - 10, class: 'tick', 'text-anchor': 'middle', fill: P.sec })
        zt.textContent = 'zero'
        svg.appendChild(zt)

        table('t-def', ['Month', ...MONTHS, 'Total'],
            S.map(s => [s.n, ...s.v, s.tot]))
    })()

    /* ================= CHART 3: stage dumbbell ================= */
    ;(function () {
        const svg = document.getElementById('c-stage') as unknown as SVGElement | null
        if (!svg) return
        const D = [
            { s: 'Dev', a: 1.05, b: 0.81 },
            { s: 'Code review', a: 0.11, b: 0.15 },
            { s: 'QA', a: 0.90, b: 2.22 },
            { s: 'Stakeholder approval', a: 0.14, b: 0.66 },
            { s: 'Deployment', a: 0.65, b: 0.16 },
            { s: 'Blocked', a: 3.47, b: 1.88 }
        ]
        const X0 = 170, X1 = 590, Y0 = 16, XMAX = 3.6, RH = 34
        const sx = (v: number) => X0 + v / XMAX * (X1 - X0)
        legend('lg-stage', [{ c: P.context, t: 'H1 2025' }, { c: P.planned, t: 'H1 2026' }])

        for (let g = 0; g <= 3.5; g += 0.5) {
            svg.appendChild(elNode('line', { x1: sx(g), y1: Y0 - 6, x2: sx(g), y2: Y0 + D.length * RH - 12, stroke: g === 0 ? P.axis : P.grid, 'stroke-width': 1 }))
            const t = elNode('text', { x: sx(g), y: Y0 + D.length * RH + 6, class: 'tick', 'text-anchor': 'middle' })
            t.textContent = String(g)
            svg.appendChild(t)
        }
        const ax = elNode('text', { x: (X0 + X1) / 2, y: Y0 + D.length * RH + 26, class: 'tick', 'text-anchor': 'middle' })
        ax.textContent = 'median days in stage'
        svg.appendChild(ax)

        D.forEach((r, i) => {
            const y = Y0 + i * RH + 8
            const lab = elNode('text', { x: 0, y: y + 4, class: 'rowlab' })
            lab.textContent = r.s
            svg.appendChild(lab)
            svg.appendChild(elNode('line', { x1: sx(Math.min(r.a, r.b)), y1: y, x2: sx(Math.max(r.a, r.b)), y2: y, stroke: P.axis, 'stroke-width': 2, 'stroke-linecap': 'round' }))
            svg.appendChild(elNode('circle', { cx: sx(r.a), cy: y, r: 5, fill: P.context, stroke: P.surface, 'stroke-width': 2 }))
            svg.appendChild(elNode('circle', { cx: sx(r.b), cy: y, r: 5, fill: P.planned, stroke: P.surface, 'stroke-width': 2 }))
            const ch = (r.b - r.a) / r.a * 100
            const t = elNode('text', { x: X1 + 26, y: y + 4, class: 'endlab' })
            t.textContent = (ch > 0 ? '↑ +' : '↓ ') + Math.round(ch) + '%'
            t.setAttribute('fill', P.sec)
            svg.appendChild(t)
            const h = elNode('rect', { x: X0 - 10, y: y - 15, width: X1 - X0 + 40, height: 30, class: 'hit' })
            bindTip(h, `<b>${r.s}</b><span class="t-sub">H1 2025: ${fmt(r.a)} d → H1 2026: ${fmt(r.b)} d (${ch > 0 ? '+' : ''}${Math.round(ch)}%)</span>`)
            svg.appendChild(h)
        })

        table('t-stage', ['Stage', 'H1 2025 (d)', 'H1 2026 (d)', 'Change'],
            D.map(r => [r.s, fmt(r.a), fmt(r.b), (((r.b - r.a) / r.a * 100) > 0 ? '+' : '') + Math.round((r.b - r.a) / r.a * 100) + '%']))
    })()
})
</script>

<template>
    <div class="tct-viz">
        <div class="kpi-grid" id="kpis"></div>

        <section class="card">
            <h2>Where the team's effort went</h2>
            <p class="sub">Share of delivered work by category. Reactive work fell by nearly half; tech debt became a real line item.</p>
            <div class="legend" id="lg-mix"></div>
            <svg id="c-mix" viewBox="0 0 720 150" role="img" aria-label="Stacked bars comparing work mix in H1 2025 and H1 2026"></svg>
            <p class="note">Planned = all issue types except Bug and Prod Request. Percentages are of each window's delivered total (374 and 428).</p>
            <details>
                <summary>Table view</summary>
                <table id="t-mix"></table>
            </details>
        </section>

        <section class="card">
            <h2>Defects opened per month</h2>
            <p class="sub">New bug tickets created. 153 across H1 2025 → 76 across H1 2026, a 50% reduction in incoming defects.</p>
            <div class="legend" id="lg-def"></div>
            <svg id="c-def" viewBox="0 0 720 260" role="img" aria-label="Line chart of monthly defect intake, 2025 versus 2026"></svg>
            <p class="note">February 2026 recorded zero new bugs. The monthly counts reconcile exactly to the 76 half-year total.</p>
            <details>
                <summary>Table view</summary>
                <table id="t-def"></table>
            </details>
        </section>

        <section class="card">
            <h2>Median days per workflow stage</h2>
            <p class="sub">Reconstructed from Jira status histories. Dev, deployment, and blocked time shrank; QA and stakeholder review grew — the deliberate quality tradeoff behind the defect drop.</p>
            <div class="legend" id="lg-stage"></div>
            <svg id="c-stage" viewBox="0 0 720 250" role="img" aria-label="Dumbbell chart of median days per workflow stage"></svg>
            <p class="note">Each row shows only issues that reached that stage. Cycle time overall (in progress → done) held flat at 6.9 → 6.8 days while the team grew from 4 to 7 engineers.</p>
            <details>
                <summary>Table view</summary>
                <table id="t-stage"></table>
            </details>
        </section>

        <div id="tct-tip"></div>
    </div>
</template>

<style>
.tct-viz {
    --border: #404040;
    --planned: #3987e5;
    --reactive: #d95926;
    --techdebt: #199e70;
    --context: #898781;
    --grid: #2c2c2a;
    --axis: #383835;
    --text-primary: #fafafa;
    --text-secondary: #c3c2b7;
    --text-muted: #898781;
    color-scheme: dark;
}
.tct-viz * { box-sizing: border-box; }
.tct-viz .card {
    background: rgba(23, 23, 23, 0.6);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 28px;
}
.tct-viz .card:last-of-type { margin-bottom: 0; }
.tct-viz .stat-card {
    background: rgba(23, 23, 23, 0.6);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 16px;
    text-align: center;
}
.tct-viz h2 { font-size: 18px; font-weight: 600; margin: 0 0 2px; color: var(--text-primary); }
.tct-viz .sub { color: var(--text-muted); font-size: 13px; margin: 0 0 20px; }
.tct-viz .kpi-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 28px; }
@media (min-width: 560px) { .tct-viz .kpi-grid { grid-template-columns: repeat(3, 1fr); } }
.tct-viz .kpi-val { font-size: 24px; font-weight: 600; color: var(--text-primary); }
.tct-viz .kpi-lab { font-size: 11px; color: var(--text-muted); margin-top: 4px; }
.tct-viz .kpi-det { font-size: 10px; color: var(--axis); margin-top: 4px; filter: brightness(1.9); }
.tct-viz .legend { display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 14px; font-size: 12px; color: var(--text-secondary); }
.tct-viz .legend span { display: inline-flex; align-items: center; gap: 7px; }
.tct-viz .sw { width: 11px; height: 11px; border-radius: 3px; display: inline-block; }
.tct-viz .sw.line { width: 15px; height: 3px; border-radius: 2px; }
.tct-viz svg { display: block; width: 100%; height: auto; overflow: visible; }
.tct-viz .tick { font-size: 11px; fill: var(--text-muted); font-variant-numeric: tabular-nums; }
.tct-viz .rowlab { font-size: 12px; fill: var(--text-secondary); }
.tct-viz .inlab { font-size: 11px; font-weight: 600; }
.tct-viz .endlab { font-size: 11px; fill: var(--text-secondary); font-weight: 600; }
.tct-viz .note { font-size: 11px; color: var(--text-muted); margin-top: 14px; line-height: 1.6; }
.tct-viz details { margin-top: 14px; }
.tct-viz summary { font-size: 11px; color: var(--text-muted); cursor: pointer; }
.tct-viz table { border-collapse: collapse; margin-top: 10px; font-size: 11px; width: 100%; }
.tct-viz th, .tct-viz td { text-align: right; padding: 5px 9px; border-bottom: 1px solid var(--grid); font-variant-numeric: tabular-nums; }
.tct-viz th:first-child, .tct-viz td:first-child { text-align: left; font-variant-numeric: normal; }
.tct-viz th { color: var(--text-muted); font-weight: 600; }
.tct-viz td { color: var(--text-secondary); }
.tct-viz .hit { fill: transparent; cursor: pointer; }
#tct-tip {
    position: fixed;
    pointer-events: none;
    opacity: 0;
    transition: opacity .12s;
    background: #0d0d0d;
    border: 1px solid #404040;
    border-radius: 8px;
    padding: 8px 11px;
    font-size: 12px;
    color: #fafafa;
    box-shadow: 0 6px 20px rgba(0, 0, 0, .5);
    z-index: 50;
    max-width: 240px;
}
#tct-tip b { font-weight: 600; }
#tct-tip .t-sub { color: #898781; font-size: 11px; display: block; margin-top: 3px; }
@media (max-width: 560px) {
    .tct-viz .card { padding: 16px; }
}
</style>
