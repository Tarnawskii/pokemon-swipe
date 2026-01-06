import { AppService } from './app.service';
import { RegisterUserDto } from './register-user.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    hello(): {
        message: string;
    };
    getHello(): string;
    registerUser(registerUserDto: RegisterUserDto): Promise<boolean>;
    loginUser(loginDto: {
        identifier: string;
        password: string;
    }): Promise<{
        success: boolean;
        username?: string;
    }>;
    recordSwipe(swipeDto: {
        username: string;
        pokemonId: number;
        action: 'like' | 'dislike';
        name?: string;
        joke?: string;
    }): Promise<boolean>;
    getSwipes(getSwipesDto: {
        username: string;
    }): Promise<{
        likedPokemons: import("./user.entity").SwipeEntry[];
        dislikedPokemons: import("./user.entity").SwipeEntry[];
    }>;
}
