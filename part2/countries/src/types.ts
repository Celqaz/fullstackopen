interface Language {
    [key: string]: string
}

interface CountryInfo {
    name: {
        common: string
    }
    capital: string
    population:number
    languages: Language
    flags: {
        png: string
    }
}

export type {CountryInfo}
