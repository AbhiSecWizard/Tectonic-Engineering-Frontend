
import { useCallback, useEffect, useMemo, useState } from "react";
import Title from "../components/Title";

// ==========================================
// API CONFIGURATION
// ==========================================

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000"
).replace(/\/$/, "");

const CLIENTS_API = `${API_URL}/api/clients/website`;

const MAX_WORK = 4;

// ==========================================
// CONSTANTS
// ==========================================

const SECTORS = [
  {
    id: "government",
    heading: "Government & Public Sector",
  },
  {
    id: "private",
    heading: "Private Sector",
  },
  {
    id: "international",
    heading: "International",
  },
];

// ==========================================
// HELPER FUNCTIONS
// ==========================================

const getLogoUrl = (logo) => {
  if (!logo) return "";

  if (typeof logo === "string") {
    return logo;
  }

  return logo.url || "";
};

const getWorkText = (item) => {
  if (typeof item === "string") {
    return item;
  }

  if (!item || typeof item !== "object") {
    return "";
  }

  return (
    item.name ||
    item.title ||
    item.description ||
    item.projectName ||
    ""
  );
};

// ==========================================
// NORMALIZE API RESPONSE
// ==========================================

const normalizeClients = (result) => {
  const responseData = result?.data;

  // Case 1: Backend returns a direct array
  if (Array.isArray(responseData)) {
    return responseData;
  }

  // Case 2: Backend returns grouped clients
  // {
  //   government: [],
  //   private: [],
  //   international: []
  // }

  if (
    !responseData ||
    typeof responseData !== "object"
  ) {
    return [];
  }

  return Object.entries(responseData)
    .filter(([, clients]) => Array.isArray(clients))
    .flatMap(([sector, clients]) =>
      clients.map((client) => ({
        ...client,
        sector: client.sector || sector,
      }))
    );
};

// ==========================================
// CLIENT LOGO
// ==========================================

const ClientLogo = ({ client }) => {
  const [logoFailed, setLogoFailed] = useState(false);

  const logoUrl = getLogoUrl(client.logo);

  if (!logoUrl || logoFailed) {
    return (
      <div className="flex h-16 items-center">
        <span className="text-2xl font-bold text-heading">
          {client.shortName || client.name?.slice(0, 3) || "Client"}
        </span>
      </div>
    );
  }

  return (
    <div className="flex h-16 items-center">
      <img
        src={logoUrl}
        alt={`${client.name || "Client"} logo`}
        loading="lazy"
        onError={() => setLogoFailed(true)}
        className="max-h-14 max-w-full object-contain"
      />
    </div>
  );
};

// ==========================================
// CLIENT CARD
// ==========================================

const ClientCard = ({ client }) => {
  const work = Array.isArray(client.work)
    ? client.work.map(getWorkText).filter(Boolean)
    : [];

  const visibleWork = work.slice(0, MAX_WORK);
  const remainingWork = work.length - visibleWork.length;

  return (
    <article className="flex h-full flex-col border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Logo */}
      <ClientLogo client={client} />

      {/* Client Name */}
      <h4 className="mt-4 text-lg font-semibold leading-snug text-heading">
        {client.name}
      </h4>

      {/* Short Name */}
      {client.shortName && (
        <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted">
          {client.shortName}
        </p>
      )}

      {/* Scope */}
      {client.scope && (
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {client.scope}
        </p>
      )}

      {/* Work */}
      {visibleWork.length > 0 && (
        <div className="mt-5 flex-1 border-t border-border pt-4">
          <h5 className="text-sm font-semibold text-heading">
            Our Work
          </h5>

          <ul className="mt-3 space-y-3">
            {visibleWork.map((item, index) => (
              <li
                key={`${client._id || client.shortName || client.name}-${index}`}
                className="flex items-start gap-3 text-sm leading-relaxed text-body"
              >
                <span
                  className="mt-1.5 size-2 shrink-0 rounded-full bg-secondary"
                  aria-hidden="true"
                />

                <span>{item}</span>
              </li>
            ))}
          </ul>

          {remainingWork > 0 && (
            <p className="mt-3 text-xs font-semibold text-muted">
              + {remainingWork} more projects
            </p>
          )}
        </div>
      )}
    </article>
  );
};

