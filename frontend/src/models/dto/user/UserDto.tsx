import {Snippet} from "../../entity/Snippet.tsx";
import {ReviewDto} from "../review/ReviewDto.tsx";

export interface UserDto {
    id: string
    firstname: string
    lastname: string
    snippets: Array<Snippet>
    reviews: Array<ReviewDto>
}