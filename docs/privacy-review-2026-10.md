# Privacy notice — draft for owner and legal review

Stav 26. 10. 2026. Interní podklad pro U-03/U-04, **není text schválený k publikaci**. Matias potvrdil přijaté DPA Vercel, Convex, Beehiiv a Clerk a to, že do zápisu je správcem jako fyzická osoba. Kontaktní údaje, konkrétní mechanismy předávání a lhůty ještě nejsou potvrzené. Alesvia z.ú. není zapsaná; nelze ji uvést jako existujícího správce. Budoucí přechod správcovství na právnickou osobu je úkol fáze 2, ne současný stav.

**Doporučeno nechat ověřit právníkem (Frank Bold / ANNO MSK). Agent není právník.**

## Ověřené datové toky v kódu

| Účel | Data a tok | Co ještě potvrdit |
| --- | --- | --- |
| Poptávka / zapojení | JoinForm / JoinInitiative → `submissions.create` → Convex `leads`: jméno, e-mail, údaje o organizaci/roli/potřebě, zpráva, zdrojová stránka, případné označení scénáře dema, consent, čas a stav | Schránka/obsluha poptávek, právní titul, doba uchování. Mutation sama neposílá e-mail. |
| Newsletter | Newsletter → Convex `newsletter`: e-mail, jazyk, čas; poté přesměrování na Beehiiv magic link s e-mailem v URL | Preference jazyka se v tomto přesměrování neposílá. Potvrdit double opt-in, uvítací e-mail a rušení záložních záznamů v Convexu po odhlášení. |
| Assessment | Výpočet lokálně; až „Uložit výsledek“ → Convex `assessmentRuns`: segment, pět odpovědí, skóre, doporučená nabídka, čas | Bez jména/e-mailu v payloadu, ale neslibovat úplnou anonymitu síťových logů. Potvrdit účel ukládání, právní titul a lhůtu. |
| Demo | `trackDemoEvent` → Convex `demoEvents`: session ID, typ události, scénář, publikum, jazyk, větev, krok, výsledek, cíl CTA a čas | Zprávy uživatele nejsou součástí tohoto payloadu. Původně bez souhlasu; U-15 v této větvi přidává kontrolu souhlasu. Potvrdit uchování existujících záznamů. |
| Analytika webu | Vercel Analytics až po souhlasu (`AnalyticsGate`), respektuje DNT/GPC | Účet, přesná konfigurace a uchování. |
| Staff | Clerk autentizace a Convex role | Právní titul, životní cyklus účtů, oprávněné osoby. |
| Provoz webu | Vercel hosting, Convex backend. U-09 přesouvá fonty na vlastní doménu. | Hosting regiony, logy, subprocesory. Po mergi U-09 web kvůli fontům nekontaktuje Google; zdrojové fonty byly staženy při vývoji. Cloudflare je v handoffu, ale v aplikačním kódu nebylo nalezeno zapojení: potvrdit infrastrukturu, nevymýšlet roli. |

Ve zkontrolovaných mutations není mechanismus automatického výmazu. Zvolenou dobu uchování je nutné také provozně zajistit, nestačí ji napsat do zásad. Žádná produkční data nebyla ručně upravena ani formuláře odeslány jako test.

## Připravený text CS / EN (doplnit až po potvrzení)

**Správce / Controller**

CS: Správcem osobních údajů pro projekt Unplugged je **Matias Bunnik jako fyzická osoba**, kontaktní adresa **[POTVRDIT O-1: adresa správce]**. Pro uplatnění práv nás kontaktujte na **[POTVRDIT O-1: zda zachovat info@unplugged.cz]**. Registraci Alesvia z.ú. připravujeme.

EN: The controller for the Unplugged project is **Matias Bunnik, acting as an individual**, contact address **[CONFIRM O-1: controller contact address]**. To exercise your rights, contact **[CONFIRM O-1: whether to retain info@unplugged.cz]**. We are preparing the registration of Alesvia z.ú.

**Zpracování / Processing**