// ==========================================
// CLIENT SKELETON
// ==========================================

const ClientSkeleton = () => (
  <div className="animate-pulse border border-border bg-surface p-6">
    <div className="h-16 w-32 rounded bg-background" />
    <div className="mt-5 h-5 w-3/4 rounded bg-background" />
    <div className="mt-3 h-3 w-1/3 rounded bg-background" />
    <div className="mt-6 h-3 w-full rounded bg-background" />
    <div className="mt-3 h-3 w-5/6 rounded bg-background" />
  </div>
);

// ==========================================
// CLIENTS PAGE
// ==========================================

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ========================================
  // FETCH CLIENTS
  // ========================================

  const fetchClients = useCallback(async (signal) => {
    try {
      setLoading(true);
      setError("");

      console.log("CLIENTS API:", CLIENTS_API);

      const response = await fetch(CLIENTS_API, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        signal,
      });

      const result = await response.json();

      console.log("CLIENTS API RESPONSE:", result);

      if (!response.ok || result.success === false) {
        throw new Error(
          result.message || "Failed to fetch clients."
        );
      }

      const clientData = normalizeClients(result);

      console.log("NORMALIZED CLIENTS:", clientData);
      console.log("TOTAL CLIENTS:", clientData.length);

      setClients(clientData);
    } catch (error) {
      if (error.name === "AbortError") return;

      console.error("CLIENTS FETCH ERROR:", error);

      setError(
        error.message || "Something went wrong while loading clients."
      );
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  // ========================================
  // INITIAL API CALL
  // ========================================

  useEffect(() => {
    const controller = new AbortController();

    fetchClients(controller.signal);

    return () => controller.abort();
  }, [fetchClients]);

  // ========================================
  // GROUP CLIENTS BY SECTOR
  // ========================================

  const clientGroups = useMemo(() => {
    return SECTORS.map((sector) => {
      const sectorClients = clients
        .filter(
          (client) =>
            String(client.sector || "").toLowerCase() === sector.id
        )
        .sort(
          (a, b) =>
            (a.displayOrder ?? 9999) -
            (b.displayOrder ?? 9999)
        );

      return {
        ...sector,
        clients: sectorClients,
      };
    }).filter((group) => group.clients.length > 0);
  }, [clients]);

  // ========================================
  // RETRY API
  // ========================================

  const handleRetry = () => {
    fetchClients();
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <section className="bg-background py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Page Title */}
        <Title
          title="OUR ESTEEMED CLIENTS"
          subtitle={
            loading
              ? "Loading our clients..."
              : `${clients.length} clients across government, private and international sectors`
          }
        />

        {/* Loading State */}
        {loading && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <ClientSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="mt-12 border border-border bg-surface px-6 py-16 text-center">
            <h3 className="text-lg font-semibold text-heading">
              Unable to load clients
            </h3>

            <p className="mt-2 text-sm text-muted">
              {error}
            </p>

            <button
              type="button"
              onClick={handleRetry}
              className="mt-6 bg-heading px-6 py-3 text-sm font-semibold text-white transition hover:bg-secondary"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && clients.length === 0 && (
          <div className="mt-12 border border-border bg-surface px-6 py-16 text-center">
            <h3 className="text-lg font-semibold text-heading">
              No clients available
            </h3>

            <p className="mt-2 text-sm text-muted">
              Our client information will be updated soon.
            </p>
          </div>
        )}

        {/* Client Groups */}
        {!loading && !error && clients.length > 0 && (
          <div className="mt-12 space-y-14">
            {clientGroups.map((group) => (
              <div key={group.id}>

                {/* Sector Heading */}
                <h3 className="text-xl font-semibold text-heading">
                  {group.heading}

                  <span className="ml-2 font-normal text-muted">
                    ({group.clients.length})
                  </span>
                </h3>

                {/* Client Cards */}
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {group.clients.map((client, index) => (
                    <ClientCard
                      key={
                        client._id ||
                        `${group.id}-${client.shortName || client.name || index}`
                      }
                      client={client}
                    />
                  ))}
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Clients;
