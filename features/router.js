(function () {
  const globalTarget = typeof window !== "undefined" ? window : globalThis;
  const homeHash = "#/dashboard";
  const modulePrefix = "#/module/";

  function hasWindowLocation() {
    return typeof window !== "undefined" && window.location;
  }

  function isAppRoute(hash) {
    return typeof hash === "string" && hash.startsWith("#/");
  }

  function isDashboardRoute(hash) {
    const normalized = normalizeRoute(hash);
    return normalized.type === "dashboard";
  }

  function getHomeRoute() {
    return homeHash;
  }

  function buildModuleRoute(moduleId) {
    if (typeof moduleId !== "string" || !/^[a-z0-9-]+$/.test(moduleId)) {
      return homeHash;
    }

    return `${modulePrefix}${moduleId}`;
  }

  function getRouteModuleId(route) {
    const hash = typeof route === "string" ? route : route && route.hash;

    if (!isAppRoute(hash) || !hash.startsWith(modulePrefix)) {
      return null;
    }

    const moduleId = hash
      .slice(modulePrefix.length)
      .split("?")[0]
      .split("#")[0]
      .trim();

    return /^[a-z0-9-]+$/.test(moduleId) ? moduleId : null;
  }

  function normalizeRoute(hash) {
    const routeHash = typeof hash === "string" ? hash : "";

    if (!routeHash || routeHash === "#" || routeHash === "#/" || routeHash === homeHash) {
      return {
        type: "dashboard",
        moduleId: null,
        hash: routeHash || homeHash
      };
    }

    if (!isAppRoute(routeHash)) {
      return {
        type: "dashboard",
        moduleId: null,
        hash: routeHash
      };
    }

    const moduleId = getRouteModuleId(routeHash);

    if (moduleId) {
      return {
        type: "module",
        moduleId,
        hash: routeHash
      };
    }

    return {
      type: "unknown",
      moduleId: null,
      hash: routeHash
    };
  }

  function getCurrentRoute() {
    const hash = hasWindowLocation() && typeof window.location.hash === "string"
      ? window.location.hash
      : homeHash;

    return normalizeRoute(hash);
  }

  function navigateHome() {
    if (hasWindowLocation()) {
      window.location.hash = homeHash;
    }

    return homeHash;
  }

  globalTarget.KekeRouter = {
    getCurrentRoute,
    isAppRoute,
    navigateHome,
    getRouteModuleId,
    normalizeRoute,
    buildModuleRoute,
    getHomeRoute,
    isDashboardRoute
  };
})();
