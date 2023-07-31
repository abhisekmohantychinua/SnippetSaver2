import {User} from "../../entity/User.tsx";
import {SnippetDto} from "../snippet/SnippetDto.tsx";
import {ReviewDto} from "../review/ReviewDto.tsx";

export interface Me {
    me: User,
    mySnippets: Array<SnippetDto>,
    myReviews: Array<ReviewDto>
}