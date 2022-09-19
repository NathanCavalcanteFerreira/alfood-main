export default interface IPaginacao<T>{
    count: number
    next: string
    previous: string
    results: []
}
