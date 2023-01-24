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
    const telemetries = []
    /** @type {Array<import("./DtdlOM").PropertyInfo>} */
    const properties = []
    /** @type {Array<import("./DtdlOM").CommandInfo>} */
    const commands = []
    /** @type {Array<import("./DtdlOM").ComponentInfo>} */
    const components = []
    /** @type {Array<import("./DtdlOM").RelationshipInfo>} */
    const relationships = []
    
    const root = /** @type import("./DtdlOM").InterfaceInfo*/(om[dtmi])
    Object.entries(root.contents).forEach(c => {
        const elDtmi = c[1]
        const el = om[elDtmi]
        if (el.EntityKind === entityKind.Property) {
            properties.push(/** @type {import("./DtdlOM").PropertyInfo} */(el))
        }
        if (el.EntityKind === entityKind.Telemetry) {
            telemetries.push(/** @type {import("./DtdlOM").TelemetryInfo} */(el))
        }
        if (el.EntityKind === entityKind.Command) {
            commands.push(/** @type {import("./DtdlOM").CommandInfo} */(el))
        }
        if (el.EntityKind === entityKind.Relationship) {
            relationships.push(/** @type {import("./DtdlOM").RelationshipInfo} */(el))
        }
        if (el.EntityKind === entityKind.Component) {
            components.push(/** @type {import("./DtdlOM").ComponentInfo} */(el))
        }

    })
    
    
    /** @return {Array<import("./DtdlOM").TelemetryInfo>} */
    const compoTels = compoId => filterMap(om, compoId, entityKind.Telemetry)
    /** @return {Array<import("./DtdlOM").PropertyInfo>} */
    const compoProps = compoId =>  filterMap(om, compoId, entityKind.Property)
    /** @return {Array<import("./DtdlOM").CommandInfo>} */
    const compoCmds = compoId =>  filterMap(om, compoId, entityKind.Command)
    return { telemetries, properties, commands, components, relationships, compoTels, compoProps, compoCmds }

}