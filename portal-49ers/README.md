# Faithful Brasil — página inicial

Página inicial para um portal brasileiro independente de torcedores do San Francisco 49ers. O layout usa HTML semântico e CSS; o JavaScript puro é usado apenas na interação do Torcidômetro.

## Estrutura

```text
faithful-brasil-portal/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── main.js                  # Torcidômetro interativo
├── assets/
│   └── images/
│       ├── faithful-mark.svg          # símbolo autoral inspirado na Gold Rush
│       ├── hero-49ers-desktop.webp     # hero fotográfico otimizado
│       ├── hero-49ers-mobile.webp      # recorte vertical leve para celular
│       ├── hero-49ers-desktop.svg      # fallback vetorial
│       └── hero-49ers-mobile.svg       # fallback vetorial mobile
└── pages/
    ├── history/
    │   └── index.html           # página futura
    ├── records-trivia/
    │   └── index.html           # página futura
    ├── official-shop/
    │   └── index.html           # página futura
    ├── community/
    │   └── index.html           # página futura
    └── contact/
        └── index.html           # página futura
```

As páginas internas ainda não foram criadas; os links do menu já apontam para os caminhos planejados em inglês. Para evitar links quebrados enquanto desenvolve as páginas restantes, crie cada `index.html` correspondente ou ajuste temporariamente o `href`.

## Imagens do hero

O `<picture>` no `index.html` seleciona `hero-49ers-mobile.svg` em telas de até **520 px** e usa `hero-49ers-desktop.svg` nas demais. O hero usa WebP otimizado e arte fotográfica original criada para este projeto, com torcida em vermelho e dourado, bandeira e estádio. O `<picture>` seleciona `hero-49ers-mobile.webp` em telas de até **520 px** e `hero-49ers-desktop.webp` nas demais, com os SVGs como fallback. As duas imagens WebP somam cerca de 288 KB.

## Torcidômetro

O bloco “Garimpo da Faithful” usa JavaScript puro em `js/main.js`. Cada clique avança 10% no progresso; ao alcançar 100%, uma explosão visual celebra a conclusão e a interface pergunta se a pessoa quer cavar de novo. O progresso tem `role="progressbar"`, valores ARIA atualizados e mensagens anunciadas por região `aria-live`. O JavaScript foi implementado com auxílio de IA, conforme registrado no comentário do arquivo.

## Identidade visual e marcas

`faithful-mark.svg` é um símbolo original do portal, formado por ferramentas de garimpo e uma pepita, como referência visual à corrida do ouro da Califórnia. Ele **não é um logotipo oficial dos 49ers**. O San Francisco 49ers informa em seus termos que seus logotipos e marcas são protegidos; por isso, o projeto não apresenta um símbolo oficial como se fosse de uso livre. Para publicar um portal, use apenas marcas oficiais com a autorização/licença apropriada e mantenha a indicação de que o projeto é independente.

## Acessibilidade e responsividade

- Documento em `pt-BR`, landmarks semânticos, hierarquia de títulos e link para pular ao conteúdo.
- Foco de teclado visível, links com nomes compreensíveis, texto alternativo vazio para a arte decorativa e suporte a `prefers-reduced-motion`.
- Navegação com cinco colunas iguais em desktop, três colunas em tablets e duas em celulares; botões de ação passam a ocupar a largura disponível em telas pequenas.
- Layout fluido, tipografia responsiva e sem tabelas largas na página inicial.

## Como abrir

Abra `index.html` no navegador. As fontes do Google Fonts precisam de conexão; há fontes de sistema como fallback.
