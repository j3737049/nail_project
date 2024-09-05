declare module 'pinia-plugin-persist' {
    import { PiniaPluginContext } from 'pinia'
    const piniaPluginPersist: (context: PiniaPluginContext) => void
    export default piniaPluginPersist
}