import { PortalRecord } from "../types";
import { EXTENDED_PORTALS } from "./extendedPortals";

const BASE_PORTALS: PortalRecord[] = [
  // ==========================================
  // 1. OPEN BANKING / OPEN FINANCE
  // ==========================================
  {
    id: "ob-berlingroup",
    name: "Berlin Group NextGenPSD2 Framework",
    code: "BG-PSD2",
    country: "EU",
    flagEmoji: "🇪🇺",
    category: "OPEN BANKING / OPEN FINANCE",
    subcategory: "European Standardisation Body",
    summary: "European bank-driven standardisation initiative defining NextGenPSD2 AIS, PIS, and PIIS open banking APIs implemented by over 75% of European banks.",
    mainUrl: "https://www.berlin-group.org",
    directRegistrationUrl: "https://www.berlin-group.org/nextgenpsd2-downloads",
    documentationUrl: "https://www.berlin-group.org/psd2-access-to-bank-accounts",
    openDataRepoUrl: "https://github.com/berlin-group-nextgenpsd2",
    generalEmail: "info@berlin-group.org",
    generalPhone: "+49 30 2021 2000",
    generalFax: "+49 30 2021 1900",
    managementContacts: [
      {
        id: "c-bg-1",
        name: "Wouter van Der Stelt",
        role: "Co-Chair Berlin Group Steering Committee",
        department: "Governance",
        email: "wouter.vanderstelt@berlin-group.org",
        phone: "+49 30 2021 2101",
        fax: "+49 30 2021 1901",
        isPrimary: true
      },
      {
        id: "c-bg-2",
        name: "Dr. Andreas Krautscheid",
        role: "Chief Executive & Standardisation Officer",
        department: "Executive Board",
        email: "a.krautscheid@berlin-group.org",
        phone: "+49 30 2021 2102",
        fax: "+49 30 2021 1902"
      }
    ],
    apiConnectors: [
      {
        protocol: "OpenAPI v3",
        endpointUrl: "https://api.berlin-group.org/v1/nextgenpsd2",
        sandboxUrl: "https://sandbox.berlin-group.org/v1",
        documentationUrl: "https://www.berlin-group.org/nextgenpsd2-downloads",
        authType: "QWAC/QSeal (eIDAS)",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-berlin-group-psd2",
        mcpConfigSnippet: JSON.stringify({
          command: "npx",
          args: ["-y", "@openbanking/mcp-berlingroup-psd2"],
          env: { BG_CERT_PATH: "/etc/ssl/qwac.pem" }
        }, null, 2)
      }
    ],
    depositCapacity: "N/A (API Only)",
    metadataStandards: ["ISO 20022", "JSON-LD", "OpenAPI 3.0", "eIDAS QWAC"],
    accessLevel: "Regulatory TPP License",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: false,
    updatedAt: "2026-08-15"
  },
  {
    id: "ob-jpmorgan",
    name: "J.P. Morgan Open Banking Developer Portal",
    code: "JPM-OPEN",
    country: "US",
    flagEmoji: "🇺🇸",
    category: "OPEN BANKING / OPEN FINANCE",
    subcategory: "Global Tier 1 Investment & Commercial Bank",
    summary: "Self-service developer portal providing institutional TPP onboarding, AIS/PIS account information, payments initiation, and Confirmation of Funds APIs.",
    mainUrl: "https://developer.jpmorgan.com",
    directRegistrationUrl: "https://developer.jpmorgan.com/register",
    documentationUrl: "https://developer.jpmorgan.com/docs",
    generalEmail: "open.banking.support@jpmorgan.com",
    generalPhone: "+1 212 270 6000",
    generalFax: "+1 212 270 1234",
    managementContacts: [
      {
        id: "c-jpm-1",
        name: "Lori Beer",
        role: "Global Chief Information Officer (CIO)",
        department: "Global Technology",
        email: "lori.beer@jpmorgan.com",
        phone: "+1 212 270 8820",
        isPrimary: true
      },
      {
        id: "c-jpm-2",
        name: "Max Neukirchen",
        role: "Global Head of Payments & Open Banking",
        department: "J.P. Morgan Payments",
        email: "max.neukirchen@jpmorgan.com",
        phone: "+1 212 270 8821",
        fax: "+1 212 270 1235"
      }
    ],
    apiConnectors: [
      {
        protocol: "OpenAPI v3",
        endpointUrl: "https://api.jpmorgan.com/v1/payments",
        sandboxUrl: "https://api-sandbox.jpmorgan.com/v1",
        documentationUrl: "https://developer.jpmorgan.com/apis/payments",
        authType: "OAuth 2.0",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-jpmorgan-banking",
        mcpConfigSnippet: JSON.stringify({
          command: "node",
          args: ["/opt/mcp-servers/jpmorgan-banking/index.js"],
          env: { JPM_CLIENT_ID: "${JPM_CLIENT_ID}", JPM_CLIENT_SECRET: "${JPM_CLIENT_SECRET}" }
        }, null, 2)
      }
    ],
    depositCapacity: "N/A (API Only)",
    metadataStandards: ["ISO 20022", "OpenAPI 3.0", "OAuth 2.0 Mutual TLS"],
    accessLevel: "Registration Required",
    isStateMonopoly: false,
    versionControlSupported: true,
    pidsSupported: false,
    updatedAt: "2026-08-20"
  },
  {
    id: "ob-handelsbanken",
    name: "Handelsbanken API Developer Portal",
    code: "SHB-API",
    country: "SE",
    flagEmoji: "🇸🇪",
    category: "OPEN BANKING / OPEN FINANCE",
    subcategory: "Nordic Institutional Banking",
    summary: "Nordic Open Banking portal for TPP registration, sandbox testing, customer consents, account statements, and real-time payment initiation.",
    mainUrl: "https://developer.handelsbanken.com",
    directRegistrationUrl: "https://developer.handelsbanken.com/user/register",
    documentationUrl: "https://developer.handelsbanken.com/documentation",
    generalEmail: "openbanking@handelsbanken.se",
    generalPhone: "+46 8 701 1000",
    generalFax: "+46 8 701 2182",
    managementContacts: [
      {
        id: "c-shb-1",
        name: "Carina Åkerström",
        role: "Group Chief Executive Officer",
        department: "Executive Management",
        email: "carina.akerstrom@handelsbanken.se",
        phone: "+46 8 701 1001",
        isPrimary: true
      },
      {
        id: "c-shb-2",
        name: "Mattias Forsberg",
        role: "Chief Information Officer & Head of IT Infrastructure",
        department: "IT Infrastructure",
        email: "mattias.forsberg@handelsbanken.se",
        phone: "+46 8 701 1002"
      }
    ],
    apiConnectors: [
      {
        protocol: "OpenAPI v3",
        endpointUrl: "https://openbanking.handelsbanken.com/psd2/v1",
        sandboxUrl: "https://openbanking.handelsbanken.com/sandbox/v1",
        documentationUrl: "https://developer.handelsbanken.com/apis",
        authType: "QWAC/QSeal (eIDAS)",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-handelsbanken-openbanking"
      }
    ],
    depositCapacity: "N/A (API Only)",
    metadataStandards: ["Berlin Group NextGenPSD2", "ISO 20022"],
    accessLevel: "Regulatory TPP License",
    isStateMonopoly: false,
    versionControlSupported: true,
    pidsSupported: false,
    updatedAt: "2026-07-30"
  },
  {
    id: "ob-onelinq",
    name: "OneLinQ Multi-Bank Federation API Portal",
    code: "ONELINQ-FED",
    country: "NL",
    flagEmoji: "🇳🇱",
    category: "OPEN BANKING / OPEN FINANCE",
    subcategory: "Multi-Bank Aggregation Platform",
    summary: "Unified European multi-bank API gateway connecting dozens of European banks via a single integration layer supporting Berlin Group and STET standards.",
    mainUrl: "https://www.onelinq.com",
    directRegistrationUrl: "https://portal.onelinq.com/signup",
    documentationUrl: "https://docs.onelinq.com/api",
    generalEmail: "support@onelinq.com",
    generalPhone: "+31 20 220 0400",
    generalFax: "+31 20 220 0401",
    managementContacts: [
      {
        id: "c-onelinq-1",
        name: "Rob van Dijk",
        role: "Chief Executive Officer",
        department: "Executive",
        email: "r.vandijk@onelinq.com",
        phone: "+31 20 220 0410",
        isPrimary: true
      },
      {
        id: "c-onelinq-2",
        name: "Sander de Bruijn",
        role: "Chief Technology Officer",
        department: "API Infrastructure",
        email: "s.debruijn@onelinq.com",
        phone: "+31 20 220 0411"
      }
    ],
    apiConnectors: [
      {
        protocol: "REST API",
        endpointUrl: "https://api.onelinq.com/v2/multibank",
        sandboxUrl: "https://sandbox-api.onelinq.com/v2",
        documentationUrl: "https://docs.onelinq.com",
        authType: "OAuth 2.0",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-onelinq-multibank"
      }
    ],
    depositCapacity: "N/A (API Only)",
    metadataStandards: ["Berlin Group", "STET", "ISO 20022", "REST"],
    accessLevel: "Registration Required",
    isStateMonopoly: false,
    versionControlSupported: true,
    pidsSupported: false,
    updatedAt: "2026-08-11"
  },

  // ==========================================
  // 2. DLT-TSS & TRUST SERVICES / EUDI WALLET
  // ==========================================
  {
    id: "dlt-ebsi",
    name: "European Blockchain Services Infrastructure (EBSI Node Portal)",
    code: "EBSI-NODE",
    country: "EU",
    flagEmoji: "🇪🇺",
    category: "DLT-TSS & TRUST SERVICES",
    subcategory: "EU Member States Fictional & Sovereign DLT",
    summary: "European Commission & European Blockchain Partnership sovereign DLT network powering verifiable credentials, eIDAS trust services, e-Passports, and cross-border digital identity.",
    mainUrl: "https://ec.europa.eu/digital-building-blocks/sites/display/EBSI",
    directRegistrationUrl: "https://ec.europa.eu/digital-building-blocks/wikis/display/EBSI/Onboarding+to+EBSI",
    documentationUrl: "https://ec.europa.eu/digital-building-blocks/sites/display/EBSI/API+Documentation",
    openDataRepoUrl: "https://github.com/eunotaries/ebsi",
    generalEmail: "EC-EBSI-SUPPORT@ec.europa.eu",
    generalPhone: "+32 2 299 1111",
    generalFax: "+32 2 299 1112",
    managementContacts: [
      {
        id: "c-ebsi-1",
        name: "Daniel Du Seuil",
        role: "EBSI Convenor & EU Blockchain Lead",
        department: "DG CONNECT - European Commission",
        email: "daniel.du-seuil@ec.europa.eu",
        phone: "+32 2 299 4410",
        fax: "+32 2 299 4411",
        isPrimary: true
      },
      {
        id: "c-ebsi-2",
        name: "Pierre Marro",
        role: "Head of Sector Digital Innovation & DLT Trust",
        department: "DG CNECT",
        email: "pierre.marro@ec.europa.eu",
        phone: "+32 2 299 4412"
      }
    ],
    apiConnectors: [
      {
        protocol: "JSON-RPC & REST",
        endpointUrl: "https://api.ebsi.eu/did/v2",
        sandboxUrl: "https://api-conformance.ebsi.eu/v2",
        documentationUrl: "https://ec.europa.eu/digital-building-blocks/sites/display/EBSI/APIs",
        authType: "QWAC/QSeal (eIDAS)",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-ebsi-trust-anchor",
        mcpConfigSnippet: JSON.stringify({
          command: "npx",
          args: ["-y", "@eudi-wallet/mcp-ebsi-connector"],
          env: { EBSI_DID_KEY: "${EBSI_DID_KEY}" }
        }, null, 2)
      }
    ],
    depositCapacity: "L (>1TB)",
    metadataStandards: ["Verifiable Credentials W3C", "eIDAS 2.0", "DID", "JSON-LD"],
    accessLevel: "Institutional Approval",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-08-25"
  },
  {
    id: "dlt-eidas-qts",
    name: "EU Trust Services Dashboard & Qualified Trust Providers (eIDAS 2.0)",
    code: "EIDAS-QTS",
    country: "EU",
    flagEmoji: "🇪🇺",
    category: "DLT-TSS & TRUST SERVICES",
    subcategory: "Regulatory Trust Anchor & Qualified Certificates",
    summary: "Official European Commission repository of Trusted Lists (LOTL) and Qualified Trust Service Providers (QTSP) providing QES, QSeal, timestamping, and EUDI Wallet attestations.",
    mainUrl: "https://eidas.ec.europa.eu/efda/tl-browser",
    directRegistrationUrl: "https://eidas.ec.europa.eu/efda/tl-browser/#/search",
    documentationUrl: "https://ec.europa.eu/digital-building-blocks/sites/display/DIGITAL/eSignature",
    generalEmail: "eidas-dashboard@ec.europa.eu",
    generalPhone: "+32 2 299 9999",
    generalFax: "+32 2 299 8888",
    managementContacts: [
      {
        id: "c-eidas-1",
        name: "Sylvia Kainz",
        role: "Head of Unit eIDAS & Electronic Trust Services",
        department: "DG CONNECT Unit H4",
        email: "sylvia.kainz@ec.europa.eu",
        phone: "+32 2 299 5520",
        isPrimary: true
      },
      {
        id: "c-eidas-2",
        name: "Marc Sel",
        role: "Chief Trust Architect & QTSP Compliance Officer",
        department: "eIDAS Advisory Board",
        email: "marc.sel@ec.europa.eu",
        phone: "+32 2 299 5521"
      }
    ],
    apiConnectors: [
      {
        protocol: "REST API",
        endpointUrl: "https://eidas.ec.europa.eu/efda/tl-browser/api/v1/providers",
        documentationUrl: "https://eidas.ec.europa.eu/efda/tl-browser/api-docs",
        authType: "Open Data / Public",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-eidas-trust-list"
      }
    ],
    depositCapacity: "M (20GB-1TB)",
    metadataStandards: ["eIDAS 2.0", "ETSI TS 119 612", "XML-DSig", "X.509 PKI"],
    accessLevel: "Open / Free",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-08-28"
  },

  // ==========================================
  // 3. INFRASTRUCTURE & RESEARCH FEDERATIONS
  // ==========================================
  {
    id: "infra-eosc-node",
    name: "EOSC EU Node & Federation Registry",
    code: "EOSC-EUNODE",
    country: "EU",
    flagEmoji: "🇪🇺",
    category: "INFRASTRUCTURE & RESEARCH FEDERATIONS",
    subcategory: "European Open Science Cloud Core Infrastructure",
    summary: "European flagship research infrastructure connecting compute, storage, workflows, data spaces, and federated nodes across all EU member states.",
    mainUrl: "https://eosc-portal.eu",
    directRegistrationUrl: "https://open-science-cloud.ec.europa.eu/node/register",
    documentationUrl: "https://eosc-portal.eu/providers-hub",
    openDataRepoUrl: "https://gitlab.eosc-portal.eu",
    generalEmail: "info@eosc-portal.eu",
    generalPhone: "+32 2 550 0010",
    generalFax: "+32 2 550 0011",
    managementContacts: [
      {
        id: "c-eosc-1",
        name: "Ute Gunsenheimer",
        role: "Secretary General EOSC Association",
        department: "Executive Management",
        email: "ute.gunsenheimer@eosc.eu",
        phone: "+32 2 550 0020",
        isPrimary: true
      },
      {
        id: "c-eosc-2",
        name: "Karel Luyben",
        role: "President EOSC Association Board",
        department: "Board of Directors",
        email: "karel.luyben@eosc.eu",
        phone: "+32 2 550 0021"
      }
    ],
    apiConnectors: [
      {
        protocol: "REST API",
        endpointUrl: "https://providers.eosc-portal.eu/api/service/all",
        documentationUrl: "https://providers.eosc-portal.eu/openapi",
        authType: "OAuth 2.0",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-eosc-federation",
        mcpConfigSnippet: JSON.stringify({
          command: "npx",
          args: ["-y", "@eosc/mcp-federation-node"],
          env: { EOSC_API_KEY: "${EOSC_API_KEY}" }
        }, null, 2)
      }
    ],
    depositCapacity: "Unlimited",
    metadataStandards: ["DCAT-AP", "DataCite", "Dublin Core", "OAI-PMH", "RO-Crate"],
    accessLevel: "Open / Free",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-08-30"
  },
  {
    id: "infra-egi",
    name: "EGI Federation & Compute Node Platform",
    code: "EGI-FED",
    country: "Global",
    flagEmoji: "🌐",
    category: "INFRASTRUCTURE & RESEARCH FEDERATIONS",
    subcategory: "High-Performance Compute & HTC Infrastructure",
    summary: "Federated cloud, high-throughput computing (HTC), container orchestration, and multi-petabyte storage platform uniting 300+ data centers globally.",
    mainUrl: "https://www.egi.eu",
    directRegistrationUrl: "https://aai.egi.eu/signup",
    documentationUrl: "https://docs.egi.eu",
    generalEmail: "contact@egi.eu",
    generalPhone: "+31 20 890 8030",
    generalFax: "+31 20 890 8031",
    managementContacts: [
      {
        id: "c-egi-1",
        name: "Tiziana Ferrari",
        role: "Director of EGI Foundation",
        department: "Executive Directorate",
        email: "tiziana.ferrari@egi.eu",
        phone: "+31 20 890 8032",
        isPrimary: true
      },
      {
        id: "c-egi-2",
        name: "Yannick Legré",
        role: "Chief Operating Officer",
        department: "Operations & Infrastructure",
        email: "yannick.legre@egi.eu",
        phone: "+31 20 890 8033"
      }
    ],
    apiConnectors: [
      {
        protocol: "REST API",
        endpointUrl: "https://api.egi.eu/v1/compute/clusters",
        documentationUrl: "https://docs.egi.eu/developers/api",
        authType: "OAuth 2.0",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-egi-compute-grid"
      }
    ],
    depositCapacity: "Unlimited",
    metadataStandards: ["GLUE2 Schema", "OIDC", "S3", "OpenStack API"],
    accessLevel: "Institutional Approval",
    isStateMonopoly: false,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-08-18"
  },
  {
    id: "infra-geant",
    name: "GÉANT Network & eduGAIN Identity Federation",
    code: "GEANT-EDUGain",
    country: "EU",
    flagEmoji: "🇪🇺",
    category: "INFRASTRUCTURE & RESEARCH FEDERATIONS",
    subcategory: "Pan-European Gigabit Research Network & Identity SSO",
    summary: "High-speed multi-gigabit pan-European network connecting over 50 million scientific researchers and 10,000+ federated eduGAIN identity providers.",
    mainUrl: "https://geant.org",
    directRegistrationUrl: "https://edugain.org/join",
    documentationUrl: "https://wiki.geant.org",
    generalEmail: "info@geant.org",
    generalPhone: "+44 1223 371300",
    generalFax: "+44 1223 371301",
    managementContacts: [
      {
        id: "c-geant-1",
        name: "Erik Huizer",
        role: "Chief Executive Officer",
        department: "Executive Office",
        email: "erik.huizer@geant.org",
        phone: "+44 1223 371310",
        isPrimary: true
      },
      {
        id: "c-geant-2",
        name: "Matthew Scott",
        role: "Chief Infrastructure Officer",
        department: "Network Operations",
        email: "matthew.scott@geant.org",
        phone: "+44 1223 371311"
      }
    ],
    apiConnectors: [
      {
        protocol: "REST API",
        endpointUrl: "https://mds.edugain.org/v1/entities",
        documentationUrl: "https://technical.edugain.org/api",
        authType: "Open Data / Public",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-edugain-identity-federation"
      }
    ],
    depositCapacity: "Unlimited",
    metadataStandards: ["SAML 2.0 Metadata", "OIDC", "eduPersonSchema"],
    accessLevel: "Institutional Approval",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-08-22"
  },
  {
    id: "infra-ripe-ncc",
    name: "RIPE NCC Regional Internet Registry & Database Portal",
    code: "RIPE-NCC",
    country: "Global",
    flagEmoji: "🌐",
    category: "INFRASTRUCTURE & RESEARCH FEDERATIONS",
    subcategory: "Internet Number Registry & Autonomous Systems",
    summary: "Regional Internet Registry allocating IP address space (IPv4/IPv6), Autonomous System Numbers (ASN), RPKI route validation, and RIPE Database query APIs.",
    mainUrl: "https://www.ripe.net",
    directRegistrationUrl: "https://my.ripe.net/#/register",
    documentationUrl: "https://github.com/RIPE-NCC/ripe-db-web-ui",
    openDataRepoUrl: "https://stat.ripe.net/docs/02.data_api",
    generalEmail: "ncc@ripe.net",
    generalPhone: "+31 20 535 4444",
    generalFax: "+31 20 535 4445",
    managementContacts: [
      {
        id: "c-ripe-1",
        name: "Hans Petter Holen",
        role: "Managing Director & CEO",
        department: "Executive Committee",
        email: "hphol@ripe.net",
        phone: "+31 20 535 4410",
        isPrimary: true
      },
      {
        id: "c-ripe-2",
        name: "Felipe Victolla Silveira",
        role: "Chief Operating Officer",
        department: "Operations",
        email: "felipe.silveira@ripe.net",
        phone: "+31 20 535 4411"
      }
    ],
    apiConnectors: [
      {
        protocol: "REST API",
        endpointUrl: "https://stat.ripe.net/data/whois/data.json",
        documentationUrl: "https://stat.ripe.net/docs/02.data_api",
        authType: "Open Data / Public",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-ripe-stat-whois"
      }
    ],
    depositCapacity: "Unlimited",
    metadataStandards: ["RPSL", "RDAP", "RPKI", "REST"],
    accessLevel: "Registration Required",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-08-14"
  },

  // ==========================================
  // 4. INSTITUTIONAL & GOVERNMENT REPOSITORIES
  // ==========================================
  {
    id: "repo-eudat-b2share",
    name: "EUDAT B2SHARE Pan-European Research Repository",
    code: "B2SHARE-EUDAT",
    country: "EU",
    flagEmoji: "🇪🇺",
    category: "INSTITUTIONAL & GOVERNMENT REPOSITORIES",
    subcategory: "Persistent Data Object & Metadata Storage",
    summary: "Pan-European FAIR research data repository supporting up to 20GB/record, Dublin Core/DataCite metadata tagging, versioning, and persistent DOI allocation.",
    mainUrl: "https://b2share.eudat.eu",
    directRegistrationUrl: "https://b2access.eudat.eu/oauth2-as/user-registration",
    documentationUrl: "https://b2share.eudat.eu/help/api",
    openDataRepoUrl: "https://github.com/EUDAT-B2SHARE/b2share",
    generalEmail: "b2share-support@eudat.eu",
    generalPhone: "+358 9 457 2001",
    generalFax: "+358 9 457 2302",
    managementContacts: [
      {
        id: "c-b2s-1",
        name: "Per Öster",
        role: "Head of EUDAT Secretariat",
        department: "EUDAT CDI",
        email: "per.oster@csc.fi",
        phone: "+358 9 457 2010",
        isPrimary: true
      },
      {
        id: "c-b2s-2",
        name: "Damien Lecarpentier",
        role: "Director of Research Data Infrastructure",
        department: "EUDAT Governance",
        email: "damien.lecarpentier@eudat.eu",
        phone: "+358 9 457 2011"
      }
    ],
    apiConnectors: [
      {
        protocol: "REST API",
        endpointUrl: "https://b2share.eudat.eu/api/records",
        documentationUrl: "https://b2share.eudat.eu/help/api",
        authType: "API Key",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-eudat-b2share",
        mcpConfigSnippet: JSON.stringify({
          command: "npx",
          args: ["-y", "@eudat/mcp-b2share-uploader"],
          env: { B2SHARE_TOKEN: "${B2SHARE_TOKEN}" }
        }, null, 2)
      },
      {
        protocol: "OAI-PMH",
        endpointUrl: "https://b2share.eudat.eu/api/oai2d",
        documentationUrl: "https://b2share.eudat.eu/help/oai",
        authType: "Open Data / Public",
        status: "Online / Production",
        mcpCompatible: false
      }
    ],
    depositCapacity: "M (20GB-1TB)",
    metadataStandards: ["Dublin Core", "DataCite", "JSON-LD", "OAI-PMH"],
    accessLevel: "Registration Required",
    isStateMonopoly: false,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-08-29"
  },
  {
    id: "repo-openaire-provide",
    name: "OpenAIRE PROVIDE Gateway & Repository Aggregator",
    code: "OPENAIRE-PROVIDE",
    country: "EU",
    flagEmoji: "🇪🇺",
    category: "INSTITUTIONAL & GOVERNMENT REPOSITORIES",
    subcategory: "Repository Registry & Open Science Graph",
    summary: "European gateway for registering, validating, and harvesting academic & institutional repositories into the OpenAIRE Open Science Research Graph.",
    mainUrl: "https://provide.openaire.eu",
    directRegistrationUrl: "https://provide.openaire.eu/register/select",
    documentationUrl: "https://provide.openaire.eu/documentation",
    generalEmail: "info@openaire.eu",
    generalPhone: "+30 210 687 5400",
    generalFax: "+30 210 687 5401",
    managementContacts: [
      {
        id: "c-openaire-1",
        name: "Natalia Manola",
        role: "Chief Executive Officer OpenAIRE AMKE",
        department: "Executive Directorate",
        email: "natalia.manola@openaire.eu",
        phone: "+30 210 687 5410",
        isPrimary: true
      },
      {
        id: "c-openaire-2",
        name: "Paolo Manghi",
        role: "Chief Technology Officer & Graph Architect",
        department: "Tech Directorate",
        email: "paolo.manghi@openaire.eu",
        phone: "+30 210 687 5411"
      }
    ],
    apiConnectors: [
      {
        protocol: "REST API",
        endpointUrl: "https://api.openaire.eu/search/datasets",
        documentationUrl: "https://graph.openaire.eu/docs/category/api",
        authType: "Open Data / Public",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-openaire-graph"
      }
    ],
    depositCapacity: "Unlimited",
    metadataStandards: ["OpenAIRE Guidelines", "DataCite", "Dublin Core", "OAI-PMH"],
    accessLevel: "Open / Free",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-08-27"
  },
  {
    id: "repo-zenodo",
    name: "Zenodo / CERN Open Research Repository",
    code: "ZENODO-CERN",
    country: "EU",
    flagEmoji: "🇨🇭",
    category: "INSTITUTIONAL & GOVERNMENT REPOSITORIES",
    subcategory: "Generalist Scientific Archive (InvenioRDM)",
    summary: "Open-access repository hosted by CERN under Horizon Europe accepting datasets up to 50GB/upload with automatic DOI generation and GitHub software release archiving.",
    mainUrl: "https://zenodo.org",
    directRegistrationUrl: "https://zenodo.org/signup",
    documentationUrl: "https://developers.zenodo.org",
    openDataRepoUrl: "https://github.com/zenodo/zenodo",
    generalEmail: "info@zenodo.org",
    generalPhone: "+41 22 767 6111",
    generalFax: "+41 22 767 6555",
    managementContacts: [
      {
        id: "c-zenodo-1",
        name: "Lars Holm Nielsen",
        role: "Head of Zenodo & InvenioRDM Architect",
        department: "CERN IT Department",
        email: "lars.holm.nielsen@cern.ch",
        phone: "+41 22 767 1120",
        isPrimary: true
      },
      {
        id: "c-zenodo-2",
        name: "Dr. Tim Smith",
        role: "Head of Open Science Group",
        department: "CERN IT-DB",
        email: "tim.smith@cern.ch",
        phone: "+41 22 767 1121"
      }
    ],
    apiConnectors: [
      {
        protocol: "REST API",
        endpointUrl: "https://zenodo.org/api/deposit/deposits",
        sandboxUrl: "https://sandbox.zenodo.org/api/deposit/deposits",
        documentationUrl: "https://developers.zenodo.org",
        authType: "OAuth 2.0",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-zenodo-publisher",
        mcpConfigSnippet: JSON.stringify({
          command: "npx",
          args: ["-y", "@cern/mcp-zenodo-uploader"],
          env: { ZENODO_ACCESS_TOKEN: "${ZENODO_ACCESS_TOKEN}" }
        }, null, 2)
      }
    ],
    depositCapacity: "M (20GB-1TB)",
    metadataStandards: ["DataCite", "Dublin Core", "JSON-LD", "OAI-PMH"],
    accessLevel: "Open / Free",
    isStateMonopoly: false,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-08-31"
  },
  {
    id: "repo-harvard-dataverse",
    name: "Harvard Dataverse Open Research Repository",
    code: "HARVARD-DATAVERSE",
    country: "US",
    flagEmoji: "🇺🇸",
    category: "INSTITUTIONAL & GOVERNMENT REPOSITORIES",
    subcategory: "Global Open Dataverse Network Hub",
    summary: "World-leading open research repository hosted by Harvard IQSS open to researchers worldwide for uploading, sharing, citing, and persistent DOI archiving of data.",
    mainUrl: "https://dataverse.harvard.edu",
    directRegistrationUrl: "https://dataverse.harvard.edu/dataverseuser.xhtml?editMode=CREATE",
    documentationUrl: "https://guides.dataverse.org/en/latest/api",
    generalEmail: "support@dataverse.harvard.edu",
    generalPhone: "+1 617 495 1000",
    generalFax: "+1 617 495 8888",
    managementContacts: [
      {
        id: "c-dataverse-1",
        name: "Mercè Crosas",
        role: "Former Chief Data Science & Technology Officer",
        department: "IQSS Harvard",
        email: "mcrosas@iq.harvard.edu",
        phone: "+1 617 495 1210",
        isPrimary: true
      },
      {
        id: "c-dataverse-2",
        name: "Gary King",
        role: "Director of Institute for Quantitative Social Science",
        department: "Harvard IQSS",
        email: "gking@harvard.edu",
        phone: "+1 617 495 1211"
      }
    ],
    apiConnectors: [
      {
        protocol: "REST API",
        endpointUrl: "https://dataverse.harvard.edu/api/v1/dataverses",
        documentationUrl: "https://guides.dataverse.org/en/latest/api/native-api.html",
        authType: "API Key",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-harvard-dataverse"
      }
    ],
    depositCapacity: "L (>1TB)",
    metadataStandards: ["DataCite", "Dublin Core", "DDI", "OAI-PMH"],
    accessLevel: "Open / Free",
    isStateMonopoly: false,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-08-10"
  },
  {
    id: "repo-dnb-netzpublikationen",
    name: "Deutsche Nationalbibliothek (DNB Netzpublikationen)",
    code: "DNB-NETZ",
    country: "DE",
    flagEmoji: "🇩🇪",
    category: "INSTITUTIONAL & GOVERNMENT REPOSITORIES",
    subcategory: "German Sovereign Legal Deposit Institution",
    summary: "Official German sovereign deposit library collecting online publications, scientific e-books, e-journals, web archives, and digital master copies.",
    mainUrl: "https://www.dnb.de",
    directRegistrationUrl: "https://www.dnb.de/DE/Netzpublikationen/netzpublikationen_node.html",
    documentationUrl: "https://www.dnb.de/DE/Service/Schnittstellen/schnittstellen_node.html",
    generalEmail: "np-info@dnb.de",
    generalPhone: "+49 69 1525 0",
    generalFax: "+49 69 1525 1010",
    managementContacts: [
      {
        id: "c-dnb-1",
        name: "Frank Scholze",
        role: "Director General Deutsche Nationalbibliothek",
        department: "General Directorate",
        email: "f.scholze@dnb.de",
        phone: "+49 69 1525 1001",
        fax: "+49 69 1525 1011",
        isPrimary: true
      },
      {
        id: "c-dnb-2",
        name: "Dr. Stephanie Palek",
        role: "Head of Digital Collections & Legal Deposit",
        department: "Digital Library Division",
        email: "s.palek@dnb.de",
        phone: "+49 69 1525 1002"
      }
    ],
    apiConnectors: [
      {
        protocol: "OAI-PMH",
        endpointUrl: "https://services.dnb.de/oai/repository",
        documentationUrl: "https://www.dnb.de/DE/Service/Schnittstellen/oai.html",
        authType: "Open Data / Public",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-dnb-oai-harvester"
      }
    ],
    depositCapacity: "L (>1TB)",
    metadataStandards: ["MARC21", "Dublin Core", "EPIC-URN", "OAI-PMH"],
    accessLevel: "Registration Required",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-08-01"
  },
  {
    id: "repo-bnf-extranet",
    name: "Bibliothèque nationale de France (BnF Extranet Dépôt Légal)",
    code: "BNF-DL",
    country: "FR",
    flagEmoji: "🇫🇷",
    category: "INSTITUTIONAL & GOVERNMENT REPOSITORIES",
    subcategory: "French Sovereign Digital Legal Deposit",
    summary: "Official French national library portal for declaring, depositing, and long-term archiving of digital publications, dematerialised software, and databases.",
    mainUrl: "https://www.bnf.fr",
    directRegistrationUrl: "https://extranet.bnf.fr/depotlegal/inscription.do",
    documentationUrl: "https://api.bnf.fr",
    generalEmail: "depot.legal.numerique@bnf.fr",
    generalPhone: "+33 1 53 79 59 59",
    generalFax: "+33 1 53 79 41 41",
    managementContacts: [
      {
        id: "c-bnf-1",
        name: "Gilles Pécout",
        role: "President Bibliothèque nationale de France",
        department: "President's Office",
        email: "gilles.pecout@bnf.fr",
        phone: "+33 1 53 79 40 00",
        isPrimary: true
      },
      {
        id: "c-bnf-2",
        name: "Emmanuelle Bermès",
        role: "Deputy Director of IT Services & Digital Strategy",
        department: "Digital Directorate",
        email: "emmanuelle.bermes@bnf.fr",
        phone: "+33 1 53 79 40 01"
      }
    ],
    apiConnectors: [
      {
        protocol: "REST API",
        endpointUrl: "https://api.bnf.fr/api/v1/search",
        documentationUrl: "https://api.bnf.fr",
        authType: "Open Data / Public",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-bnf-gallica-api"
      }
    ],
    depositCapacity: "L (>1TB)",
    metadataStandards: ["Intermarc", "Dublin Core", "ARK", "OAI-PMH"],
    accessLevel: "Registration Required",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-08-05"
  },

  // ==========================================
  // 5. STATE MONOPOLY & CENTRAL BANKS
  // ==========================================
  {
    id: "bank-ecb-sdmx",
    name: "European Central Bank (ECB Data Portal & SDMX API)",
    code: "ECB-STAT",
    country: "EU",
    flagEmoji: "🇪🇺",
    category: "STATE MONOPOLY & CENTRAL BANKS",
    subcategory: "European Central Banking System",
    summary: "Official ECB statistical portal delivering Eurozone macroeconomic metrics, exchange rates, monetary policy data, and institutional financial statistics via SDMX REST API.",
    mainUrl: "https://data.ecb.europa.eu",
    directRegistrationUrl: "https://data.ecb.europa.eu/help/api/overview",
    documentationUrl: "https://sdw-wsrest.ecb.europa.eu/help",
    generalEmail: "statistics@ecb.europa.eu",
    generalPhone: "+49 69 1344 0",
    generalFax: "+49 69 1344 6000",
    managementContacts: [
      {
        id: "c-ecb-1",
        name: "Christine Lagarde",
        role: "President of the European Central Bank",
        department: "Executive Board",
        email: "christine.lagarde@ecb.europa.eu",
        phone: "+49 69 1344 7001",
        fax: "+49 69 1344 7000",
        isPrimary: true
      },
      {
        id: "c-ecb-2",
        name: "Silke Stapel-Weber",
        role: "Director General Statistics",
        department: "DG Statistics",
        email: "silke.stapel-weber@ecb.europa.eu",
        phone: "+49 69 1344 7010"
      }
    ],
    apiConnectors: [
      {
        protocol: "SDMX 2.1",
        endpointUrl: "https://data-api.ecb.europa.eu/service/data",
        documentationUrl: "https://data.ecb.europa.eu/help/api/overview",
        authType: "Open Data / Public",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-ecb-sdmx-stats",
        mcpConfigSnippet: JSON.stringify({
          command: "npx",
          args: ["-y", "@finance/mcp-ecb-sdmx"],
          env: { ECB_FORMAT: "csv" }
        }, null, 2)
      }
    ],
    depositCapacity: "N/A (API Only)",
    metadataStandards: ["SDMX 2.1", "JSON-stat", "CSV-stat"],
    accessLevel: "Open / Free",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: false,
    updatedAt: "2026-08-28"
  },
  {
    id: "bank-bis-stat",
    name: "Bank for International Settlements (BIS Data Portal & SDMX)",
    code: "BIS-BASEL",
    country: "Global",
    flagEmoji: "🌐",
    category: "STATE MONOPOLY & CENTRAL BANKS",
    subcategory: "Global Central Bank Infrastructure & Basel Accord",
    summary: "International central bank organization providing global banking statistics, cross-border credit metrics, debt securities, exchange rates, and Basel III liquidity ratios.",
    mainUrl: "https://www.bis.org",
    directRegistrationUrl: "https://www.bis.org/statistics/full_data_sets.htm",
    documentationUrl: "https://www.bis.org/statistics/api.htm",
    generalEmail: "email@bis.org",
    generalPhone: "+41 61 280 8080",
    generalFax: "+41 61 280 9100",
    managementContacts: [
      {
        id: "c-bis-1",
        name: "Agustín Carstens",
        role: "General Manager",
        department: "Executive Management",
        email: "agustin.carstens@bis.org",
        phone: "+41 61 280 8100",
        isPrimary: true
      },
      {
        id: "c-bis-2",
        name: "Hyun Song Shin",
        role: "Economic Adviser & Head of Research",
        department: "Monetary & Economic Dept",
        email: "hyunsong.shin@bis.org",
        phone: "+41 61 280 8101"
      }
    ],
    apiConnectors: [
      {
        protocol: "SDMX 2.1",
        endpointUrl: "https://stats.bis.org/api/v1/data",
        documentationUrl: "https://www.bis.org/statistics/api.htm",
        authType: "Open Data / Public",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-bis-stats"
      }
    ],
    depositCapacity: "N/A (API Only)",
    metadataStandards: ["SDMX 2.1", "ISO 20022", "REST"],
    accessLevel: "Open / Free",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: false,
    updatedAt: "2026-08-25"
  },
  {
    id: "bank-bundesbank",
    name: "Deutsche Bundesbank Data Portal & Research Repository",
    code: "BUBA-STAT",
    country: "DE",
    flagEmoji: "🇩🇪",
    category: "STATE MONOPOLY & CENTRAL BANKS",
    subcategory: "German Central Bank",
    summary: "Central bank of Germany providing national monetary data, banking statistics, financial stability metrics, and controlled research data access (INREST/FDZ).",
    mainUrl: "https://www.bundesbank.de",
    directRegistrationUrl: "https://www.bundesbank.de/de/bundesbank/forschung/rdsc/registrierung",
    documentationUrl: "https://www.bundesbank.de/de/statistiken/zeitreihen-datenbanken/hilfe-und-api",
    generalEmail: "info@bundesbank.de",
    generalPhone: "+49 69 9566 0",
    generalFax: "+49 69 9566 3077",
    managementContacts: [
      {
        id: "c-buba-1",
        name: "Dr. Joachim Nagel",
        role: "President of Deutsche Bundesbank",
        department: "Executive Board",
        email: "joachim.nagel@bundesbank.de",
        phone: "+49 69 9566 1001",
        fax: "+49 69 9566 1000",
        isPrimary: true
      },
      {
        id: "c-buba-2",
        name: "Claudia Buch",
        role: "Vice-President (Supervisory Board Chair)",
        department: "Executive Board",
        email: "claudia.buch@bundesbank.de",
        phone: "+49 69 9566 1002"
      }
    ],
    apiConnectors: [
      {
        protocol: "SDMX 2.1",
        endpointUrl: "https://api.statistiken.bundesbank.de/rest/download",
        documentationUrl: "https://www.bundesbank.de/de/statistiken/zeitreihen-datenbanken/hilfe-und-api/api-schnittstelle-zeitreihen-776092",
        authType: "Open Data / Public",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-bundesbank-sdmx"
      }
    ],
    depositCapacity: "M (20GB-1TB)",
    metadataStandards: ["SDMX 2.1", "DataCite", "CSV"],
    accessLevel: "Institutional Approval",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-08-12"
  },
  {
    id: "bank-bafin",
    name: "BaFin Federal Financial Supervisory Authority Portal",
    code: "BAFIN-DE",
    country: "DE",
    flagEmoji: "🇩🇪",
    category: "STATE MONOPOLY & CENTRAL BANKS",
    subcategory: "German Financial Market Supervisor",
    summary: "German federal authority supervising banks, financial service providers, stock exchanges, and insurance firms, offering MVP portal reporting and public company database.",
    mainUrl: "https://www.bafin.de",
    directRegistrationUrl: "https://www.bafin.de/DE/DieBaFin/Service/MVPPortal/mvpportal_node.html",
    documentationUrl: "https://www.bafin.de/DE/DieBaFin/Service/Datenbanken/datenbanken_node.html",
    generalEmail: "poststelle@bafin.de",
    generalPhone: "+49 228 4108 0",
    generalFax: "+49 228 4108 1550",
    managementContacts: [
      {
        id: "c-bafin-1",
        name: "Mark Branson",
        role: "President of BaFin",
        department: "Executive Committee",
        email: "mark.branson@bafin.de",
        phone: "+49 228 4108 1001",
        isPrimary: true
      },
      {
        id: "c-bafin-2",
        name: "Raimund Röseler",
        role: "Chief Executive Director of Banking Supervision",
        department: "Banking Supervision",
        email: "raimund.roeseler@bafin.de",
        phone: "+49 228 4108 1002"
      }
    ],
    apiConnectors: [
      {
        protocol: "REST API",
        endpointUrl: "https://www.bafin.de/api/v1/unternehmensdatenbank",
        documentationUrl: "https://www.bafin.de/DE/DieBaFin/Service/Datenbanken/Unternehmensdatenbank/unternehmensdatenbank_node.html",
        authType: "Open Data / Public",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-bafin-registry"
      }
    ],
    depositCapacity: "N/A (API Only)",
    metadataStandards: ["XFinanz", "XBRL", "REST"],
    accessLevel: "Registration Required",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: false,
    updatedAt: "2026-08-19"
  },

  // ==========================================
  // 6. API & MCP CONNECTORS HUB
  // ==========================================
  {
    id: "mcp-official-repo",
    name: "Model Context Protocol (MCP) Connectors Hub",
    code: "MCP-HUB",
    country: "Global",
    flagEmoji: "🌐",
    category: "API & MCP CONNECTORS HUB",
    subcategory: "Open Protocol Specification & Connector Registry",
    summary: "Central open-source repository and protocol specification hub for Model Context Protocol (MCP) servers connecting LLM/AI agents directly to databases and enterprise REST/GraphQL APIs.",
    mainUrl: "https://modelcontextprotocol.io",
    directRegistrationUrl: "https://github.com/modelcontextprotocol/servers",
    documentationUrl: "https://modelcontextprotocol.io/docs",
    openDataRepoUrl: "https://github.com/modelcontextprotocol",
    generalEmail: "mcp-core@modelcontextprotocol.io",
    generalPhone: "+1 415 555 0199",
    generalFax: "+1 415 555 0190",
    managementContacts: [
      {
        id: "c-mcp-1",
        name: "Alex Albert",
        role: "Head of Developer Relations & MCP Protocol Governance",
        department: "MCP Standards Committee",
        email: "alex@modelcontextprotocol.io",
        phone: "+1 415 555 0101",
        isPrimary: true
      },
      {
        id: "c-mcp-2",
        name: "Dario Amodei",
        role: "Co-Founder & Protocol Sponsor",
        department: "Executive Board",
        email: "dario@modelcontextprotocol.io",
        phone: "+1 415 555 0102"
      }
    ],
    apiConnectors: [
      {
        protocol: "MCP Server",
        endpointUrl: "https://api.modelcontextprotocol.io/v1/registry",
        documentationUrl: "https://modelcontextprotocol.io/introduction",
        authType: "Open Data / Public",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-master-registry-server",
        mcpConfigSnippet: JSON.stringify({
          mcpServers: {
            "master-plan-archive": {
              command: "npx",
              args: ["-y", "@modelcontextprotocol/server-postgres"],
              env: { POSTGRES_URL: "postgresql://archive:masterplan@localhost:5432/mcp_registry" }
            }
          }
        }, null, 2)
      }
    ],
    depositCapacity: "Unlimited",
    metadataStandards: ["MCP Protocol Spec", "OpenAPI 3.0", "JSON-RPC 2.0"],
    accessLevel: "Open / Free",
    isStateMonopoly: false,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-09-01"
  },
  {
    id: "mcp-eu-data-portal",
    name: "data.europa.eu Open Data Portal & API Workbench",
    code: "EU-DATA-HUB",
    country: "EU",
    flagEmoji: "🇪🇺",
    category: "API & MCP CONNECTORS HUB",
    subcategory: "Official European Data Portal & DCAT-AP Hub",
    summary: "The single point of access to open data from European international, national, regional, and local public administrations across 36 countries with SPARQL endpoints and OpenAPI specs.",
    mainUrl: "https://data.europa.eu",
    directRegistrationUrl: "https://data.europa.eu/en/user/register",
    documentationUrl: "https://data.europa.eu/en/developer/apis",
    openDataRepoUrl: "https://github.com/ec-mddr/data.europa.eu",
    generalEmail: "info@data.europa.eu",
    generalPhone: "+352 2929 42110",
    generalFax: "+352 2929 42758",
    managementContacts: [
      {
        id: "c-eudata-1",
        name: "Marc de Vries",
        role: "Director Publications Office of the EU",
        department: "Publications Office",
        email: "marc.devries@publications.europa.eu",
        phone: "+352 2929 42200",
        isPrimary: true
      },
      {
        id: "c-eudata-2",
        name: "Simon Mandl",
        role: "Lead API Architect & DCAT-AP Manager",
        department: "Data Infrastructure Team",
        email: "simon.mandl@data.europa.eu",
        phone: "+352 2929 42201"
      }
    ],
    apiConnectors: [
      {
        protocol: "REST API",
        endpointUrl: "https://data.europa.eu/api/hub/store/search",
        documentationUrl: "https://data.europa.eu/en/developer/apis",
        authType: "Open Data / Public",
        status: "Online / Production",
        mcpCompatible: true,
        mcpServerName: "mcp-data-europa-dcat",
        mcpConfigSnippet: JSON.stringify({
          command: "npx",
          args: ["-y", "@open-data/mcp-data-europa-connector"],
          env: { DCAT_FORMAT: "turtle" }
        }, null, 2)
      }
    ],
    depositCapacity: "Unlimited",
    metadataStandards: ["DCAT-AP", "SPARQL 1.1", "RDF/XML", "JSON-LD", "Dublin Core"],
    accessLevel: "Open / Free",
    isStateMonopoly: true,
    versionControlSupported: true,
    pidsSupported: true,
    updatedAt: "2026-09-02"
  }
];

export const INITIAL_PORTALS: PortalRecord[] = [...BASE_PORTALS, ...EXTENDED_PORTALS];