CS: Kontaktní údaje a obsah poptávky používáme k vyřízení vašeho požadavku. Newsletter zajišťuje Beehiiv; e-mail a jazykovou preferenci ukládáme také v Convexu. Výsledek assessmentu se odešle do Convexu až po zvolení „Uložit výsledek“. Volitelná analytika webu a dema se spouští po souhlasu; do analytiky dema se neposílá text vašich zpráv.

EN: We use your contact details and inquiry to respond to your request. Beehiiv provides the newsletter; we also store your email and language preference in Convex. Assessment results are sent to Convex only when you choose “Save my result”. Optional website and demo analytics require consent; demo analytics do not include the text of your messages.

Poslední dvě věty o analytice publikovat pouze s ověřeným U-15. Odkaz na změnu cookies doplnit s U-16.

**Právní tituly — návrh k rozhodnutí, ne potvrzené skutečnosti**

- Poptávka smluvní služby: zvážit čl. 6 odst. 1 písm. b pro kroky na žádost zájemce před smlouvou. Není automaticky vhodný pro každou dobrovolnickou nebo obecnou zprávu.
- Obecná korespondence: zvážit písm. f, pojmenovat oprávněný zájem a provést balanční test. Nezaměňovat s libovolným univerzálním souhlasem.
- Newsletter / volitelná analytika: návrh souhlasu dle písm. a; prověřit důkaz souhlasu a odvolání. Checkbox formuláře dnes nelze bez dalšího přejmenovat, dokud se nevybere právní titul.
- Uložení assessmentu a staff účty: rozhodnout dle skutečného účelu, nezavádět titul jen podle technického ukládání.

**Uchování — varianty pro Matiase**

- Neuzavřené poptávky: návrh výmazu po 12 měsících od posledního kontaktu; kratší lhůta snižuje objem dat, delší usnadňuje dlouhé institucionální rozhodování. Schválit a zavést výmaz; smluvní/účetní záznamy posoudit zvlášť.
- Demo / assessment: návrh 90 dní pro jednotlivé záznamy a poté skutečně anonymní souhrny; trade-off je omezená historická analýza. Dnes výmaz není implementován.
- Newsletter: do odhlášení, následně jen nezbytný záznam k doložení souhlasu či respektování odhlášení po potvrzenou lhůtu. Odhlášení musí pokrýt Beehiiv i Convex kopii.

**Zpracovatelé a předávání / Processors and transfers**

Potvrdit právní názvy a přijaté DPA Vercel, Convex, Beehiiv, Clerk; Cloudflare podle skutečného zapojení. Pro každou službu zkontrolovat region, další zpracovatele a případné přístupy z USA. Netvrdit automaticky EU–US DPF nebo standardní smluvní doložky bez ověření konkrétní entity, smlouvy a rozsahu. Do finálního textu doplnit používaný mechanismus a možnost získat kopii záruk.

**Práva / Rights**

CS: Podle podmínek GDPR můžete požadovat přístup, opravu, výmaz, omezení zpracování a přenositelnost údajů. Proti zpracování na základě oprávněného zájmu můžete vznést námitku. Souhlas můžete odvolat, aniž tím ovlivníte zákonnost předchozího zpracování. Můžete podat stížnost u Úřadu pro ochranu osobních údajů: https://uoou.gov.cz/.

EN: Subject to the GDPR's conditions, you may request access, rectification, erasure, restriction and portability of your data. You may object to processing based on legitimate interests. You may withdraw consent without affecting the lawfulness of earlier processing. You may lodge a complaint with the Czech Office for Personal Data Protection: https://uoou.gov.cz/.

Do finálního textu doplnit, které údaje jsou nezbytné pro odpověď/odběr, důsledky jejich neposkytnutí a popis automatického orientačního vyhodnocení assessmentu (nevydávat jej za klinickou diagnózu nebo právně závazné rozhodnutí).

## Podklady a návaznosti

- GDPR, zejména články 6, 13, 28 a kapitola V: https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng
- Před publikací sjednotit správce a kontakt s alesvia.org (tamní agent; tento PR nesahá do sesterského repa).
- U-03 a U-04 zůstávají neodškrtnuté do potvrzení O-1/O-2, doplnění lhůt a právní revize.
