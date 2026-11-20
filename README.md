# LUXIONEX

LUXIONEX is an evolving governance framework for architecture, security, risk,
evidence, and responsible system change. This repository contains the framework
documents and a small Next.js website that introduces the document library; it
does not currently implement an AI runtime or agent execution platform.

## Governance model

The documents follow a layered authority model:

**Enterprise Constitution → Governance Framework → Standards → Policies →
Controls → Procedures → Specifications → Templates**

The higher layers establish principles and expectations. The lower layers
provide operational guidance, verification criteria, and reusable artifacts.

## Repository layout

- `app/` — Next.js website and its presentation.
- `docs/source/` — Governance documents, grouped by artifact type.
- `public/` — Static assets served by the website.
- `SECURITY.md` — Vulnerability reporting guidance.

Start with the [Enterprise Constitution](docs/source/constitution/Enterprise-Constitution.md)
and [Governance Framework](docs/source/framework/Governance-Framework.md), or
[browse the source documents](docs/source/).

## Status

The governance framework is at v0.1 and is marked as a draft foundation.
Documents may change as the framework develops; review each document's status
and version before relying on it.

## Run the website locally

Requires Node.js and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To create a production
build, run:

```bash
npm run build
```

## Contributing

Keep governance changes traceable and consistent with the document hierarchy.
When changing a document, preserve its stated status and version conventions
and update related references where needed.
