export interface SnippetRequestDto {
    title: string,
    description: string,
    code: string,
    language: string,
    tags: Array<string>
}