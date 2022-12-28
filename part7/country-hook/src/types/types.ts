export interface CountryType {
    name: {
        common: string
    }
    population: number,

    capital: string,
    flags :{
        png: string
        svg?: string
    }
}
