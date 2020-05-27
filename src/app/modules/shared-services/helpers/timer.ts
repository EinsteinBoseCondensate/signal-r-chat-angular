export const delay = (ms:any) =>{
    if(!ms)
    {
        throw Error('milliseconds to wait cannot be null')
    }
        return new Promise(res => setTimeout(res, ms));
    }