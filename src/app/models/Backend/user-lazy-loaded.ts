import { Guid } from "guid-typescript";

export interface Group{
    name: string,
    id: Guid
    groupUsers: User[]
    messageUsers: MessageUser[]
}
export interface MessageUser{
    realMsg: Message,
    user: User,
    pendingSend: boolean,
    pendingReceive: boolean
}
export interface Message{
    content: string,
    created: string,
    realCreated: Date,
    creatorName: string,
    isMine: boolean,
    id:Guid
}

export interface User{
    id: Guid,
    userName: string
}
export interface InitialLoad{
    groups: Group[],
    frienships: Friendship[]
}
export interface Friendship{
    friendName: string,
    pending: boolean,
    external: boolean,
    id: Guid

}