import {Review} from "./Review.tsx";

export interface Snippet {
    id: string,
    title: string,
    description: string,
    code: string,
    language: string,
    tags: Array<string>,
    userId: string,
    likes: Array<string>,
    reviews: Array<Review>
}