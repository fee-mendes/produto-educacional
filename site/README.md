# Go e Gomoku Narabe na escola — Produto Educacional

> Universidade Presbiteriana Mackenzie · Pedagogia · Educação Especial e Libras · 2026/1

Site estático que apresenta o produto educacional **"Interdisciplinaridade, aprendizado e equidade na educação: perspectivas a partir de jogos orientais"**, uma sequência didática inclusiva e interdisciplinar para o Ensino Fundamental II, fundamentada nos jogos asiáticos **Go** e **Gomoku Narabe**.

## Equipe

- Diogo Silva Marques — RA 10777108
- Felipe Cardeneti Mendes — RA 10766330
- Luan Tenorio de Souza Rego — RA 10754860
- Sara Reis da Silva — RA 10781338

## Conteúdo do site

- **Início** (`index.html`) — Apresentação geral do projeto.
- **Sobre o projeto** (`sobre.html`) — Apresentação, justificativa, objetivos e fundamentação teórica (DUA, interculturalidade crítica, perspectiva bilíngue).
- **O Go** (`go.html`) — História, regras com diagramas SVG e complexidade.
- **Gomoku Narabe** (`gomoku.html`) — Origem e regras, com diagrama de vitória.
- **Sequência didática** (`sequencia-didatica.html`) — As cinco etapas para um semestre letivo.
- **Para professores** (`professores.html`) — Quadro 1 (DUA × áreas de conhecimento) e considerações inclusivas.
- **Recursos** (`recursos.html`) — Downloads, referências bibliográficas, autores e nota de acessibilidade.

## Acessibilidade

O site segue diretrizes da **WCAG (W3C)** e oferece:

- **Controles de acessibilidade na barra superior**: tamanho do texto (4 níveis), alto contraste, tema escuro, fonte de leitura facilitada (estilo dislexia) e botão para restaurar o padrão. As preferências são persistidas em `localStorage`.
- **Navegação 100% por teclado**, com indicadores visíveis de foco.
- **Skip link** para pular direto ao conteúdo principal.
- **Estrutura semântica HTML5** (`<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`, `<figure>`).
- **ARIA labels** em controles, regiões e diagramas; `aria-current="page"` no link ativo.
- **Diagramas SVG** com `<title>` e `<desc>` para leitores de tela.
- **Respeita `prefers-reduced-motion`** e `prefers-color-scheme`.
- **Integração com [VLibras](https://vlibras.gov.br)** — tradutor automático de Português para Libras.
- **Print stylesheet** simplificada para impressão.

## Como funciona / Tecnologia

Site **100% estático** (HTML, CSS e JavaScript "vanilla"), sem dependência de linguagens de servidor — pronto para hospedagem em **GitHub Pages**, **Netlify**, **Cloudflare Pages** ou qualquer servidor de arquivos estáticos.

Não há etapa de build: basta copiar os arquivos para o servidor.

### Estrutura de pastas

```
site/
├── index.html
├── sobre.html
├── go.html
├── gomoku.html
├── sequencia-didatica.html
├── professores.html
├── recursos.html
├── README.md
├── .nojekyll                  # impede o Jekyll do GitHub Pages de processar
├── robots.txt
├── assets/
│   ├── css/
│   │   └── style.css          # estilos completos com temas
│   ├── js/
│   │   └── main.js            # acessibilidade + navegação
│   └── img/                   # (reservado para futuras imagens)
└── docs/
    ├── produto-educacional.pdf
    └── introducao-go-gomoku.pdf
```

## Hospedagem no GitHub Pages

1. Crie um repositório no GitHub (por exemplo, `produto-educacional-go`).
2. Copie os arquivos da pasta `site/` para o repositório.
3. No repositório, vá em **Settings → Pages**.
4. Em **Source**, selecione **Deploy from a branch** e escolha `main` / `(root)`.
5. Aguarde alguns instantes; o site estará disponível em `https://SEU-USUARIO.github.io/SEU-REPOSITORIO/`.

O arquivo `.nojekyll` já está incluído para garantir que o GitHub Pages sirva os arquivos sem processá-los como Jekyll.

## Licença

Conteúdo disponibilizado sob licença [Creative Commons Atribuição-CompartilhaIgual 4.0 Internacional (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/deed.pt-br).

Você pode compartilhar e adaptar o material para qualquer fim, inclusive comercial, desde que dê crédito apropriado, indique se foram feitas mudanças e distribua suas contribuições sob a mesma licença.

## Créditos de imagens e diagramas

Os diagramas dos tabuleiros foram redesenhados em SVG para máxima acessibilidade e escalabilidade, inspirados nas representações tradicionais utilizadas pelas comunidades de Go ao redor do mundo. As regras e exemplos seguem a documentação consolidada por [Nordic Go Dojo](https://www.nordicgodojo.eu/post/212/a-simple-beginners-guide-to-go), [Sensei’s Library](https://senseis.xmp.net) e [Online-go.com](https://forums.online-go.com).
