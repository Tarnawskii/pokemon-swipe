export class RegisterUserDto {
  username: string;
  email: string;
  password: string;
}

export class LoginUserDto {
  identifier: string
  password: string;
}

export class SwipeDto {
  username: string;
  pokemonId: number;
  action: 'like' | 'dislike';
  name?: string;
  joke?: string;
}
export class GetSwipesDto {
  username: string;
}
