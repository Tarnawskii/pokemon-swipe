export type SwipeEntry = {
    pokemonId: number;
    name: string;
    joke: string;
};
export declare class User {
    id: number;
    username: string;
    email: string;
    password: string;
    likes: SwipeEntry[];
    dislikes: SwipeEntry[];
    createdAt: Date;
}
