export declare class RegisterUserDto {
    username: string;
    email: string;
    password: string;
}
export declare class LoginUserDto {
    identifier: string;
    password: string;
}
export declare class SwipeDto {
    username: string;
    pokemonId: number;
    action: 'like' | 'dislike';
    name?: string;
    joke?: string;
}
export declare class GetSwipesDto {
    username: string;
}
