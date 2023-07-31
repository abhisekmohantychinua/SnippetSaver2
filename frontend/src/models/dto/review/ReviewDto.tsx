import {UserResponseDto} from "../user/UserResponseDto.tsx";
import {SnippetRequestDto} from "../snippet/SnippetRequestDto.tsx";

export interface ReviewDto {
    id: string,
    userId: string,
    snippetId: string,
    review: string,
    user: UserResponseDto,
    snippet: SnippetRequestDto
}