import { Guid } from 'guid-typescript';
import { Group, Message } from './user-lazy-loaded';

export interface FirstMessageModel{
    currentId: Guid,
    group: Group
}
export interface MessageSubmitModel{
    GroupId: Guid,
    CreatorGroupUserId: Guid,
    MessageUI: Message
}