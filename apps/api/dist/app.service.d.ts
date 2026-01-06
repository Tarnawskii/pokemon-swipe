import { Repository } from 'typeorm';
import { SwipeEntry, User } from './user.entity';
export declare class AppService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    getHello(): string;
    registerUser(userData: {
        username: string;
        email: string;
        password: string;
    }): Promise<boolean>;
    loginUser(identifier: string, password: string): Promise<{
        success: boolean;
        username?: string;
    }>;
    recordSwipe(swipeData: {
        username: string;
        pokemonId: number;
        action: 'like' | 'dislike';
        name?: string;
        joke?: string;
    }): Promise<boolean>;
    getSwipes(username: string): Promise<{
        likedPokemons: SwipeEntry[];
        dislikedPokemons: SwipeEntry[];
    }>;
}
