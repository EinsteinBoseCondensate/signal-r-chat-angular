import { Guid } from 'guid-typescript';

export interface ChatGroup{
    name: Guid,
    title: string
    messages: Message[]
}
export interface Message{
    content: string,
    isRemote: boolean,
    isSentOk: boolean,
    isReceivedOk: boolean,
    creatorName: string,
    hasBeenSaved:boolean
}