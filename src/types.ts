export type PortalCategory =
  | "OPEN BANKING / OPEN FINANCE"
  | "DLT-TSS & TRUST SERVICES"
  | "INFRASTRUCTURE & RESEARCH FEDERATIONS"
  | "INSTITUTIONAL & GOVERNMENT REPOSITORIES"
  | "STATE MONOPOLY & CENTRAL BANKS"
  | "DEFENCE, SECURITY & MILITARY NODES"
  | "API & MCP CONNECTORS HUB";

export type DepositCapacity = "S (<20GB)" | "M (20GB-1TB)" | "L (>1TB)" | "Unlimited" | "N/A (API Only)";

export type ApiAuthType = "OAuth 2.0" | "API Key" | "QWAC/QSeal (eIDAS)" | "mTLS" | "Open Data / Public" | "SDMX 2.1";

export type ApiProtocol = "OpenAPI v3" | "REST API" | "SDMX 2.1" | "OAI-PMH" | "MCP Server" | "GraphQL" | "gRPC" | "JSON-RPC & REST";

export interface ManagementContact {
  id: string;
  name: string;
  role: string;
  department?: string;
  email: string;
  phone: string;
  fax?: string;
  linkedinUrl?: string;
  isPrimary?: boolean;
}

export interface ApiConnector {
  protocol: ApiProtocol;
  endpointUrl: string;
  sandboxUrl?: string;
  documentationUrl: string;
  authType: ApiAuthType;
  status: "Online / Production" | "Sandbox / Testing" | "Certification" | "Under Maintenance";
  mcpCompatible: boolean;
  mcpServerName?: string;
  mcpConfigSnippet?: string; // JSON configuration snippet for MCP
  openApiSpecUrl?: string;
}

export interface PortalRecord {
  id: string;
  name: string;
  code: string;
  country: string; // ISO code or full name e.g., "DE", "EU", "CH", "US", "Global"
  flagEmoji: string;
  category: PortalCategory;
  subcategory: string;
  summary: string;
  
  // URLs
  mainUrl: string;
  directRegistrationUrl: string;
  documentationUrl?: string;
  openDataRepoUrl?: string;

  // General Communication Options
  generalEmail: string;
  generalPhone: string;
  generalFax: string;

  // Level-C Management Contacts
  managementContacts: ManagementContact[];

  // API & MCP Connectors
  apiConnectors: ApiConnector[];

  // Infrastructure & Master Plan Spec
  depositCapacity: DepositCapacity;
  metadataStandards: string[]; // e.g., ["Dublin Core", "DataCite", "SDMX", "ISO 20022", "DCAT"]
  accessLevel: "Open / Free" | "Registration Required" | "Institutional Approval" | "Regulatory TPP License";
  isStateMonopoly: boolean;
  versionControlSupported: boolean;
  pidsSupported: boolean; // DOI / Handles / ORCID

  notes?: string;
  updatedAt: string;
}

export interface CommunicationLog {
  id: string;
  portalId: string;
  portalName: string;
  type: "Call" | "Email" | "Fax";
  recipient: string;
  contactRole?: string;
  subject?: string;
  messageSnippet?: string;
  timestamp: string;
  status: "Initiated" | "Simulated Call" | "Email Sent" | "Fax Dispatched";
}

export interface McpServerConfig {
  mcpServers: {
    [serverKey: string]: {
      command: string;
      args: string[];
      env?: Record<string, string>;
    };
  };
}

export interface FilterState {
  searchQuery: string;
  category: string;
  country: string;
  capacity: string;
  hasMcpOnly: boolean;
  hasOpenApiOnly: boolean;
  isMonopolyOnly: boolean;
}
