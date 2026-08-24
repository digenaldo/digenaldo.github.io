# digenaldo.com

Site pessoal de Digenaldo Neto: professor, security engineer, software engineer, pesquisador e autor técnico.

Stack travada: **React + Next.js (App Router) + static export + Firebase Hosting**.
Hugo e PaperMod são legado. Não voltar. Não usar o tema. Não gerar páginas com `hugo`.
Não usar `deploy.sh` (force-push em `gh-pages`). Deploy: `npm run build` e `firebase deploy --only hosting`.

## Posicionamento

Pesquisa. Engenharia. Ensino.

Chrome da interface: **pt-BR**.
Artigos existentes: **inglês**, sem traduzir título nem corpo.

## Arquitetura

```text
content/*.md  →  Next.js build (output: 'export')  →  out/  →  Firebase Hosting
```

- Sem App Hosting, Functions, Auth, Firestore.
- Sem servidor Node em produção. Redirects e headers vivem em `firebase.json`.
- Imagens em `public/images/`. Markdown em `content/`.
- GSAP só em client components, nunca no critical path de artigo.
- Curso em HTML estático em `public/cursos/`. Não envolver o layout do site.

## Rotas canônicas (v1)

| Rota | Função |
|---|---|
| `/` | Home |
| `/artigos/` | Lista |
| `/artigos/[slug]/` | Artigo (EN) |
| `/ensino/` | Ensino |
| `/cursos/ia-na-pratica.html` | Curso em slides (público, sem gate) |
| `/pesquisa/` | Pesquisa (só fatos do Sobre + links) |
| `/sobre/` | Sobre |
| `/tags/[tag]/` | Tags (URLs preservadas) |
| `/categories/[category]/` | Categorias (URLs preservadas) |
| `/index.xml` | RSS |

301 obrigatórios em `firebase.json`: `/posts/` → `/artigos/`, `/posts/:slug/` → `/artigos/:slug/`, `/cursos/` → `/ensino/`. Não redirecionar `/cursos/ia-na-pratica.html`.

## Design

Editorial técnico. Papel + preto + vermelho ~10%. Sem aesthetic de SOC, Matrix, SaaS, template Tailwind ou tema Hugo.
Tokens em `src/styles/tokens.css`. Estilo: **CSS Modules**. Sem Tailwind.
Tipo: Geist (display/body) + Geist Mono (meta). Self-hosted via `next/font`.
Radius 0–2px. Artigo 680–760px. Sem dark-mode toggle na v1; seções pretas são narrativa, não tema.

## Motion

GSAP + ScrollTrigger. View Transitions nativas se existirem. Sem scroll hijack, cursor fake, splash, Three.js.
Respeitar `prefers-reduced-motion: reduce`.
Artigos: motion mínimo. Home: o lugar da identidade.

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
