import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>케어콘텐츠 AI - 방문요양 마케팅 AI 도우미</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    primary: {
                      50: '#f0f9fa',
                      100: '#d9f0f2',
                      200: '#b6e1e6',
                      300: '#84cad3',
                      400: '#4aa9b8',
                      500: '#4A90A4',
                      600: '#3a7589',
                      700: '#335f70',
                      800: '#2f4f5c',
                      900: '#2b434e',
                    }
                  }
                }
              }
            }
          `
        }} />
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <link href="/static/style.css" rel="stylesheet" />
      </head>
      <body class="bg-gray-50 min-h-screen">
        {children}
        <script src="/static/app.js"></script>
      </body>
    </html>
  )
})
