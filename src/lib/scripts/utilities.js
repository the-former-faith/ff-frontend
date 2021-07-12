const parseGivenName = (x = { givenNames: [] }) =>
    x.givenNames.en ? x.givenNames.en.join(" ") : ""

const parseFamilyName = (x) => x.familyName.en || ""

const combineNames = (x) => {
    const givenName = parseGivenName(x)
    const familyName = parseFamilyName(x)
    return givenName && familyName ? `${givenName} ${familyName}` : familyName || givenName
}

export const displayName = (x) => combineNames(x) || ''

const extractTitles = (x) => x.map(y => y.title.en)

export const displayTitles = (x) => extractTitles(x)

// Text Conversion

export const convertToCamelCase = (x) => x.replace(/-([a-z])/g, (g)=> g[1].toUpperCase())