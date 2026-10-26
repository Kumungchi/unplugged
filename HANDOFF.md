# HANDOFF — Unplugged (unplugged.cz)

Předávací dokument pro agenta v T3 Code (Claude Code / Codex). Stav k 25. 10. 2026. Vlastník projektu: Matias Bunnik (zakladatel a budoucí ředitel Alesvia z.ú.). Tento dokument se týká jen repa Kumungchi/unplugged (unplugged.cz, newsletter, promo animace). Web alesvia.org je samostatný projekt a řeší se jinde; tady se zmiňuje jen tam, kde je potřeba konzistence.

## 0. Jak s tímto dokumentem pracovat

- Přečti celý dokument, pak CLAUDE.md (architektura, build, Convex) a teprve potom začni.
- Pracuj podle sekce 6 shora dolů. Fáze 0 má přednost před vším ostatním.
- Cokoli v sekci 8 nerozhoduj sám. Připrav varianty s trade-offy a zeptej se.
- Po každém dokončeném úkolu odškrtni checkbox v tomto souboru a commitni ho spolu se změnou. Tento soubor je živý stav projektu.
- Jako úplně první commit přidej na začátek CLAUDE.md i AGENTS.md řádek: `> Před začátkem práce si přečti HANDOFF.md — aktuální stav, pravidla a backlog.`

Značení: [x] hotovo · [ ] čeká · ⚠️ vyžaduje rozhodnutí Matiase · 🔁 už jednou uděláno, ale práce se ztratila (sekce 4).

### Jak komunikovat s Matiasem

Česky. Technické termíny, kód, názvy souborů a commit messages anglicky. Studuje psychologii a informatiku a chce se učit: u každé netriviální volby vysvětli proč a trade-offy. Jedna jasná další akce je lepší než dlouhý seznam paralelních úkolů. Píše často diktováním; pokud foneticky zkomolená zpráva nedává smysl, zeptej se. Když se spleteš, řekni to rovnou a oprav to.

## 1. Kontext projektu

Alesvia je česká nezisková organizace v přípravě (právní forma zapsaný ústav, z.ú., sídlo Ostrava) na průsečíku psychologie a AI. Řeší psychologická rizika konverzační AI: pseudo-intimitu, emoční závislost, AI-asociovanou psychózu a erozi lidské autonomie.

Hlavní sdělení: **„AI je nástroj. Ne vztah.“**

| Pilíř | Co dělá | Ekonomická role | Stav |
| --- | --- | --- | --- |
| Unplugged | Veřejná vlajková značka: newsletter, workshopy, osvěta o AI pseudo-intimitě | Motor reputace, financovaný granty | Aktivní (web + newsletter) |
| Akademie | AI gramotnost a implementace pro firmy a veřejnou správu | Nejrychlejší cesta k vlastním příjmům | V přípravě |
| Praktici | Klinické vzdělávání pro terapeuty a psychology | Vysoká marže | Blokováno: chybí klinický garant v radě |
| Policy Lab | Normativní a legislativní výzkum | Nákladové středisko záměrně | V přípravě |

SaaS směr existuje jen jako zmínka na alesvia.org a je mimo rozsah současné fáze. Unplugged je veřejně viditelná značka pod Alesvia. **Rozhodnuto: nabídka pro školy, organizace a veřejnou správu zůstává**, nezúžit na veřejnou osvětu.

Schválená mise: „Lidé se učí používat AI jako nástroj, ale nikdo je neučí, co dělat, když AI začne napodobovat přítele, partnera nebo terapeuta. Unplugged tuto mezeru vyplňuje.“

## 2. Co web smí tvrdit (25. 10. 2026)

Web organizace, která stojí na psychologické přesnosti, nesmí tvrdit nic, co dnes není pravda.

