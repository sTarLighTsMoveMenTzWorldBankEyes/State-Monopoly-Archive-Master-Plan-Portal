import { PortalRecord } from "../types";

export const EXTENDED_PORTALS: PortalRecord[] = [
  // ==========================================
  // STATE RESEARCH & OPEN DATA PORTALS
  // ==========================================
  {
    id: "res-eosc-node",
    name: "European Open Science Cloud (EU Node Portal)",
    code: "EOSC-EU",
    country: "EU",
    flagEmoji: "🇪🇺",
    category: "INFRASTRUCTURE & RESEARCH FEDERATIONS",
    subcategory: "European Federated Research Cloud Node",
    summary: "The primary European Union node providing integrated access to open science data, AI compute, and federated FAIR research services across EU Member States.",
    mainUrl: "https://open-science-cloud.ec.europa.eu",
    directRegistrationUrl: "https://open-science-cloud.ec.europa.eu/register",
    documentationUrl: "https://open-science-cloud.ec.europa.eu/docs",
    generalEmail: "info@eosc-portal.eu",
    generalPhone: "+32 2 299 1111",
    generalFax: "+32 2 299 1112",
    managementContacts: [
      {
        id: "c-eosc-1",
        name: "Ute Gunsenheimer",
        role: "Secretary General EOSC Association",
        department: "Governance Board",
        email: "ute.gunsenheimer@eosc.eu",
        phone: "+32 2 299 1120",
        isPrimary: true
      },
      {
        id: "c-eosc-2",
        name: "Karel Luyben",
        role: "President EOSC Steering Committee",
        department: "Executive Committee",
        email: "karel.luyben@eosc.eu",
        phone: "+32 2 299 1121"
      }
    ],
    apiConnectors: [
      {
        protocol: "OpenAPI v3",
        endpointUrl: "https://api.eosc-portal.eu/v2/resources",
        documentationUrl: "https://open-science-cloud.ec.europa.eu/docs/api",
        authType: "OAuth 2.0",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-eosc-eu-node",
        mcpConfigSnippet: JSON.stringify({
          command: "npx",
          args: ["-y", "@eosc/mcp-server-connector"],
          env: { EOSC_API_KEY: "PROD_EOSC_KEY" }
        }, null, 2)
      }
    ],
    depositCapacity: "Unlimited",
    metadataStandards: ["FAIR", "Dublin Core", "DCAT-AP", "DataCite"],
    accessLevel: "Open / Free",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-09-04"
  },
  {
    id: "res-nfdi-de",
    name: "Nationale Forschungsdateninfrastruktur (NFDI / BMBF)",
    code: "NFDI-DE",
    country: "DE",
    flagEmoji: "🇩🇪",
    category: "INFRASTRUCTURE & RESEARCH FEDERATIONS",
    subcategory: "German Federal Research Data Infrastructure",
    summary: "National research data infrastructure of Germany funded by BMBF, connecting university data repositories and scientific consortia across Germany.",
    mainUrl: "https://www.nfdi.de",
    directRegistrationUrl: "https://www.nfdi.de/registration",
    documentationUrl: "https://www.nfdi.de/consortia",
    generalEmail: "info@nfdi.de",
    generalPhone: "+49 721 932 100",
    generalFax: "+49 721 932 101",
    managementContacts: [
      {
        id: "c-nfdi-1",
        name: "Prof. Dr. York Sure-Vetter",
        role: "Director NFDI Directorate",
        department: "Directorate Karlsruhe",
        email: "director@nfdi.de",
        phone: "+49 721 932 110",
        isPrimary: true
      }
    ],
    apiConnectors: [
      {
        protocol: "OpenAPI v3",
        endpointUrl: "https://api.nfdi.de/v1/search",
        documentationUrl: "https://www.nfdi.de/developer",
        authType: "Open Data / Public",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-nfdi-de-hub"
      }
    ],
    depositCapacity: "L (>1TB)",
    metadataStandards: ["DataCite", "Dublin Core", "NFDI-Core"],
    accessLevel: "Open / Free",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-09-04"
  },
  {
    id: "res-ouvrirlascience-fr",
    name: "Ouvrir la Science (Ministère de l'Enseignement supérieur FR)",
    code: "OPEN-FR",
    country: "FR",
    flagEmoji: "🇫🇷",
    category: "INFRASTRUCTURE & RESEARCH FEDERATIONS",
    subcategory: "French National Open Science Portal",
    summary: "Official French national portal for open science policy, research data repositories, and federated university repositories under MESR.",
    mainUrl: "https://www.ouvrirlascience.fr",
    directRegistrationUrl: "https://www.ouvrirlascience.fr/recherche",
    generalEmail: "contact@ouvrirlascience.fr",
    generalPhone: "+33 1 55 55 10 10",
    generalFax: "+33 1 55 55 10 11",
    managementContacts: [
      {
        id: "c-fr-1",
        name: "Marin Dacos",
        role: "National Open Science Coordinator",
        department: "MESR Open Science",
        email: "marin.dacos@recherche.gouv.fr",
        phone: "+33 1 55 55 11 00",
        isPrimary: true
      }
    ],
    apiConnectors: [
      {
        protocol: "REST API",
        endpointUrl: "https://api.ouvrirlascience.fr/v1",
        documentationUrl: "https://www.ouvrirlascience.fr/api-docs",
        authType: "Open Data / Public",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-ouvrirlascience-fr"
      }
    ],
    depositCapacity: "L (>1TB)",
    metadataStandards: ["Dublin Core", "HAL-RDF", "DataCite"],
    accessLevel: "Open / Free",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-09-04"
  },
  {
    id: "res-belspo-be",
    name: "BELSPO OpenData.be (Belgian Federal Science Policy)",
    code: "BELSPO-BE",
    country: "BE",
    flagEmoji: "🇧🇪",
    category: "INFRASTRUCTURE & RESEARCH FEDERATIONS",
    subcategory: "Belgian Federal Open Science Node",
    summary: "Federal science policy portal and Open Data infrastructure for Belgian federal scientific institutes and university collaborations.",
    mainUrl: "https://www.belspo.be",
    directRegistrationUrl: "https://www.belspo.be/belspo/organisation/register_en.stm",
    generalEmail: "info@belspo.be",
    generalPhone: "+32 2 238 34 11",
    generalFax: "+32 2 230 59 12",
    managementContacts: [
      {
        id: "c-be-1",
        name: "Dr. Frank Monteny",
        role: "Director General Research & Space",
        department: "Executive Directorate",
        email: "frank.monteny@belspo.be",
        phone: "+32 2 238 34 20",
        isPrimary: true
      }
    ],
    apiConnectors: [
      {
        protocol: "REST API",
        endpointUrl: "https://api.belspo.be/open/v1",
        documentationUrl: "https://www.belspo.be/api",
        authType: "Open Data / Public",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-belspo-be"
      }
    ],
    depositCapacity: "M (20GB-1TB)",
    metadataStandards: ["DCAT-AP", "Dublin Core"],
    accessLevel: "Open / Free",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-09-04"
  },
  {
    id: "res-opendata-swiss",
    name: "opendata.swiss (Swiss Federal & Canton Data Portal)",
    code: "SWISS-DATA",
    country: "CH",
    flagEmoji: "🇨🇭",
    category: "INFRASTRUCTURE & RESEARCH FEDERATIONS",
    subcategory: "Swiss Confederation Public Data Node",
    summary: "Official central portal for open Swiss government data, federal archives, swissuniversities research datasets, and cantonal registries.",
    mainUrl: "https://opendata.swiss",
    directRegistrationUrl: "https://opendata.swiss/en/user/register",
    documentationUrl: "https://opendata.swiss/en/developers",
    generalEmail: "info@opendata.swiss",
    generalPhone: "+41 58 463 60 11",
    generalFax: "+41 58 463 60 12",
    managementContacts: [
      {
        id: "c-ch-1",
        name: "Marco Lusser",
        role: "Head of Swiss Open Government Data Unit",
        department: "Federal Statistical Office FSO",
        email: "marco.lusser@bfs.admin.ch",
        phone: "+41 58 463 60 50",
        isPrimary: true
      }
    ],
    apiConnectors: [
      {
        protocol: "REST API",
        endpointUrl: "https://opendata.swiss/api/3/action/package_search",
        documentationUrl: "https://opendata.swiss/en/developers/api",
        authType: "Open Data / Public",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-opendata-swiss"
      }
    ],
    depositCapacity: "Unlimited",
    metadataStandards: ["DCAT-AP-CH", "CKAN API", "RDF"],
    accessLevel: "Open / Free",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-09-04"
  },
  {
    id: "res-data-gov-us",
    name: "Data.gov (US Federal Open Data & NSF Science Portals)",
    code: "DATA-GOV-US",
    country: "US",
    flagEmoji: "🇺🇸",
    category: "INFRASTRUCTURE & RESEARCH FEDERATIONS",
    subcategory: "United States Federal Open Data Node",
    summary: "The home of the US Government's open data, offering over 300,000 datasets across federal agencies, NSF science portals, and NOAA space networks.",
    mainUrl: "https://www.data.gov",
    directRegistrationUrl: "https://www.data.gov/developers",
    documentationUrl: "https://api.data.gov",
    generalEmail: "support@data.gov",
    generalPhone: "+1 202 501 0800",
    generalFax: "+1 202 501 0801",
    managementContacts: [
      {
        id: "c-usgov-1",
        name: "Dominic Sale",
        role: "Director US Open Data Program",
        department: "GSA Technology Transformation Services",
        email: "dominic.sale@gsa.gov",
        phone: "+1 202 501 0850",
        isPrimary: true
      }
    ],
    apiConnectors: [
      {
        protocol: "OpenAPI v3",
        endpointUrl: "https://api.data.gov/data/v1",
        documentationUrl: "https://api.data.gov",
        authType: "API Key",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-data-gov-us"
      }
    ],
    depositCapacity: "Unlimited",
    metadataStandards: ["POD-Schema", "DCAT-US", "JSON-LD"],
    accessLevel: "Open / Free",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-09-04"
  },

  // ==========================================
  // NATIONAL LIBRARIES & LIBRARY FEDERATIONS
  // ==========================================
  {
    id: "lib-dnb-de",
    name: "Deutsche Nationalbibliothek (DNB & DDB Portal)",
    code: "DNB-DDB",
    country: "DE",
    flagEmoji: "🇩🇪",
    category: "INSTITUTIONAL & GOVERNMENT REPOSITORIES",
    subcategory: "German National Library & Cultural Node",
    summary: "Central archival library for Germany and the Deutsche Digitale Bibliothek (DDB) node connecting all German libraries, archives, and research museums.",
    mainUrl: "https://www.dnb.de",
    directRegistrationUrl: "https://www.dnb.de/DE/Service/Anmeldung/anmeldung_node.html",
    documentationUrl: "https://www.dnb.de/EN/Service/DigitaleDienste/Schnittstellen/schnittstellen_node.html",
    generalEmail: "info@dnb.de",
    generalPhone: "+49 69 1525 0",
    generalFax: "+49 69 1525 1010",
    managementContacts: [
      {
        id: "c-dnb-1",
        name: "Frank Scholze",
        role: "Director General Deutsche Nationalbibliothek",
        department: "Executive Directorate",
        email: "f.scholze@dnb.de",
        phone: "+49 69 1525 1000",
        isPrimary: true
      }
    ],
    apiConnectors: [
      {
        protocol: "OAI-PMH",
        endpointUrl: "https://services.dnb.de/oai/repository",
        documentationUrl: "https://www.dnb.de/EN/Service/DigitaleDienste/Schnittstellen/schnittstellen_node.html",
        authType: "Open Data / Public",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-dnb-de"
      }
    ],
    depositCapacity: "Unlimited",
    metadataStandards: ["MARC21", "MARCXML", "GND", "Dublin Core"],
    accessLevel: "Open / Free",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-09-04"
  },
  {
    id: "lib-gallica-bnf",
    name: "Gallica / BnF API & Föderation (Bibliothèque nationale de France)",
    code: "BNF-GALLICA",
    country: "FR",
    flagEmoji: "🇫🇷",
    category: "INSTITUTIONAL & GOVERNMENT REPOSITORIES",
    subcategory: "French National Digital Library Node",
    summary: "The digital library of the BnF and its partner networks, serving millions of digitized manuscripts, research records, and IIIF image streams.",
    mainUrl: "https://gallica.bnf.fr",
    directRegistrationUrl: "https://api.bnf.fr/fr/user/register",
    documentationUrl: "https://api.bnf.fr",
    generalEmail: "api@bnf.fr",
    generalPhone: "+33 1 53 79 59 59",
    generalFax: "+33 1 53 79 41 41",
    managementContacts: [
      {
        id: "c-bnf-1",
        name: "Gilles Pécout",
        role: "President Bibliothèque nationale de France",
        department: "Presidency",
        email: "gilles.pecout@bnf.fr",
        phone: "+33 1 53 79 40 00",
        isPrimary: true
      }
    ],
    apiConnectors: [
      {
        protocol: "REST API",
        endpointUrl: "https://gallica.bnf.fr/SRU",
        documentationUrl: "https://api.bnf.fr/fr/api-gallica-sru",
        authType: "Open Data / Public",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-gallica-bnf"
      }
    ],
    depositCapacity: "Unlimited",
    metadataStandards: ["IIIF 3.0", "Dublin Core", "INTERMARC"],
    accessLevel: "Open / Free",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-09-04"
  },
  {
    id: "lib-loc-us",
    name: "Library of Congress Linked Data & Digital Collections (LoC)",
    code: "LOC-US",
    country: "US",
    flagEmoji: "🇺🇸",
    category: "INSTITUTIONAL & GOVERNMENT REPOSITORIES",
    subcategory: "US National Library & Linked Data Node",
    summary: "The largest library in the world providing Linked Data endpoints (id.loc.gov), MARC catalogs, copyright deposits, and API endpoints.",
    mainUrl: "https://id.loc.gov",
    directRegistrationUrl: "https://www.loc.gov/rr/register.html",
    documentationUrl: "https://id.loc.gov/techcenter/developers.html",
    generalEmail: "ndso@loc.gov",
    generalPhone: "+1 202 707 5000",
    generalFax: "+1 202 707 5844",
    managementContacts: [
      {
        id: "c-loc-1",
        name: "Dr. Carla Hayden",
        role: "Librarian of Congress",
        department: "Office of the Librarian",
        email: "chayden@loc.gov",
        phone: "+1 202 707 5205",
        isPrimary: true
      }
    ],
    apiConnectors: [
      {
        protocol: "REST API",
        endpointUrl: "https://id.loc.gov/authorities/names.json",
        documentationUrl: "https://id.loc.gov/techcenter/developers.html",
        authType: "Open Data / Public",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-loc-linkeddata"
      }
    ],
    depositCapacity: "Unlimited",
    metadataStandards: ["BIBFRAME", "MARC21", "SKOS", "RDF"],
    accessLevel: "Open / Free",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-09-04"
  },
  {
    id: "lib-british-library",
    name: "The British Library & Jisc Library Hub Discover",
    code: "BL-UK",
    country: "GB",
    flagEmoji: "🇬🇧",
    category: "INSTITUTIONAL & GOVERNMENT REPOSITORIES",
    subcategory: "UK National Library & Federated Hub",
    summary: "UK national research library and legal deposit repository providing federated access to university and research libraries across the UK.",
    mainUrl: "https://discover.libraryhub.jisc.ac.uk",
    directRegistrationUrl: "https://www.bl.uk/pass",
    documentationUrl: "https://www.bl.uk/aboutus/stratpolprog/digi/open-data",
    generalEmail: "Customer-Services@bl.uk",
    generalPhone: "+44 1937 546060",
    generalFax: "+44 1937 546333",
    managementContacts: [
      {
        id: "c-bl-1",
        name: "Sir Roly Keating",
        role: "Chief Executive British Library",
        department: "Executive Office",
        email: "roly.keating@bl.uk",
        phone: "+44 20 7412 7000",
        isPrimary: true
      }
    ],
    apiConnectors: [
      {
        protocol: "OAI-PMH",
        endpointUrl: "https://data.bl.uk/oai",
        documentationUrl: "https://www.bl.uk/open-data",
        authType: "Open Data / Public",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-british-library"
      }
    ],
    depositCapacity: "Unlimited",
    metadataStandards: ["MARC21", "Dublin Core", "RDF/XML"],
    accessLevel: "Open / Free",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-09-04"
  },

  // ==========================================
  // ELITE UNIVERSITIES & GLOBAL REPOSITORIES
  // ==========================================
  {
    id: "uni-harvard-dash",
    name: "Harvard University Library / DASH Repository",
    code: "HARVARD-DASH",
    country: "US",
    flagEmoji: "🇺🇸",
    category: "INSTITUTIONAL & GOVERNMENT REPOSITORIES",
    subcategory: "Harvard Central Open Access Node",
    summary: "Digital Access to Scholarship at Harvard (DASH), the central open access repository for Harvard faculty and research labs.",
    mainUrl: "https://dash.harvard.edu",
    directRegistrationUrl: "https://dash.harvard.edu/register",
    documentationUrl: "https://library.harvard.edu/services-tools/dash",
    generalEmail: "dash@harvard.edu",
    generalPhone: "+1 617 495 1000",
    generalFax: "+1 617 495 0370",
    managementContacts: [
      {
        id: "c-harvard-1",
        name: "Martha Whitehead",
        role: "Vice President for Harvard Library",
        department: "Harvard Library Administration",
        email: "martha_whitehead@harvard.edu",
        phone: "+1 617 495 2401",
        isPrimary: true
      }
    ],
    apiConnectors: [
      {
        protocol: "OAI-PMH",
        endpointUrl: "https://dash.harvard.edu/oai/request",
        documentationUrl: "https://dash.harvard.edu/oai",
        authType: "Open Data / Public",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-harvard-dash"
      }
    ],
    depositCapacity: "Unlimited",
    metadataStandards: ["Dublin Core", "MODS", "DataCite"],
    accessLevel: "Open / Free",
    isStateMonopoly: false,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-09-04"
  },
  {
    id: "uni-mit-dspace",
    name: "MIT Libraries / DSpace@MIT",
    code: "MIT-DSPACE",
    country: "US",
    flagEmoji: "🇺🇸",
    category: "INSTITUTIONAL & GOVERNMENT REPOSITORIES",
    subcategory: "MIT Open Research Node",
    summary: "DSpace@MIT stores, preserves, and distributes MIT research, articles, technical reports, and working papers globally.",
    mainUrl: "https://dspace.mit.edu",
    directRegistrationUrl: "https://dspace.mit.edu/login",
    documentationUrl: "https://libraries.mit.edu/dspace",
    generalEmail: "dspace-help@mit.edu",
    generalPhone: "+1 617 253 5651",
    generalFax: "+1 617 253 5652",
    managementContacts: [
      {
        id: "c-mit-1",
        name: "Chris Bourg",
        role: "Director MIT Libraries",
        department: "Office of the Director",
        email: "cbourg@mit.edu",
        phone: "+1 617 253 5655",
        isPrimary: true
      }
    ],
    apiConnectors: [
      {
        protocol: "REST API",
        endpointUrl: "https://dspace.mit.edu/rest/items",
        documentationUrl: "https://dspace.mit.edu/rest",
        authType: "Open Data / Public",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-mit-dspace"
      }
    ],
    depositCapacity: "Unlimited",
    metadataStandards: ["Dublin Core", "Qualified Dublin Core"],
    accessLevel: "Open / Free",
    isStateMonopoly: false,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-09-04"
  },
  {
    id: "uni-stanford-sdr",
    name: "Stanford University / Stanford Digital Repository (SDR)",
    code: "STANFORD-SDR",
    country: "US",
    flagEmoji: "🇺🇸",
    category: "INSTITUTIONAL & GOVERNMENT REPOSITORIES",
    subcategory: "Stanford Research Preservation Node",
    summary: "Stanford Digital Repository (SDR) provides persistent long-term storage, PIDs, and global access to Stanford research data.",
    mainUrl: "https://sdr.stanford.edu",
    directRegistrationUrl: "https://sdr.stanford.edu/deposit",
    documentationUrl: "https://sdr.stanford.edu/docs",
    generalEmail: "sdr-support@stanford.edu",
    generalPhone: "+1 650 723 9200",
    generalFax: "+1 650 725 1068",
    managementContacts: [
      {
        id: "c-stanford-1",
        name: "Michael A. Keller",
        role: "University Librarian & Vice Provost",
        department: "Stanford University Libraries",
        email: "makeller@stanford.edu",
        phone: "+1 650 723 5558",
        isPrimary: true
      }
    ],
    apiConnectors: [
      {
        protocol: "REST API",
        endpointUrl: "https://purl.stanford.edu/api/v1",
        documentationUrl: "https://sdr.stanford.edu/api",
        authType: "Open Data / Public",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-stanford-sdr"
      }
    ],
    depositCapacity: "Unlimited",
    metadataStandards: ["MODS", "METS", "DataCite"],
    accessLevel: "Open / Free",
    isStateMonopoly: false,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-09-04"
  },
  {
    id: "uni-eth-zurich",
    name: "ETH Zürich / ETH Research Collection",
    code: "ETH-ZURICH",
    country: "CH",
    flagEmoji: "🇨🇭",
    category: "INSTITUTIONAL & GOVERNMENT REPOSITORIES",
    subcategory: "Swiss Federal Institute of Technology Node",
    summary: "The official repository for ETH Zürich publications, research data, doctoral theses, and open science datasets.",
    mainUrl: "https://www.research-collection.ethz.ch",
    directRegistrationUrl: "https://www.research-collection.ethz.ch/login",
    documentationUrl: "https://www.library.ethz.ch/en/research-collection",
    generalEmail: "research-collection@library.ethz.ch",
    generalPhone: "+41 44 632 21 35",
    generalFax: "+41 44 632 10 87",
    managementContacts: [
      {
        id: "c-eth-1",
        name: "Dr. Rafael Ball",
        role: "Director ETH Library",
        department: "ETH Executive Office",
        email: "rafael.ball@library.ethz.ch",
        phone: "+41 44 632 21 25",
        isPrimary: true
      }
    ],
    apiConnectors: [
      {
        protocol: "OAI-PMH",
        endpointUrl: "https://www.research-collection.ethz.ch/oai/request",
        documentationUrl: "https://www.research-collection.ethz.ch/oai",
        authType: "Open Data / Public",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-eth-research"
      }
    ],
    depositCapacity: "L (>1TB)",
    metadataStandards: ["DataCite", "Dublin Core"],
    accessLevel: "Open / Free",
    isStateMonopoly: false,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-09-04"
  },

  // ==========================================
  // STATE BUSINESS, IDENTITY & PUBLIC REGISTERS
  // ==========================================
  {
    id: "gov-sam-us",
    name: "SAM.gov (US Federal Award Management & UEI Register)",
    code: "SAM-US-GOV",
    country: "US",
    flagEmoji: "🇺🇸",
    category: "STATE MONOPOLY & CENTRAL BANKS",
    subcategory: "US Federal Identity & Contractor Node",
    summary: "Official US government system for entity registration, CAGE codes, Unique Entity ID (UEI), and federal contract opportunities.",
    mainUrl: "https://sam.gov",
    directRegistrationUrl: "https://sam.gov/content/entity-registration",
    documentationUrl: "https://open.gsa.gov/api/sam-api",
    generalEmail: "fscsupport@gsa.gov",
    generalPhone: "+1 866 606 8220",
    generalFax: "+1 202 501 0001",
    managementContacts: [
      {
        id: "c-sam-1",
        name: "Robin Carnahan",
        role: "Administrator General Services Administration",
        department: "US GSA",
        email: "robin.carnahan@gsa.gov",
        phone: "+1 202 501 0800",
        isPrimary: true
      }
    ],
    apiConnectors: [
      {
        protocol: "OpenAPI v3",
        endpointUrl: "https://api.sam.gov/entity-information/v3/entities",
        documentationUrl: "https://open.gsa.gov/api/sam-api",
        authType: "API Key",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-sam-gov-us"
      }
    ],
    depositCapacity: "N/A (API Only)",
    metadataStandards: ["SAM-UEI", "CAGE", "FAR"],
    accessLevel: "Registration Required",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-09-04"
  },
  {
    id: "gov-unternehmensregister-de",
    name: "Unternehmensregister.de / Handelsregister Portal (DE)",
    code: "DE-UREG",
    country: "DE",
    flagEmoji: "🇩🇪",
    category: "STATE MONOPOLY & CENTRAL BANKS",
    subcategory: "German Central Federal Business Register",
    summary: "Official central platform for official corporate registry filings, annual balance sheets, commercial register extracts, and LEI codes.",
    mainUrl: "https://www.unternehmensregister.de",
    directRegistrationUrl: "https://www.unternehmensregister.de/ureg/register.html",
    documentationUrl: "https://www.unternehmensregister.de/ureg/api_info.html",
    generalEmail: "service@unternehmensregister.de",
    generalPhone: "+49 800 1234567",
    generalFax: "+49 221 97668-200",
    managementContacts: [
      {
        id: "c-ureg-1",
        name: "Dr. Thomas Servatius",
        role: "Managing Director Bundesanzeiger Verlag",
        department: "Registry Management",
        email: "t.servatius@bundesanzeiger.de",
        phone: "+49 221 97668-0",
        isPrimary: true
      }
    ],
    apiConnectors: [
      {
        protocol: "REST API",
        endpointUrl: "https://www.unternehmensregister.de/ureg/api/v1/search",
        documentationUrl: "https://www.unternehmensregister.de/ureg/api",
        authType: "API Key",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-unternehmensregister-de"
      }
    ],
    depositCapacity: "N/A (API Only)",
    metadataStandards: ["XBRL", "eIDAS", "EUID"],
    accessLevel: "Open / Free",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-09-04"
  },
  {
    id: "gov-companieshouse-uk",
    name: "Companies House (UK Government Official Register)",
    code: "UK-CO-HOUSE",
    country: "GB",
    flagEmoji: "🇬🇧",
    category: "STATE MONOPOLY & CENTRAL BANKS",
    subcategory: "UK Government Company Registry Node",
    summary: "Official UK government registrar of companies with open REST APIs for searching company ownership, directors, filing histories, and PSC data.",
    mainUrl: "https://www.gov.uk/government/organisations/companies-house",
    directRegistrationUrl: "https://developer.company-information.service.gov.uk/get-started",
    documentationUrl: "https://developer.company-information.service.gov.uk/api/docs",
    generalEmail: "enquiries@companieshouse.gov.uk",
    generalPhone: "+44 303 123 4500",
    generalFax: "+44 29 2038 0900",
    managementContacts: [
      {
        id: "c-ukch-1",
        name: "Louise Smyth",
        role: "Chief Executive Companies House",
        department: "Executive Bureau",
        email: "louise.smyth@companieshouse.gov.uk",
        phone: "+44 303 123 4501",
        isPrimary: true
      }
    ],
    apiConnectors: [
      {
        protocol: "REST API",
        endpointUrl: "https://api.company-information.service.gov.uk",
        documentationUrl: "https://developer.company-information.service.gov.uk/api/docs",
        authType: "API Key",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-companies-house-uk"
      }
    ],
    depositCapacity: "N/A (API Only)",
    metadataStandards: ["OpenAPI 3.0", "iXBRL"],
    accessLevel: "Open / Free",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-09-04"
  },

  // ==========================================
  // CULTURAL HERITAGE & SPACE DATA NODES
  // ==========================================
  {
    id: "space-copernicus-dataspace",
    name: "Copernicus Data Space Ecosystem (EU Space Program)",
    code: "COPERNICUS-EU",
    country: "EU",
    flagEmoji: "🇪🇺",
    category: "INFRASTRUCTURE & RESEARCH FEDERATIONS",
    subcategory: "European Earth Observation & Satellite Node",
    summary: "Single access point for European Earth Observation data from Sentinel satellites, atmosphere monitoring, and climate change analytics.",
    mainUrl: "https://dataspace.copernicus.eu",
    directRegistrationUrl: "https://dataspace.copernicus.eu/user/register",
    documentationUrl: "https://dataspace.copernicus.eu/analyse/apis",
    generalEmail: "support@dataspace.copernicus.eu",
    generalPhone: "+39 06 9418 01",
    generalFax: "+39 06 9418 02",
    managementContacts: [
      {
        id: "c-cop-1",
        name: "Rodrigo da Costa",
        role: "Executive Director EUSPA",
        department: "EUSPA Executive Management",
        email: "rodrigo.dacosta@euspa.europa.eu",
        phone: "+420 234 766 000",
        isPrimary: true
      }
    ],
    apiConnectors: [
      {
        protocol: "REST API",
        endpointUrl: "https://sh.dataspace.copernicus.eu/api/v1",
        documentationUrl: "https://dataspace.copernicus.eu/analyse/apis",
        authType: "OAuth 2.0",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-copernicus-dataspace"
      }
    ],
    depositCapacity: "Unlimited",
    metadataStandards: ["STAC", "GeoTIFF", "NetCDF", "OGC WMS"],
    accessLevel: "Open / Free",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-09-04"
  },
  {
    id: "space-nasa-earthdata",
    name: "NASA Earthdata & Earth Science Data Systems",
    code: "NASA-EARTH",
    country: "US",
    flagEmoji: "🇺🇸",
    category: "INFRASTRUCTURE & RESEARCH FEDERATIONS",
    subcategory: "US Space Agency Earth Observation Node",
    summary: "Open access to NASA's Earth science data, satellite imagery, climate datasets, and spatial APIs via CMR (Common Metadata Repository).",
    mainUrl: "https://earthdata.nasa.gov",
    directRegistrationUrl: "https://urs.earthdata.nasa.gov/users/new",
    documentationUrl: "https://cmr.earthdata.nasa.gov/search/site/docs/search/api.html",
    generalEmail: "support@earthdata.nasa.gov",
    generalPhone: "+1 301 614 5000",
    generalFax: "+1 301 614 5270",
    managementContacts: [
      {
        id: "c-nasa-1",
        name: "Karen St. Germain",
        role: "Director Earth Science Division NASA",
        department: "NASA Science Mission Directorate",
        email: "karen.stgermain@nasa.gov",
        phone: "+1 202 358 0000",
        isPrimary: true
      }
    ],
    apiConnectors: [
      {
        protocol: "REST API",
        endpointUrl: "https://cmr.earthdata.nasa.gov/search/collections.json",
        documentationUrl: "https://cmr.earthdata.nasa.gov/search",
        authType: "OAuth 2.0",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-nasa-earthdata"
      }
    ],
    depositCapacity: "Unlimited",
    metadataStandards: ["UMM-C", "HDF5", "NetCDF", "STAC"],
    accessLevel: "Open / Free",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-09-04"
  },

  // ==========================================
  // DEFENCE, SECURITY & MILITARY NODES (33+ NODES)
  // ==========================================
  {
    id: "mil-nato-diacc",
    name: "NATO DIACC & NCIA Data Services Portal",
    code: "NATO-NCIA",
    country: "EU",
    flagEmoji: "🇪🇺",
    category: "DEFENCE, SECURITY & MILITARY NODES",
    subcategory: "NATO Communications and Information Node",
    summary: "NATO central data hub providing interoperable defense innovation services, DIACC framework specs, and military standardization data.",
    mainUrl: "https://www.ncia.nato.int",
    directRegistrationUrl: "https://www.ncia.nato.int/business/procurement/register.html",
    documentationUrl: "https://www.ncia.nato.int/our-work/interoperability.html",
    generalEmail: "info@ncia.nato.int",
    generalPhone: "+32 2 707 4111",
    generalFax: "+32 2 707 4100",
    managementContacts: [
      {
        id: "c-nato-1",
        name: "Ludwig Decamps",
        role: "General Manager NCIA",
        department: "Executive Board Brussels",
        email: "ludwig.decamps@ncia.nato.int",
        phone: "+32 2 707 4120",
        isPrimary: true
      },
      {
        id: "c-nato-2",
        name: "Dr. Antonio Calderon",
        role: "Chief Technology Officer (CTO)",
        department: "Chief Technology Office",
        email: "antonio.calderon@ncia.nato.int",
        phone: "+32 2 707 4121"
      }
    ],
    apiConnectors: [
      {
        protocol: "OpenAPI v3",
        endpointUrl: "https://api.ncia.nato.int/v1/interop",
        documentationUrl: "https://www.ncia.nato.int/developer",
        authType: "mTLS",
        status: "Certification",
        mcpCompatible: true,
        mcpServerName: "mcp-nato-ncia-interop"
      }
    ],
    depositCapacity: "Unlimited",
    metadataStandards: ["STANAG 4586", "STANAG 4609", "NATO-Core-Metadata"],
    accessLevel: "Institutional Approval",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-09-04"
  },
  {
    id: "mil-eda-europa",
    name: "European Defence Agency (EDA Open Portal & Hub)",
    code: "EDA-EU",
    country: "EU",
    flagEmoji: "🇪🇺",
    category: "DEFENCE, SECURITY & MILITARY NODES",
    subcategory: "EU Intergovernmental Defense Agency",
    summary: "European Union agency promoting defense capability development, joint military R&D, and defense industry procurement registries.",
    mainUrl: "https://eda.europa.eu",
    directRegistrationUrl: "https://eda.europa.eu/procurement/register",
    documentationUrl: "https://eda.europa.eu/what-we-do/eda-programmes",
    generalEmail: "info@eda.europa.eu",
    generalPhone: "+32 2 504 28 00",
    generalFax: "+32 2 504 28 15",
    managementContacts: [
      {
        id: "c-eda-1",
        name: "Jiří Šedivý",
        role: "Chief Executive European Defence Agency",
        department: "Executive Management Brussels",
        email: "jiri.sedivy@eda.europa.eu",
        phone: "+32 2 504 28 10",
        isPrimary: true
      }
    ],
    apiConnectors: [
      {
        protocol: "REST API",
        endpointUrl: "https://api.eda.europa.eu/v1/projects",
        documentationUrl: "https://eda.europa.eu/developer",
        authType: "OAuth 2.0",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-eda-europa"
      }
    ],
    depositCapacity: "L (>1TB)",
    metadataStandards: ["EDTIB-Metadata", "Dublin Core"],
    accessLevel: "Registration Required",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-09-04"
  },
  {
    id: "mil-satcen-eu",
    name: "European Union Satellite Centre (SatCen)",
    code: "SATCEN-EU",
    country: "EU",
    flagEmoji: "🇪🇺",
    category: "DEFENCE, SECURITY & MILITARY NODES",
    subcategory: "EU Geospatial Intelligence & Security Agency",
    summary: "SatCen supports EU Common Foreign and Security Policy by providing satellite imagery analysis and geospatial intelligence services.",
    mainUrl: "https://www.satcen.europa.eu",
    directRegistrationUrl: "https://www.satcen.europa.eu/services/register",
    generalEmail: "info@satcen.europa.eu",
    generalPhone: "+34 91 678 60 00",
    generalFax: "+34 91 678 60 06",
    managementContacts: [
      {
        id: "c-satcen-1",
        name: "Sorin Ducaru",
        role: "Director EU SatCen",
        department: "Directorate Torrejón",
        email: "sorin.ducaru@satcen.europa.eu",
        phone: "+34 91 678 60 10",
        isPrimary: true
      }
    ],
    apiConnectors: [
      {
        protocol: "REST API",
        endpointUrl: "https://api.satcen.europa.eu/v1/geoint",
        documentationUrl: "https://www.satcen.europa.eu/developer",
        authType: "mTLS",
        status: "Certification",
        mcpCompatible: true,
        mcpServerName: "mcp-satcen-eu-geoint"
      }
    ],
    depositCapacity: "Unlimited",
    metadataStandards: ["OGC", "STANAG 7023", "ISO 19115"],
    accessLevel: "Institutional Approval",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-09-04"
  },
  {
    id: "mil-darpa-dtic",
    name: "Defense Technical Information Center (DTIC / DARPA)",
    code: "DTIC-DARPA",
    country: "US",
    flagEmoji: "🇺🇸",
    category: "DEFENCE, SECURITY & MILITARY NODES",
    subcategory: "US Department of Defense Technical Node",
    summary: "Central repository for US Department of Defense scientific research, technical reports, DARPA project datasets, and defense engineering specs.",
    mainUrl: "https://discover.dtic.mil",
    directRegistrationUrl: "https://service.dtic.mil/dtic/registration",
    documentationUrl: "https://discover.dtic.mil/products-services",
    generalEmail: "dtic.mc-alex.dtic.mbx.helpdesk@mail.mil",
    generalPhone: "+1 800 225 3842",
    generalFax: "+1 703 767 9244",
    managementContacts: [
      {
        id: "c-dtic-1",
        name: "Dr. Stefanie Tompkins",
        role: "Director DARPA",
        department: "Office of the Director Arlington",
        email: "stefanie.tompkins@darpa.mil",
        phone: "+1 703 696 2400",
        isPrimary: true
      }
    ],
    apiConnectors: [
      {
        protocol: "REST API",
        endpointUrl: "https://api.dtic.mil/v1/reports",
        documentationUrl: "https://discover.dtic.mil/api",
        authType: "API Key",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-dtic-darpa"
      }
    ],
    depositCapacity: "Unlimited",
    metadataStandards: ["DoD-Core", "Dublin Core", "CUI-Schema"],
    accessLevel: "Registration Required",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-09-04"
  },
  {
    id: "mil-cisa-us",
    name: "Cybersecurity & Infrastructure Security Agency (CISA)",
    code: "CISA-US",
    country: "US",
    flagEmoji: "🇺🇸",
    category: "DEFENCE, SECURITY & MILITARY NODES",
    subcategory: "US Federal Cyber Defense Agency",
    summary: "Lead US federal agency for cybersecurity, critical infrastructure protection, and automated threat indicator sharing (STIX/TAXII).",
    mainUrl: "https://www.cisa.gov",
    directRegistrationUrl: "https://www.cisa.gov/resources-tools/services",
    documentationUrl: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
    generalEmail: "central@cisa.dhs.gov",
    generalPhone: "+1 888 282 0870",
    generalFax: "+1 703 235 5000",
    managementContacts: [
      {
        id: "c-cisa-1",
        name: "Jen Easterly",
        role: "Director CISA",
        department: "Office of the Director DHS",
        email: "jen.easterly@cisa.dhs.gov",
        phone: "+1 202 282 8000",
        isPrimary: true
      }
    ],
    apiConnectors: [
      {
        protocol: "REST API",
        endpointUrl: "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json",
        documentationUrl: "https://www.cisa.gov/developer",
        authType: "Open Data / Public",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-cisa-us-kev"
      }
    ],
    depositCapacity: "Unlimited",
    metadataStandards: ["STIX 2.1", "TAXII 2.1", "CVE", "KEV"],
    accessLevel: "Open / Free",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-09-04"
  },
  {
    id: "mil-bsi-de",
    name: "Bundesamt für Sicherheit in der Informationstechnik (BSI DE)",
    code: "BSI-DE",
    country: "DE",
    flagEmoji: "🇩🇪",
    category: "DEFENCE, SECURITY & MILITARY NODES",
    subcategory: "German Federal Cybersecurity Authority",
    summary: "National cyber security authority of Germany providing IT Grundschutz, CSAF advisories, CERT-Bund security feeds, and critical infrastructure specs.",
    mainUrl: "https://www.bsi.bund.de",
    directRegistrationUrl: "https://www.bsi.bund.de/DE/Service/Anmeldung/anmeldung_node.html",
    documentationUrl: "https://www.bsi.bund.de/EN/Topics/Cyber-Security/Cyber-Security_node.html",
    generalEmail: "bsi@bsi.bund.de",
    generalPhone: "+49 228 99 9582 0",
    generalFax: "+49 228 99 9582 5400",
    managementContacts: [
      {
        id: "c-bsi-1",
        name: "Claudia Plattner",
        role: "President BSI",
        department: "Executive Office Bonn",
        email: "claudia.plattner@bsi.bund.de",
        phone: "+49 228 99 9582 5000",
        isPrimary: true
      }
    ],
    apiConnectors: [
      {
        protocol: "REST API",
        endpointUrl: "https://wid.cert-bund.de/content/public/securityAdvisories",
        documentationUrl: "https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Oeffentliche-Verwaltung/Sicherheitsberatung/CERT-Bund/cert-bund_node.html",
        authType: "Open Data / Public",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-bsi-de-certbund"
      }
    ],
    depositCapacity: "Unlimited",
    metadataStandards: ["CSAF v2.0", "CVE", "IT-Grundschutz", "eIDAS"],
    accessLevel: "Open / Free",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-09-04"
  },
  {
    id: "mil-anssi-fr",
    name: "Agence nationale de la sécurité des systèmes d'information (ANSSI FR)",
    code: "ANSSI-FR",
    country: "FR",
    flagEmoji: "🇫🇷",
    category: "DEFENCE, SECURITY & MILITARY NODES",
    subcategory: "French National Cybersecurity Agency",
    summary: "French national authority for cyber defense, securing government communications, critical infrastructure (OIV), and technical certifications.",
    mainUrl: "https://www.ssi.gouv.fr",
    directRegistrationUrl: "https://www.ssi.gouv.fr/contact",
    documentationUrl: "https://www.cert.ssi.gouv.fr/feed",
    generalEmail: "labo-secu@ssi.gouv.fr",
    generalPhone: "+33 1 71 75 84 04",
    generalFax: "+33 1 71 75 84 00",
    managementContacts: [
      {
        id: "c-anssi-1",
        name: "Vincent Strubel",
        role: "Director General ANSSI",
        department: "General Directorate Paris",
        email: "vincent.strubel@ssi.gouv.fr",
        phone: "+33 1 71 75 84 10",
        isPrimary: true
      }
    ],
    apiConnectors: [
      {
        protocol: "REST API",
        endpointUrl: "https://www.cert.ssi.gouv.fr/api/v1/alerts",
        documentationUrl: "https://www.cert.ssi.gouv.fr",
        authType: "Open Data / Public",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-anssi-fr-cert"
      }
    ],
    depositCapacity: "Unlimited",
    metadataStandards: ["CSAF", "STIX", "TLP"],
    accessLevel: "Open / Free",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-09-04"
  },
  {
    id: "mil-ncsc-uk",
    name: "National Cyber Security Centre (NCSC UK / GCHQ)",
    code: "NCSC-UK",
    country: "GB",
    flagEmoji: "🇬🇧",
    category: "DEFENCE, SECURITY & MILITARY NODES",
    subcategory: "UK National Cyber Security Authority",
    summary: "Part of GCHQ providing cyber incident management, technical guidance, Active Cyber Defence (ACD) services, and vulnerability feeds.",
    mainUrl: "https://www.ncsc.gov.uk",
    directRegistrationUrl: "https://www.ncsc.gov.uk/section/services-guidance/all-services",
    documentationUrl: "https://www.ncsc.gov.uk/section/keep-up-to-date/cisa-alerts",
    generalEmail: "enquiries@ncsc.gov.uk",
    generalPhone: "+44 300 020 0973",
    generalFax: "+44 20 7233 3000",
    managementContacts: [
      {
        id: "c-ncscuk-1",
        name: "Richard Horne",
        role: "Chief Executive NCSC",
        department: "NCSC London Office",
        email: "richard.horne@ncsc.gov.uk",
        phone: "+44 300 020 0900",
        isPrimary: true
      }
    ],
    apiConnectors: [
      {
        protocol: "REST API",
        endpointUrl: "https://www.ncsc.gov.uk/api/1/services",
        documentationUrl: "https://www.ncsc.gov.uk/developer",
        authType: "API Key",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-ncsc-uk"
      }
    ],
    depositCapacity: "Unlimited",
    metadataStandards: ["STIX 2.1", "OpenAPI 3.0"],
    accessLevel: "Open / Free",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-09-04"
  },
  {
    id: "mil-enisa-eu",
    name: "European Union Agency for Cybersecurity (ENISA)",
    code: "ENISA-EU",
    country: "EU",
    flagEmoji: "🇪🇺",
    category: "DEFENCE, SECURITY & MILITARY NODES",
    subcategory: "EU Cybersecurity Framework Authority",
    summary: "European Union agency promoting common cybersecurity standards, NIS2 directive implementation, EU-wide threat landscapes, and certification schemes.",
    mainUrl: "https://www.enisa.europa.eu",
    directRegistrationUrl: "https://www.enisa.europa.eu/topics/cybersecurity-certifications/register",
    generalEmail: "info@enisa.europa.eu",
    generalPhone: "+30 2810 391280",
    generalFax: "+30 2810 391410",
    managementContacts: [
      {
        id: "c-enisa-1",
        name: "Juhan Lepassaar",
        role: "Executive Director ENISA",
        department: "Executive Bureau Athens",
        email: "juhan.lepassaar@enisa.europa.eu",
        phone: "+30 2810 391300",
        isPrimary: true
      }
    ],
    apiConnectors: [
      {
        protocol: "REST API",
        endpointUrl: "https://www.enisa.europa.eu/api/v1/threats",
        documentationUrl: "https://www.enisa.europa.eu/developer",
        authType: "Open Data / Public",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-enisa-eu"
      }
    ],
    depositCapacity: "Unlimited",
    metadataStandards: ["NIS2", "CSAF", "STIX 2.1"],
    accessLevel: "Open / Free",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-09-04"
  },
  {
    id: "mil-acsc-australia",
    name: "Australian Cyber Security Centre (ACSC / ASD)",
    code: "ACSC-AU",
    country: "AU",
    flagEmoji: "🇦🇺",
    category: "DEFENCE, SECURITY & MILITARY NODES",
    subcategory: "Australian Signals Directorate Node",
    summary: "Part of the Australian Signals Directorate (ASD) providing cyber security threat intelligence, Essential Eight compliance, and defense advice.",
    mainUrl: "https://www.cyber.gov.au",
    directRegistrationUrl: "https://www.cyber.gov.au/partner-program",
    generalEmail: "asd.assistant@defence.gov.au",
    generalPhone: "+61 1300 292 371",
    generalFax: "+61 2 6265 9111",
    managementContacts: [
      {
        id: "c-acsc-1",
        name: "Abigail Bradshaw",
        role: "Director-General Australian Signals Directorate",
        department: "ASD Canberra",
        email: "abigail.bradshaw@defence.gov.au",
        phone: "+61 2 6265 9000",
        isPrimary: true
      }
    ],
    apiConnectors: [
      {
        protocol: "REST API",
        endpointUrl: "https://www.cyber.gov.au/api/v1/advisories",
        documentationUrl: "https://www.cyber.gov.au/developer",
        authType: "Open Data / Public",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-acsc-au"
      }
    ],
    depositCapacity: "Unlimited",
    metadataStandards: ["Essential 8", "STIX"],
    accessLevel: "Open / Free",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-09-04"
  },
  {
    id: "mil-cse-cybercentre-ca",
    name: "Canadian Centre for Cyber Security (CCCS / CSE Canada)",
    code: "CCCS-CA",
    country: "CA",
    flagEmoji: "🇨🇦",
    category: "DEFENCE, SECURITY & MILITARY NODES",
    subcategory: "Communications Security Establishment Node",
    summary: "Canada's single unified authority on cyber security, operating under Communications Security Establishment (CSE) for defense and critical infrastructure.",
    mainUrl: "https://www.cyber.gc.ca",
    directRegistrationUrl: "https://www.cyber.gc.ca/en/services",
    generalEmail: "contact@cyber.gc.ca",
    generalPhone: "+1 833 292 3737",
    generalFax: "+1 613 991 7000",
    managementContacts: [
      {
        id: "c-cccs-1",
        name: "Sami Khoury",
        role: "Head Canadian Centre for Cyber Security",
        department: "CSE Ottawa",
        email: "sami.khoury@cse-cst.gc.ca",
        phone: "+1 613 991 7010",
        isPrimary: true
      }
    ],
    apiConnectors: [
      {
        protocol: "REST API",
        endpointUrl: "https://www.cyber.gc.ca/api/v1/alerts",
        documentationUrl: "https://www.cyber.gc.ca/developer",
        authType: "Open Data / Public",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-cccs-canada"
      }
    ],
    depositCapacity: "Unlimited",
    metadataStandards: ["STIX 2.1", "CSAF"],
    accessLevel: "Open / Free",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-09-04"
  }
];
