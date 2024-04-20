import { FOOTER_BLOCKS } from "../Global/constants";

const FooterBlock = ({ title, links }: { title: string; links: string[] }) => {
  return (
    <div className="footer__block">
      <div className="footer__link--title">{title}</div>
      <div>
        {links.map((link, i) => (
          <div key={i} className="footer__link--wrapper">
            <a className="footer__link">{link}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

function Footer() {
  return (
    <section id="footer">
      <div className="container">
        <div className="row">
          <div className="footer__top--wrapper">
            {FOOTER_BLOCKS.map(({ title, links }, i) => (
              <FooterBlock key={i} title={title} links={links} />
            ))}
          </div>
          <div className="footer__copyright--wrapper">
            <div className="footer__copyright">
              Copyright &copy; 2023 Bookify.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
