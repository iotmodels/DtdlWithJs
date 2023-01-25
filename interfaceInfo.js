// @ts-check

const filterMap = (om, dtmi, kind) => Object.entries(om).filter(e => e[1].EntityKind === kind && e[1].ChildOf === dtmi).map(e => e[1])

const contentKind = {
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
        switch(el.EntityKind) {
            case contentKind.Property:
                properties.push(/** @type {import("./DtdlOM").PropertyInfo} */(el))
                break
            case contentKind.Telemetry:
                telemetries.push(/** @type {import("./DtdlOM").TelemetryInfo} */(el))
                break
            case contentKind.Command:
                commands.push(/** @type {import("./DtdlOM").CommandInfo} */(el))
                break
            case contentKind.Component:
                components.push(/** @type {import("./DtdlOM").ComponentInfo} */(el))
                break
            case contentKind.Relationship:
                relationships.push(/** @type {import("./DtdlOM").RelationshipInfo} */(el))
                break
        }
    })
    
    /** @return {Array<import("./DtdlOM").TelemetryInfo>} */
    const compoTels = (/** @type {String} */ compoId) => filterMap(om, compoId, contentKind.Telemetry)
    /** @return {Array<import("./DtdlOM").PropertyInfo>} */
    const compoProps = (/** @type {String} */ compoId) =>  filterMap(om, compoId, contentKind.Property)
    /** @return {Array<import("./DtdlOM").CommandInfo>} */
    const compoCmds = (/** @type {String} */ compoId) =>  filterMap(om, compoId, contentKind.Command)
    return { telemetries, properties, commands, components, relationships, compoTels, compoProps, compoCmds }

}