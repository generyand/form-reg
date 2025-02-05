import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Only expose electron-specific features here
const api = {
  // Example: IPC methods
  sendMessage: (message: string) => {
    // IPC implementation
    console.log(message)
  }
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
}
