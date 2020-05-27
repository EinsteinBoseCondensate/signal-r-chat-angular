import { InitialLoad } from 'src/app/models/Backend/user-lazy-loaded';

export interface tokenResult{
    result: innerResult
}
interface innerResult{
    token: string,
    username: string,
    initialLoad: InitialLoad
}