import { Html, Head, Main, NextScript } from "next/document"

// Netlify Identity is only needed when an invite/recovery link lands on the
// site, so the widget is loaded on demand instead of on every page view.
const identityLoader = `
  if (/(invite|recovery|confirmation|email_change)_token=/.test(location.hash)) {
    var s = document.createElement("script");
    s.src = "https://identity.netlify.com/v1/netlify-identity-widget.js";
    s.onload = function () {
      window.netlifyIdentity.on("login", function () { document.location.href = "/admin/"; });
    };
    document.head.appendChild(s);
  }
`

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <meta name="theme-color" content="#0a0a0f" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script dangerouslySetInnerHTML={{ __html: identityLoader }} />
      </body>
    </Html>
  )
}
