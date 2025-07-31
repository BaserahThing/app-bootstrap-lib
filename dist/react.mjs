import { useState, useRef, useEffect, useCallback } from 'react';

// src/react.ts
var AppBootstrapEvents = class {
  constructor() {
    this.listeners = {};
  }
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
    return () => {
      this.listeners[event] = this.listeners[event].filter((cb) => cb !== callback);
    };
  }
  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((callback) => callback(data));
    }
  }
};
var appBootstrapEvents = new AppBootstrapEvents();
function getAssetManifest() {
  return window.ASSET_MANIFEST || null;
}
function isAppBootstrapReady() {
  return window.APP_BOOTSTRAP_READY === true;
}
function getCurrentLoadingState() {
  return window.APP_BOOTSTRAP_LOADING_STATE || null;
}
function useAppBootstrap(config = {}) {
  const [loadingState, setLoadingState] = useState({
    isLoaded: false,
    isLoading: false,
    progress: 0,
    currentChunk: "",
    loadedChunks: [],
    totalChunks: 0,
    error: null,
    startTime: Date.now()
  });
  const [assetManifest, setAssetManifest] = useState(null);
  const [error, setError] = useState(null);
  const isReady = useRef(false);
  useEffect(() => {
    const currentState = getCurrentLoadingState();
    const currentManifest = getAssetManifest();
    if (currentState) {
      setLoadingState(currentState);
    }
    if (currentManifest) {
      setAssetManifest(currentManifest);
    }
    if (isAppBootstrapReady()) {
      isReady.current = true;
      setLoadingState((prev) => ({
        ...prev,
        isLoaded: true,
        isLoading: false,
        progress: 100
      }));
    }
  }, []);
  useEffect(() => {
    const unsubscribeStart = appBootstrapEvents.on("loading:start", (_event) => {
      setLoadingState((prev) => ({
        ...prev,
        isLoading: true,
        isLoaded: false,
        startTime: Date.now(),
        error: null
      }));
      setError(null);
    });
    const unsubscribeProgress = appBootstrapEvents.on("loading:progress", (event) => {
      setLoadingState((prev) => ({
        ...prev,
        progress: event.data?.progress || prev.progress
      }));
    });
    const unsubscribeComplete = appBootstrapEvents.on("loading:complete", (_event) => {
      isReady.current = true;
      setLoadingState((prev) => ({
        ...prev,
        isLoaded: true,
        isLoading: false,
        progress: 100,
        endTime: Date.now(),
        duration: Date.now() - prev.startTime
      }));
    });
    const unsubscribeError = appBootstrapEvents.on("loading:error", (event) => {
      const errorMessage = event.data?.error || "Unknown loading error";
      setError(errorMessage);
      setLoadingState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
    });
    const unsubscribeManifestLoaded = appBootstrapEvents.on("manifest:loaded", (event) => {
      setAssetManifest(event.data?.manifest);
    });
    return () => {
      unsubscribeStart();
      unsubscribeProgress();
      unsubscribeComplete();
      unsubscribeError();
      unsubscribeManifestLoaded();
    };
  }, []);
  useEffect(() => {
    if (assetManifest || !config.enableDebug) return;
    const pollInterval = setInterval(() => {
      const manifest = getAssetManifest();
      if (manifest) {
        setAssetManifest(manifest);
        clearInterval(pollInterval);
      }
    }, 100);
    return () => clearInterval(pollInterval);
  }, [assetManifest, config.enableDebug]);
  useEffect(() => {
    if (isReady.current) return;
    const checkDevReady = () => {
      const rootElement = document.getElementById("root");
      if (rootElement && rootElement.children.length > 0) {
        const appContent = rootElement.querySelector(".app, .home-page, .system-config-page, .video-player-page");
        if (appContent) {
          console.log("[useAppBootstrap] Development mode: App content detected, marking as ready");
          isReady.current = true;
          setLoadingState((prev) => ({
            ...prev,
            isLoaded: true,
            isLoading: false,
            progress: 100,
            endTime: Date.now(),
            duration: Date.now() - prev.startTime
          }));
          return true;
        }
      }
      return false;
    };
    if (checkDevReady()) return;
    const pollInterval = setInterval(() => {
      if (checkDevReady()) {
        clearInterval(pollInterval);
      }
    }, 100);
    const timeout = setTimeout(() => {
      clearInterval(pollInterval);
      if (!isReady.current) {
        console.log("[useAppBootstrap] Development mode: Fallback timeout, marking as ready");
        isReady.current = true;
        setLoadingState((prev) => ({
          ...prev,
          isLoaded: true,
          isLoading: false,
          progress: 100,
          endTime: Date.now(),
          duration: Date.now() - prev.startTime
        }));
      }
    }, 3e3);
    return () => {
      clearInterval(pollInterval);
      clearTimeout(timeout);
    };
  }, []);
  const retry = useCallback(() => {
    setError(null);
    setLoadingState((prev) => ({
      ...prev,
      error: null,
      isLoading: true,
      isLoaded: false,
      startTime: Date.now()
    }));
    appBootstrapEvents.emit("loading:retry", { timestamp: Date.now() });
  }, []);
  const getChunkProgress = useCallback((chunkName) => {
    if (!assetManifest) return 0;
    const chunk = assetManifest.js[chunkName];
    return chunk ? 100 : 0;
  }, [assetManifest]);
  const getOverallProgress = useCallback(() => {
    return loadingState.progress;
  }, [loadingState.progress]);
  useEffect(() => {
    if (config.enableDebug) {
      console.log("[useAppBootstrap] Loading state:", loadingState);
      console.log("[useAppBootstrap] Asset manifest:", assetManifest);
      console.log("[useAppBootstrap] Error:", error);
    }
  }, [loadingState, assetManifest, error, config.enableDebug]);
  return {
    loadingState,
    assetManifest,
    isReady: isReady.current,
    error,
    retry,
    getChunkProgress,
    getOverallProgress
  };
}
function useAppBootstrapStatus() {
  const { loadingState, isReady, error } = useAppBootstrap();
  return {
    isReady,
    isLoading: loadingState.isLoading,
    isLoaded: loadingState.isLoaded,
    progress: loadingState.progress,
    error,
    currentChunk: loadingState.currentChunk
  };
}
function useAppBootstrapWithConfig(config) {
  return useAppBootstrap(config);
}

export { appBootstrapEvents, useAppBootstrap, useAppBootstrapStatus, useAppBootstrapWithConfig };
//# sourceMappingURL=react.mjs.map
//# sourceMappingURL=react.mjs.map