// @ts-check

const filterMap = (om, dtmi, kind) => Object.entries(om).filter(e => e[1].EntityKind === kind && e[1].ChildOf === dtmi).map(e => e[1])

const contentsFilterMap = (om, dtmi, kind) => Object.entries(om).filter(e => e[1].EntityKind === kind && e[1].ChildOf === dtmi).map(e => e[1])

const entityKind = {
    Telemetry: 'Telemetry',
    Property: 'Property',
    Command: 'Command',
    Component: 'Component',
    Relationship: 'Relationship'
}

export const InterfaceInfo = (/** @type import("./DtdlOM").DtdlObjectModel */om, /** @type {String} */ dtmi) => {
    /** @type {Array<import("./DtdlOM").TelemetryInfo>} */
    const telemetries = filterMap(om, dtmi, entityKind.Telemetry)

    /** @type {Array<import("./DtdlOM").PropertyInfo>} */
    const properties = []

    const root = /** @type import("./DtdlOM").InterfaceInfo*/(om[dtmi])
    const content = Object.entries(root.contents).forEach(c => {
        const elDtmi = c[1]
        const el = om[elDtmi]
        if (el.EntityKind === entityKind.Property) {
            properties.push(/** @type {import("./DtdlOM").PropertyInfo} */(el))
        }
    })
    
    
    /** @type {Array<import("./DtdlOM").CommandInfo>} */
    const commands = filterMap(om, dtmi, entityKind.Command)
    /** @type {Array<import("./DtdlOM").ComponentInfo>} */
    const components = filterMap(om, dtmi, entityKind.Component)
    /** @type {Array<import("./DtdlOM").RelationshipInfo>} */
    const relationships = filterMap(om, dtmi, entityKind.Relationship)
    /** @return {Array<import("./DtdlOM").TelemetryInfo>} */
    const compoTels = compoId => filterMap(om, compoId, entityKind.Telemetry)
    /** @return {Array<import("./DtdlOM").PropertyInfo>} */
    const compoProps = compoId =>  filterMap(om, compoId, entityKind.Property)
    /** @return {Array<import("./DtdlOM").CommandInfo>} */
    const compoCmds = compoId =>  filterMap(om, compoId, entityKind.Command)
    return { telemetries, properties, commands, components, relationships, compoTels, compoProps, compoCmds }

}