| Fakt | Pravda dnes | Správná formulace |
| --- | --- | --- |
| Registrace z.ú. | Návrh na zápis nebyl podán | „Alesvia z.ú. připravujeme k registraci“ / „registraci připravujeme“. Nikdy „registrace probíhá“, nikdy „Alesvia z.ú.“ jako hotová entita. |
| Správní rada | Neobsazená (min. 3 lidé, mimo ředitele) | Nezmiňovat složení. Max. „správní radu sestavujeme“. |
| Tým | Zakladatel Matias, žádný potvrzený tým | Žádné „kolektiv psychologů, edukátorů a technologů“. Jmenovat zakladatele s rolí (psychologie + informatika). Další lidi jen po souhlasu. Viz také O-6. |
| Workshopy | Žádný se zatím nekonal | Nabídka ano („pilotní workshop“), reference a „proškolili jsme“ ne. |
| Partneři | Žádné podepsané partnerství | Nejmenovat instituce jako partnery. |
| Vlastní data | Žádný vlastní výzkum | Citovat cizí studie s přesným zdrojem. Nepředstírat vlastní výzkum. |
| IČO, sídlo | Neexistuje | Doplnit až po zápisu (fáze 2). |

## 3. Nepřekročitelná pravidla obsahu

- Kritizujeme design, ne lidi. Nevysmívat se uživatelům AI companionů ani osamělým lidem. Používat AI je v pořádku.
- Žádná krizová intervence. Přesměrovat na odbornou pomoc (U-06).
- Každé číslo má zdroj u sebe: studie, rok, velikost a typ vzorku. Ne souhrnné „podle výzkumů X, Y, Z“.
- Odlišovat doloženo / výzkum naznačuje / naše interpretace. Korelace: „souviselo s“, ne „způsobuje“.
- Žádná neuro-spekulace (dopamin, oxytocin u chatbotů) bez konkrétní studie.
- Nezávislost: žádné peníze od výrobců AI companion produktů, žádné cash granty od AI laboratoří (Anthropic, OpenAI…). Infrastrukturní kredity (Google, Microsoft, NVIDIA) jsou OK. Web nesmí naznačovat opak.
- Tón: chytrý, lidský, přesný, současný. Ironie ano, pohrdání ne. Žádná morální panika.
- Psychologický obsah po přepisu označit v PR **„čeká na kontrolu psychologem“**. Nezveřejňovat jako finální bez lidské revize.

Message house (volně použitelné):

- AI může působit osobně, ale není osobou.
- Plynulá konverzace není totéž co vztah.
- Dostupnost 24/7 není totéž co péče.
- Empatický tón není důkazem vědomí ani porozumění.
- Lidská blízkost je pomalejší, náročnější a právě proto skutečná.

## 4. Co se stalo a proč některé věci děláš podruhé

- Červenec 2026: poslední commity v main (prerender pro crawlery, Convex content editor, Mirror Demo, staff hub).
- 26. 8. 2026: multi-lens audit (marketing, SEO, PM, QA).
- 1. 10. 2026: „Rozbor webů Alesvia + Unplugged — cesta k finální verzi“ s ověřenými náhradními statistikami (sekce 7).
- 13. 10. 2026: cloudová větev `fix/fakta-a-technika-2026-10`: statistiky, [Organization Name], canonical, čeština jako výchozí jazyk prerenderu, self-hosted fonty, editorial homepage, zásady dle čl. 13 GDPR, nastavení cookies v patičce, demo bez ukládání ID bez souhlasu.
- ⚠️ Větev nebyla pushnutá a je ztracená. Podle ověření vlastníka 25. 10. 2026 existoval na GitHubu jen main a stará `vercel/install-vercel-web-analytics-gmc2wy`; problémy zůstaly. Úkoly 🔁 je třeba udělat znovu.
- Pushuj průběžně, ať se práce znovu neztratí.

## 5. Pracovní postup

- Nikdy necommituj přímo do main. Pro každý logický celek vlastní větev (`fix/…`, `feat/…`, `content/…`), push hned po prvním commitu a otevřít PR. Vercel vytvoří preview. Merge dělá jen Matias.
- PR: co, proč, trade-offy, konkrétní preview URL cesty pro kontrolu.
- Commit messages anglicky, imperativ, jedna věc na commit.
- `npm run build` = Vite + `scripts/prerender.mjs` (headless Chromium). Pro rychlé ladění `npm run build:client-only`. Před PR plný build bez chyb.
- Po změně hlaviček/obsahu kontrolovat `dist/<route>/index.html`: text, title, canonical, lang. Prerender je kritický pro SEO.
- Convex deploy pouze při produkčním Vercel buildu (`vercel.json`). Preview Convex nedeployuje, ale frontend pravděpodobně používá produkční deployment přes `VITE_CONVEX_URL` v `.env.production`.
- Neměnit `convex/schema.ts`, leda to úkol výslovně potřebuje; pak upozornit v PR. Před prací s Convexem číst `convex/_generated/ai/guidelines.md`.
- CMS: `/admin/content`, tabulka `siteContent`, merge v `components/siteContentHelpers.ts` mohou přebít sektorové a About texty z kódu. Upozornit v PR a požádat Matiase o kontrolu publikovaných přepisů.
- Nesahej na `.env*`, Vercel nastavení, DNS ani produkční data. Potřebné kroky popiš Matiasovi.
- Testovací framework není: plný build, prerender a ruční preview desktop + mobil.

