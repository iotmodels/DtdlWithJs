import { InterfaceInfo } from "./interfaceInfo.js"

const app = document.getElementById('app')
const applog = (...args) => app.innerHTML += args.concat() + '\n'

const myDtdlOM = await (await fetch('sample-om.json')).json()

applog('Root')
const info = InterfaceInfo(myDtdlOM, 'dtmi:com:example;1')
info.print(applog)
info.components.forEach(co => {
    applog(`[Co] ${co.name} ${co.schema}`)
    const coInfo = InterfaceInfo(myDtdlOM, co.schema)
    coInfo.print(applog)
})
