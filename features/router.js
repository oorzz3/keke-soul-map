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

    return moduleId || null;
  }

  function getCurrentRoute() {
    const hash = hasWindowLocation() && typeof window.location.hash === "string"
      ? window.location.hash
      : homeHash;

    if (!hash || hash === "#" || !isAppRoute(hash)) {
      return {
        type: "dashboard",
        moduleId: null,
        hash: hash || homeHash
      };
    }

    if (hash === "#/" || hash === homeHash) {
      return {
        type: "dashboard",
        moduleId: null,
        hash
      };
    }

    const moduleId = getRouteModuleId(hash);

    if (moduleId) {
      return {
        type: "module",
        moduleId,
        hash
      };
    }

    return {
      type: "unknown",
      moduleId: null,
      hash
    };
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
    getRouteModuleId
  };
})();