## 6. Backlog

### Fáze 0 — pravdivost a právní minimum (před jakoukoli prezentací)

- [x] **U-01 🔁 Statistiky homepage** — `translations.ts`, `stat_1_*` až `stat_4_*`, `stats_source` (EN ~86–95, CS ~314–323). Nedoložená čísla 40 %, „1 z 5 preferuje AI“, 70 % „stejný vzorec jako závislost“, „0 emocí“ nahradit ověřenými ze sekce 7. Komponenta musí zobrazovat zdroj přímo u každého čísla. Místo „0 emocí“: „Empatický tón není důkazem vědomí ani porozumění.“ Hotovo: každé číslo má studii, rok, vzorek a funkční odkaz, žádná kauzalita z korelace.
- [x] **U-02 🔁 /psychology** — `components/Psychology.tsx`, `psych_*`. Odstranit nepodložené oxytocin/dopamin (`psych_brain_*`), zkreslené Rogersovo unconditional positive regard (`psych_therapist_desc`), nedoložený „alignment tým Anthropicu“ (`psych_partner_desc`, `psych_research_anthropic`), neexistující „MIT 2týdenní studii“ (`psych_research_mit`), „Common Sense 2024, 1 z 5 jako skutečný kamarád + sociální stažení“ (`psych_research_teens`), „2+ hodiny denně“ bez zdroje i tvrzení, že každé emoční potřebování AI je škodlivé. Krok 1 hned: skrýt z navigace/sitemap/prerenderu nebo nahradit stručnou poctivou verzí. Krok 2: přepsat s úrovněmi evidence (vzor /research), PR „čeká na kontrolu psychologem“.
- [ ] **U-03 🔁 Placeholder [Organization Name]** — `privacy_intro`, `privacy_controller_desc` (EN ~200–202, CS ~428–430). ⚠️ Správce před zápisem musí být potvrzen (O-1). Do té doby návrh s jasně označeným místem a otázkou v PR. Sjednotit s alesvia.org.
- [ ] **U-04 🔁 Zásady čl. 13 GDPR** — `components/PrivacyPolicy.tsx`, `privacy_*`. Zpracovatelé Vercel, Convex, Beehiiv, Clerk, Cloudflare; USA a právní základ předávání; uchování; assessment „Save my result“ (co/kam); demo analytika; stížnost ÚOOÚ. Zvážit u poptávky čl. 6 odst. 1 písm. b/f spíš než souhlas. PR: „Doporučeno nechat ověřit právníkem (Frank Bold / ANNO MSK). Agent není právník.“ Blokováno O-1/O-2.
- [ ] **U-05 🔁 Canonical, doména, hreflang** — `index.html`, `components/SEOHead.tsx`, `scripts/prerender.mjs`, `public/sitemap.xml`, `public/robots.txt`, `public/llms.txt`. Rozhodnuto: `https://www.unplugged.cz`. Všechna canonical, og:url, sitemap loc, hreflang, absolutní interní URL na www. Vlastní canonical/og:url pro každou stránku; SEOHead doplnit html[lang], og:locale. 301 z apex domény je Vercel nastavení: dát postup Matiasovi, neměnit. Chybné cs/en hreflang na téže URL do U-10 odstranit. Ověřit všechny prerenderované stránky, např. školy canonical `https://www.unplugged.cz/schools`.
- [x] **U-06 Krizové kontakty** — malá komponenta, patička (`App.tsx`), /psychology, /demo, assessment výsledek. Linka první psychické pomoci 116 123, Linka bezpečí 116 111 (do 26 let), ohrožení života 155/112. Ověřit aktuální provozní doby na webech linek před mergem, datum do PR. Klidný tón: „Když je toho moc, mluv s člověkem.“
- [ ] **U-07 🔁 Nepravdivá tvrzení o sobě** — `who_we_are_title` „kolektiv edukátorů, psychologů a technologů“ přepsat dle sekce 2. `quote_text/quote_author` podepsané Unplugged odstranit nebo ⚠️ podepsat Matiasem po souhlasu. Consulting v `footer_text`, `hero_sub`, `mission_desc`, `what_we_do_title`, `healthy_standards_label`, `audience_companies_desc` nahradit vzděláváním/workshopy/školením; komerční consulting chce Alesvia držet odděleně. Title/OG v index.html česky dle positioningu.
- [ ] **U-08 🔁 Drobné chyby** — `newsletter_lang_cs`: Cesky → Česky; číslování „01 01 01 / 02 02 02“ na About, Schools, Organizations, Initiative (najít příčinu: index sekce/položky nebo CSS counter). Český Assessment v App.tsx → ⚠️ Sebereflexe/Test dle O-5.

