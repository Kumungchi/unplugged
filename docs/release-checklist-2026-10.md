# Phase 0 review and release checklist

PR: https://github.com/Kumungchi/unplugged/pull/2. Merge provádí Matias.

## Review in the Vercel preview

- `/`: statistiky se zdrojem a vzorkem u každého údaje, pravdivý popis vznikající iniciativy. Přepnout také na EN.
- `/psychology`: studie / limity / interpretace, žádná neurochemická tvrzení. **Čeká na kontrolu psychologem.**
- `/schools`, `/organizations`, `/about`, `/initiative`: číslování postupuje uvnitř každého seznamu. Ověřit také mobil.
- `/assessment`: český název Sebereflexe a kontakty na pomoc za výsledkem. Při kontrole neklikat na „Uložit výsledek“, dokud není potvrzen testovací deployment.
- `/demo`: před souhlasem nevzniká `unplugged_demo_session_id`, neodesílá se `trackDemoEvent`. Po odmítnutí či odvolání souhlasu se staré ID odstraní. Souhlas lze znovu otevřít přes patičku. Test povolené analytiky dělat na izolovaném backendu nebo s blokovaným zápisem, protože preview může používat produkční Convex.
- `/privacy`: Matias potvrdil, že do zápisu je správcem jako fyzická osoba; placeholder organizace byl odstraněn v CS/EN. Finální U-03/U-04 ještě čekají na kontaktní údaje a další potvrzení z `docs/privacy-review-2026-10.md`. Stávající e-mail `info@unplugged.cz` je zatím zachovaný, jeho správnost má Matias potvrdit.
- Patička každé veřejné stránky: krizové telefony mají `tel:` odkazy, telefonní dostupnost a odkazy na provozovatele. Ověřeno 26. 10. 2026.

Psychologický obsah: **čeká na kontrolu psychologem**. Právní návrh: **Doporučeno nechat ověřit právníkem (Frank Bold / ANNO MSK). Agent není právník.**

## CMS

26. 10. 2026: veřejná query `siteContent:getPublishedContentBulk` na produkčním deploymentu uvedeném v CLAUDE.md vrátila prázdné publikované přepisy pro 65 klíčů About a všech sektorů, v CS i EN. Změny výchozího textu tedy nebyly v tu chvíli přebité CMS. Před mergem zkontrolovat znovu, pokud mezitím někdo publikuje.

Funkčnost Deploy Hooku není ověřena. Matias může v Convex dashboardu zkontrolovat přítomnost `VERCEL_DEPLOY_HOOK_URL` a logy posledního `siteContentActions.triggerRebuild`. Tajnou hodnotu nikam nekopírovat. Aktivní test vyvolá rebuild; je vhodné jej provést až ve schváleném termínu. Tento PR nastavení nemění.

## Primary domain redirect — Matias

Vercel → projekt Unplugged → Settings → Domains:

1. Zkontrolovat, že `www.unplugged.cz` je připojena k produkci.
2. U domény `unplugged.cz` nastavit redirect na `www.unplugged.cz` a permanentní stav **301**, je-li tato volba v účtu dostupná.
3. Ověřit `https://unplugged.cz/schools`: odpověď musí trvale přesměrovat na `https://www.unplugged.cz/schools`, zachovat cestu i případný query string a nevytvářet smyčku.
4. Ověřit, že výsledná stránka má canonical `https://www.unplugged.cz/schools`.

Názvy položek se mohou v aktuálním Vercel UI lišit; rozhodující je výsledná HTTP odpověď. Neřešit tento krok změnou DNS bez kontroly stávajícího nastavení. Agent nastavení domén neměnil.

Podklad: [Vercel — Deploying and Redirecting Domains](https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting).

Navazující U-10 byl schválen: v jeho větvi mají CS a EN vlastní URL (`/schools` a `/en/schools`), párový prerender a reciproční hreflang s českým x-default. Přepínač zachovává query a fragment. Samotné rodičovské PR #2 ještě používá společnou URL; vlastní jazykové URL přicházejí až v navazujícím PR pro U-10.

## Verification limits

Plný `npm run build` zahrnuje všech 13 veřejných rout a kontroluje jejich canonical, `og:url`, český `lang` a nepřítomnost demo session ID. Nezahrnuje odesílání formulářů, kontrolu doručení e-mailů ani právní či psychologické schválení.

V navazujícím U-10 build generuje všech **26 jazykových URL** a kontroluje také jazyk, locale a všechny alternativy každé stránky. Testy `npm run test:routes` ověřují rozpoznání prefixu, přepínač s parametry/fragmentem, sitemap a skutečné chování React Router Link s basename. Ručně ověřit také `/en`, `/en/`, mobilní menu, anglickou 404 a `noindex` staff stránek.
