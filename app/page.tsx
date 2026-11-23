const documents = [
  {
    number: "01",
    category: "Foundation",
    title: "Enterprise Constitution",
    description:
      "The foundational principles and highest level of authority in the LUXIONEX governance model.",
    href: "https://github.com/Ramyromel/luxionex/blob/main/docs/source/constitution/Enterprise-Constitution.md",
  },
  {
    number: "02",
    category: "Framework",
    title: "Governance Framework",
    description:
      "How principles become a coherent system of standards, policies, controls, and verification.",
    href: "https://github.com/Ramyromel/luxionex/blob/main/docs/source/framework/Governance-Framework.md",
  },
  {
    number: "03",
    category: "Security",
    title: "Security Policy",
    description:
      "Security requirements and governance expectations for the LUXIONEX documentation framework.",
    href: "https://github.com/Ramyromel/luxionex/blob/main/docs/source/policies/core/Security-Policy.md",
  },
  {
    number: "04",
    category: "Evidence",
    title: "Evidence Governance Standard",
    description:
      "Guidance for collecting, classifying, retaining, and tracing governance evidence.",
    href: "https://github.com/Ramyromel/luxionex/blob/main/docs/source/standards/core/Evidence-Governance-Standard.md",
  },
  {
    number: "05",
    category: "Verification",
    title: "Verification Procedure",
    description:
      "A repeatable process for checking governance requirements and recording outcomes.",
    href: "https://github.com/Ramyromel/luxionex/blob/main/docs/source/procedures/core/Verification-Procedure.md",
  },
];

const layers = [
  "Constitution",
  "Framework",
  "Standards",
  "Policies",
  "Controls",
  "Procedures",
  "Specifications",
  "Templates",
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a aria-label="LUXIONEX home" className="wordmark" href="#">
          <span className="wordmark-mark" aria-hidden="true">
            L
          </span>
          LUXIONEX
        </a>
        <nav aria-label="Main navigation" className="main-nav">
          <a href="#framework">Framework</a>
          <a href="#library">Document library</a>
          <a
            className="nav-link-external"
            href="https://github.com/Ramyromel/luxionex"
            rel="noreferrer"
            target="_blank"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <section aria-labelledby="hero-title" className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" aria-hidden="true" />
            Governance framework <span className="eyebrow-divider">/</span> v0.1
          </p>
          <h1 id="hero-title">
            Build with clarity.
            <br />
            Govern with <span>evidence.</span>
          </h1>
          <p className="hero-description">
            A practical governance library for architecture, security, risk, and
            responsible system evolution. Principles made actionable through
            standards, controls, and verification.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#library">
              Explore the library <span aria-hidden="true">↓</span>
            </a>
            <a
              className="button button-secondary"
              href="https://github.com/Ramyromel/luxionex"
              rel="noreferrer"
              target="_blank"
            >
              View repository <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="draft-note">
            Foundational release <span aria-hidden="true">·</span> Documents are
            evolving
          </p>
        </div>
        <div aria-label="Governance hierarchy diagram" className="hero-visual">
          <div className="visual-topline">
            <span>GOVERNANCE MODEL</span>
            <span>01 — 08</span>
          </div>
          <div className="hierarchy">
            {layers.map((layer, index) => (
              <div className="hierarchy-row" key={layer}>
                <span className="hierarchy-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="hierarchy-label">{layer}</span>
                {index === 0 && <span className="hierarchy-tag">Authority</span>}
                {index === layers.length - 1 && (
                  <span className="hierarchy-tag">Resources</span>
                )}
              </div>
            ))}
          </div>
          <p className="visual-caption">
            A traceable path from principle to practice.
          </p>
        </div>
      </section>

      <section aria-label="Framework principles" className="principles">
        <p>Designed around</p>
        <ul>
          <li>Clear authority</li>
          <li>Evidence-based decisions</li>
          <li>Security by design</li>
          <li>Continuous verification</li>
        </ul>
      </section>

      <section aria-labelledby="framework-title" className="framework" id="framework">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / The framework</p>
            <h2 id="framework-title">From principle to practice.</h2>
          </div>
          <p className="section-intro">
            Each layer has a distinct role. Together, they keep decisions
            consistent, explainable, and reviewable.
          </p>
        </div>
        <div className="framework-flow">
          <div>
            <span>01</span>
            <h3>Set direction</h3>
            <p>Constitution and framework establish principles and authority.</p>
          </div>
          <span aria-hidden="true" className="flow-arrow">
            →
          </span>
          <div>
            <span>02</span>
            <h3>Make it actionable</h3>
            <p>Standards, policies, and controls define clear expectations.</p>
          </div>
          <span aria-hidden="true" className="flow-arrow">
            →
          </span>
          <div>
            <span>03</span>
            <h3>Verify and improve</h3>
            <p>Procedures, specifications, and templates support execution.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="library-title" className="library" id="library">
        <div className="section-heading">
          <div>
            <p className="eyebrow">02 / Start exploring</p>
            <h2 id="library-title">The document library.</h2>
          </div>
          <a
            className="text-link"
            href="https://github.com/Ramyromel/luxionex/tree/main/docs/source"
            rel="noreferrer"
            target="_blank"
          >
            Browse all documents <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="document-grid">
          {documents.map((document) => (
            <a
              className="document-card"
              href={document.href}
              key={document.number}
              rel="noreferrer"
              target="_blank"
            >
              <div className="card-meta">
                <span>{document.category}</span>
                <span>{document.number}</span>
              </div>
              <h3>{document.title}</h3>
              <p>{document.description}</p>
              <span aria-hidden="true" className="card-arrow">
                ↗
              </span>
            </a>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <a aria-label="LUXIONEX home" className="wordmark" href="#">
          <span className="wordmark-mark" aria-hidden="true">
            L
          </span>
          LUXIONEX
        </a>
        <p>Governance for systems that earn trust.</p>
        <a
          href="https://github.com/Ramyromel/luxionex"
          rel="noreferrer"
          target="_blank"
        >
          Open source on GitHub <span aria-hidden="true">↗</span>
        </a>
      </footer>
    </main>
  );
}