### Fáze 1 — finální verze

- [ ] **U-09 🔁 Self-hosted fonty** — `index.html` ~125–126 načítá Inter, Playfair Display, Caveat z Google. Motivace: přenos IP bez souhlasu a rozsudek LG München (2022). Woff2 latin + latin-ext pro češtinu do `public/fonts/`, @font-face v `styles/global.css`, font-display: swap, preload jen hero fontu. Upravit zásady U-04.
- [ ] **U-10 🔁 Čeština a URL per jazyk** — dnes localStorage/prohlížeč v App.tsx ~27–38, lang=en, og:locale=en_US a EN prerender. Cíl CS `/…`, EN `/en/…`, vlastní lang/canonical/hreflang/x-default. Vzor alesvia.org. ⚠️ Před zásahem navrhnout routing/prerender a trade-offy (prefix React Router vs. dvě sady rout) a počkat na souhlas. Mezikrok při odložení: CS výchozí prerender.
- [ ] **U-11 🔁 Hero a hierarchie** — obecné „Technologie, která podporuje lidský život.“ → claim „AI je nástroj. Ne vztah.“ a schválená mise ze sekce 1. Newsletter výš jako aktivum odpovídající veřejné misi.
- [ ] **U-12 CTA a navigace** — ~12 CTA, 7 nav položek, Work With Us/Join the Initiative skoro synonyma. Cíl jedna primární akce pro veřejnost (demo/newsletter), jedna pro instituce. /research, /approach, /psychology po U-02 zařadit/sloučit (např. Proč na tom záleží). ⚠️ Strukturu schválit před implementací.
- [ ] **U-13 🔁 Méně AI-generovaný vzhled** — směr „červená tužka anotuje AI“, editorial/magazín, typografie a anotace, méně scroll fade-inů/glow. Simulovaná focus-group vnímala Playfair + Inter + teplé neutrály jako generické; Caveat anotace, červená tečka a claim jsou rozlišující. Žádný kompletní rebrand před registrací. Načíst skill frontend-design před prací.
- [ ] **U-14 Demo bez JS** — /demo jen Loading demo… Preparing the simulation engine. Přidat statický úvod a popis do HTML (prerender/noscript) pro vyhledávače a náhledy.
- [x] **U-15 🔁 Demo session ID až po souhlasu** — `MirrorDemo.tsx` ~54–61 ukládá `unplugged_demo_session_id` hned. Ukládat jen po analytickém souhlasu (`privacy.ts`, `shouldEnableAnalytics`), jinak ID v paměti návštěvy. Ověřit payload `trackDemoEvent` do Convexu a zahrnout v U-04.
- [x] **U-16 Cookie lišta** — `CookieConsent.tsx`: jednoznačný souhlas/odmítnutí stejně výrazné; patička s Nastavením cookies ke změně volby (🔁).
- [ ] **U-17 OG obrázky per stránka** — dnes sdílený og-image.png; vlastní aspoň /demo, /schools, newsletter.
- [ ] **U-18 Archiv newsletteru** — Beehiiv po dvou týdnech CZ + EN adaptace, zdroje `newsletters/`. Archiv jako čerstvý obsah, SEO, důkaz aktivity. ⚠️ Ruční markdown nebo Beehiiv RSS/API (free plán), zeptat se.
- [ ] **U-19 Lighthouse + přístupnost** — mobil výkon, přístupnost, SEO ≥90. Kontrast, klávesnice, focus, prefers-reduced-motion.

