import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Lexend+Exa:wght@100..900&display=swap"
        rel="stylesheet"
      />
      <script src="https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js"></script>
      <script src="https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore-compat.js"></script>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
