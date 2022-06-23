import Document, { Html, Head, Main, NextScript } from "next/document";
export class MyDocument extends Document {
  // should be always a class based
  render() {
    return (
      <Html>
        <Head />
        <body>
          {/* can be used as portals */}
          <div id="overlays" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
