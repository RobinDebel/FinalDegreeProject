export const config = {
    VUE_APP_WS: (process.env.NODE_ENV == "production") ? ((window.location.protocol === "https:") ? "wss://" : "ws://") + window.location.host + "/websocket/" : process.env.VUE_APP_WS,
    VUE_APP_BACKEND_BASE_URL: (process.env.NODE_ENV == "production") ? window.location.protocol + "//" + window.location.host + "/api" : process.env.VUE_APP_BACKEND_BASE_URL,
    VUE_APP_MAPBOX_TOKEN: process.env.VUE_APP_MAPBOX_TOKEN
}