### Fáze 2 — po zápisu (teď nedělat)

- [ ] IČO, sídlo, statutár a rada na webu.
- [ ] Zásady na právnickou osobu jako správce.
- [ ] Vlastní česká data jako hlavní statistika (plánovaný malý průzkum s univerzitou).

## 7. Ověřené náhradní statistiky

Ověřeno vlastníkem 1. 10. 2026. **Před použitím otevři odkaz a zkontroluj číslo.** Anthropic ověřit v původním článku. Níže jde o podklady, nikoli náhradu nové kontroly primárních zdrojů.

| Číslo | Text pro web | Zdroj | Pozor |
| --- | --- | --- | --- |
| 72 % | teenagerů v USA vyzkoušelo AI companion | Common Sense Media, 16. 7. 2025, n=1 060, 13–17 let | Americký vzorek uvést |
| 31 % | teenagerů používajících AI companion hodnotí rozhovor stejně/více uspokojivě než s kamarády | Common Sense Media 2025 (KTVU) | Stejná studie: 80 % stále tráví víc času se skutečnými přáteli; uvést obojí |
| 1 ze 3 | teenagerů řešil vážnou věc raději s AI než s člověkem | Common Sense Media 2025 (NY1/AP) | Náhrada 1 z 5; ověřit jmenovatel |
| korelace | Vyšší denní používání souviselo s vyšší osamělostí, závislostí a menším kontaktem s lidmi | MIT Media Lab + OpenAI, březen 2025, RCT n=981 + analýza konverzací (Silicon Canals) | Korelace, ne příčina. Dohledat primární studii |
| 2,9 % | afektivních konverzací s Claudem; companionship/roleplay pod 0,5 % | Anthropic, červen 2025 | Proti panice: vzácné, ale u některých intenzivní |

## 8. Otevřené otázky (nerozhoduj sám)

- **O-1** Kdo je správcem před zápisem (Matias jako fyzická osoba/jiná forma) a jaký kontaktní e-mail? Blokuje U-03/U-04.
- **O-2 — potvrzeno Matiasem:** Vercel, Convex, Beehiiv a Clerk mají přijaté DPA. Ještě ověřit skutečný region a právní mechanismus případného předávání dat.
- **O-3** Existují publikované CMS přepisy v /admin/content? Matias zatím neví; před mergem ověřit čtením publikovaných hodnot.
- **O-4** Funguje `VERCEL_DEPLOY_HOOK_URL` v Convexu pro rebuild po CMS publikaci? Matias zatím neví. Ověřit v účtu bez změny nastavení a bez zveřejnění tajné URL.
- **O-5 — rozhodnuto:** Český název Assessment je **Sebereflexe**.
- **O-6** Smí být Matias na webu jmenován jako zakladatel s fotkou? Hypotéza simulované focus-group: tvář buduje důvěru více než popis.
- **O-7** Archiv: ruční import nebo Beehiiv?
- **O-8** Primární metrika první fáze: dokončení dema / newsletter / poptávka workshopu?

## 9. Definice plně funkčního webu

- [ ] Každé číslo má konkrétní studii, rok, vzorek a odkaz.
- [ ] Pravdivá tvrzení o právní formě, partnerech, týmu, workshopech.
- [ ] Psychologický obsah schválen psychologem.
- [ ] Žádný placeholder.
- [ ] Claim „AI je nástroj. Ne vztah.“ v hero.
- [ ] Krizové kontakty v patičce, /psychology, /demo.
- [ ] Správce shodný s alesvia.org, zásady pokrývají formuláře, assessment, demo, newsletter a zpracovatele.
- [ ] Analytika až po souhlasu, možnost změnit souhlas.
- [ ] Každý formulář odeslán testem, zpráva dorazila, uživatel má potvrzení.
- [ ] Newsletter přihlášení → potvrzení → uvítací e-mail v obou jazycích.
- [ ] Demo mobil/desktop až do závěrečné CTA; assessment výsledek pro každý segment.
- [ ] Vlastní 404, žádné rozbité odkazy, propojení Unplugged ↔ alesvia.org ↔ newsletter obousměrně.
- [ ] Vlastní canonical per stránka, www doména.
- [ ] Sitemap a robots odpovídají skutečným URL.
- [ ] Čitelnost bez JS, text a nadpisy v prerenderu.
- [ ] Lighthouse mobil ≥90 výkon/přístupnost/SEO.
- [ ] Google Search Console a sitemap (Matias).

