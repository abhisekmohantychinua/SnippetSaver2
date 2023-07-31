import {UserResponseDto} from "../user/UserResponseDto.tsx";
import {ReviewDto} from "../review/ReviewDto.tsx";

export interface SnippetDto {
    id: string,
    title: string,
    description: string,
    language: string,
    code: string,
    tags: Array<string>,
    userId:string,
    user:UserResponseDto,
    likes:Array<string>,
    likedUserNames:Array<string>,
    reviewDtos: Array<ReviewDto>
}