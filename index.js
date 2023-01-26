import { InterfaceInfo } from "./interfaceInfo.js"

const app = document.getElementById('app')
const applog = (a, b) => app.innerHTML += a + b + '\n'

const myDtdlOM = await (await fetch('sample-om.json')).json()

const info = InterfaceInfo(myDtdlOM, 'dtmi:com:example;1')
info.telemetries.forEach(t => applog('t:', t.name))
info.properties.forEach(p => applog('p:', p.name))
info.commands.forEach(c => applog('c:', c.name))
info.components.forEach(co => {
    applog('co:', co.name, co.schema)
    info.compoTels(co.schema).forEach(t => applog('  t:', t.name))
    info.compoProps(co.schema).forEach(p => applog('  p:', p.name))
    info.compoCmds(co.schema).forEach(c => applog('  c:', c.name))
})