## 10. Mimo kód: newsletter a animace

### Newsletter

Beehiiv free: žádné Custom HTML, jen nativní bloky. Šablony/vydání v `newsletters/` (`README-beehiiv-guide.md`). Každé dva týdny, CZ primárně, EN adaptace jako institucionální výkladní skříň, ne růstový kanál. Osobní příběhy (Zrcadlo) jen s informovaným souhlasem/anonymizací. Vydání o emocích/závislosti končí krizovými kontakty.

### Animace

Zdrojová HTML v `marketing/animace/` (pokud chybí, přidat v samostatném PR). Matias je tvůrčí vlastník, Claude dělal kreativního ředitele.

| Spot | Soubor | Délka | Stav |
| --- | --- | --- | --- |
| Pod pokličkou | marketing/animace/pod-poklickou/index.html | 28 s, 1080×1920 | Draft: otázka → AI odpověď → pravděpodobnostní výběr slov pod pokličkou → Empatický tón není důkaz porozumění → Používat AI je v pohodě → claim + Učíme rozpoznat, kdy AI hraje přítele |
| Dva hlasy | marketing/animace/dva-hlasy/index.html | ~23 s | Draft: okamžitá AI odpověď vs. pomalá ručně psaná kamarádova → Lidská blízkost je pomalejší. a právě proto skutečná. |
| Odpojení | jen artefakt | 17 s | Zamítnuto: temné, soudící. Nepoužívat. |

Deterministická `render(t)`, scéna 1080×1920 škálovaná na obrazovku. Export: `window.renderAt(t)`, `window.DURATION`, `window.prepare()`. `?capture` skryje ovládání/vypne škálování. MP4: Python Playwright + headless Chromium, 30 fps `renderAt(i/30)` + screenshot, ffmpeg H.264 `-preset veryfast`, yuv420p. Fonty Playfair Display včetně italic, Caveat, Inter nainstalovat lokálně; při capture blokovat fonts.g* requesty, jinak mohou vzniknout náhradní fonty.

- [ ] **A-1** ~20s Pod pokličkou pro TikTok/Reels, háček do 0,5 s; hypotéza focus-group: slabá první vteřina.
- [ ] **A-2** Popisek/komentář k Dva hlasy: nemít blízkého kamaráda není osobní selhání. Riziko odcizení diváků bez přátel.
- [ ] **A-3** Případně brand manuál (barvy, typografie, červená tužka); formální zatím neexistuje.

Focus group byla simulovaná (syntetické persony), **ne skutečná data**. Hypotézy k ověření na lidech.

Brand: červená #DC2626, teplá bílá #F9F7F2, téměř černá #030712; web i Tailwind stone, ink #1c1917. Playfair Display display, Inter text, Caveat červené ručně psané poznámky.

## 11. Kontext mimo web (nic z toho neřeš v kódu)

Kritická cesta: rada (min. 3 lidé + Matias ředitel, ideálně licencovaný klinik jako garant Praktiků) → zápis Krajský soud Ostrava → Fio účet → granty (Via, Avast/Gen, později OSF, Neuron, Visegrad Fund) → ÚPV ochranné známky, třídy 41/42/45.

Další krok mimo kód: kontakt z Psychologické sítě pro radu/garanta. Impact Hub Ostrava lze oslovit před registrací. Interní nástroje ClickUp, Google Apps Script, Wedos .cz, Namecheap, Hostinger.

alesvia.org řeší jiný agent v jiném repu; tady jen konzistence správce a odkazů. Pokud Matias otevírá velké nové nápady místo webu, lze jemně připomenout riziko rozšiřování záběru a blokátor registrace.

## Průběžný stav implementace

- U-01: opraveno CS i EN, primární report Common Sense Media (2025), grafy A/E/G/I. Ověřeno 25. 10. 2026. Graf E používá celý vzorek n=1 060; G/I podskupinu n=758. Psychologická kontrola před mergem stále nutná. Plný build včetně 13 rout prošel.
