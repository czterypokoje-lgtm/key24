import Document, {
  Html,
  Head,
  Main,
  NextScript,
  type DocumentContext,
} from "next/document";
export default class SiteDocument extends Document<{ locale: string }> {
  static async getInitialProps(ctx: DocumentContext) {
    const props = await Document.getInitialProps(ctx);
    return {
      ...props,
      locale: ctx.query.locale === "de-DE" ? "de-DE" : "en-GB",
    };
  }
  render() {
    return (
      <Html lang={this.props.locale}>
        <Head>
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
