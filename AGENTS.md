# digenaldo.com

Site pessoal de Digenaldo Neto: professor, security engineer, software engineer, pesquisador e autor técnico.

Stack travada: **React + Next.js (App Router) + static export + Firebase Hosting**.
Hugo e PaperMod são legado. Não voltar. Não usar o tema. Não gerar páginas com `hugo`.
Não usar `deploy.sh` (force-push em `gh-pages`). Deploy: `npm run build` e `firebase deploy --only hosting`.

## Posicionamento

Pesquisa. Engenharia. Ensino. Cybersecurity como linguagem profissional principal.

Chrome da interface: **pt-BR**.
Artigos existentes: **inglês**, sem traduzir título nem corpo.

## Arquitetura

```text
content/*.md  →  Next.js build (output: 'export')  →  out/  →  Firebase Hosting
```

- Sem App Hosting, Functions, Auth, Firestore.
- Sem servidor Node em produção. Redirects e headers vivem em `firebase.json`.
- Imagens em `public/images/`. Markdown em `content/`.
- Motion: Remotion (`@remotion/player`), carregado sob demanda. Ver seção Motion.
- Curso em HTML estático em `public/cursos/`. Não envolver o layout do site.

## Rotas canônicas (v1)

| Rota | Função |
|---|---|
| `/` | Home |
| `/artigos/` | Lista |
| `/artigos/[slug]/` | Artigo (EN) |
| `/projetos/` | Projetos e experimentos |
| `/ensino/` | Ensino |
| `/cursos/ia-na-pratica.html` | Curso em slides (público, sem gate) |
| `/pesquisa/` | Pesquisa (só fatos do Sobre + links) |
| `/sobre/` | Sobre |
| `/tags/[tag]/` | Tags (URLs preservadas) |
| `/categories/[category]/` | Categorias (URLs preservadas) |
| `/index.xml` | RSS |

301 obrigatórios em `firebase.json`: `/posts/` → `/artigos/`, `/posts/:slug/` → `/artigos/:slug/`, `/cursos/` → `/ensino/`. Não redirecionar `/cursos/ia-na-pratica.html`.

## Design

Hacker profissional: terminal/CLI como linguagem visual (prompt, cursor, mono, `./links`), legível e sóbrio. Alinhado ao Instagram @digenaldo.neto, sem virar caricatura (nada de caveira, cadeado, HUD de filme).
Estilo: **Tailwind CSS v4** apenas. Tokens em `src/app/globals.css` (`@theme`). Sem Bulma, SCSS, CSS Modules.
Paleta: fundo `#0A0B0A`, painel `#0F1311`, tinta `#E6EDE9`, sinal verde `#4ADE80`, ciano `#67E8F9` pontual. Contraste WCAG AA verificado por par.
Tipo: JetBrains Mono (títulos, meta, UI) + Inter (texto corrido). Self-hosted via `next/font`.
Radius 0. Header com prompt + navegação `./rota`. Texto real (h1, parágrafos) sempre em HTML, nunca só dentro de animação.

## Motion

Toda animação autônoma do site é Remotion. Hover/foco podem usar `transition` CSS.
- Composições em `src/remotion/compositions/`, registradas em `src/remotion/registry.ts` (site) e `src/remotion/Root.tsx` (Studio: `npm run studio`).
- Nas páginas, use sempre `<Motion id=… />` (`src/components/motion/Motion.tsx`): mede o container (composição fluida, sem escala), só monta o Player ao entrar na tela, pausa fora dela, e com `prefers-reduced-motion: reduce` não baixa o Remotion e mostra `fallback` estático.
- Animação é decorativa (`aria-hidden`, `inert`). Informação equivalente fica no HTML.
- Dentro das composições: `useCurrentFrame()` + `interpolate()`, estilos inline. Nada de `transition`/`animate-*`.
- Sem scroll hijack, cursor fake, splash, Three.js, GSAP.

## Conteúdo

Não inventar papers, cargos, depoimentos ou cursos.
Não apagar Markdown dos 5 posts.
Não servir o `gate.js` antigo.

## Qualidade

LCP < 2.5s, INP < 200ms, CLS < 0.1.
Lighthouse: Performance ≥ 90, A11y ≥ 95, BP ≥ 95, SEO ≥ 95.
WCAG 2.2 AA. `lang` correto no chrome (pt-BR) e `lang="en"` no `<article>` dos posts.

## Cutover de digenaldo.com

O domínio continua no GitHub Pages (`gh-pages`) até o DNS apontar para o Firebase.
Publicar no projeto `digenaldo-com` não troca o domínio sozinho.
Não conectar o domínio no Firebase sem o passo de DNS no registrador.
